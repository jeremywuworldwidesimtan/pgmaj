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
import { ResumeProjectState } from "@/app/lib/resume-definitions";
import { submitResumeProject } from "@/app/actions/resume";
import ResumeProjectForm from "../forms/resume-project-form";

export type ResumeProjectButtonProps = {
  mode?: "add" | "edit";
  formData?: {
    id: string;
    name: string;
    link?: string | null;
    startDate: Date;
    endDate?: Date | null;
    description?: string | null;
  };
};

const initialState: ResumeProjectState = undefined;

export default function ResumeProjectButton({
  mode = "add",
  formData,
}: ResumeProjectButtonProps) {
  const [state, action, pending] = useActionState(
    submitResumeProject,
    initialState,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{mode === "add" ? "Add" : "Edit"} Project</Button>
      </DialogTrigger>
      <DialogContent className="top-0 translate-y-0 sm:top-[50%] sm:translate-y-[-50%] max-h-screen sm:max-h-[85vh] overflow-y-auto w-full sm:max-w-lg lg:min-w-3xl">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add" : "Edit"} Project
            </DialogTitle>
          </DialogHeader>
          <ResumeProjectForm
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
                  ? "Add Resume Project"
                  : "Edit Resume Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
