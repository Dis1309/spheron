module ProjectNFT {
    use std::signer;
    use std::vector;
    use aptos_framework::token::Token;

    // Structure to define the Project NFT
    struct ProjectNFT has store, key {
        owner: signer,
        name: vector<u8>,
        description: vector<u8>,
        contributors: vector<signer>,
    }

    // Function to mint a new Project NFT
    public fun mint_project_nft(owner: &signer, name: vector<u8>, description: vector<u8>) {
        let project_nft = ProjectNFT {
            owner: copy(*owner),
            name: name,
            description: description,
            contributors: vector::empty<signer>(),
        };

        Token::create_token(owner, name, description, 1, project_nft);
    }
}
