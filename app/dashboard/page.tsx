import { Button } from "@/components/ui/button";
import { JobApplicationPrisma } from "../types";
import { DataTable } from "./data-table";
import { columns } from "./table-columns";
import Link from "next/link";
import { verifySession } from "../lib/dal";
import prisma from "@/lib/prisma";

async function getData(): Promise<JobApplicationPrisma[]> {
  // Fetch data from your API here.
  const session = await verifySession();
  const jobApplications = await prisma.jobApplication.findMany({
    where: {
      userId: session.userId,
      softDeleted: false,
    },
    orderBy: {
      appliedDate: "desc",
    },
  });
  return jobApplications;
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

      <hr className="my-2" />

      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
