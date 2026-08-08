"use client";
import { updateJobStatus } from "@/app/actions/application";
import { useState } from "react";
import { useActionState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { StatusPrisma } from "@/app/types";
import SelectField from "../fields/select-field";
import { Checkbox } from "../ui/checkbox";
import DateField from "../fields/date-field";
import { JobStatusUpdateState } from "@/app/lib/definitions";
import InputField from "../fields/input-field";

export type UpdateStatusButtonProps = {
  jobId: string;
  status: StatusPrisma | null;
};

const initialState: JobStatusUpdateState | undefined = undefined;

export default function UpdateStatusButton({
  jobId,
  status,
}: UpdateStatusButtonProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusPrisma | null>(
    status || null,
  );
  const [updateDates, setUpdateDates] = useState(false);
  const [updatedDate, setUpdatedDate] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState<string | null>(null);

  const [state, action, pending] = useActionState(
    updateJobStatus,
    initialState,
  );

  const onChangeStatus = (value: string) => {
    setSelectedStatus(value as StatusPrisma);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Update Status</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={action}>
          <input type="hidden" name="jobId" value={jobId} />
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          <div>
            <p>Select the new status for this job application.</p>
            <SelectField
              id="status"
              name="status"
              label=""
              value={selectedStatus || ""}
              onChange={onChangeStatus}
              enableDefaultOption={false}
              required
              error={
                state?.errors?.status ? state.errors.status.join(", ") : ""
              }
              selectItems={[
                { label: "Applied", value: "Applied" },
                { label: "Shortlisted", value: "Shortlisted" },
                { label: "Interviewed", value: "Interviewed" },
                { label: "Offered", value: "Offered" },
                { label: "Rejected", value: "Rejected" },
              ]}
            />
            {selectedStatus !== "Applied" && (
              <div className="mt-2">
                <div className="flex gap-2">
                  <p>Do you wish to update the dates?</p>
                  <Checkbox
                    id="updateDates"
                    name="updateDates"
                    checked={updateDates}
                    onCheckedChange={(checked) =>
                      setUpdateDates(checked === true)
                    }
                  />
                </div>
                {updateDates && (
                  <div className="flex flex-col gap-2 mt-2">
                    <DateField
                      id="latestUpdate"
                      name="latestUpdate"
                      label="Latest Update"
                      value={updatedDate || ""}
                      error={
                        state?.errors?.latestUpdate
                          ? state.errors.latestUpdate.join(", ")
                          : ""
                      }
                      placeholder="Select the latest updated date"
                    />
                    {/* <Button variant="outline" size="sm" onClick={() => {
                    setUpdatedDate(new Date().toISOString().split("T")[0]);
                  }}>
                    Use today&apos;s date
                  </Button> */}
                    <div className="grid grid-cols-1 gap-4 mt-2">
                      <input type="hidden" name={`interviewIdx`} value={""} />
                      <DateField
                        id={`interviewDate`}
                        name={`interviewDate`}
                        label="Interview Date"
                        value={""}
                        error={""}
                        placeholder="Select the interview date"
                        timeField={true}
                      />
                      <InputField
                        id={`interviewLocation`}
                        name={`interviewLocation`}
                        label="Interview Location"
                        value={""}
                        error={""}
                        placeholder="Enter the interview location"
                      />
                      <InputField
                        id={`interviewerName`}
                        name={`interviewerName`}
                        label="Interviewer Name"
                        value={""}
                        error={""}
                        placeholder="Enter the interviewer name"
                      />
                      <InputField
                        id={`interviewerContact`}
                        name={`interviewerContact`}
                        label="Interviewer Contact"
                        value={""}
                        error={""}
                        placeholder="Enter the interviewer contact"
                      />
                    </div>
                    {/* <Button variant="outline" size="sm" onClick={() => {
                    setInterviewDate(new Date().toISOString().split("T")[0]);
                  }}>
                    Use today&apos;s date
                  </Button> */}
                    <p>
                      Please note that updating the dates will overwrite any
                      existing dates associated with this application.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending} onClick={() => {}}>
              {pending ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
