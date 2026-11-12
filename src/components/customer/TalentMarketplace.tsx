import React, { useState, useMemo } from 'react';
import { Contractor, JobPosting, JobApplication, CandidateStatus, AIResumeMatch, Industry } from '../../types';
import { analyzeCandidateResumeMatch } from '../../services/aiService';
import {
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  Users,
  FileSignature,
  CheckCircle2,
  XCircle,
  LayoutGrid,
  List,
  FileText,
  X,
  Sparkles,
  Loader2
} from 'lucide-react';

interface TalentMarketplaceProps {
  contractors: Contractor[];
  jobs: JobPosting[];
  applications: JobApplication[];
  onOpenPostJob: () => void;
  onUpdateCandidateStatus: (applicationId: string, newStatus: CandidateStatus) => void;
  onOpenContractModal: (candidate: {
    applicationId: string;
    name: string;
    role: string;
    country: string;
    rate: number;
  }) => void;
  onCompleteOnboarding: (applicationId: string) => void;
  onInviteContractorToProject: (contractor: Contractor, project: JobPosting) => void;
  onNavigateToContracts?: () => void;
  onSaveCandidateAIMatch?: (applicationId: string, aiMatch: AIResumeMatch) => void;
}

export const TalentMarketplace: React.FC<TalentMarketplaceProps> = ({
  contractors,
  jobs,
  applications,
  onOpenPostJob,
  onUpdateCandidateStatus,
  onOpenContractModal,
  onCompleteOnboarding,
  onInviteContractorToProject,
  onNavigateToContracts,
  onSaveCandidateAIMatch
}) => {
  const [subView, setSubView] = useState<'projects' | 'search'>('projects');
  const [projectsLayout, setProjectsLayout] = useState<'grid' | 'list'>('list');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('All Industries');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingResume, setInspectingResume] = useState<{
    contractor: Contractor;
    application?: JobApplication;
  } | null>(null);
  const [analyzingAppId, setAnalyzingAppId] = useState<string | null>(null);

  const industries: Industry[] = [
    'All Industries',
    'Technology',
    'Healthcare',
    'Construction',
    'Retail',
    'Marketing',
    'Finance'
  ];

  const filteredContractors = useMemo(() => {
    return contractors.filter(c => {
      const matchesIndustry = selectedIndustry === 'All Industries' || c.industry === selectedIndustry;
      const matchesQuery =
        searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesIndustry && matchesQuery;
    });
  }, [contractors, selectedIndustry, searchQuery]);

  const selectedProject = useMemo(
    () => jobs.find(j => j.id === selectedProjectId) || null,
    [jobs, selectedProjectId]
  );

  const selectedProjectApplications = useMemo(
    () => applications.filter(a => a.jobId === selectedProjectId),
    [applications, selectedProjectId]
  );

  const handleRunAIMatch = async (app: JobApplication, candidateProfile: Contractor) => {
    if (!selectedProject || !onSaveCandidateAIMatch) return;
    setAnalyzingAppId(app.id);
    try {
      const result = await analyzeCandidateResumeMatch(
        selectedProject,
        candidateProfile,
        app.requestedRate
      );
      onSaveCandidateAIMatch(app.id, result);
    } catch (err) {
      console.error('AI Resume Match error:', err);
    } finally {
      setAnalyzingAppId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <p className="text-xs text-slate-500 mb-1">
            Contractor Express · ProjectMatch (powered by Indeed)
          </p>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Find & Onboard Contingent Talent
          </h1>
        </div>

        {/* Interactive View Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
          <button
            onClick={() => {
              setSubView('projects');
              setSelectedProjectId(null);
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subView === 'projects'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Projects ({jobs.length})
          </button>
          <button
            onClick={() => {
              setSubView('search');
              setSelectedProjectId(null);
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subView === 'search'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Directory Search ({contractors.length})
          </button>
        </div>
      </div>

      {/* Sub-view 1: My Projects (with List View and Card View toggle) */}
      {subView === 'projects' && !selectedProject && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Active Projects on Indeed
              </h2>
              <p className="text-xs text-slate-500">
                Click a project to inspect full candidate resumes, screen applicants, and dispatch contracts via DocuSign.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* List vs Grid Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setProjectsLayout('list')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    projectsLayout === 'list'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
                <button
                  onClick={() => setProjectsLayout('grid')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    projectsLayout === 'grid'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Card View</span>
                </button>
              </div>

              <button
                onClick={onOpenPostJob}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0f284e] bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Project</span>
              </button>
            </div>
          </div>

          {/* Layout Option A: Table / List View */}
          {projectsLayout === 'list' ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Project Title</th>
                      <th className="px-4 py-3">Industry</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3 text-right">Budget Rate</th>
                      <th className="px-4 py-3 text-right">Candidates Applied</th>
                      <th className="px-4 py-3">Pipeline Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map(job => {
                      const jobApps = applications.filter(a => a.jobId === job.id);
                      const newCount = jobApps.filter(
                        a => a.status === 'New' || a.status === 'Applied'
                      ).length;
                      const interviewingCount = jobApps.filter(a => a.status === 'Interviewing').length;
                      const hireCount = jobApps.filter(
                        a => a.status === 'Hire' || a.status === 'Contract Sent via DocuSign'
                      ).length;
                      const onboardedCount = jobApps.filter(a => a.status === 'Onboarded').length;
                      const terminatedCount = jobApps.filter(a => a.status === 'Terminated').length;

                      return (
                        <tr
                          key={job.id}
                          onClick={() => setSelectedProjectId(job.id)}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3.5 font-bold text-slate-900">
                            {job.title}
                            <span className="block text-[11px] font-normal text-slate-500">
                              {job.location} · {job.isSponsored ? 'Sponsored on Indeed ($4/day)' : 'Standard Listing'}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600">{job.industry}</td>
                          <td className="px-4 py-3.5 text-slate-600">{job.duration}</td>
                          <td className="px-4 py-3.5 font-mono tabular-nums font-semibold text-slate-900 text-right">
                            ${job.hourlyRateMin}–${job.hourlyRateMax}/hr
                          </td>
                          <td className="px-4 py-3.5 font-mono tabular-nums font-bold text-slate-900 text-right">
                            {jobApps.length}
                          </td>
                          <td className="px-4 py-3.5 text-slate-600">
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              {newCount > 0 && (
                                <span className="text-slate-700 font-medium font-mono tabular-nums">
                                  {newCount} new
                                </span>
                              )}
                              {newCount > 0 && (interviewingCount > 0 || hireCount > 0 || onboardedCount > 0 || terminatedCount > 0) && (
                                <span aria-hidden="true" className="text-slate-300">·</span>
                              )}
                              {interviewingCount > 0 && (
                                <span className="text-amber-700 font-medium font-mono tabular-nums">
                                  {interviewingCount} interviewing
                                </span>
                              )}
                              {interviewingCount > 0 && (hireCount > 0 || onboardedCount > 0 || terminatedCount > 0) && (
                                <span aria-hidden="true" className="text-slate-300">·</span>
                              )}
                              {hireCount > 0 && (
                                <span className="text-[#0f284e] font-medium font-mono tabular-nums">
                                  {hireCount} hire
                                </span>
                              )}
                              {hireCount > 0 && (onboardedCount > 0 || terminatedCount > 0) && (
                                <span aria-hidden="true" className="text-slate-300">·</span>
                              )}
                              {onboardedCount > 0 && (
                                <span className="text-emerald-700 font-medium font-mono tabular-nums">
                                  {onboardedCount} onboarded
                                </span>
                              )}
                              {onboardedCount > 0 && terminatedCount > 0 && (
                                <span aria-hidden="true" className="text-slate-300">·</span>
                              )}
                              {terminatedCount > 0 && (
                                <span className="text-slate-600 font-medium font-mono tabular-nums">
                                  {terminatedCount} terminated
                                </span>
                              )}
                              {newCount === 0 && interviewingCount === 0 && hireCount === 0 && onboardedCount === 0 && terminatedCount === 0 && (
                                <span className="text-slate-500">Awaiting review</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f284e] hover:underline whitespace-nowrap">
                              <span>View Candidates</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Layout Option B: Card Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map(job => {
                const jobApps = applications.filter(a => a.jobId === job.id);
                const newCount = jobApps.filter(
                  a => a.status === 'New' || a.status === 'Applied'
                ).length;
                const interviewingCount = jobApps.filter(a => a.status === 'Interviewing').length;
                const hireCount = jobApps.filter(
                  a => a.status === 'Hire' || a.status === 'Contract Sent via DocuSign'
                ).length;
                const onboardedCount = jobApps.filter(a => a.status === 'Onboarded').length;
                const terminatedCount = jobApps.filter(a => a.status === 'Terminated').length;

                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedProjectId(job.id)}
                    className="text-left bg-white rounded-xl border border-slate-200 hover:border-[#0f284e] p-5 transition-colors flex flex-col justify-between gap-4 group cursor-pointer"
                  >
                    <div className="space-y-2 w-full">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0f284e] transition-colors">
                          {job.title}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f284e] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>{job.industry}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums font-medium text-slate-700">
                          ${job.hourlyRateMin}–${job.hourlyRateMax}/hr
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 w-full">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <Users className="w-4 h-4 text-[#0f284e]" />
                        <span className="font-mono tabular-nums font-bold text-slate-900">
                          {jobApps.length} {jobApps.length === 1 ? 'Candidate' : 'Candidates'} Applied
                        </span>
                        {newCount > 0 && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-slate-700 font-medium font-mono tabular-nums">
                              {newCount} new
                            </span>
                          </>
                        )}
                        {interviewingCount > 0 && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-amber-700 font-medium font-mono tabular-nums">
                              {interviewingCount} interviewing
                            </span>
                          </>
                        )}
                        {hireCount > 0 && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-[#0f284e] font-medium font-mono tabular-nums">
                              {hireCount} hire
                            </span>
                          </>
                        )}
                        {onboardedCount > 0 && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-emerald-700 font-medium font-mono tabular-nums">
                              {onboardedCount} onboarded
                            </span>
                          </>
                        )}
                        {terminatedCount > 0 && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-slate-600 font-medium font-mono tabular-nums">
                              {terminatedCount} terminated
                            </span>
                          </>
                        )}
                      </div>

                      <span className="text-xs font-semibold text-[#0f284e] group-hover:underline whitespace-nowrap shrink-0">
                        Review Candidates
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Sub-view 1B: Selected Project Drill-down (Detailed Candidate Resumes + Screening + DocuSign + Direct Onboarding) */}
      {subView === 'projects' && selectedProject && (
        <div className="space-y-6">
          
          {/* Back button & Project Summary Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <button
              onClick={() => setSelectedProjectId(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Projects</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{selectedProject.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-700">
                    Budget: ${selectedProject.hourlyRateMin}–${selectedProject.hourlyRateMax}/hr
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Required: {selectedProject.skills.join(', ')}</span>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <p className="text-xs text-slate-500">Applicants</p>
                <p className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                  {selectedProjectApplications.length}
                </p>
              </div>
            </div>
          </div>

          {/* Candidates Who Applied List with Resume Details */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-sm font-bold text-slate-900">
                Candidates Who Applied ({selectedProjectApplications.length})
              </h3>
              <p className="text-xs text-slate-500">
                Compare candidate experience & skills, open full Indeed resumes, and set screening status.
              </p>
            </div>

            {selectedProjectApplications.length > 0 ? (
              <div className="space-y-4">
                {selectedProjectApplications.map(app => {
                  const candidateProfile = contractors.find(
                    c => c.id === app.contractorId || c.name === app.contractorName
                  );

                  return (
                    <div
                      key={app.id}
                      className={`bg-white rounded-xl border border-slate-200 p-5 space-y-4 ${
                        app.status === 'Rejected' ? 'opacity-65' : ''
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                        
                        {/* Left: Candidate Header, Resume Summary & Skills */}
                        <div className="space-y-2.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="font-bold text-slate-900 text-base">{app.contractorName}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-700 font-semibold">{app.contractorTitle}</span>
                            <span aria-hidden="true">·</span>
                            <span>
                              {candidateProfile ? `${candidateProfile.city}, ${candidateProfile.country}` : app.contractorCountry}
                            </span>
                            {candidateProfile && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono tabular-nums text-slate-700 font-medium">
                                  {candidateProfile.experienceYears} yrs experience
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="text-emerald-700 font-medium">
                                  {candidateProfile.availability}
                                </span>
                              </>
                            )}
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums font-bold text-slate-900 text-sm">
                              ${app.requestedRate}/hr
                            </span>
                          </div>

                          {/* Resume Bio & Application Pitch */}
                          {candidateProfile && (
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {candidateProfile.bio}
                            </p>
                          )}

                          {app.note && (
                            <p className="text-xs text-slate-600">
                              <strong className="text-slate-800">Candidate Pitch:</strong> {app.note}
                            </p>
                          )}

                          {/* AI Resume Match Score & Gap Summary */}
                          {candidateProfile && (
                            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1 font-bold text-[#0f284e]">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>AI Resume Match & Gap Summary</span>
                                  </span>
                                  {app.aiMatch && (
                                    <>
                                      <span aria-hidden="true" className="text-slate-300">·</span>
                                      <span
                                        className={`font-mono tabular-nums font-bold ${
                                          app.aiMatch.matchScore >= 90
                                            ? 'text-emerald-700'
                                            : app.aiMatch.matchScore >= 80
                                            ? 'text-[#0f284e]'
                                            : 'text-amber-700'
                                        }`}
                                      >
                                        {app.aiMatch.matchScore}% Match
                                      </span>
                                    </>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  disabled={analyzingAppId === app.id}
                                  onClick={() => handleRunAIMatch(app, candidateProfile)}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0f284e] hover:underline disabled:opacity-50"
                                >
                                  {analyzingAppId === app.id ? (
                                    <>
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                      <span>Analyzing Resume...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="w-3 h-3" />
                                      <span>{app.aiMatch ? 'Refresh AI Analysis' : 'Run AI Match Analysis'}</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {app.aiMatch ? (
                                <div className="space-y-1 text-slate-600 leading-relaxed">
                                  <p>
                                    <strong className="text-emerald-800">Why they fit:</strong>{' '}
                                    {app.aiMatch.strengthsSummary}
                                  </p>
                                  <p>
                                    <strong className="text-amber-800">What to probe:</strong>{' '}
                                    {app.aiMatch.gapOrProbe}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-slate-500">
                                  Click &ldquo;Run AI Match Analysis&rdquo; to evaluate this candidate&apos;s Indeed resume against your project requirements and budget.
                                </p>
                              )}
                            </div>
                          )}

                          {/* Recent Experience & Education Preview directly on card */}
                          {candidateProfile && (
                            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2 text-xs">
                              {candidateProfile.workHistory[0] && (
                                <div>
                                  <span className="font-semibold text-slate-900">
                                    Recent Role: {candidateProfile.workHistory[0].role}
                                  </span>{' '}
                                  <span className="text-slate-500">
                                    at {candidateProfile.workHistory[0].company} ({candidateProfile.workHistory[0].period})
                                  </span>
                                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                                    {candidateProfile.workHistory[0].highlights}
                                  </p>
                                </div>
                              )}

                              <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                                <span>
                                  <strong className="text-slate-800">Education:</strong> {candidateProfile.education}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>
                                  <strong className="text-slate-800">Skills:</strong> {candidateProfile.skills.join(' · ')}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>
                                  <strong className="text-slate-800">Languages:</strong> {candidateProfile.languages.join(', ')}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Status & View Full Resume Row */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="text-slate-500">Current Stage:</span>
                              <span
                                className={`font-semibold ${
                                  app.status === 'Rejected'
                                    ? 'text-rose-700'
                                    : app.status === 'Terminated'
                                    ? 'text-slate-700'
                                    : app.status === 'Interviewing'
                                    ? 'text-amber-700'
                                    : app.status === 'Hire' || app.status === 'Contract Sent via DocuSign'
                                    ? 'text-[#0f284e]'
                                    : app.status === 'Onboarded'
                                    ? 'text-emerald-700'
                                    : 'text-slate-800'
                                }`}
                              >
                                {app.status}
                              </span>
                              {app.docusignEnvelopeId && (
                                <>
                                  <span aria-hidden="true" className="text-slate-300">·</span>
                                  <span className="font-mono text-[11px] text-slate-500">
                                    DocuSign Envelope {app.docusignEnvelopeId} emailed
                                  </span>
                                </>
                              )}
                            </div>

                            {candidateProfile && (
                              <button
                                onClick={() =>
                                  setInspectingResume({
                                    contractor: candidateProfile,
                                    application: app
                                  })
                                }
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f284e] hover:underline whitespace-nowrap shrink-0"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>View Full Indeed Resume</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Right: Screening Selector (New | Interviewing | Hire | Onboarded | Terminated | Rejected) + Contextual Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                          
                          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start lg:self-end">
                            <button
                              onClick={() => onUpdateCandidateStatus(app.id, 'New')}
                              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                                app.status === 'New' || app.status === 'Applied'
                                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              New
                            </button>

                            <button
                              onClick={() => onUpdateCandidateStatus(app.id, 'Interviewing')}
                              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                                app.status === 'Interviewing'
                                  ? 'bg-white text-amber-800 shadow-xs font-semibold'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              Interviewing
                            </button>

                            <button
                              onClick={() => {
                                onUpdateCandidateStatus(app.id, 'Hire');
                                onOpenContractModal({
                                  applicationId: app.id,
                                  name: app.contractorName,
                                  role: selectedProject.title,
                                  country: app.contractorCountry,
                                  rate: app.requestedRate
                                });
                              }}
                              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                                app.status === 'Hire' || app.status === 'Contract Sent via DocuSign'
                                  ? 'bg-[#0f284e] text-white shadow-xs font-semibold'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              Hire
                            </button>

                            <button
                              onClick={() => onCompleteOnboarding(app.id)}
                              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                                app.status === 'Onboarded'
                                  ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              Onboarded
                            </button>

                            <button
                              onClick={() => onUpdateCandidateStatus(app.id, 'Terminated')}
                              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                                app.status === 'Terminated'
                                  ? 'bg-slate-800 text-white shadow-xs font-semibold'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              Terminated
                            </button>

                            <button
                              onClick={() => onUpdateCandidateStatus(app.id, 'Rejected')}
                              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                                app.status === 'Rejected'
                                  ? 'bg-rose-700 text-white shadow-xs font-semibold'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              Rejected
                            </button>
                          </div>

                          {app.status === 'Hire' && (
                            <button
                              onClick={() =>
                                onOpenContractModal({
                                  applicationId: app.id,
                                  name: app.contractorName,
                                  role: selectedProject.title,
                                  country: app.contractorCountry,
                                  rate: app.requestedRate
                                })
                              }
                              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                            >
                              <FileSignature className="w-3.5 h-3.5" />
                              <span>Generate {app.contractorCountry} Contract (DocuSign)</span>
                            </button>
                          )}

                          {app.status === 'Contract Sent via DocuSign' && (
                            <button
                              onClick={() => onCompleteOnboarding(app.id)}
                              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Onboard Contractor</span>
                            </button>
                          )}

                          {app.status === 'Onboarded' && (
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-semibold text-emerald-700 flex items-center gap-1 whitespace-nowrap shrink-0">
                                <Check className="w-3.5 h-3.5" />
                                <span>Onboarded & Active</span>
                              </span>
                              {onNavigateToContracts && (
                                <>
                                  <span aria-hidden="true" className="text-slate-300">·</span>
                                  <button
                                    onClick={onNavigateToContracts}
                                    className="font-semibold text-[#0f284e] hover:underline whitespace-nowrap shrink-0"
                                  >
                                    View in Contracts
                                  </button>
                                </>
                              )}
                            </div>
                          )}

                          {app.status === 'Terminated' && (
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-semibold text-slate-700 flex items-center gap-1 whitespace-nowrap shrink-0">
                                <XCircle className="w-3.5 h-3.5 text-slate-500" />
                                <span>Contract Terminated</span>
                              </span>
                              {onNavigateToContracts && (
                                <>
                                  <span aria-hidden="true" className="text-slate-300">·</span>
                                  <button
                                    onClick={onNavigateToContracts}
                                    className="font-semibold text-[#0f284e] hover:underline whitespace-nowrap shrink-0"
                                  >
                                    View in Contracts
                                  </button>
                                </>
                              )}
                            </div>
                          )}

                          {app.status === 'Rejected' && (
                            <span className="text-xs text-rose-700 flex items-center gap-1 whitespace-nowrap shrink-0">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Candidate Rejected</span>
                            </span>
                          )}

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
                <p className="text-sm font-semibold text-slate-800">No applications yet for this project</p>
                <p className="text-xs text-slate-500">
                  Your project is live on Indeed. You can also source candidates from the Directory Search tab.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Sub-view 2: Directory Search */}
      {subView === 'search' && (
        <div className="space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selectedIndustry === ind
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by role or skill..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0f284e]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContractors.map(contractor => {
              const matchingProject = jobs.find(j => j.industry === contractor.industry) || jobs[0];

              return (
                <div
                  key={contractor.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                          {contractor.initials}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {contractor.name}
                          </h3>
                          <p className="text-xs text-slate-600">
                            {contractor.title}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-base font-bold text-slate-900 font-mono tabular-nums">
                          ${contractor.hourlyRate}<span className="text-xs font-normal text-slate-500">/hr</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{contractor.city}, {contractor.country}</span>
                      <span aria-hidden="true">·</span>
                      <span>{contractor.industry}</span>
                      <span aria-hidden="true">·</span>
                      <span>{contractor.experienceYears} yrs exp</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-medium">{contractor.availability}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {contractor.bio}
                    </p>

                    {contractor.workHistory[0] && (
                      <p className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Recent: </span>
                        {contractor.workHistory[0].role} at {contractor.workHistory[0].company} ({contractor.workHistory[0].period})
                      </p>
                    )}

                    <p className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Skills: </span>
                      {contractor.skills.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setInspectingResume({ contractor })}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f284e] hover:underline whitespace-nowrap shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Full Resume</span>
                    </button>

                    {matchingProject && (
                      <button
                        onClick={() => {
                          onInviteContractorToProject(contractor, matchingProject);
                          setSubView('projects');
                          setSelectedProjectId(matchingProject.id);
                        }}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <span>Shortlist for Interview</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Full Indeed Resume Modal */}
      {inspectingResume && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-5 shadow-lg border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-800 shrink-0">
                  {inspectingResume.contractor.initials}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {inspectingResume.contractor.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-600">
                    {inspectingResume.contractor.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{inspectingResume.contractor.city}, {inspectingResume.contractor.country}</span>
                    <span aria-hidden="true">·</span>
                    <span>{inspectingResume.contractor.experienceYears} years experience</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums font-bold text-slate-900">
                      ${inspectingResume.application ? inspectingResume.application.requestedRate : inspectingResume.contractor.hourlyRate}/hr
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">
                      {inspectingResume.contractor.availability}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectingResume(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Resume Content */}
            <div className="space-y-5 text-xs text-slate-700">
              
              {/* Summary */}
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">Executive Summary</h3>
                <p className="text-slate-600 leading-relaxed">
                  {inspectingResume.contractor.bio}
                </p>
              </div>

              {/* Work Experience */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900">Work Experience</h3>
                <div className="space-y-3">
                  {inspectingResume.contractor.workHistory.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-bold text-slate-900">{item.role}</span>
                        <span className="font-mono text-[11px] text-slate-500">{item.period}</span>
                      </div>
                      <p className="font-medium text-slate-700">{item.company}</p>
                      <p className="text-slate-600 leading-relaxed pt-1">{item.highlights}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900">Verified Skills (Indeed Assessment)</h3>
                <p className="text-slate-700">
                  {inspectingResume.contractor.skills.join(' · ')}
                </p>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">Education</h3>
                  <p className="text-slate-600">{inspectingResume.contractor.education}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">Certifications & Languages</h3>
                  <p className="text-slate-600">
                    {inspectingResume.contractor.certifications.join(' · ')}
                  </p>
                  <p className="text-slate-500">
                    Languages: {inspectingResume.contractor.languages.join(', ')}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer with Quick Screening Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Indeed Resume Profile · Pre-validated for Contractor Express
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectingResume(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Close
                </button>

                {inspectingResume.application && selectedProject && (
                  <>
                    <button
                      onClick={() => {
                        onUpdateCandidateStatus(inspectingResume.application!.id, 'Interviewing');
                        setInspectingResume(null);
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-lg transition-colors"
                    >
                      Mark Interviewing
                    </button>
                    <button
                      onClick={() => {
                        const app = inspectingResume.application!;
                        onUpdateCandidateStatus(app.id, 'Hire');
                        setInspectingResume(null);
                        onOpenContractModal({
                          applicationId: app.id,
                          name: app.contractorName,
                          role: selectedProject.title,
                          country: app.contractorCountry,
                          rate: app.requestedRate
                        });
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors"
                    >
                      Hire & Generate Contract
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
