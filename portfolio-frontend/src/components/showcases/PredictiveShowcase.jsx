import React, { useState } from 'react';
import { 
  Sliders, 
  BrainCircuit, 
  TrendingUp, 
  Activity, 
  Cpu, 
  BarChart2, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const PredictiveShowcase = () => {
  const [learningRate, setLearningRate] = useState(0.05);
  const [estimators, setEstimators] = useState(120);
  const [threshold, setThreshold] = useState(0.5);

  // Dynamic calculations based on user adjustments
  const accuracy = Math.min(98.4, +(86.0 + (estimators / 250) * 8.5 + (0.05 - Math.abs(learningRate - 0.03)) * 40 - Math.abs(threshold - 0.5) * 8).toFixed(1));
  const precision = Math.min(97.8, +(84.0 + (threshold * 18) - (learningRate * 20)).toFixed(1));
  const recall = Math.min(98.2, +(96.0 - (threshold * 22) + (estimators / 100) * 2).toFixed(1));
  const f1Score = +((2 * (precision * recall)) / (precision + recall)).toFixed(1);

  // Dynamic Confusion Matrix entries
  const tp = Math.round(450 * (recall / 100));
  const fn = 450 - tp;
  const fp = Math.round(550 * ((100 - precision) / 100));
  const tn = 550 - fp;

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5" /> Interactive Model Hyperparameter Tuner
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Predictive Analytics & ROC Decision Curve Workbench
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-xl border border-purple-500/20">
          <Cpu className="w-4 h-4" /> Scikit-Learn Pipeline Simulator
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hyperparameter Sliders */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-500" /> Tune Model Hyperparameters
          </h4>

          {/* Slider 1: Learning Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Learning Rate (η)</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{learningRate}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.10"
              step="0.01"
              value={learningRate}
              onChange={e => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Slider 2: Estimators */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Ensemble Estimators (n_trees)</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{estimators}</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={estimators}
              onChange={e => setEstimators(parseInt(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Slider 3: Classification Threshold */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Decision Threshold</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{threshold}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="0.8"
              step="0.05"
              value={threshold}
              onChange={e => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Adjusting parameters dynamically triggers loss convergence updates and recalculates real-time classification metrics.
          </div>
        </div>

        {/* Middle Column: Dynamic Visual ROC Curve */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between text-white space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-purple-400">
            <span>ROC CURVE (AUC: {(accuracy / 100).toFixed(2)})</span>
            <span className="text-[10px] text-slate-400">TPR vs FPR</span>
          </div>

          <div className="relative h-44 w-full flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 160">
              {/* Diagonal baseline */}
              <line x1="20" y1="140" x2="180" y2="20" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* Dynamic ROC Curve */}
              <path
                d={`M 20 140 Q ${20 + (100 - accuracy) * 0.8} ${140 - accuracy * 1.1} 180 20`}
                fill="none"
                stroke="#A855F7"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Threshold point marker */}
              <circle
                cx={20 + (1 - threshold) * 120}
                cy={140 - (threshold * 100)}
                r="5"
                fill="#38BDF8"
              />

              {/* Axes labels */}
              <text x="22" y="155" fill="#64748B" fontSize="9">0.0 (FPR)</text>
              <text x="150" y="155" fill="#64748B" fontSize="9">1.0</text>
              <text x="5" y="30" fill="#64748B" fontSize="9" transform="rotate(-90 10 30)">1.0 (TPR)</text>
            </svg>
          </div>

          <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Model: Random Forest</span>
            <span className="text-emerald-400 font-bold">Status: Converged</span>
          </div>
        </div>

        {/* Right Column: Dynamic Performance Metrics & Confusion Matrix */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Computed Validation Metrics
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">Accuracy</span>
              <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">F1-Score</span>
              <span className="font-mono font-bold text-sm text-purple-600 dark:text-purple-400">{f1Score}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">Precision</span>
              <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">{precision}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">Recall</span>
              <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">{recall}%</span>
            </div>
          </div>

          {/* Mini Confusion Matrix Preview */}
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px]">
            <span className="font-bold text-slate-500 block mb-1">Confusion Matrix (1,000 Samples)</span>
            <div className="grid grid-cols-2 gap-1 font-mono text-center">
              <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-1 rounded font-bold">TP: {tp}</div>
              <div className="bg-rose-500/10 text-rose-500 p-1 rounded font-bold">FP: {fp}</div>
              <div className="bg-amber-500/10 text-amber-500 p-1 rounded font-bold">FN: {fn}</div>
              <div className="bg-blue-500/10 text-blue-500 p-1 rounded font-bold">TN: {tn}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
