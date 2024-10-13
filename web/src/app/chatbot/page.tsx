import {Chatbot}  from "@/components/Chatbot";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-full bg-gray-50">
      <Chatbot />
      {/* Link to Add Project Page
      <Link href="/add-project">
        <div className="mt-4 text-blue-600 underline">Add a New Project</div>
      </Link> */}
    </main>
  );
}
