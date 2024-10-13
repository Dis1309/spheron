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
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProjectForm from "./ProjectForm";

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> New Project
        </Button>
      </DialogTrigger>{" "}
      <DialogContent className="bg-black !w-[1000px] max-w-none overflow-y-auto m-6 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white font-bold text-[3rem]">
            New Project
          </DialogTitle>
        </DialogHeader>
        <ProjectForm />
      </DialogContent>
    </Dialog>
  );
}
export default DialogDemo;
