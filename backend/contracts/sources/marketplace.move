module NFTMarketplace {
    use std::signer;
    use std::vector;
    use ProjectNFT;
    use BugBountyCompletion;

    // Function to list a project NFT for sale
    public fun list_project_nft_for_sale(project_id: u64, owner: &signer, price: u64) {
        assert!(ProjectNFT::is_owner(project_id, owner), 1);
        let project = ProjectNFT::get_project_by_id(project_id);

        // List the project for sale
        ProjectNFT::list_nft_for_sale(owner, project_id, price);
    }

    // Function to buy a listed project NFT
    public fun buy_project_nft(buyer: &signer, project_id: u64, price: u64) {
        let project = ProjectNFT::get_project_by_id(project_id);
        assert!(ProjectNFT::is_listed_for_sale(project_id), 2);

        aptos_framework::coin::transfer(&project.owner, price);
        ProjectNFT::transfer_ownership(project_id, buyer);
    }
}
