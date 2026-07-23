export type Status = "Applied" | "Shortlisted" | "Interviewed" | "Offered" | "Rejected";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
export type WorkType = "Remote" | "On-site" | "Hybrid";

export type JobApplication = {
    id: number;
    company: string;
    position: string;
    location: string;
    jobType: JobType;
    workType: WorkType;
    status: Status;
    appliedDate?: Date;
    latestUpdate?: Date;
    latestInterviewScheduledDate?: Date;
    jobDescription?: string;
    referenceLink: string;
    notes?: string;
}