import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  id: string;
  name?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string | number;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  name,
  label,
  description,
  placeholder,
  type,
  required,
  value,
  error,
  disabled,
  onChange,
}: InputFieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Input
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={value ?? ""}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        onChange={onChange}
        {...(type === "number" ? { step: "any" } : {})}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}
