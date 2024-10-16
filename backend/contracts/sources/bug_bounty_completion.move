module BugBountyCompletion {
    use std::signer;
    use FeatureListing;

    // Function to mark a feature as completed
    public fun complete_feature(project_id: u64, feature_id: u64, contributor: &signer) {
        let project = FeatureListing::get_project_by_id(project_id);

        // Verify the contributor is registered for the project
        assert!(FeatureListing::is_contributor(project_id, contributor), 2);

        // Mark the feature as completed and trigger reward
        FeatureListing::mark_feature_completed(project_id, feature_id);
        trigger_payment(contributor, project.features[feature_id].reward);
    }

    // Function to trigger payment for a completed feature
    fun trigger_payment(contributor: &signer, reward: u64) {
        aptos_framework::coin::transfer(&contributor, reward);
    }
}
