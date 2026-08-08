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
import { ResumeSkillState } from "@/app/lib/resume-definitions";
import { submitResumeSkill } from "@/app/actions/resume";
import { ProficiencyLevel } from "@/app/types";
import ResumeSkillForm from "../forms/resume-skill-form";

export type ResumeSkillButtonProps = {
  mode?: "add" | "edit";
  formData?: {
    id: string;
    skill: string;
    proficiency: ProficiencyLevel;
    yearsOfExperience: number;
  };
};

const initialState: ResumeSkillState = undefined;

export default function ResumeSkillButton({
  mode = "add",
  formData,
}: ResumeSkillButtonProps) {
  const [state, action, pending] = useActionState(
    submitResumeSkill,
    initialState,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{mode === "add" ? "Add" : "Edit"} Skill</Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-3xl">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add" : "Edit"} Skill
            </DialogTitle>
          </DialogHeader>
          <ResumeSkillForm
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
                  ? "Add Resume Skill"
                  : "Edit Resume Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
