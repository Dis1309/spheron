"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import AI from "@/public/ai.png";
// Assuming projectData is available in the same file or imported
import { projectData } from "@/app/api/chatbot/data";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chatbot",
    });

  // Helper function to extract project recommendations from the message content
  const extractProjectIdsFromMessage = (messageContent: any) => {
    // Adjusted regex to match both "Project_id:" and "Project id :"
    const regex = /Project[_\s]?id\s*:\s*(\d+)/gi;
    const ids = [...messageContent.matchAll(regex)].map((match) => match[1]);
    console.log("ids -", ids);
    return ids;
  };

  // Helper function to render project cards
  const renderProjectCards = (projectIds: any) => {
    const recommendedProjects = projectData.filter((project) =>
      projectIds.includes(project.project_id.toString())
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {recommendedProjects.map((project) => (
          <div
            key={project.project_id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            {/* Display project image */}
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm">{project.description}</p>
            <a
              href={
                project.url.startsWith("http")
                  ? project.url
                  : `https://${project.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 inline-block"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-[672px] mx-auto bg-background rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <Image
              src={AI}
              alt="AI"
              width={80}
              height={80}
              style={{ filter: "invert(1)" }}
            />
            <p className="text-lg text-muted-foreground mt-4">
              Welcome to the Chatbot! Ask me anything.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {messages.map((message) => {
            const isAssistant = message.role === "assistant";
            const projectIds = isAssistant
              ? extractProjectIdsFromMessage(message.content)
              : [];

            return (
              <div
                key={message.id}
                className={`flex ${
                  isAssistant ? "items-start gap-3" : "justify-end"
                }`}
              >
                {isAssistant ? (
                  <>
                    <div className="p-2 border border-gray-700 rounded-full">
                      <Image
                        src={AI}
                        alt="AI"
                        width={20}
                        height={20}
                        style={{ filter: "invert(1)" }}
                      />
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                      <Markdown className="text-sm text-muted-foreground">
                        {message.content}
                      </Markdown>
                      {projectIds.length > 0 && renderProjectCards(projectIds)}
                    </div>
                  </>
                ) : (
                  <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm text-primary-foreground">
                      {message.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 px-4 py-3 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-12 min-h-[64px] text-white"
            rows={1}
            value={input}
            onChange={handleInputChange}
          />

          {!isLoading ? (
            <Button
              type="submit"
              size="icon"
              disabled={!input || isLoading}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={!isLoading}
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SquareIcon className="w-5 h-5" fill="white" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
