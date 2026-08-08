"use client";

import { useActionState } from "react";
import InputField from "../fields/input-field";
import TextareaField from "../fields/textarea-field";
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
import { FieldGroup } from "../ui/field";
import { ResumeDetailsState } from "@/app/lib/resume-definitions";
import { updateResumeDetails } from "@/app/actions/resume";

export type EditResumeDetailsButtonProps = {
  id?: string | null | undefined;
  role?: string | null | undefined;
  bio?: string | null | undefined;
};

const initialState: ResumeDetailsState = undefined;

export default function EditResumeDetailsButton({
  id,
  role,
  bio,
}: EditResumeDetailsButtonProps) {
  const [state, action, pending] = useActionState(
    updateResumeDetails,
    initialState,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit Resume Details</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Edit Resume Details</DialogTitle>
          </DialogHeader>
          <FieldGroup className="flex flex-col gap-4 mt-2">
            <input type="hidden" name="id" value={state?.values?.id || id || ""} />
            <InputField
              id="role"
              name="role"
              label="Role"
              placeholder="Enter your role"
              value={state?.values?.role || role || ""}
              error={state?.errors?.role}
            />
            <TextareaField
              id="bio"
              name="bio"
              label="Bio"
              placeholder="Enter your bio"
              value={state?.values?.bio || bio || ""}
              error={state?.errors?.bio}
            />
          </FieldGroup>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Edit Resume Details"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
