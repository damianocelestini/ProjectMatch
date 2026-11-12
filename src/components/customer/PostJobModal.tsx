import React, { useState } from 'react';
import { JobPosting, Industry } from '../../types';
import { generateProjectBrief } from '../../services/aiService';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (job: JobPosting) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated
}) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [rateRationale, setRateRationale] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState<Industry>('Technology');
  const [duration, setDuration] = useState('4 months');
  const [rateMin, setRateMin] = useState(65);
  const [rateMax, setRateMax] = useState(85);
  const [skillsInput, setSkillsInput] = useState('');
  const [description, setDescription] = useState('');
  const [isSponsored, setIsSponsored] = useState(true);

  if (!isOpen) return null;

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiError(null);

    try {
      const result = await generateProjectBrief(aiPrompt.trim(), industry, duration);
      setTitle(result.title);
      const validIndustries: Industry[] = [
        'Technology',
        'Healthcare',
        'Construction',
        'Retail',
        'Marketing',
        'Finance',
      ];
      if (validIndustries.includes(result.industry as Industry)) {
        setIndustry(result.industry as Industry);
      }
      if (['2 months', '3 months', '4 months', '6 months'].includes(result.duration)) {
        setDuration(result.duration);
      }
      setRateMin(result.rateMin);
      setRateMax(result.rateMax);
      setRateRationale(result.rateRationale);
      setSkillsInput((result.skills || []).join(', '));
      setDescription(result.description);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to generate brief right now.';
      setAiError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const skills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: title.trim(),
      company: 'Lumina Global Services',
      location: 'Global Remote',
      industry,
      duration,
      hourlyRateMin: rateMin,
      hourlyRateMax: rateMax,
      description: description.trim() || 'Remote project contract managed via Contractor Express.',
      skills: skills.length > 0 ? skills : ['Remote Collaboration'],
      postedDaysAgo: 0,
      isSponsored
    };

    onJobCreated(newJob);
    setAiPrompt('');
    setRateRationale(null);
    setAiError(null);
    setTitle('');
    setSkillsInput('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-5 shadow-lg border border-slate-200 max-h-[92vh] overflow-y-auto">
        
        <div className="flex items-start justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Post Project to Indeed</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish directly from Contractor Express via ProjectMatch (powered by Indeed).
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Project Brief & Rate Benchmarker */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f284e]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Project Brief & Rate Benchmarker</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setAiPrompt(
                  'Need a senior Revit BIM coordinator for a 4-month hospital expansion in LATAM to run clash detection'
                )
              }
              className="text-[11px] font-medium text-slate-500 hover:text-[#0f284e] hover:underline"
            >
              Try sample prompt
            </button>
          </div>

          <p className="text-[11px] text-slate-600">
            Describe what you need in one sentence—AI will draft the Indeed scope, extract required skills, and benchmark global hourly rates.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              placeholder="e.g. Need a Kubernetes & Go architect for a 4-month European payment pipeline..."
              className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0f284e]"
            />
            <button
              type="button"
              disabled={isGenerating || !aiPrompt.trim()}
              onClick={handleGenerateWithAI}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Benchmarking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Brief & Rates</span>
                </>
              )}
            </button>
          </div>

          {aiError && (
            <p className="text-[11px] text-rose-700 font-medium">{aiError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Senior Cloud Engineer or Clinical Data Specialist"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0f284e]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Industry</label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value as Industry)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              >
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Construction">Construction</option>
                <option value="Retail">Retail</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Project Duration</label>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              >
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="4 months">4 months (Avg)</option>
                <option value="6 months">6 months</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Min Rate ($/hr)</label>
                <input
                  type="number"
                  value={rateMin}
                  onChange={e => setRateMin(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Max Rate ($/hr)</label>
                <input
                  type="number"
                  value={rateMax}
                  onChange={e => setRateMax(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono tabular-nums"
                />
              </div>
            </div>

            {rateRationale && (
              <p className="text-[11px] text-emerald-800 bg-emerald-50/80 border border-emerald-200 rounded-lg px-3 py-2">
                <strong className="font-semibold">AI Rate Benchmark:</strong> {rateRationale}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Required Skills (comma-separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
              placeholder="e.g. Go, Kubernetes, PostgreSQL"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Project Scope</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Key deliverables and project timeline..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
          </div>

          {/* Single MVP Indeed Sponsorship Option ($4/day with 20% Contractor Express discount) */}
          <label className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={isSponsored}
              onChange={e => setIsSponsored(e.target.checked)}
              className="mt-0.5 rounded text-[#0f284e]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Sponsor Project on Indeed</span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  $4/day <span className="text-slate-400 font-normal line-through">$5/day</span>
                </span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Includes 20% Contractor Express customer discount for priority placement on Indeed.
              </p>
            </div>
          </label>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors"
            >
              Publish Project
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
