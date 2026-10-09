import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 max-w-md w-full"
      >
        <div
          className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md ${
            isSuccess
              ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/30'
              : isError
              ? 'bg-rose-950/90 text-rose-100 border-rose-500/30'
              : 'bg-slate-900/90 text-slate-100 border-slate-700/50'
          }`}
        >
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />}

          <div className="flex-1 text-sm font-medium leading-relaxed">
            {message}
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
