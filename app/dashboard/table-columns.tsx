"use client";

import { ColumnDef } from "@tanstack/react-table";
import { JobApplication } from "../types";
import Link from "next/link";
import { ChevronUp, ChevronDown, MoreHorizontal, LucideLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "checkbox",
    header: ({ table }) => (
      <></>
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mr-2"
      />
    ),
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
    header: ({ column }) => {
      return (
        <Button
          className="m-0 p-0 w-40 flex justify-start"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
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
    accessorKey: "jobType",
    header: "Job Type",
  },
  {
    accessorKey: "workType",
    header: "Work Type",
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

      const appliedDate = row.getValue("appliedDate") ? new Date(row.getValue("appliedDate")) : null;
      const latestUpdate = row.getValue("latestUpdate") ? new Date(row.getValue("latestUpdate")) : null;
      const interviewDate = row.getValue("latestInterviewScheduledDate") ? new Date(row.getValue("latestInterviewScheduledDate")) : null;

      return (
        <HoverCard openDelay={10} closeDelay={50}>
          <HoverCardTrigger asChild className={cn("font-medium", "hover:underline", statusColor)}>
            <p>{row.getValue("status")}</p>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-48 flex-col gap-0.5">
            <div className="text-xs text-muted-foreground">
              <p>{appliedDate ? `Applied ${appliedDate.getDate()}.${(appliedDate.getMonth() + 1).toString().padStart(2, "0")}.${appliedDate.getFullYear()}` : ""}</p>
              <p>{latestUpdate ? `Updated ${latestUpdate.getDate()}.${(latestUpdate.getMonth() + 1).toString().padStart(2, "0")}.${latestUpdate.getFullYear()}` : ""}</p>
              <p>{interviewDate ? `Interview ${interviewDate.getDate()}.${(interviewDate.getMonth() + 1).toString().padStart(2, "0")}.${interviewDate.getFullYear()}` : ""}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: "appliedDate",
  },
  {
    accessorKey: "latestUpdate",
  },
  {
    accessorKey: "latestInterviewScheduledDate",
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
          <LucideLink className="mr-2 h-4 w-4 inline" />{`${formatted.split('/')[2].replace('www.', '')}`}
        </Link>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(application.id))
              }
            >
              Copy application ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
