import { ResumeCertificationState } from "@/app/lib/resume-definitions";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import DateField from "../fields/date-field";
import InputField from "../fields/input-field";
import { ResumeCertificationProps } from "@/app/types";

export type ResumeCertificationFormProps = {
  state?: ResumeCertificationState;
  data?: ResumeCertificationProps;
};

export default function ResumeCertificationForm({
  state,
  data,
}: ResumeCertificationFormProps) {
  const formData = data;
  return (
    <div className="flex flex-col gap-4 mt-2">
      {formData?.id ? (
        <input type="hidden" name="id" value={formData.id} />
      ) : null}
      <FieldSet>
        <FieldLegend>Certification Information</FieldLegend>
        <FieldDescription>
          Information about the certification.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="name"
            name="name"
            label="Name"
            value={formData?.name || state?.values?.name || ""}
            placeholder="Enter the certification name"
            error={state?.errors?.name ? state.errors.name : ""}
            required
          />
          <InputField
            id="issuingOrganization"
            name="issuingOrganization"
            label="Issuing Organization"
            value={formData?.issuingOrganization || state?.values?.issuingOrganization || ""}
            placeholder="Enter the issuing organization"
            error={state?.errors?.issuingOrganization ? state.errors.issuingOrganization : ""}
            required
          />
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Certification Dates</FieldLegend>
        <FieldDescription>
          Information about the important dates for the certification.
        </FieldDescription>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateField
            id="issueDate"
            name="issueDate"
            label="Issue Date"
            value={formData?.issueDate || state?.values?.issueDate || ""}
            error={state?.errors?.issueDate ? state.errors.issueDate : ""}
            placeholder="Select the certification issue date"
          />
          <DateField
            id="expirationDate"
            name="expirationDate"
            label="Expiration Date"
            value={formData?.expirationDate || state?.values?.expirationDate || ""}
            error={state?.errors?.expirationDate ? state.errors.expirationDate : ""}
            placeholder="Select the certification expiration date"
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Credentials</FieldLegend>
        <FieldDescription>
          Information about the certification credentials. All credential information will be stored securedly and will not be shared with any third parties. Please ensure that you provide accurate and up-to-date information.
        </FieldDescription>
        <FieldGroup>
          <InputField
            id="credentialId"
            name="credentialId"
            label="Credential ID"
            value={formData?.credentialId || state?.values?.credentialId || ""}
            placeholder="Enter the credential ID"
            error={state?.errors?.credentialId ? state.errors.credentialId : ""}
          />
          <InputField
            id="credentialUrl"
            name="credentialUrl"
            label="Credential Link"
            value={formData?.credentialUrl || state?.values?.credentialUrl || ""}
            placeholder="Enter the credential link"
            error={state?.errors?.credentialUrl ? state.errors.credentialUrl : ""}
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
