"use client";
import { useState } from "react";
import { projectData } from "@/app/api/chatbot/data"; // Import your project database
import { Card, CardContent } from "./card";
import { Loader } from "./Loader"; // You need to create a Loader component or use any pre-built one

export default function PersonalizedRecommendation() {
  const [project, setProject] = useState(
    projectData[Math.floor(Math.random() * projectData.length)]
  ); // Set initial random project
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch a new random project that is not the current one
  const handleNextRecommendation = () => {
    setIsLoading(true);

    setTimeout(() => {
      let newProject;
      do {
        newProject = projectData[Math.floor(Math.random() * projectData.length)];
      } while (newProject.project_id === project.project_id); // Ensure a new project is selected

      setProject(newProject);
      setIsLoading(false);
    }, 2000); // Simulating 3 seconds delay
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold text-gray-300 mb-4">
        Your Personalized Recommendation
      </h2>

      <Card className="max-w-lg relative">
        <div className={`relative ${isLoading ? 'blur-sm' : ''}`}>
          <CardContent className="flex flex-col gap-4 p-4">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="rounded-lg w-full object-cover max-h-72"
            />
            <div className="text-xl font-semibold text-gray-100">
              {project.title}
            </div>
            <div className="text-sm text-gray-400">{project.description}</div>
            <div className="flex gap-2 flex-wrap mt-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-gray-300 px-2 py-1 rounded-lg text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline text-sm mt-4"
            >
              View Project on GitHub
            </a>
          </CardContent>
        </div>

        {/* Display loader on top of blurred content */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
            <Loader /> {/* Display loader when loading */}
          </div>
        )}

        <button
          onClick={handleNextRecommendation}
          className="absolute right-4 bottom-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
        >
          Get Next Recommendation
        </button>
      </Card>
    </div>
  );
}
