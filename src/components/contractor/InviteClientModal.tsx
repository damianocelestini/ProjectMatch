import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InviteClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSent: (companyName: string, clientEmail: string, role: string, rate: number) => void;
}

export const InviteClientModal: React.FC<InviteClientModalProps> = ({
  isOpen,
  onClose,
  onInviteSent
}) => {
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [role, setRole] = useState('');
  const [rate, setRate] = useState(72);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !clientEmail.trim()) return;
    onInviteSent(
      companyName.trim(),
      clientEmail.trim(),
      role.trim() || 'Independent Contractor Project',
      rate
    );
    setCompanyName('');
    setClientEmail('');
    setRole('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-5 shadow-lg border border-slate-200">
        
        <div className="flex items-start justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Invite New Client to Contractor Express</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              If your new client isn't a Contractor Express customer yet, invite them to open an account and manage your contract & invoices here.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Client Company Name *</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Cloud Dynamics"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-700"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Client Email Address *</label>
            <input
              type="email"
              required
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
              placeholder="hiring@company.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Project Role</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Cloud Architect"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Proposed Rate ($/hr)</label>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono tabular-nums"
              />
            </div>
          </div>

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
              className="px-4 py-2 font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
            >
              Send Contractor Express Invite
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
