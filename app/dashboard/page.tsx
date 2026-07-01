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
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-background">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 sm:items-start">
        <h1 className="text-3xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
          PGMAJ Dashboard
        </h1>
        <p>
          Here you can manage your job applications and track your progress.
        </p>

        <div className="mt-4">
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}
