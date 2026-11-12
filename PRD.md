# Product requirements document (PRD): ProjectMatch (powered by Indeed)

| Field | Details |
| :--- | :--- |
| **Product** | Contractor Express — **ProjectMatch (powered by Indeed)** |
| **Document status** | Case-study PRD & interactive prototype |
| **Target personas** | 1. Hiring Customers (HR / Functional Leads)<br>2. Independent Global Contractors |
| **North Star metric** | **Active Paid Contractor Seats ($39/mo)** originated or retained via ProjectMatch |

---

## 1. Executive summary

**ProjectMatch** embeds a contractor marketplace, powered by **Indeed**, directly inside **Contractor Express**. It connects contractor sourcing with AI-assisted screening, localized DocuSign contracts, and cross-border payouts. This removes the manual handoff between job boards and contractor management and helps retain seat revenue when short-term projects end.

---

## 2. Problem statement and opportunity

1. **Late entry in the hiring funnel (high CAC):** Customers typically adopt Contractor Express only after sourcing and vetting freelancers on external platforms. Contractor Express misses their initial hiring intent.
2. **Seat churn when projects end:** Because contractor engagements are project-based (often 2–6 months), completing a project leads to contract termination, which immediately reduces monthly seat revenue ($39/mo per seat) and causes contractors to leave the platform.
3. **Manual handoff from hiring to onboarding:** Hiring managers copy and paste candidate details from job boards into legal templates, negotiate rates without regional benchmarks, and chase signatures before onboarding can start.

---

## 3. Goals, success metrics, and non-goals

### Success metrics (KPIs)
*Note: Targets below are illustrative case-study hypotheses for the first 6 months post-launch, to be baselined against historical cohort data during a pilot.*

| Category | Metric | Target hypothesis (6 months post-launch) |
| :--- | :--- | :--- |
| **Expansion (North Star)** | **Net Active Contractors per Customer** | +25% increase in active $39/mo contractor seats per customer account |
| **Activation** | **Time-to-Onboarded Contract** | Reduce time from candidate selection (post-interview) to signed DocuSign contract from ~14 days to <48 hours |
| **Retention** | **30-Day Contractor Redeployment Rate** | ≥30% of contractors completing a contract secure a new role via ProjectMatch within 30 days |
| **Acquisition (PLG)** | **Contractor `Invite Client` Conversion** | ≥12% of contractor-sent client invitations convert into paying Customer accounts |
| **Monetization** | **Indeed Sponsored Boost Attach Rate** | ≥20% of posted projects opt into the $4/day Sponsored Boost tier |

### Explicit non-goals (v1)
- **Full-time EOR (Employer of Record) hiring:** v1 covers independent contractor engagements only.
- **In-app video conferencing:** Screening status is tracked in-app (`Interviewing`), while live calls stay on the customer's existing calendar and video tools.
- **Escrow or milestone dispute arbitration:** Invoices use standard Contractor Express approval and payout rails.

---

## 4. User personas and jobs-to-be-done (JTBD)

| Persona | Core job-to-be-done (JTBD) | Key friction today |
| :--- | :--- | :--- |
| **Hiring Customer** (*e.g., Lumina Global Services*) | *"When I have a 3–6 month project gap, I want to quickly source, evaluate, and compliantly contract a vetted global specialist within budget."* | Unclear global hourly rate benchmarks, noisy resumes, and slow legal contract setup per country. |
| **Independent Contractor** (*e.g., Mateusz Kowalski, Poland*) | *"When my current contract is wrapping up, I want to line up my next client without redoing tax/compliance onboarding or writing repetitive proposals."* | Income gaps between projects, low response rates on cold applications, and slow client payment setup. |

---

## 5. Functional requirements

### Epic 1: Project posting and Indeed syndication (Customer)
| ID | Requirement | Priority | Acceptance criteria |
| :--- | :--- | :--- | :--- |
| **FR-1.1** | **Syndicated Project Posting** | **P0** | Customers can publish a project (Title, Industry, Duration, USD Hourly Rate Range, Skills, Scope) directly to Indeed from Contractor Express. |
| **FR-1.2** | **AI Project Brief & Rate Benchmarker** | **P0** | Entering a short natural-language prompt generates a structured project scope, 4–5 skills, and a benchmarked USD hourly rate range grounded in historical Contractor Express and Indeed rate bands. |
| **FR-1.3** | **Indeed Sponsored Boost Upgrade** | **P1** | Customers can toggle a Sponsored Boost at an exclusive $4/day Contractor Express rate (20% discount off $5/day standard rate). |

### Epic 2: Candidate screening and talent directory (Customer)
| ID | Requirement | Priority | Acceptance criteria |
| :--- | :--- | :--- | :--- |
| **FR-2.1** | **Applicant Pipeline Management** | **P0** | Customers can filter applicants by project and stage (`New`, `Interviewing`, `Contract Sent via DocuSign`, `Onboarded`, `Rejected`, `Terminated`). |
| **FR-2.2** | **AI Resume Fit & Gap Analysis** | **P0** | Customers can trigger an on-demand AI evaluation comparing a candidate's verified profile against the project scope, returning a `0–100%` match score, strengths summary, and interview gap/probe. |
| **FR-2.3** | **Pre-Vetted Indeed Talent Directory** | **P1** | Customers can search verified global contractors by industry, country, availability, and skills, and invite them directly into a project's `Interviewing` stage. |

### Epic 3: Compliant contracting, onboarding, and billing (Shared)
| ID | Requirement | Priority | Acceptance criteria |
| :--- | :--- | :--- | :--- |
| **FR-3.1** | **Country-Specific DocuSign Dispatch** | **P0** | Selecting `Send Contract` auto-populates a country-compliant agreement (local tax clauses, IP assignment, rate, duration) and dispatches a tracked DocuSign Envelope ID. |
| **FR-3.2** | **1-Click Contractor Onboarding** | **P0** | Once the DocuSign agreement is signed, completing onboarding transitions the candidate to `Onboarded` and creates an `Active` contract in the Contracts ledger ($39/mo billing active). |
| **FR-3.3** | **Lifecycle Sync (Termination & Invoices)** | **P0** | Terminating a contract updates status across both Customer and Contractor workspaces; approving an invoice settles payment via Contractor Express rails. |

### Epic 4: Project discovery, 1-click apply, and PLG viral loop (Contractor)
| ID | Requirement | Priority | Acceptance criteria |
| :--- | :--- | :--- | :--- |
| **FR-4.1** | **Pre-Filtered Indeed Project Feed** | **P0** | Contractors can browse and filter remote project openings by industry and keyword, viewing budget bands and Sponsored badges. |
| **FR-4.2** | **1-Click Apply with AI Tailored Pitch** | **P0** | Contractors can generate a 2-sentence personalized pitch and recommended hourly rate grounded in their verified work history, and submit in one click. |
| **FR-4.3** | **Viral `Invite Client` Acquisition Flow** | **P1** | Contractors can invite an external client (Company Name, Email, Role, Rate) to open a Contractor Express account and countersign a pre-filled contract (`Pending Signature`). |

---

## 6. Prototype architecture and partner integrations

*Note: In this interactive prototype, external partner integrations (Indeed, DocuSign, payment rails) are simulated in the client state, and AI features include built-in client-side fallbacks so the prototype runs standalone on GitHub Pages without requiring API keys.*

- **Indeed Partner Integration (Simulated):** Publishes project listings, manages Sponsored Boost status, and surfaces pre-vetted contractor profiles.
- **AI Co-Pilot Service:** Generates Project Briefs, Resume Match Scores, and Tailored Pitches via Gemini when run with a local API key, or falls back automatically to deterministic client-side logic on static hosting.
- **DocuSign eSignature Flow (Simulated):** Generates envelope IDs and tracks signature status before onboarding.
- **Contractor Express Core Ledger:** Shared state for Contracts (`Active`, `Pending Signature`, `Terminated`) and Invoices (`Pending Approval`, `Paid`).

---

## 7. Key risks and mitigations

| Risk | Severity | Mitigation strategy |
| :--- | :--- | :--- |
| **Users going off-platform (disintermediation)** | High | Tie the marketplace to localized tax and IP compliance, DocuSign workflows, and 1-click multi-currency payouts so contracting on-platform is faster and lower-risk than going direct. |
| **Too few applicants on new posts** | Medium | Seed supply through the **Indeed Talent Directory** so customers can invite vetted contractors immediately after posting a project. |
| **Inaccurate AI output or slow response times** | Low | Restrict AI prompts to the candidate's verified profile data and historical rate bands, and fall back to rule-based templates if the AI service times out. |
| **Worker misclassification risk** | High | Insert country-specific independent contractor clauses during the DocuSign step and structure agreements around milestone- or project-scoped Statements of Work (SOWs). |

---

## 8. Phased rollout plan

- **Phase 1, Core marketplace and AI assist (MVP):** Launch Project Posting, AI Brief/Rate Benchmarker, Applicant Pipeline with AI Resume Fit, and 1-Click Apply for existing customers and contractors.
- **Phase 2, Monetization and client-invite loop:** Enable $4/day Indeed Sponsored Boost billing and the Contractor `Invite Client` self-serve onboarding flow.
- **Phase 3, Automated redeployment alerts:** Notify contractors and suggest matching Indeed projects 30 days before their active Contractor Express contract ends.
