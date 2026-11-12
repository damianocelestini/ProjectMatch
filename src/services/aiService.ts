import { Contractor, Industry, JobPosting, AIResumeMatch } from '../types';

export interface AIProjectBriefResponse {
  title: string;
  industry: Industry;
  duration: string;
  rateMin: number;
  rateMax: number;
  rateRationale: string;
  skills: string[];
  description: string;
}

export interface AITailoredPitchResponse {
  pitch: string;
  recommendedRate: number;
}

const simulateLatency = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

function buildSmartProjectBriefFallback(
  prompt: string,
  currentIndustry?: Industry,
  currentDuration?: string
): AIProjectBriefResponse {
  const lower = prompt.toLowerCase();

  if (
    lower.includes('bim') ||
    lower.includes('revit') ||
    lower.includes('construction') ||
    lower.includes('hospital') ||
    lower.includes('clash')
  ) {
    return {
      title: 'Senior Revit BIM & Clash Detection Coordinator',
      industry: 'Construction',
      duration: currentDuration || '4 months',
      rateMin: 52,
      rateMax: 68,
      rateRationale:
        'Benchmarked against senior LATAM & Americas remote BIM/Revit specialists ($52–$68/hr) for healthcare & commercial builds.',
      skills: ['Revit BIM', 'Navisworks', 'Clash Detection', 'AutoCAD', 'ISO 19650'],
      description:
        'Lead multidisciplinary 3D BIM coordination and pre-construction clash resolution across structural and MEP trades. Contract and milestone payouts managed via Contractor Express.',
    };
  }

  if (
    lower.includes('clinical') ||
    lower.includes('sdtm') ||
    lower.includes('pharma') ||
    lower.includes('trial') ||
    lower.includes('health')
  ) {
    return {
      title: 'Senior Clinical Data Standards Specialist (CDISC SDTM)',
      industry: 'Healthcare',
      duration: currentDuration || '3 months',
      rateMin: 85,
      rateMax: 105,
      rateRationale:
        'Benchmarked against EMEA/Global biostatistics and CDISC regulatory consultants ($85–$105/hr) for Phase II/III filings.',
      skills: ['CDISC SDTM', 'ADaM', 'SAS', 'EMA Compliance', 'Define-XML'],
      description:
        'Standardize and validate clinical trial datasets for regulatory submission with full audit readiness. Engaged and paid compliantly via Contractor Express.',
    };
  }

  if (
    lower.includes('shopify') ||
    lower.includes('netsuite') ||
    lower.includes('erp') ||
    lower.includes('retail') ||
    lower.includes('supply')
  ) {
    return {
      title: 'NetSuite ERP & Omnichannel Fulfillment Consultant',
      industry: 'Retail',
      duration: currentDuration || '4 months',
      rateMin: 60,
      rateMax: 78,
      rateRationale:
        'Benchmarked against certified NetSuite & Shopify Plus systems integrators ($60–$78/hr) across North America and EMEA.',
      skills: ['NetSuite ERP', 'Shopify Plus', '3PL Logistics', 'Celigo iPaaS', 'Inventory Sync'],
      description:
        'Integrate storefront order routing with NetSuite ERP and regional 3PL warehouses ahead of peak demand. Managed via Contractor Express.',
    };
  }

  if (
    lower.includes('tax') ||
    lower.includes('finance') ||
    lower.includes('audit') ||
    lower.includes('pricing')
  ) {
    return {
      title: 'Cross-Border Tax & Transfer Pricing Specialist',
      industry: 'Finance',
      duration: currentDuration || '3 months',
      rateMin: 95,
      rateMax: 120,
      rateRationale:
        'Benchmarked against UK/EMEA chartered international tax and OECD BEPS advisors ($95–$120/hr).',
      skills: ['Transfer Pricing', 'OECD BEPS', 'VAT Compliance', 'Cross-Border Audit'],
      description:
        'Prepare multi-entity transfer pricing documentation and intercompany compliance schedules. Contracted compliantly via Contractor Express.',
    };
  }

  if (
    lower.includes('brand') ||
    lower.includes('marketing') ||
    lower.includes('localization') ||
    lower.includes('copy')
  ) {
    return {
      title: 'Regional Growth & Localization Campaign Lead',
      industry: 'Marketing',
      duration: currentDuration || '3 months',
      rateMin: 48,
      rateMax: 65,
      rateRationale:
        'Benchmarked against senior cross-border localization and performance brand leads ($48–$65/hr).',
      skills: ['Brand Localization', 'Conversion Copywriting', 'Figma', 'Growth Strategy'],
      description:
        'Adapt campaign creative, landing flows, and regional messaging for international product launch. Onboarded via Contractor Express.',
    };
  }

  return {
    title:
      prompt.trim().length > 8 && prompt.trim().length < 65
        ? prompt
            .trim()
            .replace(/^need a\s+/i, '')
            .replace(/^\w/, c => c.toUpperCase())
        : 'Senior Distributed Systems & Cloud Architect',
    industry: currentIndustry || 'Technology',
    duration: currentDuration || '4 months',
    rateMin: 68,
    rateMax: 88,
    rateRationale:
      'Benchmarked against verified senior remote software & cloud contractors ($68–$88/hr) on ProjectMatch.',
    skills: ['Go', 'Kubernetes', 'AWS', 'PostgreSQL', 'Kafka'],
    description: `Deliver production-grade architecture and milestones based on scope: "${prompt.trim()}". Contract and bi-weekly payouts managed via Contractor Express.`,
  };
}

function buildSmartResumeMatchFallback(
  project: JobPosting,
  candidate: Contractor,
  requestedRate?: number
): AIResumeMatch {
  const effectiveRate = requestedRate ?? candidate.hourlyRate;
  const projectSkills: string[] = project.skills || [];
  const candidateSkills: string[] = candidate.skills || [];
  const matchedSkills = candidateSkills.filter(s =>
    projectSkills.some(
      ps =>
        ps.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(ps.toLowerCase())
    )
  );
  const withinBudget = effectiveRate <= (project.hourlyRateMax || 100);
  const score = Math.min(
    98,
    Math.max(78, 82 + matchedSkills.length * 4 + (withinBudget ? 4 : -3))
  );

  return {
    matchScore: score,
    strengthsSummary: `${candidate.experienceYears} years of ${candidate.industry} experience (${candidate.workHistory?.[0]?.role || candidate.title}) with verified skills in ${(matchedSkills.length ? matchedSkills : candidateSkills.slice(0, 3)).join(', ')} at $${effectiveRate}/hr.`,
    gapOrProbe: `Confirm ${candidate.availability.toLowerCase()} onboarding timeline and milestone handoff cadence for the ${project.duration} engagement.`,
  };
}

function buildSmartTailoredPitchFallback(
  project: JobPosting,
  contractor: Contractor
): AITailoredPitchResponse {
  const recentWork = contractor.workHistory?.[0];
  const recommendedRate = Math.min(
    project.hourlyRateMax || contractor.hourlyRate,
    Math.max(project.hourlyRateMin || 60, contractor.hourlyRate)
  );
  return {
    pitch: `I bring ${contractor.experienceYears}+ years of hands-on experience in ${(project.skills || contractor.skills).slice(0, 3).join(', ')}, including my recent role as ${recentWork ? `${recentWork.role} at ${recentWork.company}` : contractor.title}. My ${contractor.country} tax and compliance profile is already pre-verified on Contractor Express for immediate onboarding.`,
    recommendedRate,
  };
}

export async function generateProjectBrief(
  prompt: string,
  currentIndustry?: Industry,
  currentDuration?: string
): Promise<AIProjectBriefResponse> {
  await simulateLatency();
  return buildSmartProjectBriefFallback(prompt, currentIndustry, currentDuration);
}

export async function analyzeCandidateResumeMatch(
  project: JobPosting,
  candidate: Contractor,
  requestedRate?: number
): Promise<AIResumeMatch> {
  await simulateLatency();
  return buildSmartResumeMatchFallback(project, candidate, requestedRate);
}

export async function generateTailoredContractorPitch(
  project: JobPosting,
  contractor: Contractor
): Promise<AITailoredPitchResponse> {
  await simulateLatency();
  return buildSmartTailoredPitchFallback(project, contractor);
}
