import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type selectItem = {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  name?: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  error?: string;
  enableDefaultOption?: boolean;
  selectItems: selectItem[];
}

export default function SelectField({
  id,
  name,
  label,
  description,
  placeholder,
  required,
  value,
  error,
  enableDefaultOption = true,
  selectItems,
}: SelectFieldProps) {
  if (enableDefaultOption) {
    selectItems = [
      { value: "", label: placeholder || "Select an option" },
      ...selectItems,
    ];
  }
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select name={name ?? id} required={required} defaultValue={String(value) ?? null}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}
