"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  priority: z.enum(["critical", "high", "low"], {
    errorMap: () => ({ message: "You must select a priority level." }),
  }),
});

export default function IssueForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueId: 0,
      title: "",
      username: "",
      description: "",
      priority: "low", // default selection
    },
  });

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
        console.log("Issue created:", data);
        // Add any success handling here (e.g., reset form, show success message)
      } else {
        console.error("Failed to create issue:", response.statusText);
        // Add error handling here
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle any network or other errors
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-white"
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
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
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

        {/* Priority Dropdown */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
