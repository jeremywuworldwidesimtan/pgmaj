"use client";
import {
  formatEdu,
  getDateDifference,
  parseDate,
  shortenWebURL,
} from "@/app/lib/helper";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import ResumeProjectButton from "./resume-project-button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ProjectDeleteButton from "./project-delete";
import { ResumeProjectProps } from "@/app/types";
import Link from "next/link";

export default function ProjectCard({
  project,
}: {
  project: ResumeProjectProps;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Card className="bg-background w-full p-4 flex flex-row justify-between items-center">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">
              {formatEdu(project.name)}
            </h2>
            {project.link && (
              <p className="text-sm">
                <>
                  Link:{" "}
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {shortenWebURL(project.link)}
                  </Link>
                </>
              </p>
            )}
          </div>
          {!isOpen ? (
            <ChevronDown className="text-muted-foreground" />
          ) : (
            <ChevronDown className="text-muted-foreground rotate-180" />
          )}
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="bg-background w-full p-4 gap-1">
          <div>
            <p className="text-sm">
              <span className="font-bold">Duration:</span>{" "}
              {parseDate(project.startDate, "british", "short", "dot")} -{" "}
              {project.endDate
                ? parseDate(project.endDate, "british", "short", "dot")
                : "Present"}{" "}
              (
              {getDateDifference(
                project.startDate,
                project.endDate || new Date(),
              )}
              )
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-bold">Description:</span>
            </p>
            <div className="mt-2 p-4 border rounded-md">
              <p>{project.description || "No description available."}</p>
            </div>
          </div>
          <div className="mt-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <ResumeProjectButton mode="edit" formData={project} />
            <ProjectDeleteButton projectId={project.id} />
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
