"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "../lib/dal";
import {
  ResumeDetailsSchema,
  ResumeDetailsState,
  ResumeEducationSchema,
  ResumeEducationState,
  ResumeExperienceSchema,
  ResumeExperienceState,
} from "../lib/resume-definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { JobTypePrisma, JobModePrisma, DegreeType } from "../types";

// #region Resume Actions
export async function updateResumeDetails(
  _state: ResumeDetailsState,
  formData: FormData,
): Promise<ResumeDetailsState> {
  // get user id from session
  const session = await verifySession();

  const validatedFields = ResumeDetailsSchema.safeParse({
    role: formData.get("role"),
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: {
        role: errors.role?.[0],
        bio: errors.bio?.[0],
      },
    };
  }

  const { role, bio } = validatedFields.data;

  // Prisma's upsert nested inside an update will create the details if missing or update them if they exist
  await prisma.resume.upsert({
    where: { userId: session.userId },
    update: {
      details: {
        upsert: {
          create: {
            role,
            bio,
          },
          update: {
            role,
            bio,
          },
        },
      },
    },
    create: {
      userId: session.userId,
      details: {
        create: {
          role,
          bio,
        },
      },
    },
  });

  revalidatePath("/dashboard/resume");
  redirect("/dashboard/resume");
}
// #endregion

// #region Experience Actions
export async function submitResumeExperience(
  _state: ResumeExperienceState,
  formData: FormData,
): Promise<ResumeExperienceState> {
  // get user id from session
  const session = await verifySession();

  const validatedFields = ResumeExperienceSchema.safeParse({
    id: formData.get("id") || null,
    company: formData.get("company"),
    position: formData.get("position"),
    location: formData.get("location"),
    jobType: formData.get("jobType"),
    jobMode: formData.get("jobMode"),
    lastSalary: Number(formData.get("lastSalary")),
    startDate: formData.get("startDate")
      ? new Date(formData.get("startDate") as string)
      : null,
    endDate: formData.get("endDate")
      ? new Date(formData.get("endDate") as string)
      : null,
    description: formData.get("description"),
  });

  if (validatedFields?.data?.id) {
    // Validate that the user owns the resume before updating
    const experience = await prisma.resumeExperience.findUnique({
      where: {
        id: validatedFields.data.id,
      },
      select: {
        resume: {
          select: { userId: true },
        },
      },
    });

    const session = await verifySession();
    const userId = session.userId;
    if (!experience || experience.resume.userId !== userId) {
      console.log("Resume not found or user does not own the resume.");
      return {
        message: "You do not have permission to update this resume.",
      };
    }
  }

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: {
        id: errors.id?.[0],
        company: errors.company?.[0],
        position: errors.position?.[0],
        location: errors.location?.[0],
        jobType: errors.jobType?.[0],
        jobMode: errors.jobMode?.[0],
        lastSalary: errors.lastSalary?.[0],
        startDate: errors.startDate?.[0],
        endDate: errors.endDate?.[0],
        description: errors.description?.[0],
      },
      values: {
        id: formData.get("id") as string,
        company: formData.get("company") as string,
        position: formData.get("position") as string,
        location: formData.get("location") as string,
        jobType: formData.get("jobType") as JobTypePrisma,
        jobMode: formData.get("jobMode") as JobModePrisma,
        lastSalary: Number(formData.get("lastSalary")),
        startDate: new Date(formData.get("startDate") as string),
        endDate: formData.get("endDate")
          ? new Date(formData.get("endDate") as string)
          : null,
        description: formData.get("description") as string,
      },
    };
  }

  const {
    id,
    company,
    position,
    location,
    jobType,
    jobMode,
    lastSalary,
    startDate,
    endDate,
    description,
  } = validatedFields.data;

  // Prisma's upsert nested inside an update will create the experience if missing or update them if they exist
  await prisma.resume.update({
    where: { userId: session.userId },
    data: {
      experiences: {
        upsert: {
          where: { id: id || "" },
          create: {
            company,
            position,
            location,
            jobType,
            jobMode,
            lastSalary,
            startDate,
            endDate,
            description,
          },
          update: {
            company,
            position,
            location,
            jobType,
            jobMode,
            lastSalary,
            startDate,
            endDate,
            description,
          },
        },
      },
    },
  });

  revalidatePath("/dashboard/resume?tab=experience");
  redirect("/dashboard/resume?tab=experience");
}

export const deleteExperience = async (experienceId: string) => {
  // Validate that the user owns the resume before updating
  const experience = await prisma.resumeExperience.findUnique({
    where: {
      id: experienceId,
    },
    select: {
      resume: {
        select: { userId: true },
      },
    },
  });

  const session = await verifySession();
  const userId = session.userId;
  if (!experience || experience.resume.userId !== userId) {
    console.log("Resume not found or user does not own the resume.");
    return {
      message: "You do not have permission to update this resume.",
    };
  }
  await prisma.resumeExperience.update({
    where: { id: experienceId },
    data: {
      softDeleted: true,
    },
  });

  revalidatePath("/dashboard/resume?tab=experience");
  redirect("/dashboard/resume?tab=experience");
};
// #endregion

// #region Education Actions
export async function submitResumeEducation(
  _state: ResumeEducationState,
  formData: FormData,
): Promise<ResumeEducationState> {
  // get user id from session
  const session = await verifySession();

  const validatedFields = ResumeEducationSchema.safeParse({
    id: formData.get("id") || null,
    institution: formData.get("institution"),
    degree: formData.get("degree") as DegreeType,
    fieldOfStudy: formData.get("fieldOfStudy"),
    gpa: formData.get("gpa") ? Number(formData.get("gpa")) : null,
    startDate: new Date(formData.get("startDate") as string),
    endDate: formData.get("endDate")
      ? new Date(formData.get("endDate") as string)
      : null,
    description: formData.get("description"),
  });

  if (validatedFields?.data?.id) {
    // Validate that the user owns the resume before updating
    const education = await prisma.resumeEducation.findUnique({
      where: {
        id: validatedFields.data.id,
      },
      select: {
        resume: {
          select: { userId: true },
        },
      },
    });

    const session = await verifySession();
    const userId = session.userId;
    if (!education || education.resume.userId !== userId) {
      console.log("Resume not found or user does not own the resume.");
      return {
        message: "You do not have permission to update this resume.",
      };
    }
  }

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: {
        id: errors.id?.[0],
        institution: errors.institution?.[0],
        degree: errors.degree?.[0],
        fieldOfStudy: errors.fieldOfStudy?.[0],
        startDate: errors.startDate?.[0],
        endDate: errors.endDate?.[0],
        description: errors.description?.[0],
      },
      values: {
        id: formData.get("id") as string,
        institution: formData.get("institution") as string,
        degree: formData.get("degree") as DegreeType,
        fieldOfStudy: formData.get("fieldOfStudy") as string,
        gpa: formData.get("gpa") ? Number(formData.get("gpa")) : null,
        startDate: new Date(formData.get("startDate") as string),
        endDate: formData.get("endDate")
          ? new Date(formData.get("endDate") as string)
          : null,
        description: formData.get("description") as string,
      },
    };
  }

  const {
    id,
    institution,
    degree,
    fieldOfStudy,
    gpa,
    startDate,
    endDate,
    description,
  } = validatedFields.data;

  // Prisma's upsert nested inside an update will create the experience if missing or update them if they exist
  await prisma.resume.update({
    where: { userId: session.userId },
    data: {
      educations: {
        upsert: {
          where: { id: id || "" },
          create: {
            institution,
            degree,
            fieldOfStudy,
            gpa,
            startDate,
            endDate,
            description,
          },
          update: {
            institution,
            degree,
            fieldOfStudy,
            gpa,
            startDate,
            endDate,
            description,
          },
        },
      },
    },
  });

  revalidatePath("/dashboard/resume?tab=education");
  redirect("/dashboard/resume?tab=education");
}

export const deleteEducation = async (educationId: string) => {
  // Validate that the user owns the resume before updating
  const education = await prisma.resumeEducation.findUnique({
    where: {
      id: educationId,
    },
    select: {
      resume: {
        select: { userId: true },
      },
    },
  });

  const session = await verifySession();
  const userId = session.userId;
  if (!education || education.resume.userId !== userId) {
    console.log("Resume not found or user does not own the resume.");
    return {
      message: "You do not have permission to update this resume.",
    };
  }
  await prisma.resumeEducation.update({
    where: { id: educationId },
    data: {
      softDeleted: true,
    },
  });

  revalidatePath("/dashboard/resume?tab=education");
  redirect("/dashboard/resume?tab=education");
};
// #endregion

// #region Projects Actions

// #endregion

// #region Skills Actions

// #endregion

// #region Certification Actions

// #endregion
