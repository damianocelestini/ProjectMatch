import React, { useState, useEffect } from 'react';
import { X, Send, FileText } from 'lucide-react';

interface ContractGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    applicationId: string;
    name: string;
    role: string;
    country: string;
    rate: number;
  } | null;
  onSendViaDocuSign: (
    applicationId: string,
    contractDetails: {
      contractorName: string;
      country: string;
      role: string;
      rate: number;
      startDate: string;
      duration: string;
      docusignEnvelopeId: string;
    }
  ) => void;
}

export const ContractGeneratorModal: React.FC<ContractGeneratorModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onSendViaDocuSign
}) => {
  const [rate, setRate] = useState(candidate?.rate || 70);
  const [duration, setDuration] = useState('4 months');
  const [startDate, setStartDate] = useState('2026-11-15');

  useEffect(() => {
    if (candidate) {
      setRate(candidate.rate);
    }
  }, [candidate]);

  if (!isOpen || !candidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const envelopeId = `DS-${Math.floor(100000 + Math.random() * 900000)}`;
    onSendViaDocuSign(candidate.applicationId, {
      contractorName: candidate.name,
      country: candidate.country,
      role: candidate.role,
      rate,
      startDate,
      duration,
      docusignEnvelopeId: envelopeId
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-5 shadow-lg border border-slate-200 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0f284e]" />
              <h2 className="text-base font-bold text-slate-900">
                Country-Specific Contract Generator ({candidate.country})
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review localized agreement for {candidate.name} and dispatch via DocuSign for signature.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
          
          {/* Candidate & Terms Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Hourly Rate ($/hr)</label>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Contract Duration</label>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              >
                <option value="3 months">3 months</option>
                <option value="4 months">4 months</option>
                <option value="6 months">6 months</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
              />
            </div>
          </div>

          {/* Country-Specific Contract Document Preview (with Lorem Ipsum Legal Text) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800">
                Contractor Express Independent Contractor Agreement — {candidate.country} Jurisdiction
              </label>
              <span className="text-[11px] text-slate-500">Ready for DocuSign</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 max-h-56 overflow-y-auto space-y-3 text-[11px] text-slate-600 leading-relaxed font-mono">
              <p className="font-bold text-slate-900">
                INDEPENDENT CONTRACTOR SERVICES AGREEMENT ({candidate.country.toUpperCase()})
              </p>
              <p>
                This Independent Contractor Agreement ("Agreement") is entered into as of {startDate} between Lumina Global Services Inc. ("Client") and {candidate.name} ("Contractor"), operating under the laws and commercial regulations of {candidate.country}.
              </p>
              <p>
                <strong className="text-slate-800">1. SCOPE OF SERVICES & COMPENSATION:</strong> Contractor shall perform services as "{candidate.role}" for a term of {duration} at an agreed rate of ${rate} USD per hour. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                <strong className="text-slate-800">2. INDEPENDENT CONTRACTOR CLASSIFICATION ({candidate.country.toUpperCase()}):</strong> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Contractor acknowledges sole responsibility for local tax filings and statutory contributions in {candidate.country}.
              </p>
              <p>
                <strong className="text-slate-800">3. INTELLECTUAL PROPERTY ASSIGNMENT & CONFIDENTIALITY:</strong> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p className="pt-2 border-t border-slate-200 text-slate-500">
                [DocuSign Anchor Tag: /sig_client_lumina/] · [DocuSign Anchor Tag: /sig_contractor_{candidate.country.toLowerCase()}/]
              </p>
            </div>
          </div>

          {/* Actions */}
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
              className="px-4 py-2 font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send to Contractor via DocuSign</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
