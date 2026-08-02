"use server";

import prisma from "@/lib/prisma";
import {
  ApplicationFormSchema,
  ApplicationFormState,
  InterviewSchema,
  JobDescriptionComponentSchema,
  JobDescriptionComponentState,
  JobNotesComponentSchema,
  JobNotesComponentState,
  JobStatusUpdateSchema,
  JobStatusUpdateState,
} from "../lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  JobTypePrisma,
  JobModePrisma,
  StatusPrisma,
  PayFrequencyPrisma,
} from "../types";
import { verifySession } from "../lib/dal";
import { getUser } from "./getUserInfo";

type JobApplicationPayload = {
  company: string;
  position: string;
  location: string;
  jobType: JobTypePrisma;
  jobMode: JobModePrisma;
  status: StatusPrisma;
  appliedDate: Date | null;
  latestUpdate?: Date | null;
  latestInterviewScheduledDate?: Date | null;
  minPay?: number | null | undefined;
  maxPay?: number | null | undefined;
  payFrequency?: PayFrequencyPrisma | null;
  jobDescription?: string | null;
  referenceLink?: string | null;
  notes?: string | null;
};

type interviewPayload = {
  jobId: string;
  interviewIdx: number;
  interviewId: string;
  interviewDate: Date;
  interviewLocation: string;
  interviewerName: string | null;
  interviewerContact: string | null;
  notes: string | null;
};

async function updatejobApplication(
  jobId: string,
  data: JobApplicationPayload,
  interviews: interviewPayload[]
) {
  // Separate the job description from the payload
  const { jobDescription, ...updateData } = data || {};

  // Update the job application without the job description

  await prisma.jobApplication.update({
    where: { id: jobId },
    data: updateData,
  });

  for (const interview of interviews) {
    await prisma.interview.upsert({
      where: { id: interview.interviewId || "" },
      update: {
        interviewDate: interview.interviewDate,
        interviewLocation: interview.interviewLocation,
        interviewerName: interview.interviewerName,
        interviewerContact: interview.interviewerContact,
        notes: interview.notes,
      },
      create: {
        jobId: interview.jobId,
        interviewIdx: interview.interviewIdx,
        interviewDate: interview.interviewDate,
        interviewLocation: interview.interviewLocation,
        interviewerName: interview.interviewerName,
        interviewerContact: interview.interviewerContact,
        notes: interview.notes,
      },
    });
  }

  // soft delete any interviews that are not in the payload
  const interviewIds = interviews.map((interview) => interview.interviewId);
  await prisma.interview.updateMany({
    where: {
      jobId,
      id: {
        notIn: interviewIds,
      },
    },
    data: {
      softDeleted: true,
    },
  });

  await prisma.jobDescription.update({
    where: { jobId },
    data: { description: jobDescription },
  });
}

export async function updateJobDescription(
  state: JobDescriptionComponentState | undefined,
  formData: FormData,
): Promise<JobDescriptionComponentState> {
  const validatedFields = JobDescriptionComponentSchema.safeParse({
    jobDescription: formData.get("jobDescription"),
    jobId: formData.get("jobId"),
  });

  console.log("Received JD:", validatedFields.data?.jobDescription);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { jobId, jobDescription } = validatedFields.data;

  await prisma.jobDescription.update({
    where: { jobId },
    data: { description: jobDescription },
  });
  revalidatePath("/dashboard/application/" + jobId);
  redirect("/dashboard/application/" + jobId);
}

export async function updateJobNotes(
  state: JobNotesComponentState | undefined,
  formData: FormData,
): Promise<JobNotesComponentState> {
  const validatedFields = JobNotesComponentSchema.safeParse({
    notes: formData.get("notes"),
    jobId: formData.get("jobId"),
  });

  console.log("Received Notes:", validatedFields.data?.notes);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { jobId, notes } = validatedFields.data;

  await prisma.jobApplication.update({
    where: { id: jobId },
    data: { notes: notes },
  });
  revalidatePath("/dashboard/application/" + jobId);
  redirect("/dashboard/application/" + jobId);
}

export async function updateJobStatus(
  state: JobStatusUpdateState | undefined,
  formData: FormData,
): Promise<JobStatusUpdateState> {
  console.log("Form Data:", Object.fromEntries(formData.entries()));
  const validatedFields = JobStatusUpdateSchema.safeParse({
    status: formData.get("status"),
    updateDates: formData.get("updateDates") === "on" ? true : false,
    latestUpdate: formData.get("latestUpdate")
      ? new Date(formData.get("latestUpdate") as string)
      : null,
    latestInterviewScheduledDate: formData.get("latestInterviewScheduledDate")
      ? new Date(formData.get("latestInterviewScheduledDate") as string)
      : null,
    jobId: formData.get("jobId"),
  });

  console.log("Received Status Update:", validatedFields.data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    jobId,
    status,
    latestUpdate,
    latestInterviewScheduledDate,
    updateDates,
  } = validatedFields.data;

  if (!updateDates) {
    await prisma.jobApplication.update({
      where: { id: jobId },
      data: { status },
    });
  } else {
    // if only update date changed
    if (latestUpdate && !latestInterviewScheduledDate) {
      await prisma.jobApplication.update({
        where: { id: jobId },
        data: { status, latestUpdate },
      });
    // if only interview date changed
    } else if (!latestUpdate && latestInterviewScheduledDate) {
      await prisma.jobApplication.update({
        where: { id: jobId },
        data: { status, latestInterviewScheduledDate },
      });
    } else {
      await prisma.jobApplication.update({
        where: { id: jobId },
        data: { status, latestUpdate, latestInterviewScheduledDate },
      });
    }
  }
  revalidatePath("/dashboard/application/" + jobId);
  redirect("/dashboard/application/" + jobId);
}

async function createjobApplication(data: JobApplicationPayload, interviews: interviewPayload[]) {
  const session = await verifySession();
  const userId = await getUser(session.userId);
  // Separate the job description from the payload
  const { jobDescription, ...updateData } = data || {};

  // Create the job application
  const createdJobApplication = await prisma.jobApplication.create({
    data: {
      ...updateData,
      user: {
        connect: {
          id: userId?.id,
        },
      },
    },
  });

  // Create the interviews
  for (const interview of interviews) {
    await prisma.interview.create({
      data: {
        ...interview,
        jobId: createdJobApplication.id,
      },
    });
  }

  await prisma.jobDescription.create({
    data: {
      description: jobDescription,
      jobId: createdJobApplication.id,
    },
  });
}

export async function deletejobApplication(jobId: string) {
  await prisma.jobApplication.update({
    where: { id: jobId },
    data: { softDeleted: true },
  });

  await prisma.jobDescription.update({
    where: { jobId },
    data: { softDeleted: true },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function submitApplicationForm(
  _state: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  console.log("submitApplicationForm called with formData:", Object.fromEntries(formData.entries()));

  // Compile all the interview information into a single array
  const interviews: {
    jobId: string;
    interviewIdx: number;
    interviewId: string | null;
    interviewDate: Date | null;
    interviewLocation: string | null;
    interviewerName: string | null;
    interviewerContact: string | null;
    notes: null;
  }[] = [];

  const interviewCount = Number(formData.get("interviewCount")) || 0;

  for (let i = 0; i < interviewCount; i++) {
    const interviewDate = formData.get(`interviewDate_${i}`);
    const interviewLocation = formData.get(`interviewLocation_${i}`);
    const interviewerName = formData.get(`interviewerName_${i}`);
    const interviewerContact = formData.get(`interviewerContact_${i}`);
    const interviewId = formData.get(`interviewID_${i}`); // Get the interview ID if it exists
    if (interviewDate || interviewLocation || interviewerName || interviewerContact) {
      interviews.push({
        jobId: formData.get("jobId") as string,
        interviewIdx: i,
        interviewId: interviewId ? (interviewId as string) : null,
        interviewDate: interviewDate ? new Date(interviewDate as string) : null,
        interviewLocation: interviewLocation ? (interviewLocation as string) : null,
        interviewerName: interviewerName ? (interviewerName as string) : null,
        interviewerContact: interviewerContact ? (interviewerContact as string) : null,
        notes: null,
      });
    }
  }

  console.log("Compiled Interviews:", interviews);

  const validatedFields = ApplicationFormSchema.safeParse({
    company: formData.get("company"),
    position: formData.get("position"),
    location: formData.get("location"),
    jobType: formData.get("jobType"),
    jobMode: formData.get("jobMode"),
    status: formData.get("status"),
    appliedDate: formData.get("appliedDate")
      ? new Date(formData.get("appliedDate") as string)
      : null,
    latestUpdate: formData.get("latestUpdate")
      ? new Date(formData.get("latestUpdate") as string)
      : null,
    latestInterviewScheduledDate: formData.get("latestInterviewScheduledDate")
      ? new Date(formData.get("latestInterviewScheduledDate") as string)
      : null,
    minPay: Number(formData.get("minPay")),
    maxPay: Number(formData.get("maxPay")),
    payFrequency: formData.get("payFrequency"),
    jobDescription: formData.get("jobDescription"),
    referenceLink: formData.get("referenceLink"),
    notes: formData.get("notes"),
  });

  let interviewValidation = true;
  const validatedInterviews = [];

  for (const interview of interviews) {
    const validatedInterview = InterviewSchema.safeParse({
      jobId: interview.jobId,
      interviewIdx: interview.interviewIdx,
      interviewId: interview.interviewId,
      interviewDate: interview.interviewDate ? new Date(interview.interviewDate) : null,
      interviewLocation: interview.interviewLocation || "",
      interviewerName: interview.interviewerName || null,
      interviewerContact: interview.interviewerContact || null,
      notes: null,
    });
    if (!validatedInterview.success) {
      interviewValidation = false;
      break;
    } else {
      validatedInterviews.push(validatedInterview.data);
    }
  }

  if (!validatedFields.success || !interviewValidation) {
    return {
      errors: validatedFields?.error?.flatten().fieldErrors ?? {},
      values: {
        company: formData.get("company") as string,
        position: formData.get("position") as string,
        location: formData.get("location") as string,
        jobType: formData.get("jobType") as JobTypePrisma,
        jobMode: formData.get("jobMode") as JobModePrisma,
        status: formData.get("status") as StatusPrisma,
        appliedDate: formData.get("appliedDate")
          ? new Date(formData.get("appliedDate") as string)
          : null,
        latestUpdate: formData.get("latestUpdate")
          ? new Date(formData.get("latestUpdate") as string)
          : null,
        latestInterviewScheduledDate: formData.get("latestInterviewScheduledDate")
          ? new Date(formData.get("latestInterviewScheduledDate") as string)
          : null,
        minPay: Number(formData.get("minPay")),
        maxPay: Number(formData.get("maxPay")),
        payFrequency: formData.get("payFrequency") as PayFrequencyPrisma | null,
        jobDescription: formData.get("jobDescription") as string | null,
        referenceLink: formData.get("referenceLink") as string | null,
        notes: formData.get("notes") as string | null,
        interviews: interviews.map((interview) => ({
          jobId: interview.jobId as string,
          interviewIdx: interview.interviewIdx as number,
          interviewId: interview.interviewId as string,
          interviewDate: interview.interviewDate as Date,
          interviewLocation: interview.interviewLocation as string,
          interviewerName: interview.interviewerName as string | null,
          interviewerContact: interview.interviewerContact as string | null,
          notes: interview.notes as string | null,
        })),
      },
    };
  }

  const jobId = formData.get("jobId") as string | null;
  const payload = validatedFields.data;

  if (!payload.payFrequency) {
    payload.payFrequency = null; // Set to null if empty string
  }

  console.log("Payload to be submitted:", payload);
  console.log("Payload to be submitted:", validatedInterviews);

  if (typeof jobId === "string" && jobId.length > 0) {
    if (!(await prisma.jobApplication.findUnique({ where: { id: jobId } }))) {
      return {
        message: "Invalid job ID.",
      };
    }

    await updatejobApplication(jobId, payload, validatedInterviews);
  } else {
    await createjobApplication(payload, validatedInterviews);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/application/" + jobId);
  redirect("/dashboard/application/" + jobId);
}
