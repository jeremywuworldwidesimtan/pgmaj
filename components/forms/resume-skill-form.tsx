import { ResumeSkillState } from "@/app/lib/resume-definitions";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import InputField from "../fields/input-field";
import SelectField from "../fields/select-field";
import { ResumeSkillProps } from "@/app/types";

export type ResumeSkillFormProps = {
  state?: ResumeSkillState;
  data?: ResumeSkillProps;
};

export default function ResumeSkillForm({
  state,
  data,
}: ResumeSkillFormProps) {
  const formData = data;
  return (
    <div className="flex flex-col gap-4 mt-2">
      {formData?.id ? (
        <input type="hidden" name="id" value={formData.id} />
      ) : null}
      <FieldSet>
        <FieldLegend>Skill Information</FieldLegend>
        <FieldDescription>
          Information about the skill, proficiency level, and years of experience.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            id="skill"
            name="skill"
            label="Skill"
            value={formData?.skill || state?.values?.skill || ""}
            placeholder="Enter the skill name"
            error={state?.errors?.skill ? state.errors.skill : ""}
            required
          />
          <SelectField
            id="proficiency"
            name="proficiency"
            label="Proficiency Level"
            value={formData?.proficiency || state?.values?.proficiency || ""}
            placeholder="Enter the proficiency level"
            error={state?.errors?.proficiency ? state.errors.proficiency : ""}
            required
            selectItems={[
              { value: "Beginner", label: "Beginner" },
              { value: "Intermediate", label: "Intermediate" },
              { value: "Advanced", label: "Advanced" },
              { value: "Expert", label: "Expert" },
            ]}
          />
          <InputField
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            label="Years of Experience"
            value={formData?.yearsOfExperience || state?.values?.yearsOfExperience || ""}
            placeholder="Enter the years of experience"
            error={state?.errors?.yearsOfExperience ? state.errors.yearsOfExperience : ""}
            required
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
