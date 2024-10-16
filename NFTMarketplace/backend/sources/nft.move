module MyNFTMarketplace::Project {
     use std::signer;
    use std::string;
    use std::table;
    use std::vector;
    use std::option;
    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_framework::coin::{Self, balance, transfer};
    use aptos_framework::aptos_coin::{Self, AptosCoin};


    // Struct for NFT with price associated
    struct MyNFT has key {
        id: u64,
        name: vector<u8>,
        description: vector<u8>,
        uri: vector<u8>,
        price: u64,   // Price of the NFT in coins (APT)
        owner: address
    }

    struct MyNFTCollection has key,store {
        name: vector<u8>,
        description: vector<u8>,
        uri: vector<u8>,
        supply: u64,
        minted: u64  // To track how many NFTs have been minted
    }

    // Create an NFT collection
    public entry fun create_collection(account: &signer, name: vector<u8>, description: vector<u8>, uri: vector<u8>, supply: u64)  {
        let collection = MyNFTCollection { 
            name, 
            description, 
            uri, 
            supply,
            minted: 0 // Initialize minted count
        };
        move_to(account, collection);
    }

    // Mint an NFT with a price
    public entry fun mint_nft(account: &signer, name: vector<u8>, description: vector<u8>, uri: vector<u8>, price: u64) acquires MyNFTCollection{
        let addr = signer::address_of(account);

        // Borrow the collection from storage
        let collection_ref = borrow_global_mut<MyNFTCollection>(addr);

        // Ensure there is still supply remaining
        assert!(collection_ref.minted < collection_ref.supply, 101); // Error code 101 if supply exceeded

        // Increment the minted count to create a unique token ID
        collection_ref.minted = collection_ref.minted + 1;
        let token_id = collection_ref.minted;

        // Create and store the NFT with a price and the current owner
        let nft = MyNFT {
            id: token_id,
            name,
            description,
            uri,
            price,
            owner: addr
        };


        move_to(account, nft);
    }

    // Transfer an NFT with payment
    public entry fun buy_nft(buyer: &signer, seller_address: address, token_id: u64, payment: u64) acquires MyNFT,{

        // Borrow the NFT to ensure it exists and check its ownership and price
        let nft_ref = borrow_global_mut<MyNFT>(seller_address);

        // Ensure the token ID matches and the buyer has sent the correct amount of payment
        assert!(nft_ref.id == token_id, 102);          // Error code 102 if wrong NFT ID
        assert!(nft_ref.price == payment, 103);        // Error code 103 if incorrect payment amount

        // Perform payment transfer from buyer to seller
        transfer<AptosCoin>(buyer, seller_address, payment);

        // Transfer NFT ownership from seller to buyer
        let nft = move_from<MyNFT>(seller_address);
        move_to(buyer, nft);
    }
}