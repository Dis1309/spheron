// route.tsx for classify-priority
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Refined prompt to classify priority
    const refinedPrompt = `Based on this issue description: "${description}", classify it as 'low', 'high', or 'critical' priority. 'low' for very basic contribution. 'high' for some good contribution. 'critical' for those without which are utmost important and difficult. Respond only with one of these three words.`;

    const result = await model.generateContent(refinedPrompt);
    const responseText = result.response.candidates[0].content.parts[0];
    
    // Regex to match priority keywords
    const priority = /low|high|critical/.exec(responseText)?.[0] || 'low';
    console.log("Priority:", priority);

    // Return the priority to the frontend
    return NextResponse.json({ priority });
  } catch (error) {
    console.error("Error in AI API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
