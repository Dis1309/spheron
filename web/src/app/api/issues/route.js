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
export async function GET() {
  await mongoose.connect(connectionSrt);
  const data = await IssueForm.find();
  console.log(data);
  return NextResponse.json({ result: data });
}
