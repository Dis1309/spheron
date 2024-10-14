import Link from "next/link";
import Image from "next/image";

import Projecturl1 from "../../public/Project1.png";
import Projecturl2 from "../../public/Project2.jpg";
import Projecturl3 from "../../public/Project3.png";
import Projecturl4 from "../../public/Project4.jpg";
import Projecturl5 from "../../public/Project4.jpg";
import Card from "../card";

const projects = [
  {
    projectId: 1,
    imageurl: Projecturl1,
    Title: "InvigoPulse",
    description: "InvigoPulse",
    tags: ["ml", "blockchain", "web"],
    startDate: "2024-10-15",
    endDate: "2024-10-25",
    MaxBountyAmount: 1000,
    githubLink: "https://github.com/user/project_1",
    levels: {
      Critical: 500,
      High: 300,
      Low: 200,
    },
  },

  {
    projectId: 5,
    imageurl: Projecturl3,
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
  },
  {
    projectId: 6,
    imageurl: Projecturl2,
    Title: "Card smx",
    description: "This is a description for project 6.",
    tags: ["security", "data", "ml"],
    startDate: "2024-11-08",
    endDate: "2024-06-18",
    MaxBountyAmount: 12624,
    githubLink: "https://github.com/user/project_6",
    levels: {
      Critical: 5218,
      High: 2495,
      Low: 1927,
    },
  },
  {
    projectId: 4,
    imageurl: Projecturl4,
    Title: "Card smx",
    description: "This is a description for project 10.",
    tags: ["ui/ux", "security", "web"],
    startDate: "2024-09-18",
    endDate: "2024-01-28",
    MaxBountyAmount: 8580,
    githubLink: "https://github.com/user/project_10",
    levels: {
      Critical: 5400,
      High: 2845,
      Low: 615,
    },
  },
];

const ProjectList = () => {
  return (
    <div className="relative p-10 flex flex-col gap-10">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300 text-center text-[5.2rem] tracking-tight font-bold max-w-screen-lg leading-[1.1] font-secondary">
        Your Projects
      </h1>

      <div className="bg-black w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {projects.map((project) => (
          <Link href={`/dashboard/projects/${project.projectId}`}>
            {" "}
            <Card key={project.projectId} project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
