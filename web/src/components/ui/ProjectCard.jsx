import React from "react";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  const { imageUrl, description, title, startdate, enddate, maxbounty } = project;

  return (
    <div className="flex flex-row justify-around items-center border border-gray-600 rounded-lg p-4 w-[1000px] h-[150px] hover:scale-105 hover:rounded-xl transition-all duration-200"> {/* Set to 900px width */}
      <div className="relative w-16 h-16"> {/* Fixed width for the image */}
        <Image
          src={imageUrl}
          alt={description.substring(0, 10)}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
          unoptimized
        />
      </div>
      <h1 className="text-lg font-bold text-gray-400">{title}</h1>
      <div className="flex flex-col gap-1">
        <p className="font-light text-white">Start Date</p>
        <h3 className="text-lg font-md text-gray-200">{startdate}</h3>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-light text-white">End Date</p>
        <h3 className="text-lg font-md text-gray-200">{enddate}</h3>
      </div>
      <h1 className="text-[1.5rem] font-bold text-gray-200">
        {"$" + maxbounty}
      </h1>
    </div>
  );
};

export default ProjectCard;
