module ContributorManagement {
    use std::signer;
    use std::vector;
    use ProjectNFT;

    // Function for a contributor to join the project
    public fun register_contributor(project_id: u64, contributor: &signer) {
        let project = ProjectNFT::get_project_by_id(project_id);
        vector::push_back(&mut project.contributors, copy(*contributor));
    }
}
