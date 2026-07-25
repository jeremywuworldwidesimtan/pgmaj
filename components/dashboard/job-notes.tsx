"use client";

import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import TextareaField from "../fields/textarea-field";
import { updateJobNotes } from "@/app/actions/application";
import { JobNotesComponentState } from "@/app/lib/definitions";

export type JobNotesComponentProps = {
  notes: string | null;
  jobId: string;
};

const initialState: JobNotesComponentState | undefined = undefined;

export default function JobNotesComponent({
  notes,
  jobId,
}: JobNotesComponentProps) {
  const [editMode, setEditMode] = useState(false);
  const [state, action, pending] = useActionState(
    updateJobNotes,
    initialState,
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold">Job Notes</h2>
        {!editMode && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            Edit Job Notes
          </Button>
        )}
      </div>
      {editMode ? (
        <form action={action}>
          <input type="hidden" name="jobId" value={jobId} />
          <TextareaField
            id="notes"
            name="notes"
            label=""
            value={notes || ""}
            placeholder="Enter your notes here"
            error={
              state?.errors?.notes
                ? state.errors.notes.join(", ")
                : ""
            }
          />
          <Button variant="secondary" type="submit" disabled={pending} className="mt-2">
            {pending ? "Saving..." : "Save Job Notes"}
          </Button>
        </form>
      ) : (
        <div>
          <p>{notes || "No job notes available."}</p>
        </div>
      )}
    </div>
  );
}
