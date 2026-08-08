"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sampleSchedule = [
  {
    id: "1",
    fullDate: new Date(2024, 5, 1),
    day: "1",
    event: { time: "20:00", title: "Test1", link: "/dashboard/application/1", location: "Location 1" },
  },
  {
    id: "2",
    fullDate: new Date(2024, 5, 24),
    day: "24",
    event: {
      time: "15:00",
      title: "cherissa",
      link: "/dashboard/application/2",
      location: "Location 2",
    },
  },
];

export type CalendarSchedule = {
  id: string;
  fullDate: Date;
  day: string;
  event: {
    time: string;
    title: string;
    link: string;
    location?: string;
  };
};

export type CalendarGridProps = {
  month: number; // 0-11
  year: number; // 4-digit year
  schedule: CalendarSchedule[];
};

export default function CalendarGrid({
  month,
  year,
  schedule,
}: CalendarGridProps) {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(
    new Date(year, month, 1).getDay(),
  ); // 0 (Sun) - 6 (Sat)
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(year, month + 1, 0).getDate(),
  ); // Get the last day of the month

  const filterSchedule = (month: number, year: number) => {
    return schedule.filter((s) => {
      const eventDate = s.fullDate;
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
  };

  const [scheduleState, setScheduleState] = useState<CalendarSchedule[]>(
    filterSchedule(month, year),
  );

  console.log("scheduleState", scheduleState);

  return (
    // full width take over remaining height
    <>
      <div className="flex flex-row gap-2 items-center justify-start">
        <h2 className="text-lg font-bold">Calendar For</h2>
        <Select
          name="month"
          defaultValue={String(month)}
          onValueChange={(value) => {
            const newMonth = parseInt(value);
            setFirstDayOfWeek(new Date(year, newMonth, 1).getDay());
            setDaysInMonth(new Date(year, newMonth + 1, 0).getDate());
            setScheduleState(filterSchedule(newMonth, year));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          name="year"
          defaultValue={String(year)}
          onValueChange={(value) => {
            const newYear = parseInt(value);
            setFirstDayOfWeek(new Date(newYear, month, 1).getDay());
            setDaysInMonth(new Date(newYear, month + 1, 0).getDate());
            setScheduleState(filterSchedule(month, newYear));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 10 }, (_, i) => {
                const y = year - 5 + i;
                return (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-7 mt-2 flex-1">
        <div className="text-center border border-collapse font-semibold">
          Sun
        </div>
        <div className="text-center border border-collapse font-semibold">
          Mon
        </div>
        <div className="text-center border border-collapse font-semibold">
          Tue
        </div>
        <div className="text-center border border-collapse font-semibold">
          Wed
        </div>
        <div className="text-center border border-collapse font-semibold">
          Thu
        </div>
        <div className="text-center border border-collapse font-semibold">
          Fri
        </div>
        <div className="text-center border border-collapse font-semibold">
          Sat
        </div>
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border border-collapse min-h-16 lg:min-h-25"
          ></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => (
          <div
            key={`day-${index}`}
            className="border border-collapse text-left p-1 min-h-16 lg:min-h-25"
          >
            <span className="text-xs text-muted-foreground">{index + 1}</span>
            {scheduleState
              .filter((s) => parseInt(s.day) === index + 1)
              .map((s, i) => (
                <div key={i} className="text-xs">
                  <Link
                    href={s.event.link}
                    className={cn(s.fullDate < new Date() ? "text-muted-foreground line-through" : "text-blue-500 hover:underline")}
                  >
                    {s.event.time} - {s.event.title} {s.event.location && `at ${s.event.location}`}
                  </Link>
                </div>
              ))}
          </div>
        ))}
        {Array.from({ length: 42 - (firstDayOfWeek + daysInMonth) }).map(
          (_, index) => (
            <div
              key={`empty-${index}`}
              className="border border-collapse min-h-16 lg:min-h-25"
            ></div>
          ),
        )}
      </div>
    </>
  );
}
