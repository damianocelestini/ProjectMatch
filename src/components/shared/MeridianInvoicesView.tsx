import React from 'react';
import { GPInvoice, UserPersona } from '../../types';
import { Check } from 'lucide-react';

interface MeridianInvoicesViewProps {
  invoices: GPInvoice[];
  currentPersona: UserPersona;
  onApproveInvoice: (invoiceId: string) => void;
}

export const MeridianInvoicesView: React.FC<MeridianInvoicesViewProps> = ({
  invoices,
  currentPersona,
  onApproveInvoice
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <p className="text-xs text-slate-500 mb-1">
            {currentPersona === 'customer'
              ? 'Lumina Global Services · Contractor Invoices'
              : 'Mateusz Kowalski · My Submitted Invoices'}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentPersona === 'customer'
              ? `Invoices (${invoices.length})`
              : `My Invoices (${invoices.length})`}
          </h1>
        </div>
      </div>

      {/* High-Density Invoices Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-4 py-3">Invoice ID</th>
                <th className="px-4 py-3">Contract ID</th>
                {currentPersona === 'customer' ? (
                  <th className="px-4 py-3">Contractor</th>
                ) : (
                  <>
                    <th className="px-4 py-3">Contract / Project Name</th>
                    <th className="px-4 py-3">Client Company</th>
                  </>
                )}
                <th className="px-4 py-3">Billing Period</th>
                <th className="px-4 py-3 text-right">Hours</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Status</th>
                {currentPersona === 'customer' && (
                  <th className="px-4 py-3 text-right">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3.5 font-mono tabular-nums font-medium text-slate-700">
                    {invoice.id}
                  </td>
                  <td className="px-4 py-3.5 font-mono tabular-nums text-slate-500">
                    {invoice.contractId}
                  </td>
                  {currentPersona === 'customer' ? (
                    <td className="px-4 py-3.5 font-semibold text-slate-900">
                      {invoice.contractorName}
                      <span className="block text-[11px] font-normal text-slate-500">
                        {invoice.role}
                      </span>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">
                        {invoice.role}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">
                        {invoice.clientCompany}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-3.5 text-slate-600">
                    {invoice.billingPeriod}
                  </td>
                  <td className="px-4 py-3.5 font-mono tabular-nums text-slate-700 text-right">
                    {invoice.hours}h
                  </td>
                  <td className="px-4 py-3.5 font-mono tabular-nums font-bold text-slate-900 text-right">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`font-medium ${
                        invoice.status === 'Paid' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  {currentPersona === 'customer' && (
                    <td className="px-4 py-3.5 text-right">
                      {invoice.status === 'Pending Approval' ? (
                        <button
                          onClick={() => onApproveInvoice(invoice.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0f284e] hover:bg-[#16386d] rounded-lg transition-colors whitespace-nowrap"
                        >
                          Approve & Pay
                        </button>
                      ) : (
                        <span className="inline-flex items-center justify-end gap-1 text-xs text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5" />
                          <span>Paid</span>
                        </span>
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
