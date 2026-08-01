import { Button } from "@/components/ui/button";
import { JobApplicationPrisma } from "../types";
import { DataTable } from "./data-table";
import { columns } from "./table-columns";
import Link from "next/link";
import { verifySession } from "../lib/dal";
import prisma from "@/lib/prisma";
import { getUser } from "../actions/getUserInfo";
import MobileCards from "@/components/dashboard/mobile-cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications Dashboard | PGMAJ Dashboard",
  description: "Manage your job applications and track your progress.",
};

async function getData(): Promise<JobApplicationPrisma[]> {
  // Fetch data from your API here.
  const session = await verifySession();
  const user = await getUser(session.userId);
  const preferredCurrency = user?.preferredCurrency || "$"; // Default to "$" if not set
  const jobApplications = await prisma.jobApplication.findMany({
    where: {
      userId: session.userId,
      softDeleted: false,
    },
    orderBy: {
      appliedDate: "desc",
    },
  });
  return jobApplications.map((app) => ({
    ...app,
    preferredCurrency, // Add the preferred currency to each application
  }));
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <>
      <div className="flex flex-col md:flex-row w-full items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Applications Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Here you can manage your job applications and track your progress.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <Link href="/dashboard/application/add">
            <Button>Add Application</Button>
          </Link>
        </div>
      </div>

      <hr className="my-2" />

      <div className="w-full hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>

      {/* use a card-based approach for mobile */}
      <div className="w-full md:hidden">
        <MobileCards applications={data} />
      </div>
    </>
  );
}
