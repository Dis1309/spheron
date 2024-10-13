import Image from "next/image";
import ClientButton from "./components/provider";

export default function Home() {
  return (<div>
      <h1>Server-Side Content</h1>
      {/* Use Client Component for interactivity */}
      <ClientButton />
    </div>
  )
}
