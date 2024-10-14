import { Chatbot } from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen bg-black relative">
      <Chatbot />
      <Link href="/dashboard">
        <Button className="absolute right-4 bottom-4">Back to Dashboard</Button>
      </Link>
      {/* Link to Add Project Page
      <Link href="/add-project">
        <div className="mt-4 text-blue-600 underline">Add a New Project</div>
      </Link> */}
    </main>
  );
}
