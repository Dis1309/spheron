import { google } from "@ai-sdk/google";
import { type CoreMessage, streamText } from "ai";
import { projectData } from "./data";
export const maxDuration = 30;

const systemPrompt = `You are a helpful assistant titled Lucy. You have the following projects:
  ${projectData
    .map(
      (proj: any) =>
        `Project: ${proj.title} - ${proj.description} (project_id: ${proj.id})`
    )
    .join("\n")}.
  If a user asks for recommendations, suggest the most relevant projects by their ID. Unless asked don't provide 
  any recommendation. Also do not give anything which is not asked from you. Just do what he user is asking you to. 
  If no project fit the description then tell them that no project fits the description. Always tell project_id : actual integer representing id.
  Always say project_id before mentioning any project information.`;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  console.log("chatbot");
  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system: systemPrompt,
    messages,
  });

  // console.log(result);
  return result.toAIStreamResponse();
}
