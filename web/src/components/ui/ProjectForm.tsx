"use client";
import { toast } from "react-hot-toast";
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
import { useState } from "react";

// Zod schema with validation
const formSchema = z
  .object({
    projectname: z.string().min(2, {
      message: "Project name must be at least 2 characters.",
    }),
    startdate: z.string().refine((date) => new Date(date) >= new Date(), {
      message: "Start date cannot be in the past.",
    }),
    enddate: z.string().refine((date) => new Date(date) >= new Date(), {
      message: "Start date cannot be in the past.",
    }),
    description: z.string().max(400, {
      message: "Description cannot exceed 400 characters.",
    }),
    maxbounty: z
      .number()
      .positive()
      .min(1, { message: "Max bounty must be at least 1 USD." }),
    critical: z.number().min(0, { message: "Amount must be positive." }),
    high: z.number().min(0, { message: "Amount must be positive." }),
    low: z.number().min(0, { message: "Amount must be positive." }),
  })
  .refine((data) => data.critical + data.high + data.low === data.maxbounty, {
    message: "Sum of Critical, High, and Low must equal Max Bounty.",
  });

function ProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectname: "",
      startdate: "",
      enddate: "",
      description: "",
      maxbounty: 0,
      critical: 0,
      high: 0,
      low: 0,
    },
  });
  // Define the type for each tag option
  interface TagOption {
    tag: string;
    id: number;
    isChoosen: boolean;
  }

  // Initial tag options
  const initialTagOptions: TagOption[] = [
    { tag: "ai", id: 1, isChoosen: false },
    { tag: "security", id: 2, isChoosen: false },
    { tag: "blockchain", id: 3, isChoosen: false },
    { tag: "solidity", id: 4, isChoosen: false },
    { tag: "move", id: 5, isChoosen: false },
    { tag: "ml", id: 6, isChoosen: false },
    { tag: "ui/ux", id: 7, isChoosen: false },
    { tag: "nextjs", id: 8, isChoosen: false },
    { tag: "nodejs", id: 9, isChoosen: false },
    { tag: "backend", id: 10, isChoosen: false },
    { tag: "frontend", id: 11, isChoosen: false },
  ];

  const [tagOptions, setTagOptions] = useState<TagOption[]>(initialTagOptions);

  // Toggle function to update isChoosen state
  const tagToggle = (id: number) => {
    setTagOptions((prevTagOptions) =>
      prevTagOptions.map((option) =>
        option.id === id ? { ...option, isChoosen: !option.isChoosen } : option
      )
    );
    console.log(tagOptions);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedTags = tagOptions
      .filter((option) => option.isChoosen)
      .map((option) => option.tag);

    // Add the selected tags array to the values object
    const finalValues = { ...values, tags: selectedTags };

    // Log the final values with selected tags
    console.log(finalValues);
    toast.success("Form submitted successfully!");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-white flex flex-row justify-center items-center gap-6 w-full"
      >
        <div className="flex flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="projectname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Project Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Start Date
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enddate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  End Date
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Project description (max 400 words)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxbounty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Max Bounty (USD)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter max bounty in USD"
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
        </div>
        <div className=" w-full flex flex-col gap-3">
          <FormField
            control={form.control}
            name="critical"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Critical
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Critical payment"
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

          <FormField
            control={form.control}
            name="high"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">High</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="High payment"
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

          <FormField
            control={form.control}
            name="low"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Low</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Low payment"
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
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => tagToggle(option.id)}
                className={
                  option.isChoosen
                    ? "bg-white border text-sm py-2.5 px-5 rounded-xl font-bold text-black"
                    : "bg-transparent border font-light text-sm text-grey-200 py-2.5 px-5 rounded-2xl"
                }
              >
                {option.tag}
              </button>
            ))}
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export default ProjectForm;
