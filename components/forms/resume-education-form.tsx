import { ResumeEducationState } from "@/app/lib/resume-definitions";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import DateField from "../fields/date-field";
import InputField from "../fields/input-field";
import SelectField from "../fields/select-field";
import TextareaField from "../fields/textarea-field";
import { ResumeEducationProps } from "@/app/types";

export type ResumeEducationFormProps = {
  state?: ResumeEducationState;
  data?: ResumeEducationProps;
};

export default function ResumeEducationForm({
  state,
  data,
}: ResumeEducationFormProps) {
  const formData = data;
  return (
    <div className="flex flex-col gap-4 mt-2">
      {formData?.id ? (
        <input type="hidden" name="id" value={formData.id} />
      ) : null}
      <FieldSet>
        <FieldLegend>Education Information</FieldLegend>
        <FieldDescription>
          Information about the school, degree and field of study.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="institution"
            name="institution"
            label="Institution"
            value={formData?.institution || state?.values?.institution || ""}
            placeholder="Enter the institution name"
            error={state?.errors?.institution ? state.errors.institution : ""}
            required
          />
          <SelectField
            id="degree"
            name="degree"
            label="Degree"
            value={formData?.degree || state?.values?.degree || ""}
            placeholder="Enter the degree"
            error={state?.errors?.degree ? state.errors.degree : ""}
            required
            selectItems={[
              { value: "HighSchool", label: "High School" },
              { value: "Diploma", label: "Diploma" },
              { value: "Associate", label: "Associate" },
              { value: "Bachelor", label: "Bachelor" },
              { value: "Master", label: "Master" },
              { value: "Doctorate", label: "Doctorate" },
            ]}
          />
          <InputField
            id="fieldOfStudy"
            name="fieldOfStudy"
            label="Field of Study"
            value={formData?.fieldOfStudy || state?.values?.fieldOfStudy || ""}
            placeholder="Enter the field of study"
            error={state?.errors?.fieldOfStudy ? state.errors.fieldOfStudy : ""}
            required
          />
          <InputField
            type="number"
            id="gpa"
            name="gpa"
            label="GPA/CGPA"
            value={formData?.gpa || state?.values?.gpa || ""}
            placeholder="Enter the GPA/CGPA"
            error={state?.errors?.gpa ? state.errors.gpa : ""}
            required
          />
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Education Dates</FieldLegend>
        <FieldDescription>
          Information about the important dates for the education.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateField
            id="startDate"
            name="startDate"
            label="Start Date"
            value={formData?.startDate || state?.values?.startDate || ""}
            error={state?.errors?.startDate ? state.errors.startDate : ""}
            placeholder="Select the education start date"
          />
          <DateField
            id="endDate"
            name="endDate"
            label="End Date"
            value={formData?.endDate || state?.values?.endDate || ""}
            error={state?.errors?.endDate ? state.errors.endDate : ""}
            placeholder="Select the education end date"
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Description & Reference</FieldLegend>
        <FieldDescription>
          Information about the education description.
        </FieldDescription>
        <FieldGroup>
          <TextareaField
            id="description"
            name="description"
            label="Education Description"
            value={formData?.description || state?.values?.description || ""}
            error={state?.errors?.description ? state.errors.description : ""}
            placeholder="Enter the education description"
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
