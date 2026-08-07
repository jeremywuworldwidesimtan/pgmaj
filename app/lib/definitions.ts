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
    .regex(/^[a-z0-9_]+$/, {
      error: "Username can only contain lowercase letters, numbers, and underscores.",
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
  status: z.custom<StatusPrisma>(
    (value) =>
      typeof value === "string" &&
      ["Applied", "Shortlisted", "Interviewed", "Offered", "Rejected"].includes(
        value,
      ),
    { error: "Please select a status." },
  ),
  appliedDate: z.date({ error: "Please enter a valid date." }),
  latestUpdate: z.date().nullable(),
  latestInterviewScheduledDate: z.date().nullable(),
  minPay: z
    .number({ error: "Minimum pay must be a number." })
    .optional(),
  maxPay: z
    .number({ error: "Maximum pay must be a number." })
    .optional(),
  payFrequency: z.custom<PayFrequencyPrisma>(
    (value) =>
      typeof value === "string" &&
      ["", "Hourly", "Weekly", "Monthly", "Yearly"].includes(value),
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

export const JobNotesComponentSchema = z.object({
  notes: z.string().trim().nullable(),
  jobId: z.string().trim().min(1, { error: "Job ID is required." }),
});

export const JobStatusUpdateSchema = z.object({
  status: z.custom<StatusPrisma>(
    (value) =>
      typeof value === "string" &&
      ["Applied", "Shortlisted", "Interviewed", "Offered", "Rejected"].includes(
        value,
      ),
    { error: "Please select a status." },
  ),
  updateDates: z.boolean(),
  latestUpdate: z.date().nullable(),
  latestInterviewScheduledDate: z.date().nullable(),
  jobId: z.string().trim().min(1, { error: "Job ID is required." }),
  interviewIdx: z.number().int().nullable(),
  interviewDate: z.date({ error: "Please enter a valid date." }).nullable(),
  interviewLocation: z.string().trim().min(1, { error: "Interview location is required." }).nullable(),
  interviewerName: z.string().trim().nullable(),
  interviewerContact: z.string().trim().nullable(),
});

export const ProfileEditFormSchema = z.object({
  id: z.string().trim().min(1, { error: "User ID is required." }),
  altEmail: z.email({ error: "Please enter a valid email." }).trim().nullable(),
  bio: z.string().trim().nullable(),
  firstName: z.string().trim().nullable(),
  lastName: z.string().trim().nullable(),
  contact_number: z.string().trim().nullable(),
  addr_line1: z.string().trim().nullable(),
  addr_line2: z.string().trim().nullable(),
  city: z.string().trim().nullable(),
  st: z.string().trim().nullable(),
  country: z.string().trim().nullable(),
  zip_code: z.string().trim().nullable(),
  preferredCurrency: z.string().max(3, { error: "Preferred currency must be at most 3 characters." }).min(1, { error: "Preferred currency is required." }).nullable(),
  personal_url: z.string().regex(/^https?:\/\/[^\s$.?#].[^\s]*$/i, { error: "Please enter a valid URL." }).trim().nullable(),
  linkedin_url: z.string().regex(/^https?:\/\/[^\s$.?#].[^\s]*$/i, { error: "Please enter a valid URL." }).trim().nullable(),
  portfolio_url: z.string().regex(/^https?:\/\/[^\s$.?#].[^\s]*$/i, { error: "Please enter a valid URL." }).trim().nullable(),
});

export const ScheduleInterviewFormStateSchema = z.object({
  jobId: z.string().trim().min(1, { error: "Job ID is required." }),
  interviewIdx: z.number().int().nullable(),
  interviewDate: z.date({ error: "Please enter a valid date." }).nullable(),
  interviewLocation: z.string().trim().min(1, { error: "Interview location is required." }).nullable(),
  interviewerName: z.string().trim().nullable(),
  interviewerContact: z.string().trim().nullable(),
});

export const InterviewSchema = z.object({
  jobId: z.string().trim().min(1, { error: "Job ID is required." }),
  interviewIdx: z.number().int().min(0, { error: "Interview index must be a non-negative integer." }),
  interviewId: z.string().trim().nullable(),
  interviewDate: z.date({ error: "Please enter a valid date." }),
  interviewLocation: z.string().trim().min(1, { error: "Interview location is required." }),
  interviewerName: z.string().trim().nullable(),
  interviewerContact: z.string().trim().nullable(),
  notes: z.string().trim().nullable(),
});

export type SignupFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      values?: {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
      };
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      values?: {
        email: string;
      };
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
        interviews?: {
          jobId?: string[];
          interviewIdx?: string[];
          interviewId?: string[];
          interviewDate?: string[];
          interviewLocation?: string[];
          interviewerName?: string[];
          interviewerContact?: string[];
          notes?: string[];
        }[];
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
        interviews: {
          jobId: string;
          interviewIdx: number;
          interviewId: string | null;
          interviewDate: Date;
          interviewLocation: string;
          interviewerName: string | null;
          interviewerContact: string | null;
          notes: string | null;
        }[];
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

export type JobNotesComponentState =
  | {
      errors?: {
        notes?: string[];
        jobId?: string[];
      };
      message?: string;
      values?: {
        notes: string | null;
        jobId: string;
      };
    }
  | undefined;

export type JobStatusUpdateState =
  | {
      errors?: {
        status?: string[];
        latestUpdate?: string[];
        latestInterviewScheduledDate?: string[];
        jobId?: string[];
        interviewIdx?: string[];
        interviewId?: string[];
        interviewDate?: string[];
        interviewLocation?: string[];
        interviewerName?: string[];
        interviewerContact?: string[];
      };
      message?: string;
      values?: {
        status: StatusPrisma;
        latestUpdate: Date | null;
        latestInterviewScheduledDate: Date | null;
        jobId: string;
        interviewIdx: number | null;
        interviewId: string | null;
        interviewDate: Date | null;
        interviewLocation: string | null;
        interviewerName: string | null;
        interviewerContact: string | null;
      };
    }
  | undefined;

export type ProfileEditFormState =
  | {
      errors?: {
        id?: string[];
        altEmail?: string[];
        bio?: string[];
        firstName?: string[];
        lastName?: string[];
        contact_number?: string[];
        addr_line1?: string[];
        addr_line2?: string[];
        city?: string[];
        st?: string[];
        country?: string[];
        zip_code?: string[];
        preferredCurrency?: string[];
        personal_url?: string[];
        linkedin_url?: string[];
        portfolio_url?: string[];
      };
      message?: string;
      values?: {
        id: string;
        altEmail: string | null;
        bio: string | null;
        firstName: string | null;
        lastName: string | null;
        contact_number: string | null;
        addr_line1: string | null;
        addr_line2: string | null;
        city: string | null;
        st: string | null;
        country: string | null;
        zip_code: string | null;
        preferredCurrency: string | null;
        personal_url: string | null;
        linkedin_url: string | null;
        portfolio_url: string | null;
      };
    }
  | undefined;

export type ScheduleInterviewFormState =
  | {
      errors?: {
        jobId?: string[];
        interviewIdx?: string[];
        interviewId?: string[];
        interviewDate?: string[];
        interviewLocation?: string[];
        interviewerName?: string[];
        interviewerContact?: string[];
      };
      message?: string;
      values?: {
        jobId: string;
        interviewIdx: number;
        interviewId: string | null;
        interviewDate: Date;
        interviewLocation: string;
        interviewerName: string | null;
        interviewerContact: string | null;
      };
    }
  | undefined;

export type InterviewFormState =
  | {
      errors?: {
        jobId?: string[];
        interviewId?: string[];
        interviewDate?: string[];
        interviewLocation?: string[];
        interviewerName?: string[];
        interviewerContact?: string[];
        notes?: string[];
      };
      message?: string;
      values?: {
        jobId: string;
        interviewId: string | null;
        interviewDate: Date;
        interviewLocation: string;
        interviewerName: string | null;
        interviewerContact: string | null;
        notes: string | null;
      };
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
