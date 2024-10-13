import React from "react";

const TagsDisplay = ({ tags }) => {
  return (
    <div className="bg-black max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
      {tags.map((tag) => (
        <div className="text-gray-900 bg-gray-300 font-medium text-lg rounded-full  px-5 py-1">
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagsDisplay;
