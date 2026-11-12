import React from 'react';
import {
  UserPersona,
  ActiveTab,
  JobPosting,
  JobApplication,
  GPContract,
  GPInvoice
} from '../../types';
import { ArrowRight, Plus, Send } from 'lucide-react';

interface HomeViewProps {
  currentPersona: UserPersona;
  jobs: JobPosting[];
  applications: JobApplication[];
  contracts: GPContract[];
  invoices: GPInvoice[];
  appliedJobIds: string[];
  onNavigate: (tab: ActiveTab) => void;
  onOpenPostJob: () => void;
  onOpenInviteClient: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentPersona,
  jobs,
  applications,
  contracts,
  invoices,
  appliedJobIds,
  onNavigate,
  onOpenPostJob,
  onOpenInviteClient
}) => {
  const pendingInvoices = invoices.filter(i => i.status === 'Pending Approval');
  const pendingInvoicesTotal = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);

  const activeContractsCount = contracts.filter(c => c.status === 'Active').length;
  const terminatedContractsCount = contracts.filter(c => c.status === 'Terminated').length;

  if (currentPersona === 'customer') {
    const activeCandidatesCount = applications.filter(
      a =>
        a.status === 'New' ||
        a.status === 'Applied' ||
        a.status === 'Interviewing' ||
        a.status === 'Hire' ||
        a.status === 'Contract Sent via DocuSign'
    ).length;

    return (
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <p className="text-xs text-slate-500 mb-1">
              Contractor Express · Customer Workspace
            </p>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back, Lumina Global Services
            </h1>
          </div>

          <button
            onClick={onOpenPostJob}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Project</span>
          </button>
        </div>

        {/* Summary Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500 font-medium">Active Contractors</p>
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                {activeContractsCount}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono tabular-nums">
                ${activeContractsCount * 39}/mo · {terminatedContractsCount} terminated
              </span>
              <button
                onClick={() => onNavigate('contracts')}
                className="font-semibold text-[#0f284e] hover:underline flex items-center gap-1"
              >
                <span>View Contracts</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500 font-medium">ProjectMatch Candidates</p>
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                {activeCandidatesCount}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono tabular-nums">
                Across {jobs.length} active projects
              </span>
              <button
                onClick={() => onNavigate('project_match')}
                className="font-semibold text-[#0f284e] hover:underline flex items-center gap-1"
              >
                <span>Review Candidates</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500 font-medium">Invoices Pending Approval</p>
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                {pendingInvoices.length}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-amber-700 font-mono tabular-nums font-medium">
                ${pendingInvoicesTotal.toLocaleString()} due
              </span>
              <button
                onClick={() => onNavigate('invoices')}
                className="font-semibold text-[#0f284e] hover:underline flex items-center gap-1"
              >
                <span>Review Invoices</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ProjectMatch Feature Callout */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-xs font-semibold text-emerald-700">
              ProjectMatch (powered by Indeed)
            </p>
            <h2 className="text-base font-bold text-slate-900">
              Source, Screen & Onboard Global Contractors in One Place
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Post project openings directly to Indeed with a 20% Contractor Express discount, screen applicants, dispatch country-specific contracts via DocuSign, and onboard contractors seamlessly.
            </p>
          </div>

          <button
            onClick={() => onNavigate('project_match')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start md:self-center"
          >
            <span>Open ProjectMatch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recent Candidate Activity Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Recent ProjectMatch Applicants
            </h2>
            <button
              onClick={() => onNavigate('project_match')}
              className="text-xs font-semibold text-[#0f284e] hover:underline"
            >
              View All Projects
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Candidate</th>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3 text-right">Proposed Rate</th>
                    <th className="px-4 py-3">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.slice(0, 4).map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {app.contractorName}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {app.jobTitle}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {app.contractorCountry}
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums font-semibold text-slate-900 text-right">
                        ${app.requestedRate}/hr
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-medium ${
                            app.status === 'Rejected'
                              ? 'text-rose-700'
                              : app.status === 'Interviewing'
                              ? 'text-amber-700'
                              : app.status === 'Hire' || app.status === 'Contract Sent via DocuSign' || app.status === 'Onboarded'
                              ? 'text-emerald-700'
                              : 'text-slate-700'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Contractor Home View (Mateusz Kowalski)
  const myApplications = applications.filter(a => a.contractorName === 'Mateusz Kowalski');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <p className="text-xs text-slate-500 mb-1">
            Contractor Express · Contractor Workspace
          </p>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, Mateusz Kowalski
          </h1>
        </div>

        <button
          onClick={onOpenInviteClient}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Invite Client</span>
        </button>
      </div>

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 font-medium">My Active Contracts</p>
            <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
              {activeContractsCount}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              {terminatedContractsCount} terminated
            </span>
            <button
              onClick={() => onNavigate('contracts')}
              className="font-semibold text-[#0f284e] hover:underline flex items-center gap-1"
            >
              <span>My Contracts</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 font-medium">Available Projects on Indeed</p>
            <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
              {jobs.length}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono tabular-nums">
              {appliedJobIds.length} applied
            </span>
            <button
              onClick={() => onNavigate('project_match')}
              className="font-semibold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Find Projects</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Payouts</p>
            <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
              ${pendingInvoicesTotal.toLocaleString()}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-amber-700 font-mono tabular-nums font-medium">
              {pendingInvoices.length} invoice awaiting approval
            </span>
            <button
              onClick={() => onNavigate('invoices')}
              className="font-semibold text-[#0f284e] hover:underline flex items-center gap-1"
            >
              <span>My Invoices</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ProjectMatch Feature Callout for Contractors */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-xs font-semibold text-emerald-700">
            ProjectMatch (powered by Indeed)
          </p>
          <h2 className="text-base font-bold text-slate-900">
            Find Your Next Client Before Your Current Contract Ends
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Browse pre-filtered remote freelance openings on Indeed and apply in 1-click using your stored Contractor Express profile, or invite an external client to onboard you on Contractor Express.
          </p>
        </div>

        <button
          onClick={() => onNavigate('project_match')}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start md:self-center"
        >
          <span>Browse Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* My Active Contracts Snapshot */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            My Active Client Contracts
          </h2>
          <button
            onClick={() => onNavigate('contracts')}
            className="text-xs font-semibold text-[#0f284e] hover:underline"
          >
            View All Contracts
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="px-4 py-3">Contract ID</th>
                  <th className="px-4 py-3">Contract / Project Name</th>
                  <th className="px-4 py-3">Client Company</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3 text-right">Hourly Rate</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.map(contract => (
                  <tr key={contract.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-mono tabular-nums font-medium text-slate-700">
                      {contract.id}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {contract.role}
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">
                      {contract.clientCompany}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {contract.duration}
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums font-semibold text-slate-900 text-right">
                      ${contract.rate}/hr
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        contract.status === 'Active'
                          ? 'text-emerald-700'
                          : contract.status === 'Terminated'
                          ? 'text-slate-600'
                          : 'text-amber-700'
                      }`}
                    >
                      {contract.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* My Submitted Applications Snapshot */}
      {myApplications.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            My ProjectMatch Applications ({myApplications.length})
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Project Title</th>
                    <th className="px-4 py-3">Applied</th>
                    <th className="px-4 py-3 text-right">Proposed Rate</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myApplications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {app.jobTitle}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {app.appliedDate}
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums font-semibold text-slate-900 text-right">
                        ${app.requestedRate}/hr
                      </td>
                      <td className="px-4 py-3 font-medium text-emerald-700">
                        {app.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
