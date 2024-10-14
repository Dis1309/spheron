import Link from "next/link";
import Image from "next/image";

import Card from "../card";
import { projectData } from "@/app/api/chatbot/data";

const ProjectList = () => {
  return (
    <div className="relative p-10 flex flex-col gap-10">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300 text-center text-[5.2rem] tracking-tight font-bold max-w-screen-lg leading-[1.1] font-secondary">
        Your Projects
      </h1>

      <div className="bg-black w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {projectData.map((project) => (
          <Link href={`/dashboard/projects/${project.project_id}`}>
            {" "}
            <Card key={project.project_id} project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
