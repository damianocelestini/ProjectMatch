import React from 'react';
import { UserPersona, ActiveTab } from '../../types';
import { Home, Briefcase, FileCheck2, Receipt, Building2, UserCheck, Plus, Send } from 'lucide-react';

interface SidebarProps {
  currentPersona: UserPersona;
  onSelectPersona: (persona: UserPersona) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  contractsCount: number;
  invoicesCount: number;
  pendingApplicantsCount: number;
  onOpenPostJob: () => void;
  onOpenInviteClient: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPersona,
  onSelectPersona,
  activeTab,
  onSelectTab,
  contractsCount,
  invoicesCount,
  pendingApplicantsCount,
  onOpenPostJob,
  onOpenInviteClient
}) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-screen p-5">
      
      <div className="space-y-6">
        {/* Brand Wordmark */}
        <div className="pb-4 border-b border-slate-200">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('home');
            }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap block"
          >
            Contractor Express
          </a>
        </div>

        {/* Persona Toggle Switch */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-500 px-1">
            Persona Preview
          </span>
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => onSelectPersona('customer')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                currentPersona === 'customer'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => onSelectPersona('contractor')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                currentPersona === 'contractor'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Contractor</span>
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <div>
          {currentPersona === 'customer' ? (
            <button
              onClick={onOpenPostJob}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Project</span>
            </button>
          ) : (
            <button
              onClick={onOpenInviteClient}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Invite Client</span>
            </button>
          )}
        </div>

        {/* Left Side Navigation Menu */}
        <nav className="space-y-1">
          <button
            onClick={() => onSelectTab('home')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'home'
                ? 'bg-[#0f284e] text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 shrink-0" />
              <span>Home</span>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('project_match')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'project_match'
                ? 'bg-[#0f284e] text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 shrink-0" />
              <div className="text-left leading-tight">
                <span className="block">ProjectMatch</span>
                <span className={`block text-[10px] font-normal ${
                  activeTab === 'project_match' ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  powered by Indeed
                </span>
              </div>
            </div>
            {currentPersona === 'customer' && pendingApplicantsCount > 0 && (
              <span className={`font-mono tabular-nums text-[11px] ${
                activeTab === 'project_match' ? 'text-slate-200' : 'text-slate-500'
              }`}>
                {pendingApplicantsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('contracts')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'contracts'
                ? 'bg-[#0f284e] text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCheck2 className="w-4 h-4" />
              <span>Contracts</span>
            </div>
            <span className={`font-mono tabular-nums text-[11px] ${
              activeTab === 'contracts' ? 'text-slate-200' : 'text-slate-500'
            }`}>
              {contractsCount}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('invoices')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'invoices'
                ? 'bg-[#0f284e] text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Receipt className="w-4 h-4" />
              <span>Invoices</span>
            </div>
            <span className={`font-mono tabular-nums text-[11px] ${
              activeTab === 'invoices' ? 'text-slate-200' : 'text-slate-500'
            }`}>
              {invoicesCount}
            </span>
          </button>
        </nav>
      </div>

      {/* Quiet Account Context */}
      <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-800">
          {currentPersona === 'customer' ? 'Lumina Global Services' : 'Mateusz Kowalski'}
        </p>
        <p>
          {currentPersona === 'customer'
            ? 'Contractor Express Plan · $39/mo per contractor'
            : 'Verified Contractor · Warsaw, Poland'}
        </p>
      </div>

    </aside>
  );
};
