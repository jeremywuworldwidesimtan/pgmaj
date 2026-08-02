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

    const schedule: CalendarSchedule[] = []
    for (const app of applications) {
      for (const interview of app.interviews) {
        if (interview.interviewDate) {
          schedule.push({
            id: app.id,
            fullDate: interview.interviewDate,
            day: interview.interviewDate.getDate().toString(),
            event: {
              title: `${app.position} at ${app.company} (${interview.interviewIdx + 1})`,
              time: interview.interviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              link: `/dashboard/application/${app.id}`,
              location: interview.interviewLocation,
            }
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

export async function getUnscheduledApplications(userId: string) {
  try {
    const applications = await prisma.jobApplication.findMany({
      where: {
        userId: userId,
        latestInterviewScheduledDate: null,
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
    console.error("Error fetching unscheduled applications:", error);
    return [];
  }
}

export async function scheduleInterview(
  state: ScheduleInterviewFormState | undefined,
  formData: FormData,
): Promise<ScheduleInterviewFormState> {
  console.log("FormData:", Object.fromEntries(formData.entries()));

  const validatedFields = ScheduleInterviewFormStateSchema.safeParse({
    jobId: formData.get("unscheduledApplications"),
    latestInterviewScheduledDate: formData.get("scheduleDate"),
  });

  console.log("Received:", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { jobId, latestInterviewScheduledDate } = validatedFields.data;
  const JobInterviewScheduledDate = new Date(latestInterviewScheduledDate);

  await prisma.jobApplication.update({
    where: { id: jobId },
    data: {
      status: "Shortlisted",
      latestUpdate: new Date(),
      latestInterviewScheduledDate: JobInterviewScheduledDate,
    },
  });

  revalidatePath("/dashboard/scheduler");
  redirect("/dashboard/scheduler");
}
