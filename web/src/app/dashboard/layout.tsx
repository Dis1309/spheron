"use client";
import DashboardSidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DialogDemo from "@/components/ui/ProjectDialog";
import robot from "../../public/chat-bot-icon.gif";
import Image from "next/image";
import Link from "next/link";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden items-start justify-start relative">
      <div className="w-20 z-50">
        <DashboardSidebar />
      </div>
      <div className="flex-1">
        <nav className="flex justify-end z-40 border-b p-4 backdrop-blur-md fixed top-0 left-20 right-0">
          <DialogDemo />
        </nav>
        <div className="pt-20">{children}</div>
      </div>
      <Link href="/chatbot">
        <div className="fixed right-10 bottom-10 p-1 bg-white rounded-full hover:scale-125">
          <Image
            src={robot}
            alt="Profile Picture"
            width={55}
            height={55}
            className=" object-cover rounded-full"
          />
        </div>
      </Link>
    </div>
  );
}
