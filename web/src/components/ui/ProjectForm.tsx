"use client";
import { toast } from "react-hot-toast";
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
import { useState } from "react";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const aptos = new Aptos(aptosConfig);
import { projectData } from "@/app/api/chatbot/data";

// Zod schema with validation
const formSchema = z.object({
  projectname: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  startdate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "Start date cannot be in the past.",
  }),
  enddate: z.string().refine((date) => new Date(date) >= new Date(), {
    message: "End date cannot be in the past.",
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
  projecturl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  imageurl: z.string().url({
    message: "Please enter a valid image URL.",
  }),
});
// .refine((data) => data.critical + data.high + data.low === data.maxbounty, {
//   message: "Sum of Critical, High, and Low must equal Max Bounty.",
// });

function ProjectForm() {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const moduleAddress =
    "0x5e342fa3a46a5524aebc468ad98bb4aa756d53a3bdd3662e3c131aee2b6b43bf";
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
      projecturl: "",
      imageurl: "",
    },
  });

  interface TagOption {
    tag: string;
    id: number;
    isChoosen: boolean;
  }

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
  const [customTag, setCustomTag] = useState("");

  const tagToggle = (id: number) => {
    setTagOptions((prevTagOptions) =>
      prevTagOptions.map((option) =>
        option.id === id ? { ...option, isChoosen: !option.isChoosen } : option
      )
    );
  };

  const addCustomTag = () => {
    if (customTag) {
      setTagOptions((prev) => [
        ...prev,
        { tag: customTag, id: prev.length + 1, isChoosen: true },
      ]);
      setCustomTag("");
    }
  };
  // CREATE PROJECT
  async function createProject(extractedValues: any) {
    console.log("inside");
    console.log(account?.address);
    console.log(connected);
    if (!account) return [];
    try {
      const transaction: InputTransactionData = {
        data: {
          function: `${moduleAddress}::ProjectModule::create_project`,
          functionArguments: [
            extractedValues.projectid,
            extractedValues.description,
            1,
            extractedValues.start_date,
            extractedValues.end_date,
            1,
            1,
            1,
          ],
        },
      };
      console.log("adding new project...");
      console.log(transaction);
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      toast.success("added new project");
      console.log("added new project");
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedTags = tagOptions
      .filter((option) => option.isChoosen)
      .map((option) => option.tag);

    // Add the selected tags array to the values object
    const finalValues = { ...values, tags: selectedTags };

    // generating projectid
    let max = 1000000;
    let min = 1;
    const projectid = Math.floor(Math.random() * (max - min + 1)) + min;
    // Extract only the required fields and include an ID
    const { description, maxbounty, startdate, enddate, critical, high, low } =
      finalValues;

    // Convert dates to BigInt in milliseconds
    const start_date = BigInt(new Date(startdate).getTime());
    const end_date = BigInt(new Date(enddate).getTime());

    // Convert BigInt to string for sending
    const start_date_str = start_date.toString();
    const end_date_str = end_date.toString();
    // Create a new object with the desired structure including the ID
    const extractedValues = {
      projectid,
      description,
      max_bounty: maxbounty,
      start_date: start_date_str,
      end_date: end_date_str,
      critical_bounty: critical,
      high_bounty: high,
      low_bounty: low,
    };

    // Log the final values with selected tags
    console.log(finalValues);
    toast.success("Form submitted successfully!");

    console.log("Hello");
    await createProject(extractedValues);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          event.preventDefault(); // Prevent default behavior
          form.handleSubmit((values) => onSubmit(values))(event); // Call your submit function with values
        }}
        className="space-y-8 text-white flex flex-row justify-center items-center gap-6 w-full"
      >
        <div className="flex flex-col gap-3 w-full">
          {/* Project Name */}
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

          {/* Start Date */}
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

          {/* End Date */}
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

          {/* Description */}
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

          {/* Project URL */}
          <FormField
            control={form.control}
            name="projecturl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Project URL
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter project URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image URL */}
          <FormField
            control={form.control}
            name="imageurl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Image URL
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" w-full flex flex-col gap-3">
          {/* Max Bounty */}
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
          {/* Critical */}
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

          {/* High */}
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

          {/* Low */}
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

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((option) => (
              <button
                type="button"
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

          {/* Custom Tag Input */}
          <div className="flex gap-3">
            <Input
              value={customTag}
              placeholder="Add custom tag"
              onChange={(e) => setCustomTag(e.target.value)}
            />
            <Button type="button" onClick={addCustomTag}>
              Add Tag
            </Button>
          </div>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export default ProjectForm;
