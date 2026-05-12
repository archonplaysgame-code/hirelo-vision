export type JobStatus = "active" | "closed";
export type Stage = "Applied" | "Reviewed" | "Interview Scheduled" | "Offer Sent" | "Hired";
export type Platform = "LinkedIn" | "Indeed" | "Rozee.pk" | "Mustakbil";

export const STAGES: Stage[] = ["Applied", "Reviewed", "Interview Scheduled", "Offer Sent", "Hired"];
export const PLATFORMS: Platform[] = ["LinkedIn", "Indeed", "Rozee.pk", "Mustakbil"];

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  postedOn: string;
  applicants: number;
  status: JobStatus;
  salary: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: Platform;
  appliedDate: string;
  stage: Stage;
  jobId: string;
}

export const jobs: Job[] = [
  { id: "1", title: "Senior Frontend Engineer", department: "Engineering", location: "Karachi, PK", type: "Full-time", postedOn: "2026-05-01", applicants: 42, status: "active", salary: "PKR 400k–600k" },
  { id: "2", title: "Product Designer", department: "Design", location: "Remote", type: "Full-time", postedOn: "2026-04-22", applicants: 28, status: "active", salary: "PKR 350k–500k" },
  { id: "3", title: "DevOps Engineer", department: "Engineering", location: "Lahore, PK", type: "Full-time", postedOn: "2026-04-18", applicants: 19, status: "active", salary: "PKR 450k–650k" },
  { id: "4", title: "Marketing Manager", department: "Marketing", location: "Islamabad, PK", type: "Full-time", postedOn: "2026-03-30", applicants: 35, status: "closed", salary: "PKR 300k–450k" },
  { id: "5", title: "Customer Success Specialist", department: "Support", location: "Remote", type: "Part-time", postedOn: "2026-04-10", applicants: 22, status: "active", salary: "PKR 150k–220k" },
  { id: "6", title: "Backend Engineer (Node.js)", department: "Engineering", location: "Karachi, PK", type: "Contract", postedOn: "2026-05-05", applicants: 14, status: "active", salary: "PKR 500k–700k" },
];

const firstNames = ["Ayesha", "Hamza", "Sara", "Bilal", "Zainab", "Omar", "Fatima", "Ali", "Hira", "Usman", "Maryam", "Hassan", "Nida", "Faisal", "Iqra"];
const lastNames = ["Khan", "Ahmed", "Raza", "Malik", "Siddiqui", "Iqbal", "Hussain", "Shah", "Butt", "Qureshi"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }

export const candidates: Candidate[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `c${i + 1}`,
  name: `${pick(firstNames, i)} ${pick(lastNames, i * 3)}`,
  email: `${pick(firstNames, i).toLowerCase()}.${pick(lastNames, i * 3).toLowerCase()}@example.com`,
  phone: `+92 3${(10 + i).toString().slice(0, 2)} ${1000000 + i * 13579}`.slice(0, 17),
  source: pick(PLATFORMS, i),
  appliedDate: `2026-05-${String((i % 11) + 1).padStart(2, "0")}`,
  stage: pick(STAGES, i),
  jobId: pick(jobs, i).id,
}));

export const stats = {
  totalJobs: 18,
  totalApplicants: 412,
  interviews: 24,
  filled: 7,
};

export const recentApplicants = candidates.slice(0, 6);

export function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function platformColor(p: Platform): string {
  switch (p) {
    case "LinkedIn": return "bg-[oklch(0.5_0.15_245)] text-white";
    case "Indeed": return "bg-[oklch(0.45_0.18_280)] text-white";
    case "Rozee.pk": return "bg-accent text-accent-foreground";
    case "Mustakbil": return "bg-success text-success-foreground";
  }
}

export const applicationsOverTime = [
  { month: "Dec", apps: 38 },
  { month: "Jan", apps: 52 },
  { month: "Feb", apps: 61 },
  { month: "Mar", apps: 74 },
  { month: "Apr", apps: 92 },
  { month: "May", apps: 118 },
];

export const applicationsByPlatform = [
  { platform: "LinkedIn", apps: 168 },
  { platform: "Indeed", apps: 121 },
  { platform: "Rozee.pk", apps: 88 },
  { platform: "Mustakbil", apps: 35 },
];

export const funnel = [
  { stage: "Applied", value: 412 },
  { stage: "Reviewed", value: 248 },
  { stage: "Interview", value: 96 },
  { stage: "Offer", value: 22 },
  { stage: "Hired", value: 7 },
];

export const teamMembers = [
  { name: "Ayesha Khan", email: "ayesha@hirelo.co", role: "Admin" },
  { name: "Bilal Raza", email: "bilal@hirelo.co", role: "Recruiter" },
  { name: "Sara Malik", email: "sara@hirelo.co", role: "Hiring Manager" },
];
