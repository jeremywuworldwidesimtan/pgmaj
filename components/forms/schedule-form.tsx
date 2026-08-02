"use client";
import { useActionState } from "react";
import DateField from "../fields/date-field";
import SelectField from "../fields/select-field";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScheduleInterviewFormState } from "@/app/lib/definitions";
import { scheduleInterview } from "@/app/actions/scheduler";

export type UnscheduledApplications = {
  id: string;
  position: string;
  company: string;
}[];

const initialState: ScheduleInterviewFormState = undefined;

export default function ScheduleForm({
  unscheduledApplications,
}: {
  unscheduledApplications: UnscheduledApplications;
}) {
  const unscheduledOptions = unscheduledApplications.map((app) => ({
    value: app.id,
    label: `${app.position} at ${app.company}`,
  }));

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
            id="unscheduledApplications"
            name="unscheduledApplications"
            label="Select Application"
            placeholder="Select an application"
            selectItems={unscheduledOptions}
            value={""}
            error={state?.errors?.jobId ? state.errors.jobId.join(", ") : ""}
            required
          />
          <DateField
            id="scheduleDate"
            name="scheduleDate"
            label="Select Date and Time"
            placeholder="Select a date"
            timeField={true}
            value={""}
            error={
              state?.errors?.latestInterviewScheduledDate
                ? state.errors.latestInterviewScheduledDate.join(", ")
                : ""
            }
            required
          />
          <Button type="submit" disabled={pending}>
            {pending ? "Scheduling..." : "Schedule"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
