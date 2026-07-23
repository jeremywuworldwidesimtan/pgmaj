import { Button } from "@/components/ui/button";
import { JobApplication } from "../types";
import { DataTable } from "./data-table";
import { SampleJobApplications } from "./sampleData";
import { columns } from "./table-columns";
import Link from "next/link";

async function getData(): Promise<JobApplication[]> {
  // Fetch data from your API here.
  return SampleJobApplications;
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">Applications Dashboard</h1>
          <p>
            Here you can manage your job applications and track your progress.
          </p>
        </div>
        <div>
          <Link href="/dashboard/application/add">
            <Button>Add Application</Button>
          </Link>
        </div>
      </div>

      <div className="w-full mt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
