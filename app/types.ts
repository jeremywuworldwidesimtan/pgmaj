export type Status =
  | "Applied"
  | "Shortlisted"
  | "Interviewed"
  | "Offered"
  | "Rejected";
export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Freelance";
export type JobMode = "Remote" | "On-site" | "Hybrid";
export type PayFrequency = "Hourly" | "Weekly" | "Monthly" | "Yearly";

export type JobApplication = {
  id: string;
  company: string;
  position: string;
  location: string;
  jobType: JobType;
  jobMode: JobMode;
  minPay?: number;
  maxPay?: number;
  payFrequency?: PayFrequency;
  status: Status;
  appliedDate?: Date;
  latestUpdate?: Date;
  latestInterviewScheduledDate?: Date;
  jobDescription?: string;
  referenceLink?: string;
  notes?: string;
};
