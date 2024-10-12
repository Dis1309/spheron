module account_address::ProjectModule {
    use std::signer;
    use std::string;
    use std::table;
    use std::vector;
    use std::option;
    use aptos_token_objects::collection::{Self};
    use aptos_token_objects::token::{Self};
    use aptos_framework::coin::{Self, balance, transfer};
    use aptos_framework::aptos_coin::{Self, AptosCoin};

    use aptos_framework::event;

    /// Structure for Project details
    struct Project has copy, drop, store {
        id: u64,
        description: string::String,
        max_bounty: u64,
        start_date: u64,
        end_date: u64,
        critical_bounty: u64,
        high_bounty: u64,
        low_bounty: u64
    }

    /// Structure for Contribution details
    struct Contribution has copy, drop, store {
        id: u64,
        project_id: u64,
        money: u64
    }

    /// Mapping of addresses to Project info and contributions
    struct ProjectMapping has key, store {
        address_to_project: table::Table<address,vector<Project>>,
        address_to_contribution: table::Table<address, vector<Contribution>>, // Maps address to Contribution
        address_to_token: table::Table<address, string::String> // Mapping of address to token ID
    }

    /// Initialize the project mapping resource for a given signer
    public fun initialize_project_mapping(account: &signer) {
        let project_mapping = ProjectMapping {
            address_to_project: table::new<address, vector<Project>>(),
            address_to_contribution: table::new<address, vector<Contribution>>(),
            address_to_token: table::new<address, string::String>()
        };
        move_to(account, project_mapping);
    }

    #[event]
    struct CreateCollectionEvent has store, drop {
        creator_addr: address,
        name: string::String,
        description: string::String
    }

    public fun create_user(creator: &signer){
        let creator_addr = signer::address_of(creator);

        collection::create_unlimited_collection(
            creator,
            string::utf8(b"Stores collection of NFTs under the user"),
            string::utf8(b"User NFT Collection"),
            option::none(),
            string::utf8(b"https://mycollection.com")
        );

        move_to(
            creator,
            ProjectMapping {
                address_to_project : table::new<address, vector<Project>>(),
                address_to_contribution: table::new<address, vector<Contribution>>(),
                address_to_token: table::new<address, string::String>()
            }
        );
        event::emit(
            CreateCollectionEvent {
                creator_addr: creator_addr,
                name: string::utf8(b"User NFT Collection"),
                description: string::utf8(b"Stores collection of NFTs under the user")
            }
        );
    }

    public fun create_project(
        creator: &signer,
        id: u64,
        description: string::String,
        max_bounty: u64,
        start_date: u64,
        end_date: u64,
        critical_bounty: u64,
        high_bounty: u64,
        low_bounty: u64
    ) acquires ProjectMapping {
        let project = Project {
            id,
            description,
            max_bounty,
            start_date,
            end_date,
            critical_bounty,
            high_bounty,
            low_bounty
        };

        let creator_addr = signer::address_of(creator);

        // Check that max_bounty is greater than zero
        assert!(max_bounty > 0, 0);

        // Check that the creator has enough balance to cover max_bounty
        let creator_balance = balance<AptosCoin>(creator_addr);
        assert!(creator_balance >= max_bounty, 1);

        // Ensure that end_date is after start_date
        assert!(end_date > start_date, 2);

        // Transfer max_bounty from creator to the contract
        transfer<AptosCoin>(creator, creator_addr, max_bounty);

        token::create_named_token(
            creator,
            string::utf8(b"User NFT collection"),
            string::utf8(b"Description"),
            description,
            option::none(),
            string::utf8(b"https://mycollection.com/my-named-token.jpeg")
        );


        let project_mapping = borrow_global_mut<ProjectMapping>(creator_addr);
        table::add(&mut project_mapping.address_to_token, creator_addr, description);

        let projects =
            table::borrow_mut_with_default(
                &mut project_mapping.address_to_project,
                creator_addr,
                vector::empty<Project>()
            );

        vector::push_back(projects, project);
    }

    public fun create_contribution(
        account: &signer,
        project_id: u64,
        contribution_id: u64,
        money: u64
    ) acquires ProjectMapping, {
        let addr = signer::address_of(account);
        let contribution = Contribution { id: contribution_id, project_id, money };

        // Retrieve ProjectMapping
        let project_mapping = borrow_global_mut<ProjectMapping>(addr);

        let contributions =
            table::borrow_mut_with_default(
                &mut project_mapping.address_to_contribution,
                addr,
                vector::empty<Contribution>()
            );

        vector::push_back(contributions, contribution);
    }
}
