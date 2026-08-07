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
import { ResumeEducationState } from "@/app/lib/resume-definitions";
import { submitResumeEducation } from "@/app/actions/resume";
import { DegreeType } from "@/app/types";
import ResumeEducationForm from "../forms/resume-education-form";

export type ResumeEducationButtonProps = {
  mode?: "add" | "edit";
  formData?: {
    id: string;
    institution: string;
    degree: DegreeType;
    fieldOfStudy: string;
    gpa?: number | null;
    startDate: Date;
    endDate?: Date | null;
    description?: string | null;
  };
};

const initialState: ResumeEducationState = undefined;

export default function ResumeEducationButton({
  mode = "add",
  formData,
}: ResumeEducationButtonProps) {
  const [state, action, pending] = useActionState(
    submitResumeEducation,
    initialState,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{mode === "add" ? "Add" : "Edit"} Education</Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-3xl">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add" : "Edit"} Education
            </DialogTitle>
          </DialogHeader>
          <ResumeEducationForm
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
                  ? "Add Resume Education"
                  : "Edit Resume Education"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
