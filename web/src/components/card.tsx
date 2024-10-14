import React from "react";
import Image from "next/image";

const Card = ({ project }) => {
  const { imageurl, description } = project;

  return (
    <div className="flex flex-col bg-black border border-gray-600 rounded-sm shadow-md overflow-hidden hover:rounded-xl hover:scale-105 transition-all duration-200 ">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageurl}
          alt={description}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* Card content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-row w-full justify-between items-center">
          {project.endDate == "2024-01-28" ? (
            <h1 className="text-2xl font-semibold text-red-800">
              {project.Title}
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {project.Title}
            </h1>
          )}

          {project.endDate == "2024-01-28" ? (
            <p className="text-red-800">Transactions Started</p>
          ) : (
            <button className="text-gray-600 dark:text-gray-400 text-sm">
              ${project.MaxBountyAmount}
            </button>
          )}
        </div>
        <p className="text-sm font-light text-white">{description}</p>
      </div>
    </div>
  );
};

export default Card;
