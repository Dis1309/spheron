import mongoose from "mongoose";

const issueFormModel = new mongoose.Schema({
  IssueId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  projectId: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  contributerId: {
    type: String,
  },
  ownerId: {
    type: String,
  },
});

export const IssueForm =
  mongoose.models.issueforms || mongoose.model("issueforms", issueFormModel);
