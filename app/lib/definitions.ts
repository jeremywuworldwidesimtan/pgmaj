import * as z from "zod";
import {
  JobModePrisma,
  JobTypePrisma,
  PayFrequencyPrisma,
  StatusPrisma,
} from "../types";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Username must be at least 2 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      error: "Username can only contain letters, numbers, and underscores.",
    })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { error: "Must contain at least one letter." })
    .regex(/[0-9]/, { error: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Must contain at least one special character.",
    })
    .trim(),
  firstName: z.string().trim().min(1, { error: "First name is required." }),
  lastName: z.string().trim().min(1, { error: "Last name is required." }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { error: "Please confirm your password." }),
});

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export const ApplicationFormSchema = z.object({
  company: z.string().trim().min(1, { error: "Company name is required." }),
  position: z.string().trim().min(1, { error: "Position is required." }),
  location: z.string().trim().min(1, { error: "Location is required." }),
  jobType: z.custom<JobTypePrisma>(
    (value) => typeof value === "string" && ["FullTime", "PartTime", "Contract", "Internship", "Freelance"].includes(value),
    { error: "Please select a job type." },
  ),
  jobMode: z.custom<JobModePrisma>(
    (value) => typeof value === "string" && ["Remote", "OnSite", "Hybrid"].includes(value),
    { error: "Please select a job mode." },
  ),
  status: z.custom<StatusPrisma>(
    (value) => typeof value === "string" && ["Applied", "Shortlisted", "Interviewed", "Offered", "Rejected"].includes(value),
    { error: "Please select a status." },
  ),
  appliedDate: z.date({ error: "Please enter a valid date." }),
  latestUpdate: z.date().nullable(),
  latestInterviewScheduledDate: z.date().nullable(),
  minPay: z
    .number({error: "Minimum pay must be a number."})
    .gt(0, { error: "Minimum pay must be greater than 0." })
    .nullable(),
  maxPay: z
    .number({error: "Maximum pay must be a number."})
    .gt(0, { error: "Maximum pay must be greater than 0." })
    .nullable(),
  payFrequency: z.custom<PayFrequencyPrisma>(
    (value) => typeof value === "string" && ["Hourly", "Weekly", "Monthly", "Yearly"].includes(value),
    { error: "Please select a pay frequency." },
  ).nullable(),
  jobDescription: z.string().trim().nullable(),
  referenceLink: z
    .url({ error: "Please enter a valid URL." })
    .trim()
    .nullable(),
  notes: z.string().trim().nullable(),
});

export const JobDescriptionComponentSchema = z.object({
  jobDescription: z.string().trim().nullable(),
  jobId: z.string().trim().min(1, { error: "Job ID is required." }),
});

export type SignupFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type ApplicationFormState =
  | {
      errors?: {
        company?: string[];
        position?: string[];
        location?: string[];
        jobType?: string[];
        jobMode?: string[];
        status?: string[];
        appliedDate?: string[];
        latestUpdate?: string[];
        latestInterviewScheduledDate?: string[];
        minPay?: string[];
        maxPay?: string[];
        payFrequency?: string[];
        jobDescription?: string[];
        referenceLink?: string[];
        notes?: string[];
      };
      message?: string;
      values?: {
        company: string;
        position: string;
        location: string;
        jobType: JobTypePrisma;
        jobMode: JobModePrisma;
        status: StatusPrisma;
        appliedDate: Date | null;
        latestUpdate: Date | null;
        latestInterviewScheduledDate: Date | null;
        minPay: number | null;
        maxPay: number | null;
        payFrequency: PayFrequencyPrisma | null;
        jobDescription: string | null;
        referenceLink: string | null;
        notes: string | null;
      };
    }
  | undefined;

export type JobDescriptionComponentState =
  | {
      errors?: {
        jobDescription?: string[];
        jobId?: string[];
      };
      message?: string;
      values?: {
        jobDescription: string | null;
        jobId: string;
      };
    }
  | undefined;


export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
