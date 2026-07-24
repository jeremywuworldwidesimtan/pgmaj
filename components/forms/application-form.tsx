"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import InputField from "../fields/input-field";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import SelectField from "../fields/select-field";
import DateField from "../fields/date-field";
import TextareaField from "../fields/textarea-field";

export default function ApplicationForm() {
  //   const [state, formAction, pending] = useActionState(
  //     submitApplicationForm,
  //     initialState,
  //   );

  return (
    <>
      {/* <form action={formAction} className="mt-4 flex flex-col gap-4"> */}
      <form className="mt-4 flex flex-col gap-4">
        <FieldSet>
          <FieldLegend>Job Information</FieldLegend>
          <FieldDescription>
            Information about the company, location and position of the job
            application.
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              id="company"
              name="company"
              label="Company"
              placeholder="Enter the company name"
              required
            />
            <InputField
              id="position"
              name="position"
              label="Position"
              placeholder="Enter the position"
              required
            />
            <InputField
              id="location"
              name="location"
              label="Location"
              placeholder="Enter the location"
              required
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Job Types & Status</FieldLegend>
          <FieldDescription>
            Information about the job types and status for the application.
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              id="jobType"
              name="jobType"
              label="Job Type"
              value={""}
              placeholder="Select the job type"
              required
              selectItems={[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Freelance",
              ].map((jobType) => ({ label: jobType, value: jobType }))}
            />
            <SelectField
              id="jobMode"
              name="jobMode"
              label="Job Mode"
              value={""}
              placeholder="Select the job mode"
              required
              selectItems={["Remote", "On-site", "Hybrid"].map((jobMode) => ({
                label: jobMode,
                value: jobMode,
              }))}
            />
            <SelectField
              id="status"
              name="status"
              label="Application Status"
              value={""}
              placeholder="Select the application status"
              required
              selectItems={[
                "Applied",
                "Shortlisted",
                "Interviewed",
                "Offered",
                "Rejected",
              ].map((status) => ({
                label: status,
                value: status,
              }))}
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Job Dates</FieldLegend>
          <FieldDescription>
            Information about the important dates for the job application.
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DateField
              id="appliedDate"
              name="appliedDate"
              label="Applied Date"
              placeholder="Select the applied date"
            />
            <DateField
              id="latestUpdate"
              name="latestUpdate"
              label="Latest Update"
              placeholder="Select the latest updated date"
            />
            <DateField
              id="latestInterviewScheduledDate"
              name="latestInterviewScheduledDate"
              label="Interview Date"
              placeholder="Select the interview date"
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Description & Reference</FieldLegend>
          <FieldDescription>
            Information about the job description and reference link for the
            application.
          </FieldDescription>
          <FieldGroup>
            <TextareaField
              id="jobDescription"
              name="jobDescription"
              label="Job Description"
              placeholder="Enter the job description"
            />
            <InputField
              id="referenceLink"
              name="referenceLink"
              label="Reference Link"
              placeholder="Enter the reference link"
              required
            />
            <TextareaField
              id="notes"
              name="notes"
              label="Notes"
              placeholder="Enter any additional notes"
            />
          </FieldGroup>
        </FieldSet>
        <Button
          type="submit"
          //   disabled={pending}
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Save
        </Button>
      </form>
    </>
  );
}
