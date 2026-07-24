"use client";

import { ColumnDef } from "@tanstack/react-table";
import { JobApplication } from "../types";
import Link from "next/link";
import { ChevronUp, ChevronDown, LucideLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ActionCell from "@/components/dashboard/action-cell";

export const columns: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "checkbox",
    header: ({ table }) => <></>,
    cell: ({ row }) => <Checkbox className="mr-2" />,
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          className="m-0 p-0 w-60 flex justify-start"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const companyName = row.original.company;
      const applicationId = row.original.id;
      return (
        <Link
          href={`/dashboard/application/${applicationId}`}
          className="font-medium hover:underline flex flex-col"
        >
          <span>{companyName}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.location}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          className="m-0 p-0 w-80 flex justify-start"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "payRange",
    header: "Pay Range",
    cell: ({ row }) => {
      const minPay = row.original.minPay;
      const maxPay = row.original.maxPay;
      const payFrequency = row.original.payFrequency;
      return (
        <div className="flex flex-col">
          <span>
            {minPay && maxPay
              ? `$${minPay.toLocaleString()} - $${maxPay.toLocaleString()}`
              : (minPay && !maxPay ? `$${minPay.toLocaleString()}` : "N/A")}
          </span>
          <span className="text-xs text-muted-foreground">{payFrequency}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "jobTypeandMode",
    header: "Job Type & Mode",
    cell: ({ row }) => {
      const jobType = row.original.jobType;
      const jobMode = row.original.jobMode;
      return (
        <div className="flex flex-col">
          <span>{jobType}</span>
          <span className="text-xs text-muted-foreground">{jobMode}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let statusColor = "";
      switch (row.getValue("status")) {
        case "Applied":
          statusColor = "text-blue-500";
          break;
        case "Shortlisted":
          statusColor = "text-yellow-500";
          break;
        case "Interviewed":
          statusColor = "text-purple-500";
          break;
        case "Offered":
          statusColor = "text-green-500";
          break;
        case "Rejected":
          statusColor = "text-red-500";
          break;
        default:
          statusColor = "text-gray-500";
      }

      const appliedDate = row.getValue("appliedDate")
        ? new Date(row.getValue("appliedDate"))
        : null;

      return (
        <>
          <p className={statusColor}>{row.getValue("status")}</p>
          <div className="text-xs text-muted-foreground flex flex-row gap-2">
            <p>
              {appliedDate
                ? `App. ${appliedDate.getDate()}.${(appliedDate.getMonth() + 1).toString().padStart(2, "0")}.${appliedDate.getFullYear()}`
                : ""}
            </p>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "appliedDate",
  },
  {
    accessorKey: "latestUpdate",
    header: "Latest Update",
    cell: ({ row }) => {
      const latestUpdate = row.getValue("latestUpdate")
        ? new Date(row.getValue("latestUpdate"))
        : null;
      return (
        <p>
          {latestUpdate
            ? `${latestUpdate.getDate()}.${(latestUpdate.getMonth() + 1).toString().padStart(2, "0")}.${latestUpdate.getFullYear()}`
            : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "latestInterviewScheduledDate",
    header: "Interview Date",
    cell: ({ row }) => {
      const interviewDate = row.getValue("latestInterviewScheduledDate")
        ? new Date(row.getValue("latestInterviewScheduledDate"))
        : null;
      return (
        <p>
          {interviewDate
            ? `${interviewDate.getDate()}.${(interviewDate.getMonth() + 1).toString().padStart(2, "0")}.${interviewDate.getFullYear()}`
            : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "referenceLink",
    header: "Link",
    cell: ({ row }) => {
      const formatted: string = row.getValue("referenceLink");
      return (
        <Link
          className="font-medium hover:underline"
          href={formatted}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LucideLink className="mr-2 h-4 w-4 inline" />
          {`${formatted.split("/")[2].replace("www.", "")}`}
        </Link>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCell applicationId={`${row.original.id}`} />;
    },
  },
];
