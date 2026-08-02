"use client";

import { useActionState, useState } from "react";
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
import {
  JobTypePrisma,
  JobModePrisma,
  PayFrequencyPrisma,
  StatusPrisma,
} from "@/app/types";
import { submitApplicationForm } from "@/app/actions/application";
import { type ApplicationFormState } from "@/app/lib/definitions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export type ApplicationFormProps = {
  formData?: {
    id: string;
    company: string;
    position: string;
    location: string;
    jobType: JobTypePrisma;
    jobMode: JobModePrisma;
    minPay: number | null;
    maxPay: number | null;
    payFrequency: PayFrequencyPrisma | null;
    status: StatusPrisma;
    appliedDate: Date | null;
    latestUpdate: Date | null;
    latestInterviewScheduledDate: Date | null;
    referenceLink: string | null;
    notes: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    softDeleted: boolean;
    jobDescription?: string | null;
    interviewCount?: number;
    interviews?: {
      jobId: string;
      interviewIdx: number;
      interviewId: string | null;
      interviewDate: Date;
      interviewLocation: string;
      interviewerName: string | null;
      interviewerContact: string | null;
    }[];
  };
};

const initialState: ApplicationFormState = undefined;

export default function ApplicationForm({
  formData: data,
}: ApplicationFormProps) {
  const [interviewCount, setInterviewCount] = useState(data?.interviewCount || 0);
  const [state, formAction, pending] = useActionState(
    submitApplicationForm,
    initialState,
  );

  return (
    <>
      {/* <form action={formAction} className="mt-4 flex flex-col gap-4"> */}
      <form action={formAction} className="mt-4 flex flex-col gap-4">
        {data?.id ? <input type="hidden" name="jobId" value={data.id} /> : null}
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
              value={data?.company || state?.values?.company || ""}
              placeholder="Enter the company name"
              error={
                state?.errors?.company ? state.errors.company.join(", ") : ""
              }
              required
            />
            <InputField
              id="position"
              name="position"
              label="Position"
              value={data?.position || state?.values?.position || ""}
              placeholder="Enter the position"
              error={
                state?.errors?.position ? state.errors.position.join(", ") : ""
              }
              required
            />
            <InputField
              id="location"
              name="location"
              label="Location"
              value={data?.location || state?.values?.location || ""}
              placeholder="Enter the location"
              error={
                state?.errors?.location ? state.errors.location.join(", ") : ""
              }
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
              value={data?.jobType || state?.values?.jobType || ""}
              placeholder="Select the job type"
              error={
                state?.errors?.jobType ? state.errors.jobType.join(", ") : ""
              }
              required
              selectItems={[
                { label: "Full-time", value: "FullTime" },
                { label: "Part-time", value: "PartTime" },
                { label: "Contract", value: "Contract" },
                { label: "Internship", value: "Internship" },
                { label: "Freelance", value: "Freelance" },
              ]}
            />
            <SelectField
              id="jobMode"
              name="jobMode"
              label="Job Mode"
              value={data?.jobMode || state?.values?.jobMode || ""}
              placeholder="Select the job mode"
              error={
                state?.errors?.jobMode ? state.errors.jobMode.join(", ") : ""
              }
              required
              selectItems={[
                { label: "Remote", value: "Remote" },
                { label: "On-site", value: "OnSite" },
                { label: "Hybrid", value: "Hybrid" },
              ]}
            />
            <SelectField
              id="status"
              name="status"
              label="Application Status"
              value={data?.status || state?.values?.status || "Applied"}
              placeholder="Select the application status"
              error={
                state?.errors?.status ? state.errors.status.join(", ") : ""
              }
              enableDefaultOption={false}
              required
              selectItems={[
                { label: "Applied", value: "Applied" },
                { label: "Shortlisted", value: "Shortlisted" },
                { label: "Interviewed", value: "Interviewed" },
                { label: "Offered", value: "Offered" },
                { label: "Rejected", value: "Rejected" },
              ]}
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Job Pay</FieldLegend>
          <FieldDescription>
            Information about the pay range and frequency for the job
            application.
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              id="minPay"
              name="minPay"
              label="Minimum Pay"
              value={data?.minPay || state?.values?.minPay || ""}
              placeholder="Enter the minimum pay"
              error={
                state?.errors?.minPay ? state.errors.minPay.join(", ") : ""
              }
              type="number"
            />
            <InputField
              id="maxPay"
              name="maxPay"
              label="Maximum Pay"
              value={data?.maxPay || state?.values?.maxPay || ""}
              placeholder="Enter the maximum pay"
              error={
                state?.errors?.maxPay ? state.errors.maxPay.join(", ") : ""
              }
              type="number"
            />
            <SelectField
              id="payFrequency"
              name="payFrequency"
              label="Pay Frequency"
              value={data?.payFrequency || state?.values?.payFrequency || ""}
              placeholder="Select the pay frequency"
              error={
                state?.errors?.payFrequency
                  ? state.errors.payFrequency.join(", ")
                  : ""
              }
              selectItems={["Hourly", "Weekly", "Monthly", "Yearly"].map(
                (frequency) => ({
                  label: frequency,
                  value: frequency,
                }),
              )}
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
              value={data?.appliedDate || state?.values?.appliedDate || ""}
              error={
                state?.errors?.appliedDate
                  ? state.errors.appliedDate.join(", ")
                  : ""
              }
              placeholder="Select the applied date"
            />
            <DateField
              id="latestUpdate"
              name="latestUpdate"
              label="Latest Update"
              value={data?.latestUpdate || state?.values?.latestUpdate || ""}
              error={
                state?.errors?.latestUpdate
                  ? state.errors.latestUpdate.join(", ")
                  : ""
              }
              placeholder="Select the latest updated date"
            />
            <DateField
              id="latestInterviewScheduledDate"
              name="latestInterviewScheduledDate"
              label="Interview Date"
              value={data?.latestInterviewScheduledDate || state?.values?.latestInterviewScheduledDate || ""}
              error={
                state?.errors?.latestInterviewScheduledDate
                  ? state.errors.latestInterviewScheduledDate.join(", ")
                  : ""
              }
              placeholder="Select the interview date"
              timeField={true}
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <div className="flex justify-between items-center">
            <div>
              <FieldLegend>Interviews</FieldLegend>
              <FieldDescription>
                Information about the scheduled interviews for the job application.
              </FieldDescription>
            </div>
            <div className="flex gap-2">
              {interviewCount > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" type="button">
                      Remove Interview
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to remove the last interview?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      This action will remove the last interview from the form. If you have already saved this interview, it will also be removed from the database. This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setInterviewCount(interviewCount - 1)}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Button variant="secondary" size="sm" type="button" onClick={() => interviewCount < 5 ? setInterviewCount(interviewCount + 1) : null}>
                Add Interview
              </Button>
            </div>
          </div>
          <FieldGroup className="grid grid-cols-1 gap-4">
            <input type="hidden" name="interviewCount" value={interviewCount} />
            {Array.from({ length: interviewCount }).map((_, index) => (
              <div key={index}>
                <p className="font-medium">Interview Round {index + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                  <input type="hidden" name={`interviewIdx_${index}`} value={data?.interviews?.[index]?.interviewIdx || ""} />
                  <DateField
                    id={`interviewDate_${index}`}
                    name={`interviewDate_${index}`}
                    label="Interview Date"
                    value={data?.interviews?.[index]?.interviewDate || state?.values?.interviews?.[index]?.interviewDate || ""}
                    error={
                      state?.errors?.interviews
                        ? state.errors?.interviews?.[index]?.interviewDate?.join(", ")
                        : ""
                    }
                    placeholder="Select the interview date"
                    timeField={true}
                  />
                  <InputField
                    id={`interviewLocation_${index}`}
                    name={`interviewLocation_${index}`}
                    label="Interview Location"
                    value={data?.interviews?.[index]?.interviewLocation || state?.values?.interviews?.[index]?.interviewLocation || ""}
                    error={
                      state?.errors?.interviews
                        ? state.errors?.interviews?.[index]?.interviewLocation?.join(", ")
                        : ""
                    }
                    placeholder="Enter the interview location"
                  />
                  <InputField
                    id={`interviewerName_${index}`}
                    name={`interviewerName_${index}`}
                    label="Interviewer Name"
                    value={data?.interviews?.[index]?.interviewerName || state?.values?.interviews?.[index]?.interviewerName || ""}
                    error={
                      state?.errors?.interviews
                        ? state.errors?.interviews?.[index]?.interviewerName?.join(", ")
                        : ""
                    }
                    placeholder="Enter the interviewer name"
                  />
                  <InputField
                    id={`interviewerContact_${index}`}
                    name={`interviewerContact_${index}`}
                    label="Interviewer Contact"
                    value={data?.interviews?.[index]?.interviewerContact || state?.values?.interviews?.[index]?.interviewerContact || ""}
                    error={
                      state?.errors?.interviews
                        ? state.errors?.interviews?.[index]?.interviewerContact?.join(", ")
                        : ""
                    }
                    placeholder="Enter the interviewer contact"
                  />
                </div>
              </div>
            ))}

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
              value={data?.jobDescription || state?.values?.jobDescription || ""}
              error={
                state?.errors?.jobDescription
                  ? state.errors.jobDescription.join(", ")
                  : ""
              }
              placeholder="Enter the job description"
            />
          <FieldGroup>
            <InputField
              id="referenceLink"
              name="referenceLink"
              label="Reference Link"
              value={data?.referenceLink || state?.values?.referenceLink || "https://www."}
              error={
                state?.errors?.referenceLink
                  ? state.errors.referenceLink.join(", ")
                  : ""
              }
              placeholder="Enter the reference link"
              required
            />
            {/* <Button>
              Paste from clipboard
            </Button> */}
          </FieldGroup>
            <TextareaField
              id="notes"
              name="notes"
              label="Notes"
              value={data?.notes || state?.values?.notes || ""}
              error={state?.errors?.notes ? state.errors.notes.join(", ") : ""}
              placeholder="Enter any additional notes"
            />
          </FieldGroup>
        </FieldSet>
        <Button
          type="submit"
          disabled={pending}
          className="w-full md:w-auto"
        >
          {pending ? "Saving..." : "Save"}
        </Button>
      </form>
    </>
  );
}
