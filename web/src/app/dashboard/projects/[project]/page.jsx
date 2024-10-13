"use client";
import React from "react";
import Projecturl5 from "../../../../public/Project4.jpg";
import { useState, useEffect } from "react";
import TagsDisplay from "../../../../components/ui/tagsDisplay";
import { Button } from "@/components/ui/button";
import IssueDialog from "@/components/ui/issueDialog";
let project = {
  projectId: 5,
  imageurl: Projecturl5,
  Title: "Card smx",
  description: "This is a description for project 5.",
  tags: ["ui/ux", "ai", "data"],
  startDate: "2024-10-24",
  endDate: "2024-08-04",
  MaxBountyAmount: 13146,
  githubLink: "https://github.com/user/project_5",
  levels: {
    Critical: 7802,
    High: 3124,
    Low: 1759,
  },
};

const page = ({ params }) => {
  const [projectId, setProjectId] = useState();
  const [desc, setDesc] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tags, setTags] = useState(["ui/ux", "ai", "data"]);
  const [totalBounty, setTotalBounty] = useState();
  const [open, setOpen] = useState(false);
  const [levels, setLevels] = useState({
    Critical: 0,
    High: 0,
    Low: 0,
  });
  const [projectLink, setProjectLink] = useState();

  useEffect(() => {
    setProjectId(project.id);
    setDesc(project.description);
    setImgUrl(project.imageurl);
    setTitle(project.Title);
    setStartDate(project.startDate);
    setEndDate(project.endDate);
    setTags(project.tags);
    setTotalBounty(project.MaxBountyAmount);
    setLevels(project.levels);
    setProjectLink(project.githubLink);
  }, []);

  const LevelsDisplay = () => {
    return (
      <div className="flex flex-row gap-5 justify-start items-center max-w-5xl">
        <div className="border border-gray-600 px-6 py-3 rounded-md flex flex-col gap-2">
          <h3 className="text-lg font-light text-gray-400">Critical</h3>
          <h2 className="text-2xl font-bold text-gray-200">
            {"$" + levels.Critical}
          </h2>
        </div>
        <div className="border border-gray-600 px-6 py-3 rounded-md  flex flex-col gap-2">
          <h3 className="text-lg font-light text-gray-400">High</h3>
          <h2 className="text-2xl font-bold text-gray-200">
            {"$" + levels.High}
          </h2>
        </div>
        <div className="border border-gray-600 px-6 py-3 rounded-md flex flex-col gap-2">
          <h3 className="text-lg font-light text-gray-400">Low</h3>
          <h2 className="text-2xl font-bold text-gray-200">
            {"$" + levels.Low}
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden gap-2 bg-black">
      <div className="bg-black py-16 px-52 overflow-x-hidden relative w-full">
        <div className="relative border p-10  border-gray-800 rounded-lg w-full bg-black flex flex-col justify-start items-start min-h-screen gap-10 ">
          <div className="absolute right-20 top-10">
            <h1 className="text-lg font-light text-gray-400">total Bounty</h1>
            <h1 className="text-[3rem] font-bold text-gray-200">
              {"$" + totalBounty}
            </h1>
          </div>
          <div className="inline-flex justify-center items-center">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300 text-center text-[5.2rem] tracking-tight font-bold max-w-screen-lg leading-[1.1] font-secondary">
              {title}
            </h1>
          </div>
          <div className="flex flex-row justify-start items-center gap-10 w-full">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-xl font-bold text-gray-400">Start Date</h1>
              <h1 className="text-lg font-lg text-gray-200">{startDate}</h1>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-xl font-bold text-gray-400">End Date</h1>
              <h1 className="text-lg font-lg text-gray-200">{endDate}</h1>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-xl font-bold text-gray-400">
              About the project:
            </h1>
            <h1 className="text-lg font-lg text-gray-200">{desc}</h1>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-400">Project Link</h1>
            <h1 className="text-lg font-lg text-gray-200 cursor-pointer">
              {projectLink}
            </h1>
          </div>
          <div className="flex flex-col justify-start items-start gap-5">
            <h1 className="text-xl font-bold text-gray-400">Tags</h1>
            <TagsDisplay tags={tags} />
          </div>
          <div className="flex flex-row justify-between items-end w-full">
            <div className="flex flex-col justify-start items-start gap-5">
              <h1 className="text-xl font-bold text-gray-400">
                Bounty Distribution
              </h1>
              <LevelsDisplay />
            </div>
            <IssueDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
