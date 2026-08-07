import { ResumeExperienceState } from "@/app/lib/resume-definitions";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { ResumeExperienceProps } from "../resume/resume-experience-button";
import DateField from "../fields/date-field";
import InputField from "../fields/input-field";
import SelectField from "../fields/select-field";
import TextareaField from "../fields/textarea-field";

export type ResumeExperienceFormProps = {
  state?: ResumeExperienceState;
  data?: ResumeExperienceProps;
};

export default function ResumeExperienceForm({
  state,
  data,
}: ResumeExperienceFormProps) {
  const formData = data;
  return (
    <div className="flex flex-col gap-4 mt-2">
      {formData?.id ? (
        <input type="hidden" name="id" value={formData.id} />
      ) : null}
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
            value={formData?.company || state?.values?.company || ""}
            placeholder="Enter the company name"
            error={state?.errors?.company ? state.errors.company : ""}
            required
          />
          <InputField
            id="position"
            name="position"
            label="Position"
            value={formData?.position || state?.values?.position || ""}
            placeholder="Enter the position"
            error={state?.errors?.position ? state.errors.position : ""}
            required
          />
          <InputField
            id="location"
            name="location"
            label="Location"
            value={formData?.location || state?.values?.location || ""}
            placeholder="Enter the location"
            error={state?.errors?.location ? state.errors.location : ""}
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
            value={formData?.jobType || state?.values?.jobType || ""}
            placeholder="Select the job type"
            error={state?.errors?.jobType ? state.errors.jobType : ""}
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
            value={formData?.jobMode || state?.values?.jobMode || ""}
            placeholder="Select the job mode"
            error={state?.errors?.jobMode ? state.errors.jobMode : ""}
            required
            selectItems={[
              { label: "Remote", value: "Remote" },
              { label: "On-site", value: "OnSite" },
              { label: "Hybrid", value: "Hybrid" },
            ]}
          />
          <InputField
            id="lastSalary"
            name="lastSalary"
            label="Last Salary"
            value={formData?.lastSalary || state?.values?.lastSalary || ""}
            placeholder="Enter the last drawn salary"
            error={state?.errors?.lastSalary ? state.errors.lastSalary : ""}
            type="number"
          />
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Job Dates</FieldLegend>
        <FieldDescription>
          Information about the important dates for the job application.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateField
            id="startDate"
            name="startDate"
            label="Start Date"
            value={formData?.startDate || state?.values?.startDate || ""}
            error={state?.errors?.startDate ? state.errors.startDate : ""}
            placeholder="Select the job start date"
          />
          <DateField
            id="endDate"
            name="endDate"
            label="End Date"
            value={formData?.endDate || state?.values?.endDate || ""}
            error={state?.errors?.endDate ? state.errors.endDate : ""}
            placeholder="Select the job end date"
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Description & Reference</FieldLegend>
        <FieldDescription>
          Information about the job description and reference link for the
          application.
        </FieldDescription>
        <FieldGroup>
          <TextareaField
            id="description"
            name="description"
            label="Job Description"
            value={formData?.description || state?.values?.description || ""}
            error={state?.errors?.description ? state.errors.description : ""}
            placeholder="Enter the job description"
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
