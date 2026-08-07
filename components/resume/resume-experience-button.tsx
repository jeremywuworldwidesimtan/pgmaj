"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Dialog,
} from "../ui/dialog";
import { ResumeExperienceState } from "@/app/lib/resume-definitions";
import { submitResumeExperience } from "@/app/actions/resume";
import { JobTypePrisma, JobModePrisma } from "@/app/types";
import ResumeExperienceForm from "../forms/resume-experience-form";

export type ResumeExperienceButtonProps = {
  mode?: "add" | "edit";
  formData?: {
    id: string;
    company: string;
    position: string;
    location: string;
    jobType: JobTypePrisma;
    jobMode: JobModePrisma;
    lastSalary?: number | null;
    startDate: Date;
    endDate?: Date | null;
    description?: string | null;
  };
};

const initialState: ResumeExperienceState = undefined;

export default function ResumeExperienceButton({
  mode = "add",
  formData,
}: ResumeExperienceButtonProps) {
  const [state, action, pending] = useActionState(
    submitResumeExperience,
    initialState,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{mode === "add" ? "Add" : "Edit"} Experience</Button>
      </DialogTrigger>
      {/* Make the dialog start at the top and scrollable on mobile */}
      <DialogContent className="top-0 translate-y-0 sm:top-[50%] sm:translate-y-[-50%] max-h-screen sm:max-h-[85vh] overflow-y-auto w-full sm:max-w-lg lg:min-w-3xl"> 
        <form action={action}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add" : "Edit"} Experience
            </DialogTitle>
          </DialogHeader>
          <ResumeExperienceForm
            state={state}
            data={mode === "edit" ? formData || state?.values : undefined}
          />
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : mode === "add"
                  ? "Add Resume Experience"
                  : "Edit Resume Experience"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
