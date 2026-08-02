import { getUser } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";
import { colorStatus, formatType, parseDate, shortenWebURL } from "@/app/lib/helper";
import DeleteButton from "@/components/dashboard/delete";
import JobDescriptionComponent from "@/components/dashboard/job-description";
import JobNotesComponent from "@/components/dashboard/job-notes";
import UpdateStatusButton from "@/components/dashboard/update-status";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const applicationInfo = await prisma.jobApplication.findFirst({
    where: {
    id: id,
    },
    select: {
      position: true,
      company: true,
    },
  });
  return {
    title: applicationInfo?.position && applicationInfo?.company ? `${applicationInfo?.position} at ${applicationInfo?.company} - Application Details` : "Job not found",
    description: "View your application details",
  };
}

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

async function getInterviews(id: string) {
  // Fetch data from your API here.
  const response = await prisma.interview.findMany({
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
  const interviews = await getInterviews(id);
  const session = await verifySession();
  const user = await getUser(session.userId);
  const preferredCurrency = user?.preferredCurrency || "$"; // Default to "$" if not set

  if (!data || data.softDeleted) {
    notFound();
  }

  return (
    <>
      <Link href="/dashboard" className="text-sm hover:underline">
        &larr; Back to Dashboard
      </Link>

      <Suspense fallback={<div>Loading Application...</div>}>
        <div className="mt-4 flex flex-col lg:flex-row lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">{data.position}</h1>
            <p className="text-lg lg:text-xl">at {data.company}</p>
            <p className="text-sm">in {data.location}</p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/dashboard/application/${data.id}/edit`}>
                  Edit Application
                </Link>
              </Button>
              <DeleteButton jobId={data.id} />
            </div>
            <div className="flex gap-2">
              <UpdateStatusButton status={data.status} jobId={data.id} />
            </div>
          </div>
          <div className="lg:hidden flex flex-col items-start gap-2">
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/dashboard/application/${data.id}/edit`}>
                  Edit
                </Link>
              </Button>
              <DeleteButton jobId={data.id} />
              <UpdateStatusButton status={data.status} jobId={data.id} />
            </div>
          </div>
        </div>
        <hr className="my-2 lg:my-4" />
        <Link href="#job-description" className="text-sm block lg:hidden">
          &darr; Go to Job Description
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
              <p>
                <strong>Job Type:</strong> {formatType(data.jobType)}
              </p>
              <p>
                <strong>Job Mode:</strong> {formatType(data.jobMode)}
              </p>
              <p className="lg:col-span-2">
                <strong>Status:</strong>{" "}
                <span className={colorStatus(data.status)}>
                  {formatType(data.status)}
                </span>
              </p>
            </div>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
                <p>
                  <strong>Applied:</strong>{" "}
                  {data.appliedDate
                    ? parseDate(data.appliedDate, "british", "short", "dot")
                    : "N/A"}
                </p>
                <p>
                  <strong>Updated:</strong>{" "}
                  {data.latestUpdate
                    ? parseDate(data.latestUpdate, "british", "short", "dot")
                    : "N/A"}
                </p>
                <p className="lg:col-span-2">
                  <strong>Interview:</strong>{" "}
                  {data.latestInterviewScheduledDate
                    ? `${parseDate(
                        data.latestInterviewScheduledDate,
                        "british",
                        "short",
                        "dot",
                      )} ${data.latestInterviewScheduledDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "N/A"}
                </p>
              </div>
            </div>
            {interviews.length > 0 && (
              <div>
                <p className="font-medium">Interviews:</p>
                <div>
                  {interviews.map((interview) => (
                    <p key={interview.id}>
                      {parseDate(interview.interviewDate, "british", "short", "dot")} at {interview.interviewLocation} {interview.interviewerName && `(with ${interview.interviewerName})`}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <div>
              {data.minPay && data.maxPay ? (
                <p>
                  Pay Range: {preferredCurrency}
                  {data.minPay.toLocaleString()} - {preferredCurrency}
                  {data.maxPay.toLocaleString()} ({data.payFrequency})
                </p>
              ) : data.minPay && !data.maxPay ? (
                <p>
                  Pay Range: {preferredCurrency}
                  {data.minPay.toLocaleString()} ({data.payFrequency})
                </p>
              ) : (
                <p>Pay Range: N/A</p>
              )}
            </div>
            <div>
              <p>
                Website:{" "}
                <Link
                  href={data.referenceLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline hidden lg:inline"
                >
                  {data.referenceLink}
                </Link>
                <Link
                  href={data.referenceLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline lg:hidden"
                >
                  {shortenWebURL(data.referenceLink || "#")}
                </Link>
              </p>
            </div>
            <div>
              <Suspense fallback={<div>Loading Notes...</div>}>
                <JobNotesComponent notes={data.notes} jobId={data.id} />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={<div>Loading Job Description...</div>}>
            <JobDescriptionComponent
              jobDescription={jobDesc?.description || null}
              jobId={data.id}
            />
          </Suspense>
        </div>
      </Suspense>
    </>
  );
}
