"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Settings,
  ArrowLeft,
  Briefcase,
  LogOut,
} from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "#",
    icon: Settings,
  },
];

const eraseSession = () => {
  // Replace 'yourKey' with the key of the item you want to remove
  sessionStorage.removeItem("accountAddress");
};
const DashboardSidebar = ({}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed h-full border-r border-grey-600 flex flex-col z-10 bg-opacity-50 backdrop-blur-2xl">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between p-0">
          <div className="w-full h-[73px] border-b flex items-center gap-x-2 justify-center">
            <Image src={Logo} alt="Logo" width={30} height={30} />
            {open && (
              <span className="text-white text-xl font-secondary">App</span>
            )}
          </div>
          <div className="flex mt-4 flex-col flex-1 overflow-y-auto overflow-x-hidden p-4">
            <div
              className={cn("flex flex-col gap-2 items-center", {
                "items-start": open,
              })}
            >
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center px-4 mb-4">
            {open ? (
              <Link href="/">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => eraseSession()}
                >
                  Logout <LogOut className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => eraseSession()}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;
