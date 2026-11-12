import React from 'react';
import { GPContract, UserPersona } from '../../types';
import { ArrowRight } from 'lucide-react';

interface MeridianContractsViewProps {
  contracts: GPContract[];
  currentPersona: UserPersona;
  onGoToProjectMatch: () => void;
  onTerminateContract?: (contractId: string) => void;
}

export const MeridianContractsView: React.FC<MeridianContractsViewProps> = ({
  contracts,
  currentPersona,
  onGoToProjectMatch,
  onTerminateContract
}) => {
  const activeCount = contracts.filter(c => c.status === 'Active').length;
  const terminatedCount = contracts.filter(c => c.status === 'Terminated').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <p className="text-xs text-slate-500 mb-1">
            {currentPersona === 'customer'
              ? `Lumina Global Services · ${activeCount} Active · ${terminatedCount} Terminated`
              : `Mateusz Kowalski · ${activeCount} Active · ${terminatedCount} Terminated`}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentPersona === 'customer'
              ? `Contracts (${contracts.length})`
              : `My Contracts (${contracts.length})`}
          </h1>
        </div>

        <button
          onClick={onGoToProjectMatch}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0f284e] hover:underline whitespace-nowrap shrink-0"
        >
          <span>
            {currentPersona === 'customer'
              ? 'Find Next Contractor on ProjectMatch'
              : 'Find Next Project on ProjectMatch'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* High-Density Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-4 py-3">Contract ID</th>
                {currentPersona === 'customer' ? (
                  <>
                    <th className="px-4 py-3">Contractor</th>
                    <th className="px-4 py-3">Project Role</th>
                    <th className="px-4 py-3">Country</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3">Contract / Project Name</th>
                    <th className="px-4 py-3">Client Company</th>
                  </>
                )}
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3 text-right">Hourly Rate</th>
                <th className="px-4 py-3">Status</th>
                {currentPersona === 'customer' && (
                  <th className="px-4 py-3 text-right">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contracts.map(contract => (
                <tr
                  key={contract.id}
                  className={`hover:bg-slate-50/70 ${
                    contract.status === 'Terminated' ? 'opacity-70 bg-slate-50/40' : ''
                  }`}
                >
                  <td className="px-4 py-3.5 font-mono tabular-nums font-medium text-slate-700">
                    {contract.id}
                  </td>

                  {currentPersona === 'customer' ? (
                    <>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">
                        {contract.contractorName}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {contract.role}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {contract.country}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">
                        {contract.role}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">
                        {contract.clientCompany}
                      </td>
                    </>
                  )}

                  <td className="px-4 py-3.5 text-slate-600">
                    {contract.duration}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {contract.source}
                  </td>
                  <td className="px-4 py-3.5 font-mono tabular-nums font-semibold text-slate-900 text-right">
                    ${contract.rate}/hr
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`font-semibold ${
                        contract.status === 'Active'
                          ? 'text-emerald-700'
                          : contract.status === 'Terminated'
                          ? 'text-slate-600'
                          : 'text-amber-700'
                      }`}
                    >
                      {contract.status}
                    </span>
                  </td>

                  {currentPersona === 'customer' && (
                    <td className="px-4 py-3.5 text-right">
                      {contract.status === 'Active' && onTerminateContract ? (
                        <button
                          onClick={() => onTerminateContract(contract.id)}
                          className="text-xs font-semibold text-rose-700 hover:underline whitespace-nowrap"
                        >
                          Terminate
                        </button>
                      ) : contract.status === 'Terminated' ? (
                        <button
                          onClick={onGoToProjectMatch}
                          className="text-xs font-semibold text-[#0f284e] hover:underline whitespace-nowrap"
                        >
                          Find Replacement
                        </button>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
