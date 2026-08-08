import * as z from "zod";
import { JobTypePrisma, JobModePrisma, DegreeType, ProficiencyLevel } from "../types";

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
  lastSalary: z.number({ error: "Last salary must be a number." }).gte(0, { error: "Last salary must be at least 0." }).nullable(),
  startDate: z.date({ error: "Please enter a valid date." }),
  endDate: z.date().nullable(),
  description: z.string().trim().nullable(),
}).refine((data) => !data.endDate || data.endDate > data.startDate, {
  message: "End date must be after the start date",
  path: ["endDate"], // This attaches the error directly to the endDate field
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
  gpa: z.number({ error: "GPA must be a number." }).gte(0, { error: "GPA must be at least 0." }).lte(4, { error: "GPA cannot be more than 4." }).nullable(),
  startDate: z.date({ error: "Please enter a valid date." }),
  endDate: z.date().nullable(),
  description: z.string().trim().nullable(),
}).refine((data) => !data.endDate || data.endDate > data.startDate, {
  message: "End date must be after the start date",
  path: ["endDate"], // This attaches the error directly to the endDate field
});

export const ResumeProjectSchema = z.object({
  id: z.string().nullable(),
  name: z.string().trim().min(1, { error: "Project name is required." }),
  link: z.url({ error: "Please enter a valid URL." }).trim().nullable(),
  startDate: z.date({ error: "Please enter a valid date." }),
  endDate: z.date().nullable(),
  description: z.string().trim().nullable(),
}).refine((data) => !data.endDate || data.endDate > data.startDate, {
  message: "End date must be after the start date",
  path: ["endDate"], // This attaches the error directly to the endDate field
});

export const ResumeSkillSchema = z.object({
  id: z.string().nullable(),
  skill: z.string().trim().min(1, { error: "Skill name is required." }),
  proficiency: z.custom<ProficiencyLevel>(
    (value) =>
      typeof value === "string" &&
      ["Beginner", "Intermediate", "Advanced", "Expert"].includes(value),
    { error: "Please select a proficiency level." },
  ),
  yearsOfExperience: z.number({ error: "Years of experience must be a number." }).gte(0, { error: "Years of experience must be at least 0." }),
});

export const ResumeCertificationSchema = z.object({
  id: z.string().nullable(),
  name: z.string().trim().min(1, { error: "Certification name is required." }),
  issuingOrganization: z.string().trim().min(1, { error: "Issuing organization is required." }),
  issueDate: z.date({ error: "Please enter a valid issue date." }),
  expirationDate: z.date().nullable(),
  credentialId: z.string().trim().nullable(),
  credentialUrl: z.url({ error: "Please enter a valid URL." }).trim().nullable(),
}).refine((data) => !data.expirationDate || data.expirationDate > data.issueDate, {
  message: "Expiration date must be after the issue date",
  path: ["expirationDate"], // This attaches the error directly to the expirationDate field
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

export type ResumeProjectState =
  | {
      errors?: {
        id?: string;
        name?: string;
        link?: string;
        startDate?: string;
        endDate?: string;
        description?: string;
      };
      message?: string;
      values?: {
        id: string;
        name: string;
        link?: string | null;
        startDate: Date;
        endDate?: Date | null;
        description?: string | null;
      };
    }
  | undefined;

export type ResumeSkillState =
  | {
      errors?: {
        id?: string;
        skill?: string;
        proficiency?: string;
        yearsOfExperience?: string;
      };
      message?: string;
      values?: {
        id: string;
        skill: string;
        proficiency: ProficiencyLevel;
        yearsOfExperience: number;
      };
    }
  | undefined;

export type ResumeCertificationState =
  | {
      errors?: {
        id?: string;
        name?: string;
        issuingOrganization?: string;
        issueDate?: string;
        expirationDate?: string;
        credentialId?: string;
        credentialUrl?: string;
      };
      message?: string;
      values?: {
        id: string;
        name: string;
        issuingOrganization: string;
        issueDate: Date;
        expirationDate?: Date | null;
        credentialId?: string | null;
        credentialUrl?: string | null;
      };
    }
  | undefined;