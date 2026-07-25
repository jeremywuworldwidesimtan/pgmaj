import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { parseDate } from "@/app/lib/helper";
import { Input } from "../ui/input";


interface DateFieldProps {
  id: string;
  name?: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | Date;
  error?: string;
}

function formatDate(date: Date): string {
  return parseDate(date, "british", "short", "dot");
}

export default function DateField({
  id,
  label,
  description,
  required,
  value,
  error,
}: DateFieldProps) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {/* stupid workaround to get the date sent to form */}
      <Input
        id={id}
        name={id}
        type="hidden"
        placeholder={description}
        required={required}
        value={date ? date.toISOString() : undefined}
        readOnly
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" id={id} className="justify-start font-normal" value={date ? formatDate(date) : ""}>
            {date ? formatDate(date) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            id={id}
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            required={required}
          />
        </PopoverContent>
      </Popover>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}
