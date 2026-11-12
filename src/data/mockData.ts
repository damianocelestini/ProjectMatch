import { Contractor, JobPosting, JobApplication, GPContract } from '../types';

export const INITIAL_CONTRACTORS: Contractor[] = [
  {
    id: 'c-1',
    name: 'Mateusz Kowalski',
    title: 'Senior Cloud & Go Architect',
    industry: 'Technology',
    country: 'Poland',
    city: 'Warsaw',
    hourlyRate: 72,
    availability: 'Immediate',
    skills: ['Go', 'Kubernetes', 'AWS', 'Kafka', 'PostgreSQL', 'Terraform'],
    bio: '10+ years architecting fault-tolerant distributed backend systems and event-driven payment pipelines across European fintechs.',
    experienceYears: 10,
    initials: 'MK',
    education: 'M.Sc. in Computer Science, Warsaw University of Technology',
    certifications: ['AWS Certified Solutions Architect – Professional', 'Certified Kubernetes Administrator (CKA)'],
    languages: ['English (Fluent)', 'Polish (Native)'],
    workHistory: [
      {
        role: 'Lead Distributed Systems Contractor',
        company: 'FinFlow Technologies (Berlin, Remote)',
        period: '2024 – 2026',
        highlights: 'Architected Go and Kafka settlement bus processing 2.4M daily transactions with 99.99% uptime and sub-40ms latency.'
      },
      {
        role: 'Senior Platform Engineer',
        company: 'NordicPay Systems (Stockholm, Remote)',
        period: '2020 – 2024',
        highlights: 'Led multi-region AWS Kubernetes migration and automated Terraform infrastructure provisioning across 14 microservices.'
      },
      {
        role: 'Backend Software Engineer',
        company: 'Allegro Tech (Warsaw)',
        period: '2016 – 2020',
        highlights: 'Developed high-concurrency order routing services in Go and PostgreSQL.'
      }
    ]
  },
  {
    id: 'c-7',
    name: 'Henrik Lindqvist',
    title: 'Principal Backend Systems Engineer',
    industry: 'Technology',
    country: 'Sweden',
    city: 'Stockholm',
    hourlyRate: 80,
    availability: 'Within 2 weeks',
    skills: ['Go', 'PostgreSQL', 'Kafka', 'gRPC', 'Docker', 'GCP'],
    bio: '8+ years designing high-throughput payment clearing engines, ledger databases, and low-latency APIs.',
    experienceYears: 8,
    initials: 'HL',
    education: 'M.Sc. in Software Engineering, KTH Royal Institute of Technology',
    certifications: ['Google Cloud Professional Cloud Architect'],
    languages: ['English (Fluent)', 'Swedish (Native)'],
    workHistory: [
      {
        role: 'Principal Backend Consultant',
        company: 'Klarity Financial AB (Stockholm)',
        period: '2023 – 2026',
        highlights: 'Designed real-time double-entry ledger service in Go and PostgreSQL handling €1.8B in annual volume.'
      },
      {
        role: 'Senior Go Engineer',
        company: 'Veloce Cloud (Amsterdam, Remote)',
        period: '2018 – 2023',
        highlights: 'Built gRPC event streaming pipelines with Apache Kafka and Prometheus observability.'
      }
    ]
  },
  {
    id: 'c-2',
    name: 'Dr. Sofia Ramirez',
    title: 'Clinical Trial Data Consultant (CDISC)',
    industry: 'Healthcare',
    country: 'Spain',
    city: 'Barcelona',
    hourlyRate: 95,
    availability: 'Within 2 weeks',
    skills: ['CDISC SDTM', 'ADaM', 'EMA Compliance', 'SAS', 'Clinical Phase II-III', 'R'],
    bio: 'Biostatistics and regulatory data specialist supporting European EMA and US FDA submissions for oncology and rare-disease sponsors.',
    experienceYears: 12,
    initials: 'SR',
    education: 'Ph.D. in Biostatistics, University of Barcelona',
    certifications: ['CDISC Certified SDTM Specialist', 'Good Clinical Practice (ICH-GCP) Certified'],
    languages: ['English (Fluent)', 'Spanish (Native)', 'French (Working Proficiency)'],
    workHistory: [
      {
        role: 'Lead Clinical Data Standards Consultant',
        company: 'BioVanguard Labs (Basel, Remote)',
        period: '2023 – 2026',
        highlights: 'Directed SDTM and ADaM dataset mapping for 4 Phase II/III oncology trials; zero critical findings during EMA inspection.'
      },
      {
        role: 'Senior Statistical Programmer',
        company: 'EuroTherapeutics Group (Madrid)',
        period: '2018 – 2023',
        highlights: 'Automated SAS validation macros and Define-XML 2.1 generation across 11 multi-center clinical trials.'
      }
    ]
  },
  {
    id: 'c-3',
    name: 'Carlos Mendez',
    title: 'BIM Coordinator & Structural Specialist',
    industry: 'Construction',
    country: 'Mexico',
    city: 'Guadalajara',
    hourlyRate: 58,
    availability: 'Immediate',
    skills: ['Revit BIM', 'Navisworks', 'Clash Detection', 'AutoCAD', 'ISO 19650'],
    bio: '8 years coordinating MEP and structural 3D BIM models for large-scale healthcare and commercial infrastructure developments.',
    experienceYears: 8,
    initials: 'CM',
    education: 'B.Arch. in Civil & Architectural Engineering, Tecnológico de Monterrey',
    certifications: ['Autodesk Certified Professional: Revit for Structural Design', 'LEED Green Associate'],
    languages: ['English (Fluent)', 'Spanish (Native)'],
    workHistory: [
      {
        role: 'Lead BIM Clash Coordinator',
        company: 'AeroConstruct JV (Toronto, Remote)',
        period: '2023 – 2026',
        highlights: 'Managed federated Navisworks models across 12 trade subcontractors for a $140M hospital expansion, resolving 1,800+ clashes pre-construction.'
      },
      {
        role: 'BIM Modeler & Coordinator',
        company: 'Apex Urban Developers (Monterrey)',
        period: '2018 – 2023',
        highlights: 'Delivered LOD 400 structural and MEP fabrication models for high-rise commercial towers.'
      }
    ]
  },
  {
    id: 'c-4',
    name: 'Amina Al-Mansoor',
    title: 'Omnichannel Supply Chain & ERP Analyst',
    industry: 'Retail',
    country: 'Canada',
    city: 'Toronto',
    hourlyRate: 68,
    availability: 'Immediate',
    skills: ['Shopify Plus', 'NetSuite ERP', '3PL Logistics', 'Celigo iPaaS', 'Demand Forecasting'],
    bio: 'Helps retail and apparel brands optimize cross-border inventory allocation, NetSuite ERP integrations, and 3PL fulfillment workflows.',
    experienceYears: 7,
    initials: 'AA',
    education: 'B.B.A. in Supply Chain Management, York University (Schulich)',
    certifications: ['Oracle NetSuite Certified ERP Consultant', 'APICS CSCP Certified'],
    languages: ['English (Native)', 'Arabic (Fluent)'],
    workHistory: [
      {
        role: 'Senior NetSuite & Shopify Plus Consultant',
        company: 'Nordic Apparel House (London, Remote)',
        period: '2023 – 2026',
        highlights: 'Integrated Shopify Plus storefronts with NetSuite ERP and 4 regional 3PL warehouses, reducing order-to-ship latency by 38%.'
      },
      {
        role: 'Supply Chain Systems Analyst',
        company: 'Veritas Retail Group (Toronto)',
        period: '2019 – 2023',
        highlights: 'Led automated inventory rebalancing and returns processing across North American fulfillment centers.'
      }
    ]
  },
  {
    id: 'c-5',
    name: 'Lucas Brandão',
    title: 'Performance Brand & Localization Lead',
    industry: 'Marketing',
    country: 'Brazil',
    city: 'São Paulo',
    hourlyRate: 52,
    availability: 'Part-time',
    skills: ['Brand Strategy', 'LATAM Localization', 'Figma', 'Conversion Copywriting'],
    bio: 'Creative director helping North American and European companies localize campaigns and launch across Latin America.',
    experienceYears: 9,
    initials: 'LB',
    education: 'B.A. in Advertising & Design, ESPM São Paulo',
    certifications: ['Google Ads Creative Certification'],
    languages: ['English (Fluent)', 'Portuguese (Native)', 'Spanish (Fluent)'],
    workHistory: [
      {
        role: 'LATAM Brand & Localization Lead',
        company: 'NovaPay Global (San Francisco, Remote)',
        period: '2022 – 2026',
        highlights: 'Directed full brand localization and go-to-market creative for Brazil and Mexico launches, driving 140k new user sign-ups.'
      }
    ]
  },
  {
    id: 'c-6',
    name: 'Mei-Ling Chen',
    title: 'Cross-Border Tax & Transfer Pricing Advisor',
    industry: 'Finance',
    country: 'United Kingdom',
    city: 'London',
    hourlyRate: 110,
    availability: 'Within 2 weeks',
    skills: ['OECD BEPS', 'VAT Compliance', 'Transfer Pricing', 'Audit Readiness'],
    bio: 'Former Big 4 manager advising scaling enterprises on international contractor compliance and transfer pricing.',
    experienceYears: 13,
    initials: 'MC',
    education: 'M.Sc. in Taxation & Accounting, London School of Economics (LSE)',
    certifications: ['Chartered Tax Adviser (CTA – UK)', 'ACA Chartered Accountant'],
    languages: ['English (Native)', 'Mandarin (Fluent)'],
    workHistory: [
      {
        role: 'Independent International Tax Advisor',
        company: 'OmniCorp Industrial (London)',
        period: '2021 – 2026',
        highlights: 'Prepared OECD BEPS Country-by-Country and Master File transfer pricing documentation across 16 EMEA entities.'
      }
    ]
  }
];

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Distributed Systems Engineer (Go)',
    company: 'Lumina Global Services',
    location: 'Global Remote',
    industry: 'Technology',
    duration: '4 months',
    hourlyRateMin: 65,
    hourlyRateMax: 85,
    description: 'Architect an event-driven payment ingestion service. Contract and bi-weekly payouts managed via Contractor Express.',
    skills: ['Go', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    postedDaysAgo: 2,
    isSponsored: true
  },
  {
    id: 'job-2',
    title: 'Clinical Data Mapping Specialist (SDTM)',
    company: 'Genomix Life Sciences',
    location: 'EMEA Remote',
    industry: 'Healthcare',
    duration: '3 months',
    hourlyRateMin: 85,
    hourlyRateMax: 105,
    description: 'Lead clinical trial dataset standardization ahead of upcoming EMA regulatory filing.',
    skills: ['CDISC SDTM', 'SAS', 'EMA Compliance'],
    postedDaysAgo: 4,
    isSponsored: true
  },
  {
    id: 'job-3',
    title: 'Commercial BIM Clash Coordinator',
    company: 'Vanguard Infrastructure',
    location: 'Americas Remote',
    industry: 'Construction',
    duration: '5 months',
    hourlyRateMin: 50,
    hourlyRateMax: 65,
    description: 'Coordinate multidisciplinary Revit and Navisworks models for a regional medical center build.',
    skills: ['Revit BIM', 'Navisworks', 'Clash Detection'],
    postedDaysAgo: 6,
    isSponsored: false
  },
  {
    id: 'job-4',
    title: 'NetSuite & Shopify Plus Integration Consultant',
    company: 'Solstice Apparel Group',
    location: 'Global Remote',
    industry: 'Retail',
    duration: '4 months',
    hourlyRateMin: 60,
    hourlyRateMax: 75,
    description: 'Streamline inventory sync and international 3PL order routing ahead of peak retail season.',
    skills: ['Shopify Plus', 'NetSuite ERP', '3PL Logistics'],
    postedDaysAgo: 1,
    isSponsored: false
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Distributed Systems Engineer (Go)',
    contractorId: 'c-1',
    contractorName: 'Mateusz Kowalski',
    contractorTitle: 'Senior Cloud & Go Architect',
    contractorCountry: 'Poland',
    requestedRate: 72,
    appliedDate: '2 days ago',
    note: 'Scaled Go/Kafka pipelines past 2M daily transactions. Pre-verified on Contractor Express for immediate start.',
    status: 'Interviewing',
    aiMatch: {
      matchScore: 96,
      strengthsSummary: '100% alignment on Go, Kafka, PostgreSQL, and Kubernetes with direct experience architecting a 2.4M/day payment settlement bus at $72/hr (well within the $65–$85/hr budget) and immediate availability.',
      gapOrProbe: 'Probe schema versioning strategy for zero-downtime Kafka topic migrations during the 4-month sprint.'
    }
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    jobTitle: 'Senior Distributed Systems Engineer (Go)',
    contractorId: 'c-7',
    contractorName: 'Henrik Lindqvist',
    contractorTitle: 'Principal Backend Systems Engineer',
    contractorCountry: 'Sweden',
    requestedRate: 80,
    appliedDate: '1 day ago',
    note: '8+ years designing event-driven payment engines in Go and PostgreSQL across European fintechs.',
    status: 'New',
    aiMatch: {
      matchScore: 84,
      strengthsSummary: 'Strong Go, PostgreSQL, and Kafka ledger experience (€1.8B volume), though primary cloud certification is GCP rather than AWS Kubernetes.',
      gapOrProbe: 'Requires a 2-week notice period and $80/hr is near the top of the $65–$85/hr budget; probe production Kubernetes operator experience.'
    }
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    jobTitle: 'Clinical Data Mapping Specialist (SDTM)',
    contractorId: 'c-2',
    contractorName: 'Dr. Sofia Ramirez',
    contractorTitle: 'Clinical Trial Data Consultant (CDISC)',
    contractorCountry: 'Spain',
    requestedRate: 95,
    appliedDate: '1 day ago',
    note: 'Completed 4 EMA oncology submissions using CDISC SDTM standards. Ready to onboard via Contractor Express Spain.',
    status: 'Interviewing',
    aiMatch: {
      matchScore: 95,
      strengthsSummary: 'CDISC Certified SDTM Specialist with 4 EMA Phase II/III oncology filings and zero inspection findings at $95/hr (midpoint of $85–$105/hr budget).',
      gapOrProbe: 'Confirm exact start date given 2-week availability window relative to your EMA submission freeze.'
    }
  },
  {
    id: 'app-4',
    jobId: 'job-3',
    jobTitle: 'Commercial BIM Clash Coordinator',
    contractorId: 'c-3',
    contractorName: 'Carlos Mendez',
    contractorTitle: 'BIM Coordinator & Structural Specialist',
    contractorCountry: 'Mexico',
    requestedRate: 58,
    appliedDate: '3 days ago',
    note: 'Led multidisciplinary Revit and Navisworks clash detection for 3 regional hospital projects.',
    status: 'New',
    aiMatch: {
      matchScore: 93,
      strengthsSummary: 'Directly coordinated Navisworks and Revit BIM models across 12 subcontractors on a $140M hospital expansion, resolving 1,800+ clashes.',
      gapOrProbe: 'Verify familiarity with regional US/Americas healthcare MEP code tolerances and weekly coordination cadence.'
    }
  },
  {
    id: 'app-5',
    jobId: 'job-4',
    jobTitle: 'NetSuite & Shopify Plus Integration Consultant',
    contractorId: 'c-4',
    contractorName: 'Amina Al-Mansoor',
    contractorTitle: 'Omnichannel Supply Chain & ERP Analyst',
    contractorCountry: 'Canada',
    requestedRate: 68,
    appliedDate: '5 hours ago',
    note: 'Integrated NetSuite ERP with Shopify Plus for 6 international apparel brands with 3PL routing.',
    status: 'New',
    aiMatch: {
      matchScore: 94,
      strengthsSummary: 'Oracle NetSuite Certified ERP Consultant who reduced order-to-ship latency by 38% across Shopify Plus and 4 regional 3PL warehouses.',
      gapOrProbe: 'Probe experience handling multi-currency VAT/duty reconciliation inside Celigo iPaaS during peak holiday volume.'
    }
  }
];

export const INITIAL_CUSTOMER_CONTRACTS: GPContract[] = [
  {
    id: 'CE-8821',
    contractorName: 'Amina Al-Mansoor',
    clientCompany: 'Lumina Global Services',
    country: 'Canada',
    role: 'Omnichannel Supply Chain & ERP Analyst',
    rate: 68,
    startDate: '2026-10-01',
    duration: '4 months',
    status: 'Active',
    source: 'Direct Onboarding'
  },
  {
    id: 'CE-8409',
    contractorName: 'Mei-Ling Chen',
    clientCompany: 'Lumina Global Services',
    country: 'United Kingdom',
    role: 'Cross-Border Tax & Transfer Pricing Advisor',
    rate: 110,
    startDate: '2026-09-15',
    duration: '4 months',
    status: 'Active',
    source: 'Direct Onboarding'
  },
  {
    id: 'CE-8102',
    contractorName: 'Lucas Brandão',
    clientCompany: 'Lumina Global Services',
    country: 'Brazil',
    role: 'LATAM Brand & Localization Campaign',
    rate: 52,
    startDate: '2026-05-01',
    duration: '4 months',
    status: 'Terminated',
    source: 'ProjectMatch (Indeed)'
  }
];

export const INITIAL_CONTRACTOR_CONTRACTS: GPContract[] = [
  {
    id: 'CE-7912',
    contractorName: 'Mateusz Kowalski',
    clientCompany: 'FinFlow Technologies Inc.',
    country: 'Poland',
    role: 'Cloud Payment Engine Migration',
    rate: 72,
    startDate: '2026-09-01',
    duration: '4 months',
    status: 'Active',
    source: 'Direct Onboarding'
  },
  {
    id: 'CE-7604',
    contractorName: 'Mateusz Kowalski',
    clientCompany: 'LogiVance Corp',
    country: 'Poland',
    role: 'Kubernetes & Go Telemetry Architecture',
    rate: 70,
    startDate: '2026-08-15',
    duration: '3 months',
    status: 'Active',
    source: 'ProjectMatch (Indeed)'
  },
  {
    id: 'CE-7190',
    contractorName: 'Mateusz Kowalski',
    clientCompany: 'NordicPay Systems',
    country: 'Poland',
    role: 'Multi-Region AWS Settlement Pipeline',
    rate: 68,
    startDate: '2026-04-01',
    duration: '4 months',
    status: 'Terminated',
    source: 'ProjectMatch (Indeed)'
  }
];

export const INITIAL_CUSTOMER_INVOICES = [
  {
    id: 'INV-9021',
    contractId: 'CE-8821',
    contractorName: 'Amina Al-Mansoor',
    clientCompany: 'Lumina Global Services',
    role: 'Omnichannel Supply Chain & ERP Analyst',
    billingPeriod: 'Oct 16 – Oct 31, 2026',
    hours: 80,
    rate: 68,
    amount: 5440,
    issueDate: '2026-11-01',
    status: 'Pending Approval' as const
  },
  {
    id: 'INV-8910',
    contractId: 'CE-8409',
    contractorName: 'Mei-Ling Chen',
    clientCompany: 'Lumina Global Services',
    role: 'Cross-Border Tax & Transfer Pricing Advisor',
    billingPeriod: 'Oct 01 – Oct 31, 2026',
    hours: 80,
    rate: 110,
    amount: 8800,
    issueDate: '2026-10-31',
    status: 'Paid' as const
  },
  {
    id: 'INV-8422',
    contractId: 'CE-8821',
    contractorName: 'Amina Al-Mansoor',
    clientCompany: 'Lumina Global Services',
    role: 'Omnichannel Supply Chain & ERP Analyst',
    billingPeriod: 'Oct 01 – Oct 15, 2026',
    hours: 75,
    rate: 68,
    amount: 5100,
    issueDate: '2026-10-15',
    status: 'Paid' as const
  }
];

export const INITIAL_CONTRACTOR_INVOICES = [
  {
    id: 'INV-7410',
    contractId: 'CE-7912',
    contractorName: 'Mateusz Kowalski',
    clientCompany: 'FinFlow Technologies Inc.',
    role: 'Cloud Payment Engine Migration',
    billingPeriod: 'Oct 16 – Oct 31, 2026',
    hours: 80,
    rate: 72,
    amount: 5760,
    issueDate: '2026-11-01',
    status: 'Pending Approval' as const
  },
  {
    id: 'INV-7108',
    contractId: 'CE-7604',
    contractorName: 'Mateusz Kowalski',
    clientCompany: 'LogiVance Corp',
    role: 'Kubernetes & Go Telemetry Architecture',
    billingPeriod: 'Oct 01 – Oct 15, 2026',
    hours: 60,
    rate: 70,
    amount: 4200,
    issueDate: '2026-10-16',
    status: 'Paid' as const
  }
];
