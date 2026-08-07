import * as z from "zod";
import { JobTypePrisma, JobModePrisma, DegreeType } from "../types";

export const ResumeDetailsSchema = z.object({
  id: z.string().nullable(),
  role: z.string().nullable(),
  bio: z.string().nullable(),
});

export const ResumeExperienceSchema = z.object({
  id: z.string().nullable(),
  company: z.string().trim().min(1, { error: "Company name is required." }),
  position: z.string().trim().min(1, { error: "Position is required." }),
  location: z.string().trim().min(1, { error: "Location is required." }),
  jobType: z.custom<JobTypePrisma>(
    (value) =>
      typeof value === "string" &&
      ["FullTime", "PartTime", "Contract", "Internship", "Freelance"].includes(
        value,
      ),
    { error: "Please select a job type." },
  ),
  jobMode: z.custom<JobModePrisma>(
    (value) =>
      typeof value === "string" &&
      ["Remote", "OnSite", "Hybrid"].includes(value),
    { error: "Please select a job mode." },
  ),
  lastSalary: z.number({ error: "Last salary must be a number." }).nullable(),
  startDate: z.date({ error: "Please enter a valid date." }),
  endDate: z.date().nullable(),
  description: z.string().trim().nullable(),
});

export const ResumeEducationSchema = z.object({
  id: z.string().nullable(),
  institution: z.string().trim().min(1, { error: "Institution name is required." }),
  degree: z.custom<DegreeType>(
    (value) =>
      typeof value === "string" &&
      ["HighSchool", "Diploma", "Associate", "Bachelor", "Master", "Doctorate"].includes(
        value,
      ),
    { error: "Please select a degree." },
  ),
  fieldOfStudy: z.string().trim().min(1, { error: "Field of study is required." }),
  gpa: z.number({ error: "GPA must be a number." }).nullable(),
  startDate: z.date({ error: "Please enter a valid date." }),
  endDate: z.date().nullable(),
  description: z.string().trim().nullable(),
});

export type ResumeDetailsState =
  | {
      errors?: {
        id?: string;
        role?: string;
        bio?: string;
      };
      message?: string;
      values?: {
        id: string | null;
        role: string | null;
        bio: string | null;
      };
    }
  | undefined;

export type ResumeExperienceState =
  | {
      errors?: {
        id?: string;
        company?: string;
        position?: string;
        location?: string;
        jobType?: string;
        jobMode?: string;
        lastSalary?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
      };
      message?: string;
      values?: {
        id: string;
        company: string;
        position: string;
        location: string;
        jobType: JobTypePrisma;
        jobMode: JobModePrisma;
        lastSalary?: number | null;
        startDate: Date;
        endDate?: Date | null;
        description?: string | null;
      };
    }
  | undefined;

export type ResumeEducationState =
  | {
      errors?: {
        id?: string;
        institution?: string;
        degree?: string;
        fieldOfStudy?: string;
        gpa?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
      };
      message?: string;
      values?: {
        id: string;
        institution: string;
        degree: DegreeType;
        fieldOfStudy: string;
        gpa?: number | null;
        startDate: Date;
        endDate?: Date | null;
        description?: string | null;
      };
    }
  | undefined;
