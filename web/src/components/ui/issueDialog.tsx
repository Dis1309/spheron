"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IssueForm from "./IssueForm";

function IssueDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Contribute
        </button>
      </DialogTrigger>
      <DialogContent
        className="px-12 py-6 max-h-[90vh] w-full overflow-y-auto" // <-- Adjust height and make it scrollable
      >
        <DialogHeader>
          <DialogTitle className="text-white font-bold text-[3rem]">
            Mark your Contribution
          </DialogTitle>
        </DialogHeader>
        <IssueForm />
      </DialogContent>
    </Dialog>
  );
}

export default IssueDialog;
