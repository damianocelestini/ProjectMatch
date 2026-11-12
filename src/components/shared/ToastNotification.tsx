import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ToastNotificationProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white rounded-xl p-4 shadow-xl border border-slate-700 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-start gap-3">
        {toast.type === 'success' && (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        )}
        {toast.type === 'warning' && (
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        )}
        {toast.type === 'info' && (
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        )}
        <div>
          <h4 className="text-xs font-bold text-white">{toast.title}</h4>
          {toast.description && (
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{toast.description}</p>
          )}
        </div>
      </div>
      <button onClick={onDismiss} className="text-slate-400 hover:text-white p-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
