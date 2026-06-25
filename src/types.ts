export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  grade?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    title: string; // e.g. Frontend Developer
    linkedin: string;
    github: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
}

export type TemplateType = "modern" | "minimal" | "tech" | "elegant" | "creative" | "academic" | "compact" | "executive" | "classic";

export type RoleType = "student" | "grad" | "employee" | "developer" | "designer";

export type TabType =
  | "dashboard"
  | "builder"
  | "templates"
  | "ats"
  | "cover-letter"
  | "portfolio"
  | "advisor"
  | "settings";
