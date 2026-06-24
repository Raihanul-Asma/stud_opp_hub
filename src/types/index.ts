export interface User {
  id: number;
  email: string;
  fullName: string;
}

export interface Profile {
  fullName: string;
  department: string;
  year: string;
  cgpa: number;
  skills: string[];
  interests: string[];
  resumeUrl?: string;
}

export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  type: 'Internship' | 'Scholarship' | 'Hackathon';
  deadline: string;
  applyLink: string;
  description?: string;
}

export interface Recommendation extends Opportunity {
  matchScore: number;
}

export interface Application {
  id: number;
  opportunityName: string;
  dateApplied: string;
  status: 'Saved' | 'Applied' | 'Interview' | 'Selected' | 'Rejected';
}

export interface AuthResponse {
  token: string;
  user: User;
}
