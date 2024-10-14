"use client";
import React from "react";
import Projecturl5 from "../../../../public/Project4.jpg";
import { useState, useEffect } from "react";
import TagsDisplay from "../../../../components/ui/tagsDisplay";
import { Button } from "@/components/ui/button";
import IssueDialog from "@/components/ui/issueDialog";
import { aptos, moduleAddress } from "@/app/login/page";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

let project = {
  projectId: 4,
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
// removed params and commented issues
const page = () => {
  const [projectId, setProjectId] = useState(project.projectId);
  const [desc, setDesc] = useState(project.description);
  const [imgUrl, setImgUrl] = useState(project.imageurl);
  const [title, setTitle] = useState(project.Title);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [tags, setTags] = useState(["ui/ux", "ai", "data"]);
  const [totalBounty, setTotalBounty] = useState(project.MaxBountyAmount);
  const [open, setOpen] = useState(false);
  const [levels, setLevels] = useState({
    Critical: 0,
    High: 0,
    Low: 0,
  });
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectLink, setProjectLink] = useState(project.githubLink);
  const { account, connected, signAndSubmitTransaction } = useWallet();
  // GET PROJECT INFORMATION
  async function getallprojectinfo() {
    if (!account) return [];
    try {
      const projectMappingResource = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::ProjectModule::ProjectMapping`,
      });
      const userResource = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::ProjectModule::User`,
      });

      const userProjects = userResource.data.projects;
      const projectsMap = projectMappingResource.data.projects;
      const accountProjects = [];

      for (const projectId in userProjects) {
        const project = projectsMap[projectId];

        accountProjects.push({
          id: projectId,
          description: project.description,
          maxBounty: project.max_bounty,
          startDate: project.start_date,
          endDate: project.end_date,
          criticalBounty: project.critical_bounty,
          highBounty: project.high_bounty,
          lowBounty: project.low_bounty,
          contributors: project.contributors, // Array of contributors
        });
      }

      // Display or return the projects for further use (e.g., in UI)
      console.log("Account's Projects:", accountProjects);
    } catch (error) {
      console.log(error);
    }
  }
  const approve = async (id) => {
    try {
      const response = await fetch(`/api/issues`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }), // Pass the issueId
      });

      if (!response.ok) {
        throw new Error("Failed to update issue approval status");
      }

      const data = await response.json();
      console.log("Issue approved:", data);
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === id ? { ...issue, isApproved: true } : issue
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch(`/api/issues?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error("Error fetching issues");
        }
        const data = await response.json();
        console.log(data);
        const storedValue = sessionStorage.getItem("accountAddress");
        const filteredIssues = data.issues.filter(
          (issue) => issue.ownerId === storedValue
        );
        setIssues(filteredIssues);
      } catch (err) {
        console.log(error);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, [projectId]);

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
  if (loading == true) {
    return (
      <div className="h-screen w-screen flex justify-center items-center text-white text-xl">
        Loading....
      </div>
    );
  }
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
            {issues.length == 0 ? <IssueDialog /> : <></>}
          </div>
          <div>
            <h2>Issues for Project ID: {projectId}</h2>
            {issues.length === 0 ? (
              <p>No issues found.</p>
            ) : (
              <div className="flex flex-col gap-6">
                {issues.map((issue) => (
                  <div
                    key={issue._id}
                    className="w-full gap-4 py-3 px-10 flex flex-row justify-evenly items-center border rounded-lg  hover:rounded-xl transition-all duration-200"
                  >
                    <h1 className="text-lg font-bold text-gray-400">
                      {issue.title}
                    </h1>
                    <div className="flex flex-col gap-1">
                      <p className="font-light text-gray-500 ">By</p>
                      <h3 className="text-lg font-md text-gray-200">
                        {issue.username}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-light text-gray-500 ">Priority</p>
                      <h3 className="text-lg font-md text-gray-200">
                        {issue.priority}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-light text-gray-500 font-loght">
                        description
                      </p>
                      <h3 className="text-lg font-md text-gray-200">
                        {issue.description}
                      </h3>
                    </div>
                    {issue.isApproved == true ? (
                      <button className="bg-gray-500 text-white py-2.5 px-5 text-sm border rounded-xl font-semibold">
                        Approved
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button className="bg-red-700 text-white py-2.5 px-5 text-sm rounded-lg font-semibold hover:scale-105">
                          Disapprove
                        </button>
                        <button
                          className="bg-green-700 text-white py-2.5 px-5 text-sm font-semibold hover:scale-105 rounded-lg"
                          onClick={() => {
                            approve(issue._id);
                          }}
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
