module FeatureListing {
    use std::signer;
    use std::vector;
    use ContributorManagement;

    struct Feature has store, key {
        feature_id: u64,
        description: vector<u8>,
        reward: u64,
    }

    // Function to add a new feature for the project
    public fun add_feature(project_id: u64, owner: &signer, description: vector<u8>, reward: u64) {
        // Only project owner can add features
        assert!(ContributorManagement::is_owner(project_id, owner), 1);

        let new_feature = Feature {
            feature_id: generate_feature_id(),
            description: description,
            reward: reward,
        };

        // Add the feature to the project's feature list
        ContributorManagement::add_feature_to_project(project_id, new_feature);
    }

    fun generate_feature_id(): u64 {
        // Simple function to generate unique feature IDs
        return std::rand::random_u64();
    }
}
