import React from "react";
import Image from "next/image";

// {
//     projectId: 10,
//     imageurl: Projecturl4,
//     Title: "Card smx",
//     description: "This is a description for project 10.",
//     tags: ["ui/ux", "security", "web"],
//     startDate: "2024-09-18",
//     endDate: "2024-01-28",
//     MaxBountyAmount: 8580,
//     githubLink: "https://github.com/user/project_10",
//     levels: {
//       Critical: 5400,
//       High: 2845,
//       Low: 615,
//     },
const ProjectCard = ({ project }) => {
  const { imageurl, description } = project;
  return (
    <div className="w-full gap-32 py-3 px-10 flex flex-row justify-evenly items-center border rounded-lg hover:scale-105 hover:rounded-xl transition-all duration-200">
      <Image
        src={imageurl}
        alt="Profile Picture"
        width={70}
        height={70}
        className="rounded-full object-cover"
      />
      <h1 className="text-lg font-bold text-gray-400">{project.Title}</h1>
      <div className="flex flex-col gap-1">
        <p className="font-light text-white">Start Date</p>
        <h3 className="text-lg font-md text-gray-200">{project.startDate}</h3>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-light text-white">End Date</p>
        <h3 className="text-lg font-md text-gray-200">{project.endDate}</h3>
      </div>
      <h1 className="text-[1.5rem] font-bold text-gray-200">
        {"$" + project.MaxBountyAmount}
      </h1>
    </div>
  );
};

export default ProjectCard;
