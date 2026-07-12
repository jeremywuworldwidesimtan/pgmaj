import { Button } from "@/components/ui/button";
import { JobApplication } from "../types";
import { DataTable } from "./data-table";
import { SampleJobApplications } from "./sampleData";
import { columns } from "./table-columns";

async function getData(): Promise<JobApplication[]> {
  // Fetch data from your API here.
  return SampleJobApplications;
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <div className="flex flex-col flex-1 bg-background font-sans">
      <main className="flex flex-1 w-full flex-col px-2 py-8 items-start">
        <div className="flex w-full items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
              Applications Dashboard
            </h1>
            <p>
              Here you can manage your job applications and track your progress.
            </p>
          </div>
          <div>
            <Button>
              Add Application
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}
