import ApplicationForm from "@/components/forms/application-form";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Application",
  description: "Edit an existing job application.",
};

async function getFormData(id: string) {
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

export default async function EditApplication({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getFormData(id);
  const jobDesc = await getJobDesc(id);
  const interviews = await getInterviews(id);

  if (!data || data.softDeleted) {
    notFound();
  }
  return (
    <>
        <Link href="/dashboard" className="text-sm hover:underline">
            &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-2">Edit Application</h1>

        <div>
            <ApplicationForm formData={{ ...data, jobDescription: jobDesc?.description, interviewCount: interviews.length, interviews: interviews.map(interview => ({ interviewId: interview.id, ...interview })) || null }} />
        </div>
    </>
  )
}