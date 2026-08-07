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

export type StatusPrisma =
  | "Applied"
  | "Shortlisted"
  | "Interviewed"
  | "Offered"
  | "Rejected";
export type JobTypePrisma =
  | "FullTime"
  | "PartTime"
  | "Contract"
  | "Internship"
  | "Freelance";
export type JobModePrisma = "Remote" | "OnSite" | "Hybrid";
export type PayFrequencyPrisma = "Hourly" | "Weekly" | "Monthly" | "Yearly";

export type DegreeType =
  | "HighSchool"
  | "Diploma"
  | "Associate"
  | "Bachelor"
  | "Master"
  | "Doctorate";

export type ProficiencyLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert";

export type JobApplicationPrisma = {
  id: string;
  company: string;
  position: string;
  location: string;
  jobType: JobTypePrisma;
  jobMode: JobModePrisma;
  minPay: number | null;
  maxPay: number | null;
  payFrequency: PayFrequencyPrisma | null;
  status: StatusPrisma;
  appliedDate: Date | null;
  latestUpdate: Date | null;
  latestInterviewScheduledDate: Date | null;
  referenceLink: string | null;
  notes: string | null;
  userId: string;
  preferredCurrency: string | null;
  latestInterview?: Partial<Interview> | null;
  createdAt: Date;
  updatedAt: Date;
  softDeleted: boolean;
};

export type Interview = {
  id: string;
  jobId: string;
  interviewDate: Date;
  interviewLocation: string;
  interviewerName?: string;
  interviewerContact?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  softDeleted: boolean;
};

export type ResumeExperienceProps = {
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

export type ResumeEducationProps = {
  id: string;
  institution: string;
  degree: DegreeType;
  fieldOfStudy: string;
  gpa?: number | null;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
};

export type ResumeProjectProps = {
  id: string;
  name: string;
  description?: string | null;
  link?: string | null;
  startDate: Date;
  endDate?: Date | null;
};

export type ResumeSkillProps = {
  id: string;
  skill: string;
  proficiency: ProficiencyLevel;
  yearsOfExperience: number;
};

export type ResumeCertificationProps = {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expirationDate?: Date | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
};