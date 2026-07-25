import { formatType, parseDate } from "@/app/lib/helper";
import JobDescriptionComponent from "@/components/dashboard/job-description";
import TextareaField from "@/components/fields/textarea-field";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  // Fetch data from your API here.
  const response = await prisma.jobApplication.findFirst({
    where: {
      id: id,
    },
  });

  return response;
}

async function getJobDesc(id: string) {
  // Fetch data from your API here.
  const response = await prisma.jobDescription.findFirst({
    where: {
      jobId: id,
    },
  });

  return response;
}

export default async function ApplicationDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getData(id);
  const jobDesc = await getJobDesc(id);

  if (!data || data.softDeleted) {
    notFound();
  }

  return (
    <>
      <Link href="/dashboard" className="text-sm hover:underline">
        &larr; Back to Dashboard
      </Link>
      <h2 className="text-2xl font-bold mt-2">Application Details</h2>

      <div className="mt-4 flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">{data.position}</h1>
          <p className="text-xl">at {data.company}</p>
          <p>in {data.location}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/dashboard/application/${data.id}/edit`}>
              Edit Application
            </Link>
          </Button>
          <Button asChild variant="destructive">
            <Link href={`/dashboard/application/${data.id}/delete`}>
              Delete Application
            </Link>
          </Button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <p>
              <strong>Job Type:</strong> {formatType(data.jobType)}
            </p>
            <p>
              <strong>Job Mode:</strong> {formatType(data.jobMode)}
            </p>
            <p>
              <strong>Status:</strong> {formatType(data.status)}
            </p>
          </div>
          <div>
            <p>
              Pay Range: ${data.minPay} - ${data.maxPay} ({data.payFrequency})
            </p>
          </div>
          <div>
            <p>
              <strong>Application Date:</strong>{" "}
              {data.appliedDate
                ? parseDate(data.appliedDate, "british", "short", "dot")
                : "N/A"}
            </p>
            <p>
              <strong>Latest Update:</strong>{" "}
              {data.latestUpdate
                ? parseDate(data.latestUpdate, "british", "short", "dot")
                : "N/A"}
            </p>
            <p>
              <strong>Interview Date:</strong>{" "}
              {data.latestInterviewScheduledDate
                ? parseDate(
                    data.latestInterviewScheduledDate,
                    "british",
                    "short",
                    "dot",
                  )
                : "N/A"}
            </p>
          </div>
          <div>
            <p>
              Website:{" "}
              <Link
                href={data.referenceLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {data.referenceLink}
              </Link>
            </p>
          </div>
          <div>
            <form action="">
              <TextareaField
                id="notes"
                name="notes"
                label="Notes"
                placeholder="Enter your notes here..."
                value={data.notes || ""}
              />
            </form>
          </div>
        </div>
        <JobDescriptionComponent
          jobDescription={jobDesc?.description || null}
          jobId={data.id}
        />
      </div>
    </>
  );
}
