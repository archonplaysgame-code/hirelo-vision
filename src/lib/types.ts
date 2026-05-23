export type JobStatus = "active" | "closed";
export type JobType = "Full-time" | "Part-time" | "Contract";
export type Stage = "Applied" | "Reviewed" | "Interview Scheduled" | "Offer Sent" | "Hired";
export type Platform = "LinkedIn" | "Indeed" | "Rozee.pk" | "Mustakbil" | "Direct";
export type AppRole = "admin" | "recruiter" | "hiring_manager";

export const STAGES: Stage[] = ["Applied", "Reviewed", "Interview Scheduled", "Offer Sent", "Hired"];
export const PLATFORMS: Platform[] = ["LinkedIn", "Indeed", "Rozee.pk", "Mustakbil", "Direct"];
export const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract"];

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  status: JobStatus;
  salary: string;
  postedOn: string;
  applicants: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: Platform;
  stage: Stage;
  appliedDate: string;
  jobId: string;
  jobTitle?: string;
}

export function initials(name: string) {
  if (!name) return "?";
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function platformColor(p: Platform): string {
  switch (p) {
    case "LinkedIn": return "bg-[oklch(0.5_0.15_245)] text-white";
    case "Indeed": return "bg-[oklch(0.45_0.18_280)] text-white";
    case "Rozee.pk": return "bg-accent text-accent-foreground";
    case "Mustakbil": return "bg-success text-success-foreground";
    case "Direct": return "bg-muted text-foreground";
  }
}
