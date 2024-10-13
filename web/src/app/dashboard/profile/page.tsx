"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileLinearChart from "@/components/ui/ProfileLinearChart";
import profilePic from "../../../public/avatar.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfilePieChart from "@/components/ui/ProfilePieChart";

const page = () => {
  const [name, setName] = useState("Ashwin Singh");
  const [contributionCount, setContributionCount] = useState("34");
  const [projectCount, setProjectsCount] = useState("3");
  const [revenue, setRevenue] = useState("58000");
  return (
    <div className="bg-black flex flex-col justify-center items-center">
      <div className="w-full min-h-screen p-6">
        <div className="grid grid-cols-2 gap-10 justify-between">
          <div className="col-span-1 row-span-2">
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
                    {name}
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
              </div>
            </Card>
          </div>
          <div className="w-full h-full">
            <ProfileLinearChart />
          </div>
          <div className="w-full h-full">
            <ProfilePieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
