"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10, // Set default page size
      },
      columnVisibility: {
        appliedDate: false,
        jobDescription: false,
        notes: false,
        location: false,
        jobType: false,
        jobMode: false,
      },
    },

    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {/* Filters for job type, job mode and application status */}
        <div className="flex items-center py-2 gap-2">
          <p>Filter by:</p>
          <div className="flex items-center space-x-2">
            <Select
              onValueChange={(value) =>
                table.getColumn("jobType")?.setFilterValue(value)
              }
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key="" value="">
                    N/A
                  </SelectItem>
                  {[
                    {key: "Full-time", value: "FullTime"},
                    {key: "Part-time", value: "PartTime"},
                    {key: "Contract", value: "Contract"},
                    {key: "Internship", value: "Internship"},
                    {key: "Freelance", value: "Freelance"},
                  ].map(({key, value}) => (
                    <SelectItem key={key} value={value}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              onValueChange={(value) =>
                table.getColumn("jobMode")?.setFilterValue(value)
              }
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a job mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key="" value="">
                    N/A
                  </SelectItem>
                  {[
                    {key: "Remote", value: "Remote"},
                    {key: "On-site", value: "OnSite"},
                    {key: "Hybrid", value: "Hybrid"},
                  ].map(({key, value}) => (
                    <SelectItem key={key} value={value}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              onValueChange={(value) =>
                table.getColumn("status")?.setFilterValue(value)
              }
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key="" value="">
                    N/A
                  </SelectItem>
                  {[
                    "Applied",
                    "Shortlisted",
                    "Interviewed",
                    "Offered",
                    "Rejected",
                  ].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center py-2 gap-2">
          <div className="flex items-center">
            <Input
              placeholder="Filter company..."
              value={
                (table.getColumn("company")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("company")?.setFilterValue(event.target.value)
              }
            />
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Filter position..."
              value={
                (table.getColumn("position")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("position")?.setFilterValue(event.target.value)
              }
            />
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Filter location..."
              value={
                (table.getColumn("location")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("location")?.setFilterValue(event.target.value)
              }
            />
          </div>
        </div>
      </div>
      <Table className="border">
        <TableHeader className="bg-primary text-primary-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results. <Link href="/dashboard/application/add" className="text-primary hover:underline">Add a new application</Link> or go to <Link href="/dashboard/profile" className="text-primary hover:underline">profile settings</Link> to customize your experience.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} of{" "}
            {table.getCoreRowModel().rows.length} results.
          </p>
        </div>
        <div className="flex items-center justify-between space-x-4 py-2">
          <p>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
          <div className="flex items-center justify-between space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
