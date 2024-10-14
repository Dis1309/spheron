import React from "react";
import Image from "next/image";

const Card = ({ project }) => {
  const { imageUrl, description } = project;

  return (
    <div className="flex flex-col bg-black border border-gray-600 rounded-sm shadow-md overflow-hidden hover:rounded-xl hover:scale-105 transition-all duration-200 h-full">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={description}
          layout="fill"
          objectFit="cover"
          unoptimized // Allows external image URLs without using the Next.js Image Optimization
        />
      </div>
      {/* Card content */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-200 dark:text-gray-200">
            {project.title}
          </h1>
          <button className="text-red-400 dark:text-gray-400 text-sm">
            ${project.maxbounty}
          </button>
        </div>
        <p className="text-sm font-light text-gray-400 overflow-hidden line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
