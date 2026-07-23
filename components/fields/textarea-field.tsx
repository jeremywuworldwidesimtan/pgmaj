import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  id: string;
  name?: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  error?: string;
}

export default function TextareaField({
  id,
  name,
  label,
  description,
  placeholder,
  required,
  value,
  error,
}: TextareaFieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        name={name ?? id}
        placeholder={placeholder}
        required={required}
        defaultValue={value ?? ""}
        aria-invalid={Boolean(error)}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}
