"use client";
import { useActionState, useState } from "react";
import DateField from "../fields/date-field";
import SelectField from "../fields/select-field";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScheduleInterviewFormState } from "@/app/lib/definitions";
import { scheduleInterview } from "@/app/actions/scheduler";
import InputField from "../fields/input-field";
import { FieldGroup } from "../ui/field";

export type userApplicationProps = {
  id: string;
  position: string;
  company: string;
}[];

const initialState: ScheduleInterviewFormState = undefined;

export default function ScheduleForm({
  userApplications,
}: {
  userApplications: userApplicationProps;
}) {
  const unscheduledOptions = userApplications.map((app) => ({
    value: app.id,
    label: `${app.position} at ${app.company}`,
  }));

  const [selectedApplication, setSelectedApplication] = useState<string | null>(
    null,
  );

  const [state, action, pending] = useActionState(
    scheduleInterview,
    initialState,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Schedule Interview</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-bold">Schedule Interview</h2>
        <form action={action} className="flex flex-col gap-2">
          <SelectField
            id="jobId"
            name="jobId"
            label="Select Application"
            placeholder="Select an application"
            selectItems={unscheduledOptions}
            value={selectedApplication ?? ""}
            onChange={(value) => setSelectedApplication(value)}
            error={state?.errors?.jobId ? state.errors.jobId.join(", ") : ""}
            required
          />
          {selectedApplication && (
            <>
              <FieldGroup className="grid grid-cols-1 gap-4 mt-2">
                <input type="hidden" name={`interviewIdx`} value={""} />
                <DateField
                  id={`interviewDate`}
                  name={`interviewDate`}
                  label="Interview Date"
                  value={state?.values?.interviewDate || ""}
                  error={state?.errors?.interviewDate ? state.errors.interviewDate.join(", ") : ""}
                  placeholder="Select the interview date"
                  timeField={true}
                />
                <InputField
                  id={`interviewLocation`}
                  name={`interviewLocation`}
                  label="Interview Location"
                  value={state?.values?.interviewLocation || ""}
                  error={state?.errors?.interviewLocation ? state.errors.interviewLocation.join(", ") : ""}
                  placeholder="Enter the interview location"
                />
                <InputField
                  id={`interviewerName`}
                  name={`interviewerName`}
                  label="Interviewer Name"
                  value={state?.values?.interviewerName || ""}
                  error={state?.errors?.interviewerName ? state.errors.interviewerName.join(", ") : ""}
                  placeholder="Enter the interviewer name"
                />
                <InputField
                  id={`interviewerContact`}
                  name={`interviewerContact`}
                  label="Interviewer Contact"
                  value={state?.values?.interviewerContact || ""}
                  error={state?.errors?.interviewerContact ? state.errors.interviewerContact.join(", ") : ""}
                  placeholder="Enter the interviewer contact"
                />
              </FieldGroup>

              <Button type="submit" disabled={pending}>
                {pending ? "Scheduling..." : "Schedule"}
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
