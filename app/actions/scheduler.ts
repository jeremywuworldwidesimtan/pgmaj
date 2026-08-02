"use server";

import { CalendarSchedule } from "@/components/scheduler/calendar-grid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  ScheduleInterviewFormState,
  ScheduleInterviewFormStateSchema,
} from "../lib/definitions";
import { revalidatePath } from "next/cache";

export async function getSchedule(
  userId: string,
): Promise<CalendarSchedule[] | undefined> {
  try {
    const applications = await prisma.jobApplication.findMany({
      where: {
        userId: userId,
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

    console.log("Fetched applications for schedule:", applications);

    const schedule: CalendarSchedule[] = [];
    for (const app of applications) {
      for (const interview of app.interviews) {
        if (interview.interviewDate) {
          schedule.push({
            id: app.id,
            fullDate: interview.interviewDate,
            day: interview.interviewDate.getDate().toString(),
            event: {
              title: `${app.position} at ${app.company} (${interview.interviewIdx + 1})`,
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
    }

    return schedule;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return undefined;
  }
}

export async function getApplications(userId: string) {
  try {
    const applications = await prisma.jobApplication.findMany({
      where: {
        userId: userId,
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
  console.log("FormData:", Object.fromEntries(formData.entries()));

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

  console.log("Received:", validatedFields);

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
