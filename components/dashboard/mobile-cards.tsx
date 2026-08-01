"use client";
import { useState } from "react";
import ApplicationCard from "./application-card";
import {
  JobApplicationPrisma,
  JobModePrisma,
  JobTypePrisma,
  StatusPrisma,
} from "@/app/types";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Filter } from "lucide-react";
import InputField from "../fields/input-field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import SelectField from "../fields/select-field";

type filterState = {
  jobType: JobTypePrisma | null;
  jobMode: JobModePrisma | null;
  status: StatusPrisma | null;
  location: string | null;
  company: string | null;
  position: string | null;
};

export default function MobileCards({
  applications,
}: {
  applications: JobApplicationPrisma[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<filterState>({
    jobType: null,
    jobMode: null,
    status: null,
    location: null,
    company: null,
    position: null,
  });

  const filteredApplications = applications.filter((app) => {
    return (
      (filter.jobType ? app.jobType === filter.jobType : true) &&
      (filter.jobMode ? app.jobMode === filter.jobMode : true) &&
      (filter.status ? app.status === filter.status : true) &&
      (filter.location
        ? app.location.toLowerCase().includes(filter.location.toLowerCase())
        : true) &&
      (filter.company
        ? app.company.toLowerCase().includes(filter.company.toLowerCase())
        : true) &&
      (filter.position
        ? app.position.toLowerCase().includes(filter.position.toLowerCase())
        : true)
    );
  });
  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex items-start gap-2"
      >
        <FieldGroup className="w-full gap-0">
          <Field>
            <InputField
              id="position"
              placeholder="Search Position"
              value={filter.position ?? ""}
              onChange={(e) =>
                setFilter({ ...filter, position: e.target.value })
              }
            />
          </Field>
          <CollapsibleContent className="w-full flex flex-col gap-2 mt-2">
            <Field>
              <InputField
                id="company"
                placeholder="Filter company..."
                value={filter.company ?? ""}
                onChange={(e) =>
                  setFilter({ ...filter, company: e.target.value })
                }
              />
            </Field>
            <Field>
              <InputField
                id="location"
                placeholder="Filter location..."
                value={filter.location ?? ""}
                onChange={(e) =>
                  setFilter({ ...filter, location: e.target.value })
                }
              />
            </Field>
            <Field>
              <SelectField
                id="jobType"
                name="jobType"
                value={filter.jobType || ""}
                placeholder="Filter job type..."
                selectItems={[
                  { label: "Full-time", value: "FullTime" },
                  { label: "Part-time", value: "PartTime" },
                  { label: "Contract", value: "Contract" },
                  { label: "Internship", value: "Internship" },
                  { label: "Freelance", value: "Freelance" },
                ]}
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    jobType: value as JobTypePrisma | null,
                  })
                }
              />
              <SelectField
                id="jobMode"
                name="jobMode"
                value={filter.jobMode || ""}
                placeholder="Filter job mode..."
                selectItems={[
                  { label: "Remote", value: "Remote" },
                  { label: "On-site", value: "OnSite" },
                  { label: "Hybrid", value: "Hybrid" },
                ]}
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    jobMode: value as JobModePrisma | null,
                  })
                }
              />
              <SelectField
                id="status"
                name="status"
                value={filter.status || ""}
                placeholder="Filter application status..."
                selectItems={[
                  { label: "Applied", value: "Applied" },
                  { label: "Shortlisted", value: "Shortlisted" },
                  { label: "Interviewed", value: "Interviewed" },
                  { label: "Offered", value: "Offered" },
                  { label: "Rejected", value: "Rejected" },
                ]}
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    status: value as StatusPrisma | null,
                  })
                }
              />
            </Field>
          </CollapsibleContent>
        </FieldGroup>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter />
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
      <div className="grid grid-cols-1 gap-4 mt-2">
        {filteredApplications.map((application) => (
          <Link
            key={application.id}
            href={`/dashboard/application/${application.id}`}
          >
            <ApplicationCard key={application.id} application={application} />
          </Link>
        ))}
      </div>
    </>
  );
}
