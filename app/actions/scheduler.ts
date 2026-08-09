"use server";

import { CalendarSchedule } from "@/components/scheduler/calendar-grid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  ScheduleInterviewFormState,
  ScheduleInterviewFormStateSchema,
} from "../lib/definitions";
import { revalidatePath } from "next/cache";
import { verifySession } from "../lib/dal";

export async function getSchedule(): Promise<CalendarSchedule[] | undefined> {
  // use session-based ID
  const session = await verifySession();
  try {
    const applications = await prisma.jobApplication.findMany({
      where: {
        userId: session.userId,
        softDeleted: false,
      },
      select: {
        id: true,
        position: true,
        company: true,
        interviews: {
          where: {
            softDeleted: false,
          },
          orderBy: {
            interviewDate: "desc",
          },
          select: {
            interviewIdx: true,
            interviewDate: true,
            interviewLocation: true,
          },
        },
      },
    });

    const schedule: CalendarSchedule[] = [];
    for (const app of applications) {
      for (const interview of app.interviews) {
        schedule.push({
          id: `${app.id}-${interview.interviewIdx}`,
          fullDate: interview.interviewDate,
          day: interview.interviewDate.getDate().toString(),
          event: {
            title: `${app.position} at ${app.company} (${app.interviews.length - app.interviews.indexOf(interview)})`,
            time: interview.interviewDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            link: `/dashboard/application/${app.id}`,
            location: interview.interviewLocation,
          },
        });
      }
    }

    return schedule;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return undefined;
  }
}

export async function getApplications() {
  const session = await verifySession();
  try {
    const applications = await prisma.jobApplication.findMany({
      where: {
        userId: session.userId,
        softDeleted: false,
      },
      select: {
        id: true,
        position: true,
        company: true,
      },
    });
    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export async function scheduleInterview(
  state: ScheduleInterviewFormState | undefined,
  formData: FormData,
): Promise<ScheduleInterviewFormState> {
  // Validate that the user owns the job application before updating
  const jobApplicationUserId = await prisma.jobApplication.findUnique({
    where: { id: formData.get("jobId") as string },
    select: { userId: true },
  });

  const session = await verifySession();
  const userId = session.userId;
  if (!jobApplicationUserId || jobApplicationUserId.userId !== userId) {
    return {
      message: "You do not have permission to update this job application.",
    };
  }

  const highestIdx = await prisma.interview.aggregate({
    where: {
      jobId: formData.get("jobId") as string,
      softDeleted: false,
    },
    _max: {
      interviewIdx: true,
    },
  });

  const validatedFields = ScheduleInterviewFormStateSchema.safeParse({
    jobId: formData.get("jobId"),
    interviewIdx: highestIdx._max.interviewIdx
      ? highestIdx._max.interviewIdx + 1
      : 0,
    interviewId: formData.get("interviewId") || null,
    interviewDate: formData.get("interviewDate")
      ? new Date(formData.get("interviewDate") as string)
      : null,
    interviewLocation: formData.get("interviewLocation"),
    interviewerName: formData.get("interviewerName") || null,
    interviewerContact: formData.get("interviewerContact") || null,
  });

  // check against the applied date of the job application and the latest interview date of the job application
  const appliedDate = await prisma.jobApplication.findUnique({
    where: { id: formData.get("jobId") as string },
    select: { appliedDate: true },
  });

  const latestInterview = await prisma.interview.findFirst({
    where: {
      jobId: formData.get("jobId") as string,
      softDeleted: false,
    },
    orderBy: {
      interviewDate: "desc",
    },
    select: {
      interviewDate: true,
    },
  });

  if (appliedDate?.appliedDate && validatedFields?.data?.interviewDate) {
    if (validatedFields.data.interviewDate < appliedDate.appliedDate) {
      return {
        errors: {
          interviewDate: [
            "Interview date must be after the applied date of the job application.",
          ],
        },
      };
    }
  }

  if (latestInterview?.interviewDate && validatedFields?.data?.interviewDate) {
    if (validatedFields.data.interviewDate < latestInterview.interviewDate) {
      return {
        errors: {
          interviewDate: [
            "Interview date must be after the latest interview date of the job application.",
          ],
        },
      };
    }
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    jobId,
    interviewIdx,
    interviewDate,
    interviewLocation,
    interviewerName,
    interviewerContact,
  } = validatedFields.data;

  await prisma.jobApplication.update({
    where: { id: jobId },
    data: {
      status: "Shortlisted",
      latestUpdate: new Date(),
    },
  });

  await prisma.interview.create({
    data: {
      jobId,
      interviewIdx: interviewIdx || 0,
      interviewDate: interviewDate || new Date(),
      interviewLocation: interviewLocation || "",
      interviewerName: interviewerName || null,
      interviewerContact: interviewerContact || null,
    },
  });

  revalidatePath("/dashboard/scheduler");
  redirect("/dashboard/scheduler");
}
