import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    console.log("Received input:", input); // Log input for debugging

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const refinedPrompt = `Write a brief project description for the following project idea: "${input}".If I provided a github link in previous line then go to the github and write about description about this project. Focus on describing the project in 3-4 sentences. Never go over 300 characters in your response.`;

    const result = await model.generateContent(refinedPrompt);

    // Log the candidates array for debugging
    // console.log("Candidates array:", result.response.candidates);

    // Access the generated description
    const description = result.response.candidates[0].content.parts[0]; // Accessing the first part of content
    // console.log("Generated description:", description);  // Log generated description

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Error in AI API:", error); // Log any errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
