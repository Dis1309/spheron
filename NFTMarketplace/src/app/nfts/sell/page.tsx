"use client"; // This component uses client-side features

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";


const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);
export default function SellNFTForm() {

  // State to manage form input
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    projectUrl: "",
    price: "",
    royalties: "",
    category: "",
    techStack: "",
    completionDate: "",
    projectRepo: "",
    additionalInfo: "",
  });
  const {account,signAndSubmitTransaction} = useWallet();
  // State to manage success message
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Create a router instance for redirection
  const router = useRouter();
  const mint_nft = async () => {
    console.log(account?.address)
      if (!account) return [];
      console.log(account);
      // change this to be your module account address
      const moduleAddress = "0xed904d3cb8e239b0184a1081a4dfbff8c11dba3802b84e7c38c419a2c217036c";
      console.log("hey")
      try{
      const transaction:InputTransactionData = {
        data: {
          function:`${moduleAddress}::Project::mint_nft`,
          functionArguments:[[1],[1],[1],1]
        }
      }
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({transactionHash:response.hash});
      console.log(response);
    }catch(e) {
        console.log(e);
    }
    };

  // Handle input change
  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e : any) => {
    e.preventDefault();
    
  
    await mint_nft();
    // Set submitted state to true
    setIsSubmitted(true);

    // Redirect after a delay to show the success message
    setTimeout(() => {
      // Redirect to the landing page (e.g., "/")
      router.push("/");
    }, 2000); // Redirect after 2 seconds

  };
  
  return (
    <section className="flex justify-center items-center p-10 min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {isSubmitted ? (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-black text-center">
          <h2 className="text-3xl font-semibold mb-4">Project Submitted Successfully!</h2>
          <p className="mb-4">Thank you for submitting your project details.</p>
          <p className="text-gray-600">Redirecting to the landing page...</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full text-white"
        >
          <h2 className="text-3xl font-semibold mb-6 text-white text-center">Sell Your Project as an NFT</h2>

          {/* Title */}
          <label className="block mb-2 text-white" htmlFor="title">Project Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={projectData.title} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400"
            placeholder="Enter the title of your project"
          />

          {/* Description */}
          <label className="block mb-2 text-white" htmlFor="description">Project Description</label>
          <textarea 
            name="description" 
            id="description" 
            value={projectData.description} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400" 
            rows="4"
            placeholder="Provide a brief description of your project"
          />

          {/* Project URL */}
          <label className="block mb-2 text-white" htmlFor="projectUrl">Live Project URL</label>
          <input 
            type="url" 
            name="projectUrl" 
            id="projectUrl" 
            value={projectData.projectUrl} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400"
            placeholder="https://example.com"
          />

          {/* Project Repository */}
          <label className="block mb-2 text-white" htmlFor="projectRepo">Project Repository (GitHub/Bitbucket)</label>
          <input 
            type="url" 
            name="projectRepo" 
            id="projectRepo" 
            value={projectData.projectRepo} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400"
            placeholder="https://github.com/username/repo"
          />

          {/* Price */}
          <label className="block mb-2 text-white" htmlFor="price">Price (in ETH)</label>
          <input 
            type="number" 
            name="price" 
            id="price" 
            value={projectData.price} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400"
            placeholder="Enter the price in ETH"
          />

          {/* Royalties */}
          <label className="block mb-2 text-white" htmlFor="royalties">Royalties (%)</label>
          <input 
            type="number" 
            name="royalties" 
            id="royalties" 
            value={projectData.royalties} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400"
            placeholder="Percentage of royalties"
          />

          {/* Tech Stack */}
          <label className="block mb-2 text-white" htmlFor="techStack">Tech Stack</label>
          <input 
            type="text" 
            name="techStack" 
            id="techStack" 
            value={projectData.techStack} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400"
            placeholder="React, Node.js, Solidity, etc."
          />

          {/* Completion Date */}
          <label className="block mb-2 text-white" htmlFor="completionDate">Completion Date</label>
          <input 
            type="date" 
            name="completionDate" 
            id="completionDate" 
            value={projectData.completionDate} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800"
          />

          {/* Category */}
          <label className="block mb-2 text-white" htmlFor="category">Category</label>
          <select 
            name="category" 
            id="category" 
            value={projectData.category} 
            onChange={handleChange} 
            required 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800"
          >
            <option value="" className="bg-gray-800 text-white">Select a category</option>
            <option value="web" className="bg-gray-800 text-white">Web Development</option>
            <option value="mobile" className="bg-gray-800 text-white">Mobile Development</option>
            <option value="blockchain" className="bg-gray-800 text-white">Blockchain</option>
            <option value="ai" className="bg-gray-800 text-white">Artificial Intelligence</option>
            <option value="others" className="bg-gray-800 text-white">Others</option>
          </select>

          {/* Additional Info */}
          <label className="block mb-2 text-white" htmlFor="additionalInfo">Additional Info</label>
          <textarea 
            name="additionalInfo" 
            id="additionalInfo" 
            value={projectData.additionalInfo} 
            onChange={handleChange} 
            className="border border-gray-700 rounded p-3 mb-4 w-full text-white bg-gradient-to-r from-gray-700 to-gray-800 placeholder-gray-400" 
            rows="4"
            placeholder="Add any additional information about the project"
          />

          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out"
          >
            Submit Project
          </button>
        </form>
      )}
    </section>
  );
}
