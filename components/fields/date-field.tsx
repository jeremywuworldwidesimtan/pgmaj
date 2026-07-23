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


interface DateFieldProps {
  id: string;
  name?: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  error?: string;
}

function formatDate(date: Date): string {
  return `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
}

export default function DateField({
  id,
  label,
  description,
  required,
  value,
  error,
}: DateFieldProps) {
  const [date, setDate] = useState<Date>();

  if (value) {
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
    }
  }

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" id={id} className="justify-start font-normal">
            {date ? formatDate(date) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
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
