import { ResumeProjectState } from "@/app/lib/resume-definitions";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import DateField from "../fields/date-field";
import InputField from "../fields/input-field";
import TextareaField from "../fields/textarea-field";
import { ResumeProjectProps } from "@/app/types";

export type ResumeProjectFormProps = {
  state?: ResumeProjectState;
  data?: ResumeProjectProps;
};

export default function ResumeProjectForm({
  state,
  data,
}: ResumeProjectFormProps) {
  const formData = data;
  return (
    <div className="flex flex-col gap-4 mt-2">
      {formData?.id ? (
        <input type="hidden" name="id" value={formData.id} />
      ) : null}
      <FieldSet>
        <FieldLegend>Project Information</FieldLegend>
        <FieldDescription>
          Information about the project.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="name"
            name="name"
            label="Name"
            value={formData?.name || state?.values?.name || ""}
            placeholder="Enter the project name"
            error={state?.errors?.name ? state.errors.name : ""}
            required
          />
          <InputField
            id="link"
            name="link"
            label="Project Link (if applicable)"
            value={formData?.link || state?.values?.link || ""}
            placeholder="https://"
            error={state?.errors?.link ? state.errors.link : ""}
          />
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Project Dates</FieldLegend>
        <FieldDescription>
          Information about the important dates for the project.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateField
            id="startDate"
            name="startDate"
            label="Start Date"
            value={formData?.startDate || state?.values?.startDate || ""}
            error={state?.errors?.startDate ? state.errors.startDate : ""}
            placeholder="Select the project start date"
          />
          <DateField
            id="endDate"
            name="endDate"
            label="End Date"
            value={formData?.endDate || state?.values?.endDate || ""}
            error={state?.errors?.endDate ? state.errors.endDate : ""}
            placeholder="Select the project end date"
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Description & Reference</FieldLegend>
        <FieldDescription>
          Information about the project description.
        </FieldDescription>
        <FieldGroup>
          <TextareaField
            id="description"
            name="description"
            label="Project Description"
            value={formData?.description || state?.values?.description || ""}
            error={state?.errors?.description ? state.errors.description : ""}
            placeholder="Enter the project description"
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
