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
import { ResumeCertificationState } from "@/app/lib/resume-definitions";
import { submitResumeCertification } from "@/app/actions/resume";
import ResumeCertificationForm from "../forms/resume-certification-form";

export type ResumeCertificationButtonProps = {
  mode?: "add" | "edit";
  formData?: {
    id: string;
    name: string;
    issuingOrganization: string;
    issueDate: Date;
    expirationDate?: Date | null;
    credentialId?: string | null;
    credentialUrl?: string | null;
  };
};

const initialState: ResumeCertificationState = undefined;

export default function ResumeCertificationButton({
  mode = "add",
  formData,
}: ResumeCertificationButtonProps) {
  const [state, action, pending] = useActionState(
    submitResumeCertification,
    initialState,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{mode === "add" ? "Add" : "Edit"} Certification</Button>
      </DialogTrigger>
      <DialogContent className="top-0 translate-y-0 sm:top-[50%] sm:translate-y-[-50%] max-h-screen sm:max-h-[85vh] overflow-y-auto w-full sm:max-w-lg lg:min-w-3xl">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add" : "Edit"} Certification
            </DialogTitle>
          </DialogHeader>
          <ResumeCertificationForm
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
                  ? "Add Resume Certification"
                  : "Edit Resume Certification"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
