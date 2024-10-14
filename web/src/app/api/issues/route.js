import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionSrt } from "@/lib/db";
import { IssueForm } from "../../../lib/model/issueform";

async function connectToDB() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(connectionSrt);
    console.log("Connected to MongoDB");
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    // Extracting the `projectId` from the request URL
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Find all issue forms with the provided `projectId`
    const issues = await IssueForm.find({ projectId });

    if (issues.length === 0) {
      return NextResponse.json(
        { message: "No issues found for the given projectId" },
        { status: 404 }
      );
    }
    console.log(issues);
    return NextResponse.json({ issues }, { status: 200 });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { message: "Error fetching issues" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    if (
      !body ||
      !body.issueId ||
      !body.title ||
      !body.username ||
      !body.description ||
      !body.priority
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newIssue = new IssueForm({
      IssueId: body.issueId,
      title: body.title,
      username: body.username,
      description: body.description,
      priority: body.priority,
      projectId: body.projectId || null,
      isApproved: body.isApproved || false,
    });

    await newIssue.save();
    return NextResponse.json(
      { message: "Issue created successfully", issue: newIssue },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { message: "Error creating issue" },
      { status: 500 }
    );
  }
}

// PATCH request to update an existing issue's isApproved status
export async function PATCH(req) {
  try {
    await connectToDB();
    const body = await req.json();

    // Check if _id is provided in the request
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "Issue _id is required" },
        { status: 400 }
      );
    }

    // Update the isApproved field to true
    const updatedIssue = await IssueForm.findByIdAndUpdate(
      _id,
      { isApproved: true }, // Update the isApproved field to true
      { new: true } // This returns the updated document
    );

    if (!updatedIssue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Issue updated successfully", issue: updatedIssue },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json(
      { message: "Error updating issue" },
      { status: 500 }
    );
  }
}
