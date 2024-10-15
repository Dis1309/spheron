"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileLinearChart from "@/components/ui/ProfileLinearChart";
import profilePic from "../../../public/avatar.png";
import PersonalizedRecommendation from "@/components/ui/PersonalizedRecommendation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfilePieChart from "@/components/ui/ProfilePieChart";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const page = () => {
  const [user, setUser] = useState(
    "0xdba0a8c309cfa037778d8955cd50730bc5056e9922d25a117855a185432efa3e"
  );
  interface Issue {
    _id: string;
    ownerId: string;
    title: string;
    username: string;
    priority: string;
    description: string;
    isApproved: boolean;
    contributerId: string;
    money: number;
    projectId: number;
  }
  const [name, setName] = useState("Ashwin Singh");
  const [contributionCount, setContributionCount] = useState("34");
  const [projectCount, setProjectsCount] = useState("3");
  const [revenue, setRevenue] = useState("58000");
  const { account } = useWallet();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch(`/api/issues`); // Fetching all issues
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data = await response.json();

        // Assuming the logged-in user's `contributerId` is stored in sessionStorage
        const storedContributerId = user;
        console.log(data);
        if (storedContributerId) {
          // Filter issues to show only those that match the `contributerId`
          const filteredIssues = data.issues.filter(
            (issue: Issue) => issue.contributerId === storedContributerId
          );
          setIssues(filteredIssues);
          console.log(filteredIssues);
          const totalRevenue = filteredIssues
            .filter((issue: { isApproved: any }) => issue.isApproved) // Only approved issues
            .reduce((sum: any, issue: { money: any }) => sum + issue.money, 0); // Sum up the money field

          setRevenue(totalRevenue); // Set total revenue
        } else {
          setIssues([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, []); // Empty dependency array to fetch data on component mount

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-centr items-center text-white text-3xl">
        Loading....
      </div>
    );
  }

  return (
    <div className="bg-black flex flex-col justify-center items-center">
      <div className="w-full min-h-screen p-6">
        <div className="grid grid-cols-2 gap-10 justify-between">
          <div className="col-span-1 row-span-3">
            <Card className="h-full w-full p-6">
              <div className="flex flex-col justfy-start items-start gap-6 p-6">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <Image
                    src={profilePic}
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                  />
                  <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300 text-center text-[3.5rem] tracking-tight font-bold max-w-screen-lg leading-[1.1] font-secondary">
                    {account?.address
                      ? `${account.address.slice(
                          0,
                          3
                        )}...${account.address.slice(-3)}`
                      : "Hello, Aviral Katiyar"}
                  </h1>
                </div>
                <div className="flex flex-row gap-6 justify-between items-start w-full">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2 justify-start items-start">
                      <h1 className="text-xl font-bold text-gray-400">
                        Project Count :{" "}
                      </h1>
                      <h1 className="text-lg font-lg text-gray-200">
                        {projectCount}
                      </h1>
                    </div>
                    <div className="flex flex-row gap-2 justify-start items-start">
                      <h1 className="text-xl font-bold text-gray-400">
                        Issues Resolved :{" "}
                      </h1>
                      <h1 className="text-lg font-lg text-gray-200">
                        {contributionCount}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col justify-center">
                      <h1 className="text-lg font-light text-gray-400">
                        total Revenue
                      </h1>
                      <h1 className="text-[2.5rem] font-bold text-gray-200">
                        {"$" + revenue}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* {prev transactions} */}
                <div className="flex flex-col gap-4">
                  <h1 className="text- font-bold text-3xl text-gray-200">
                    Prev Transactions
                  </h1>
                  <div className="flex flex-col gap-2">
                    {" "}
                    {issues.map((issue) => {
                      if (issue.isApproved == false) {
                        return <></>;
                      }
                      return (
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Project Name : {issue.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {issue.money}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {issue.priority} contribution
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Project Name : FlowBG
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$500</div>
                        <p className="text-xs text-muted-foreground">
                          Critcal contribution
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Project Name : InvigoPulse
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$100</div>
                        <p className="text-xs text-muted-foreground">
                          High contribution
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text- font-bold text-3xl text-gray-200">
                  Prev Contribution
                </h1>
                <div className="flex flex-col gap-2">
                  {issues.map((issue) => {
                    return (
                      <div className="flex flex-col bg-black border border-gray-600 rounded-sm shadow-md overflow-hidden hover:rounded-xl hover:scale-105 transition-all duration-200 ">
                        <div className="p-4 flex flex-col gap-2">
                          <div className="flex flex-row w-full justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                              {issue.projectId}
                            </h1>
                            <button className="text-gray-600 dark:text-gray-400 text-sm">
                              {issue.priority}
                            </button>
                          </div>
                          <div className="flex flex-row w-full justify-between items-center">
                            <p className="text-sm font-light text-white">
                              Prediction added
                            </p>
                            {issue.isApproved ? (
                              <button className="bg-green-700 py-2.5 px-5 text-sm font-semibold">
                                Approved
                              </button>
                            ) : (
                              <button className="bg-gray-800 py-2.5 px-5 text-sm font-semibold">
                                Pending
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex flex-col bg-black border border-gray-600 rounded-sm shadow-md overflow-hidden hover:rounded-xl hover:scale-105 transition-all duration-200 ">
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                          InvogoPulse
                        </h1>
                        <button className="text-gray-600 dark:text-gray-400 text-sm">
                          High
                        </button>
                      </div>
                      <div className="flex flex-row w-full justify-between items-center">
                        <p className="text-sm font-light text-white">
                          Prediction added
                        </p>
                        <button className="bg-green-700 py-2.5 px-5 text-sm font-semibold">
                          Approved
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col bg-black border border-gray-600 rounded-sm shadow-md overflow-hidden hover:rounded-xl hover:scale-105 transition-all duration-200 ">
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                          FlowBG
                        </h1>
                        <button className="text-gray-600 dark:text-gray-400 text-sm">
                          Critical
                        </button>
                      </div>
                      <div className="flex flex-row w-full justify-between items-center">
                        <p className="text-sm font-light text-white">
                          worked on the ML model and integration
                        </p>
                        <button className="bg-green-700 py-2.5 px-5 text-sm font-semibold">
                          Approved
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col bg-black border border-gray-600 rounded-sm shadow-md overflow-hidden hover:rounded-xl hover:scale-105 transition-all duration-200 ">
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                          Ghayal
                        </h1>
                        <button className="text-gray-600 dark:text-gray-400 text-sm">
                          Critical
                        </button>
                      </div>
                      <div className="flex flex-row w-full justify-between items-center">
                        <p className="text-sm font-light text-white">
                          Integrated blokchain
                        </p>
                        <button className="bg-gray-800 py-2.5 px-5 text-sm font-semibold">
                          Pending
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full h-full">
            <ProfileLinearChart />
          </div>
          <div className="w-full h-full">
            <ProfilePieChart />
          </div>
          <div className="w-full h-full">
            {/* <ProfilePieChart /> */}
            <PersonalizedRecommendation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
