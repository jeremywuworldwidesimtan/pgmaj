"use client";
import { formatEdu, formatType, getDateDifference, parseDate } from "@/app/lib/helper";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import ResumeEducationButton from "./resume-education-button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import EducationDeleteButton from "./education-delete";
import { ResumeEducationProps } from "@/app/types";

export default function EducationCard({
  education,
}: {
  education: ResumeEducationProps;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Card className="bg-background w-full p-4 flex flex-row justify-between items-center">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">
              {formatEdu(education.degree)}
            </h2>
            <p className="text-sm">
              in {education.fieldOfStudy} at <strong>{education.institution}</strong>
            </p>
          </div>
          {!isOpen ? <ChevronDown className="text-muted-foreground" /> : <ChevronDown className="text-muted-foreground rotate-180" />}
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="bg-background w-full p-4 gap-1">
          <div className="lg:grid lg:grid-cols-3 lg:gap-4">
            <p className="text-sm lg:col-span-2">
              <span className="font-bold">Duration:</span>{" "}
              {parseDate(education.startDate, "british", "short", "dot")} - {education.endDate ? parseDate(education.endDate, "british", "short", "dot") : "Present"} ({getDateDifference(education.startDate, education.endDate || new Date())})
            </p>
            <p className="text-sm">
              <span className="font-bold">GPA/CGPA:</span>{" "}
              {education.gpa ?? "N/A"}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-bold">Description:</span>
            </p>
            <div className="mt-2 p-4 border rounded-md">
              <p>{education.description || "No description available."}</p>
            </div>
          </div>
          <div className="mt-2 lg:grid lg:grid-cols-2 lg:gap-4">
              <ResumeEducationButton mode="edit" formData={education} />
              <EducationDeleteButton educationId={education.id} />
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
