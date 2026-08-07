"use client";
import { formatType, getDateDifference, parseDate } from "@/app/lib/helper";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import ResumeExperienceButton, {
  ResumeExperienceProps,
} from "./resume-experience-button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ExperienceDeleteButton from "./experience-delete";

export default function ExperienceCard({
  experience,
  preferredCurrency,
}: {
  experience: ResumeExperienceProps;
  preferredCurrency: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Card className="bg-background w-full p-4 flex flex-row justify-between items-center">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">
              {experience.position}
            </h2>
            <p className="text-sm">
              at <strong>{experience.company}</strong> in {experience.location}
            </p>
          </div>
          {!isOpen ? <ChevronDown className="text-muted-foreground" /> : <ChevronDown className="text-muted-foreground rotate-180" />}
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="bg-background w-full p-4 gap-1">
          <div className="lg:grid lg:grid-cols-3 lg:gap-4">
            <p className="text-sm">
              <span className="font-bold">Start Date:</span>{" "}
              {parseDate(experience.startDate, "british", "short", "dot")}
            </p>
            <p className="text-sm">
              <span className="font-bold">End Date:</span>{" "}
              {experience.endDate
                ? parseDate(experience.endDate, "british", "short", "dot")
                : "N/A (still working)"}
            </p>
            <p className="text-sm">
              <span className="font-bold">Job Duration:</span>{" "}
              {getDateDifference(
                experience.startDate,
                experience.endDate || new Date(),
              )}
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4">
            <p className="text-sm">
              <span className="font-bold">Job Type:</span>{" "}
              {formatType(experience.jobType)}
            </p>
            <p className="text-sm">
              <span className="font-bold">Job Mode:</span>{" "}
              {formatType(experience.jobMode)}
            </p>
            <p className="text-sm">
              <span className="font-bold">Last Salary:</span>{" "}
              {preferredCurrency}
              {experience.lastSalary}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-bold">Description:</span>
            </p>
            <div className="mt-2 p-4 border rounded-md">
              <p>{experience.description || "No job description available."}</p>
            </div>
          </div>
          <div className="mt-2 lg:grid lg:grid-cols-2 lg:gap-4">
              <ResumeExperienceButton mode="edit" formData={experience} />
              <ExperienceDeleteButton experienceId={experience.id} />
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
