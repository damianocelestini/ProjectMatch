import React, { useState, useMemo } from 'react';
import { JobPosting, JobApplication, Contractor, Industry } from '../../types';
import { generateTailoredContractorPitch } from '../../services/aiService';
import { Search, Check, Send, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

interface FindJobsProps {
  jobs: JobPosting[];
  contractorProfile: Contractor;
  appliedJobIds: string[];
  applications: JobApplication[];
  onApplyToJob: (job: JobPosting, customNote?: string, customRate?: number) => void;
  onOpenInviteClient: () => void;
}

export const FindJobs: React.FC<FindJobsProps> = ({
  jobs,
  contractorProfile,
  appliedJobIds,
  applications,
  onApplyToJob,
  onOpenInviteClient
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('All Industries');
  const [searchQuery, setSearchQuery] = useState('');

  const [generatingJobId, setGeneratingJobId] = useState<string | null>(null);
  const [draftPitches, setDraftPitches] = useState<
    Record<string, { pitch: string; rate: number; error?: string }>
  >({});

  const industries: Industry[] = [
    'All Industries',
    'Technology',
    'Healthcare',
    'Construction',
    'Retail',
    'Marketing',
    'Finance'
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchesIndustry = selectedIndustry === 'All Industries' || j.industry === selectedIndustry;
      const matchesQuery =
        searchQuery === '' ||
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesIndustry && matchesQuery;
    });
  }, [jobs, selectedIndustry, searchQuery]);

  const handleGeneratePitch = async (job: JobPosting) => {
    setGeneratingJobId(job.id);
    try {
      const result = await generateTailoredContractorPitch(job, contractorProfile);
      setDraftPitches(prev => ({
        ...prev,
        [job.id]: {
          pitch: result.pitch,
          rate: result.recommendedRate || contractorProfile.hourlyRate
        }
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to generate pitch right now.';
      setDraftPitches(prev => ({
        ...prev,
        [job.id]: {
          pitch: `Matched my ${contractorProfile.experienceYears}+ years of experience (${contractorProfile.workHistory[0]?.role || contractorProfile.title}) to "${job.title}". Pre-verified on Contractor Express for immediate compliant onboarding.`,
          rate: contractorProfile.hourlyRate,
          error: msg
        }
      }));
    } finally {
      setGeneratingJobId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <p className="text-xs text-slate-500 mb-1">
            Contractor Express · ProjectMatch (powered by Indeed)
          </p>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Find Your Next Contingent Project
          </h1>
        </div>

        <button
          onClick={onOpenInviteClient}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline whitespace-nowrap shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Client not on Contractor Express? Send Invite</span>
        </button>
      </div>

      {/* Filters */}
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
            placeholder="Search projects by skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-700"
          />
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-3">
        {filteredJobs.map(job => {
          const isApplied = appliedJobIds.includes(job.id);
          const matchingApp = applications.find(
            a => a.jobId === job.id && a.contractorName === contractorProfile.name
          );
          const draft = draftPitches[job.id];
          const isGenerating = generatingJobId === job.id;

          return (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">{job.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.duration}</span>
                    {job.isSponsored && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-700 font-medium">Sponsored on Indeed</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {job.description}
                  </p>

                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Skills: </span>
                    {job.skills.join(' · ')}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 flex flex-col sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div>
                    <p className="text-base font-bold text-slate-900 font-mono tabular-nums">
                      ${job.hourlyRateMin}–${job.hourlyRateMax}<span className="text-xs font-normal text-slate-500">/hr</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Contractor Express Payout
                    </p>
                  </div>

                  {isApplied || matchingApp ? (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 whitespace-nowrap shrink-0">
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        {matchingApp ? `Status: ${matchingApp.status}` : 'Applied with Contractor Express Profile'}
                      </span>
                    </span>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={isGenerating}
                        onClick={() => handleGeneratePitch(job)}
                        className="px-3 py-2 text-xs font-semibold text-[#0f284e] bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Drafting AI Pitch...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{draft ? 'Regenerate AI Pitch' : '1-Click AI Pitch'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onApplyToJob(job, draft?.pitch, draft?.rate)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <span>1-Click Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 1-Click Tailored Pitch Generator Drawer */}
              {!isApplied && !matchingApp && draft && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#0f284e]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Tailored Application Pitch (matched to your Contractor Express work history)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-slate-600 font-semibold">Proposed Rate ($/hr):</label>
                      <input
                        type="number"
                        value={draft.rate}
                        onChange={e =>
                          setDraftPitches(prev => ({
                            ...prev,
                            [job.id]: { ...draft, rate: Number(e.target.value) }
                          }))
                        }
                        className="w-20 px-2.5 py-1 bg-white border border-slate-200 rounded-md font-mono tabular-nums font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={draft.pitch}
                    onChange={e =>
                      setDraftPitches(prev => ({
                        ...prev,
                        [job.id]: { ...draft, pitch: e.target.value }
                      }))
                    }
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 leading-relaxed focus:outline-hidden focus:border-emerald-700"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500">
                      Sent alongside your verified Contractor Express resume & {contractorProfile.country} tax profile.
                    </span>
                    <button
                      type="button"
                      onClick={() => onApplyToJob(job, draft.pitch, draft.rate)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <span>Submit Application with Pitch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Show submitted pitch when already applied */}
              {matchingApp && matchingApp.note && (
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Submitted Pitch: </span>
                  {matchingApp.note}
                </div>
              )}
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-800">No projects match your filter</p>
            <button
              onClick={() => {
                setSelectedIndustry('All Industries');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
