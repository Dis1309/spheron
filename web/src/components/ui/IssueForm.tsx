"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useState } from "react";

// Zod schema with validation
const formSchema = z.object({
  issueId: z
    .number()
    .min(1, { message: "Issue ID must be a positive number." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "GitHub Username must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  priority: z.string(), // Changed to string since we will set it dynamically
});

export default function IssueForm() {
  const [isLoading, setIsLoading] = useState(false); // Loading state for AI call
  const [aiError, setAiError] = useState<string | null>(null);
  const [calculatedPriority, setCalculatedPriority] = useState<string | null>(
    null
  ); // State for calculated priority
  const [isPriorityCalculated, setIsPriorityCalculated] = useState(false); // State to control button disable
  const [isFormBlurred, setIsFormBlurred] = useState(false); // State to blur the form

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueId: 0,
      title: "",
      username: "",
      description: "",
      priority: "", // Default to empty since it will be set after calculation
    },
  });

  // Function to classify the priority based on description
  async function classifyPriority(description: string) {
    setIsLoading(true); // Set loading state
    setIsFormBlurred(true); // Blur the form

    try {
      const response = await fetch("/api/classify-priority", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const data = await response.json();
        setCalculatedPriority(data.priority); // Set calculated priority
        setIsPriorityCalculated(true); // Mark priority as calculated
      } else {
        throw new Error("Failed to classify priority");
      }
    } catch (error) {
      console.error("Error classifying priority:", error);
      setAiError("Error classifying priority. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
      setIsFormBlurred(false); // Remove blur from form
    }
  }

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = {
      ...values,
      issueId: 123, // static issueId
      projectId: 4, // static projectId
      isApproved: false, // static isApproved (default: false)
      contributerId: sessionStorage.getItem("accountAddress"),
      ownerId:
        "0x30c99cc17174dbf24efeb6775cf97b75641c9a9b1f8c48244a841f7752d96f73",
      priority: calculatedPriority, // Include the classified priority
    };

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Issue created successfully!");
        console.log("Issue created:", data);
        // Add any success handling here (e.g., reset form, show success message)
      } else {
        toast.error("Failed to create issue." + response.statusText);
        console.error("Failed to create issue:", response.statusText);
        // Add error handling here
      }
    } catch (error) {
      toast.error("Error submitting form.");
      console.error("Error submitting form:", error);
      // Handle any network or other errors
    }
  }

  return (
    <div className="relative">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin border-blue-600" />
            <span className="mt-2 text-white">AI Model is running...</span>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`space-y-8 text-white ${isFormBlurred ? "blur-sm" : ""}`} // Apply blur when needed
        >
          {/* Issue ID Field */}
          <FormField
            control={form.control}
            name="issueId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Issue ID"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* GitHub Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter GitHub username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter issue description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Calculate Priority Button */}
          <div className="flex items-center">
            <Button
              type="button"
              onClick={() => classifyPriority(form.getValues().description)}
              disabled={isPriorityCalculated || isLoading} // Disable if already calculated or loading
            >
              Calculate Priority
            </Button>
            {calculatedPriority && (
              <div className="ml-4 text-green-500">
                Calculated Priority: {calculatedPriority}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isPriorityCalculated} // Disable until priority is calculated
          >
            Submit
            {isLoading && (
              <div className="ml-2 w-3 h-3 border-2 border-t-transparent rounded-full animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
