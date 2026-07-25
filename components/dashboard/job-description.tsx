"use client";

import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import TextareaField from "../fields/textarea-field";
import { updateJobDescription } from "@/app/actions/application";
import { JobDescriptionComponentState } from "@/app/lib/definitions";

export type JobDescriptionComponentProps = {
  jobDescription: string | null;
  jobId: string;
};

const initialState: JobDescriptionComponentState | undefined = undefined;

export default function JobDescriptionComponent({
  jobDescription,
  jobId,
}: JobDescriptionComponentProps) {
  const [editMode, setEditMode] = useState(false);
  const [state, action, pending] = useActionState(
    updateJobDescription,
    initialState,
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-bold">Job Description</h2>
        {!editMode && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            Edit Job Description
          </Button>
        )}
      </div>
      {editMode ? (
        <form action={action}>
          <input type="hidden" name="jobId" value={jobId} />
          <TextareaField
            id="jobDescription"
            name="jobDescription"
            label=""
            value={jobDescription || ""}
            placeholder="Enter the job description"
            error={
              state?.errors?.jobDescription
                ? state.errors.jobDescription.join(", ")
                : ""
            }
          />
          <Button variant="secondary" type="submit" disabled={pending} className="mt-2">
            {pending ? "Saving..." : "Save Job Description"}
          </Button>
        </form>
      ) : (
        <div className="mt-2 p-4 border rounded-md">
          <p>{jobDescription || "No job description available."}</p>
        </div>
      )}
    </div>
  );
}
