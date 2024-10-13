"use client";
import DashboardSidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DialogDemo from "@/components/ui/ProjectDialog";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden items-start justify-start">
      <div className="w-20 z-50">
        <DashboardSidebar />
      </div>
      <div className="flex-1">
        <nav className="flex justify-end z-40 border-b p-4 backdrop-blur-md fixed top-0 left-20 right-0">
          <DialogDemo />
        </nav>
        <div className="pt-20">{children}</div>
      </div>
    </div>
  );
}
