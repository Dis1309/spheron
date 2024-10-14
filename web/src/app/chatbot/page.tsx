import { Chatbot } from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-gray-700 to-gray-900 relative">
      <h1 className="text-4xl font-bold text-white mb-2">Chatbot</h1>
      <p className="text-lg text-gray-300 mb-8">Find the perfect project to work on!</p>
      <Chatbot />
      <Link href="/dashboard">
        <Button className="absolute right-4 bottom-4">Back to Dashboard</Button>
      </Link>
    </main>
  );
}
