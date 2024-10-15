"use client";
import React, { useState, useEffect } from "react";
import Projecturl5 from "../../../../public/Project4.jpg";
import TagsDisplay from "../../../../components/ui/tagsDisplay";
import { Button } from "@/components/ui/button";
import IssueDialog from "@/components/ui/issueDialog";
import { aptos, moduleAddress } from "@/app/login/page";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { projectData } from "@/app/api/chatbot/data";

const page = ({ params }) => {
  const [projectId, setProjectId] = useState();
  const [desc, setDesc] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tags, setTags] = useState([]);
  const [totalBounty, setTotalBounty] = useState();
  const [open, setOpen] = useState();
  const [levels, setLevels] = useState();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [projectLink, setProjectLink] = useState();
  const { account, signAndSubmitTransaction } = useWallet();

  async function onApproval() {
    console.log("hey");
    console.log(account);
    if (!account) return [];
    let newcontribution = {
      id: 1,
      level: "critical",
    };
    try {
      const transaction = {
        data: {
          function: `${moduleAddress}::ProjectModule::create_contribution`,
          functionArguments: [newcontribution.id, newcontribution.level],
        },
      };
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log(response);
      // Update level-wise contributors
      if (newcontribution.level === "low") {
        level_wise_contributors[0]++;
      } else if (newcontribution.level === "high") {
        level_wise_contributors[1]++;
      } else {
        level_wise_contributors[2]++;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const approve = async (id) => {
    try {
      const response = await fetch("/api/issues", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update issue approval status");
      }

      const data = await response.json();
      await onApproval();
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === id ? { ...issue, isApproved: true } : issue
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // SENDING Transactions
  async function finalTransactions() {
    if (!account) return [];
    try {
      let data = {
        deployer: deployer,
        projectid: 1,
        high: 1,
        critical: 1,
        low: 1,
      };
      const transaction = {
        data: {
          function: `${moduleAddress}::ProjectModule::transaction_winners`,
          functionArguments: [
            data.deployer,
            data.projectid,
            data.high,
            data.critical,
            data.low,
          ],
        },
      };
      console.log("sending transactions");
      console.log(transaction);
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log("all transactions sent");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(params.project);
    const projectIdFromParams = parseInt(params.project);

    // Find the project in projectData where project_id matches params.project
    const project = projectData.find(
      (project) => project.project_id === projectIdFromParams
    );

    setProjectId(params.project);
    setImgUrl(project.imageUrl);
    setTitle(project.title);
    setDesc(project.description);
    setTags(project.tags);
    setStartDate(project.startdate);
    setEndDate(project.enddate);
    setTotalBounty(project.maxbounty);
    setProjectLink(project.url);
    setLevels({
      Critial: project.critical,
      High: project.high,
      Low: project.low,
    });

    async function fetchIssues() {
      try {
        const response = await fetch(`/api/issues?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error("Error fetching issues");
        }
        const data = await response.json();
        console.log(data);
        if (data.length == 0) {
          console.log(data.message);
        }
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
    if (projectId != null) {
      fetchIssues();
    }
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
      <div className="w-screen h-screen justify-center items-center text-white text-3xl">
        Loading...
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
            <h1 className="text-start max-w-xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300  text-[3.2rem] tracking-tight font-bold  leading-[1.1] font-secondary">
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
