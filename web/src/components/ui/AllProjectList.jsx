import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projectData } from "@/app/api/chatbot/data";

const AllProjectList = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-12">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300 text-center text-[5.2rem] tracking-tight font-bold max-w-screen-lg leading-[1.1] font-secondary">
        Explore...
      </h1>
      <div className="w-full flex flex-col items-center gap-6">
        {projectData.map((project) => (
          <Link key={project.project_id} href={`/dashboard/projects/${project.project_id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProjectList;
