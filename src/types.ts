export type UserPersona = 'customer' | 'contractor';

export type ActiveTab = 'home' | 'project_match' | 'contracts' | 'invoices';

export type Industry = 
  | 'All Industries'
  | 'Technology'
  | 'Healthcare'
  | 'Construction'
  | 'Retail'
  | 'Marketing'
  | 'Finance';

export type CandidateStatus =
  | 'New'
  | 'Applied'
  | 'Interviewing'
  | 'Rejected'
  | 'Hire'
  | 'Contract Sent via DocuSign'
  | 'Onboarded'
  | 'Terminated';

export interface WorkHistoryItem {
  role: string;
  company: string;
  period: string;
  highlights: string;
}

export interface Contractor {
  id: string;
  name: string;
  title: string;
  industry: Industry;
  country: string;
  city: string;
  hourlyRate: number;
  availability: 'Immediate' | 'Within 2 weeks' | 'Part-time';
  skills: string[];
  bio: string;
  experienceYears: number;
  initials: string;
  education: string;
  certifications: string[];
  languages: string[];
  workHistory: WorkHistoryItem[];
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: Industry;
  duration: string;
  hourlyRateMin: number;
  hourlyRateMax: number;
  description: string;
  skills: string[];
  postedDaysAgo: number;
  isSponsored: boolean;
}

export interface AIResumeMatch {
  matchScore: number;
  strengthsSummary: string;
  gapOrProbe: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  contractorId: string;
  contractorName: string;
  contractorTitle: string;
  contractorCountry: string;
  requestedRate: number;
  appliedDate: string;
  note: string;
  status: CandidateStatus;
  docusignEnvelopeId?: string;
  aiMatch?: AIResumeMatch;
}

export interface GPContract {
  id: string;
  contractorName: string;
  clientCompany: string;
  country: string;
  role: string;
  rate: number;
  startDate: string;
  duration: string;
  status: 'Active' | 'Pending Signature' | 'Terminated';
  source: 'ProjectMatch (Indeed)' | 'Direct Onboarding' | 'Contractor Invite';
  docusignEnvelopeId?: string;
}

export interface GPInvoice {
  id: string;
  contractId: string;
  contractorName: string;
  clientCompany: string;
  role: string;
  billingPeriod: string;
  hours: number;
  rate: number;
  amount: number;
  issueDate: string;
  status: 'Pending Approval' | 'Paid';
}
