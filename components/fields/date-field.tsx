import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { parseDate } from "@/app/lib/helper";
import { Input } from "../ui/input";
import { ChevronDownIcon } from "lucide-react";
import InputField from "./input-field";

interface DateFieldProps {
  id: string;
  name?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | Date;
  error?: string;
  disabled?: boolean;
  timeField?: boolean;
}

function formatDate(date: Date): string {
  return parseDate(date, "british", "short", "dot");
}

function parseDT(date: Date, time: Date): string {
  if (!date || !time) {
    return "";
  }
  const combinedValueString = `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:00.000Z`;
  console.log("parseDT", combinedValueString);
  return combinedValueString;
}

function timeZoneAdjustment(date: Date): Date {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() + offset * 60 * 1000);
  return adjustedDate;
}

export default function DateField({
  id,
  label,
  description,
  required,
  value,
  error,
  disabled = false,
  timeField = false,
}: DateFieldProps) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );

  const [time, setTime] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
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
        value={
          date
            ? timeField && time
              ? timeZoneAdjustment(new Date(parseDT(date, time))).toISOString()
              : new Date(date).toISOString()
            : ""
        }
        readOnly
      />
      <FieldGroup className={timeField ? "grid grid-cols-2 gap-2" : ""}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={id}
              className="justify-between font-normal"
              value={date ? formatDate(date) : ""}
              disabled={disabled}
            >
              {date ? formatDate(date) : <span>Pick a date</span>}<ChevronDownIcon className="text-muted-foreground" data-icon="inline-end" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
          >
            <Calendar
              id={id}
              mode="single"
              captionLayout="dropdown"
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              required={required}
            />
          </PopoverContent>
        </Popover>
        {timeField && (
          <InputField
            id={`${id}-time`}
            type="time"
            value={time ? time.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }) : ""}
            placeholder="Pick a time"
            className="text-white"
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":").map(Number);
              const newTime = new Date();
              newTime.setHours(hours);
              newTime.setMinutes(minutes);
              setTime(newTime);
            }}
          />
        )}
      </FieldGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}
