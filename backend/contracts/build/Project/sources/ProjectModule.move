module account_address::ProjectModule {
    use std::signer;
    use std::string;
    use std::table;
    use std::vector;
    use std::option;
    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_token_objects::collection::{Self};
    use aptos_token_objects::token::{Self};
    use aptos_framework::coin::{Self, balance, transfer};
    use aptos_framework::aptos_coin::{Self, AptosCoin};
    use aptos_framework::event;
   use aptos_std::type_info;
    /// Structure for Project details
    struct Project has copy, drop, store {
        description: string::String,
        max_bounty: u64,
        start_date: u64,
        end_date: u64,
        critical_bounty: u64,
        high_bounty: u64,
        low_bounty: u64,
        contributors: vector<Contributor>
    }

    /// Structure for Contribution details
    struct Contributor has copy, drop, store {
        issuer: address,
        level: string::String
    }

    struct User has copy, drop, store {
        projects: vector<u64>,
        earned_money: u64,
        contributions: vector<u64>
    }

    /// Mapping of addresses to Project info and contributions
    struct ProjectMapping has key, store {
        contributions: SimpleMap<u64,Contributor>,
        projects: SimpleMap<u64,Project>,
        no_contributer: u64,
        no_project: u64,
        users: SimpleMap<address,User>,

    }

    /// Initialize the project mapping resource for a given signer
    public fun initialize_project_mapping(account: &signer) {
        let project_mapping = ProjectMapping {
            contributions: simple_map::new(),
            projects: simple_map::new(),
            no_contributer: 0,
            no_project: 0,
            users: simple_map::new(),
        };
        move_to(account, project_mapping);
    }

    #[event]
    struct CreateCollectionEvent has store, drop {
        creator_addr: address,
        name: string::String,
        description: string::String
    }

    struct TransferEvent has store {
        end_date : u64,
        project_id: u64,
        message: string::String
    }
    public fun create_user(creator: &signer){
        let creator_addr = signer::address_of(creator);
        let user = User{
            projects:vector::empty<u64>(),
            earned_money:0,
            contributions:vector::empty<u64>(),
        };
        collection::create_unlimited_collection(
            creator,
            string::utf8(b"Stores collection of NFTs under the user"),
            string::utf8(b"User NFT Collection"),
            option::none(),
            string::utf8(b"https://mycollection.com")
        );
        
        let project_mapping = ProjectMapping {
            contributions: simple_map::new(),
            projects: simple_map::new(),
            no_contributer: 0,
            no_project: 0,
            users: simple_map::new(),
        };

        
        simple_map::upsert(
            &mut project_mapping.users,
            creator_addr,
            user
        );
        move_to(creator, project_mapping);
        
        event::emit(
            CreateCollectionEvent {
                creator_addr: creator_addr,
                name: string::utf8(b"User NFT Collection"),
                description: string::utf8(b"Stores collection of NFTs under the user")
            }
        );
    }

    public fun create_project(
        creator:&signer,
        id: u64,
        description: string::String,
        max_bounty: u64,
        start_date: u64,
        end_date: u64,
        critical_bounty: u64,
        high_bounty: u64,
        low_bounty: u64,
        contributors: vector<Contributor>
    ) acquires ProjectMapping {
        let creator_addr = signer::address_of(creator);

        let project = Project {
            description,
            max_bounty,
            start_date,
            end_date,
            critical_bounty,
            high_bounty,
            low_bounty,
            contributors
        };
        
        // Check that max_bounty is greater than zero
        assert!(max_bounty > 0, 0);

        // Check that the creator has enough balance to cover max_bounty
        let creator_balance = balance<AptosCoin>(creator_addr);
        assert!(creator_balance >= max_bounty, 1);

        // Ensure that end_date is after start_date
        assert!(end_date > start_date, 2);

        // Transfer max_bounty from creator to the contract(@account_address)
        transfer<AptosCoin>(creator, creator_addr, max_bounty);

        token::create_named_token(
            creator,
            string::utf8(b"User NFT collection"),
            string::utf8(b"Description"),
            description,
            option::none(),
            string::utf8(b"https://mycollection.com/my-named-token.jpeg")
        );


        let project_mapping = borrow_global_mut<ProjectMapping>(@account_address);
        simple_map::upsert(
            &mut project_mapping.projects,
            id,
            project
        );
    }

    public fun create_contribution(
        account: &signer,
        id: u64,
        level: string::String,
    ) acquires ProjectMapping, {
        let contributor_addr = signer::address_of(account);
        let contribution = Contributor { issuer: contributor_addr, level: level};

        // Retrieve ProjectMapping
        let project_mapping = borrow_global_mut<ProjectMapping>(@account_address);
        simple_map::upsert(
            &mut project_mapping.contributions,
            id,
            contribution
        );
    }
    


    public fun transaction_winners(
        deployer: &signer,
        project_id: u64,
        high: u64,
        critical: u64,
        low: u64
    ) acquires ProjectMapping, {
       let project_mapping = borrow_global<ProjectMapping>(@account_address);
       let all_projects = project_mapping.projects;
       let projectMain =simple_map::borrow(&mut all_projects,&project_id);
       let project = projectMain.contributors;
       let len = vector::length(&project);
        let mp:SimpleMap<address,u64> = simple_map::create(); 
       for (i in 0..len) {
         let contributor = vector::borrow(&project,i);
         let amount:u64 = 0;
         
         if(contributor.level ==  string::utf8(b"High")) {
           amount = projectMain.high_bounty/high;
         } else if(contributor.level ==  string::utf8(b"Critical")) {
           amount = projectMain.critical_bounty/critical;
         } else amount = projectMain.low_bounty/low;

         if(simple_map::contains_key(&mut mp,&contributor.issuer)==false) {
             simple_map::add(&mut mp, contributor.issuer,amount); 
         } else {
            let tmp:u64 = *simple_map::borrow(&mut mp,&contributor.issuer);
            amount = amount + tmp;
            simple_map::upsert(&mut mp,contributor.issuer,amount );
         };
       };
       for (i in 0..len) {
         let contributor = vector::borrow(&project,i);
         if(simple_map::contains_key(&mut mp,&contributor.issuer)==true) {
            let value = *simple_map::borrow(&mut mp,&contributor.issuer);
            let add:address = @account_address;
            transfer<AptosCoin>(deployer, contributor.issuer, value);
         };
       };
    }
}
