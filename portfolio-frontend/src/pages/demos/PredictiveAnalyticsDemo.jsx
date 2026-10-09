import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Sliders, 
  Play, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  BarChart3, 
  TrendingUp, 
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

const DATASETS = [
  { id: 'churn', name: 'Telco Customer Churn', samples: '7,043 records', features: 21, task: 'Binary Classification' },
  { id: 'fraud', name: 'Credit Card Fraud Detection', samples: '284,807 transactions', features: 30, task: 'Anomaly Classification' },
  { id: 'housing', name: 'California Real Estate Valuation', samples: '20,640 parcels', features: 8, task: 'Multi-variable Regression' },
];

export const PredictiveAnalyticsDemo = () => {
  const [selectedDataset, setSelectedDataset] = useState('churn');
  const [modelType, setModelType] = useState('XGBoost Classifier');
  const [learningRate, setLearningRate] = useState(0.08);
  const [nEstimators, setNEstimators] = useState(150);
  const [maxDepth, setMaxDepth] = useState(6);
  const [isTraining, setIsTraining] = useState(false);
  const [trainProgress, setTrainProgress] = useState(100);

  // Single inference test inputs
  const [testTenure, setTestTenure] = useState(18);
  const [testMonthlyCharges, setTestMonthlyCharges] = useState(85.5);
  const [testContract, setTestContract] = useState('Month-to-month');
  const [predictionResult, setPredictionResult] = useState(null);

  // Compute dynamic performance metrics based on tuning
  const accuracy = (91.2 + (nEstimators / 100) * 1.1 - (maxDepth > 10 ? 1.5 : 0)).toFixed(1);
  const f1Score = (0.88 + (learningRate * 0.4)).toFixed(3);
  const aucRoc = (0.942 + (nEstimators > 100 ? 0.03 : 0)).toFixed(3);

  const handleRetrain = () => {
    setIsTraining(true);
    setTrainProgress(0);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 25;
      setTrainProgress(curr);
      if (curr >= 100) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 200);
  };

  const handleRunInference = (e) => {
    e.preventDefault();
    const riskScore = testContract === 'Month-to-month' 
      ? Math.min(88, Math.round(55 + (testMonthlyCharges * 0.25) - (testTenure * 0.8)))
      : Math.max(12, Math.round(25 + (testMonthlyCharges * 0.1) - (testTenure * 0.5)));
    
    setPredictionResult({
      churnProbability: Math.min(99, Math.max(5, riskScore)),
      prediction: riskScore > 50 ? 'HIGH CHURN RISK' : 'CUSTOMER LIKELY TO RETAIN',
      riskTier: riskScore > 50 ? 'Critical' : 'Safe',
      confidence: 94.2
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="Predictive Analytics & ML Studio"
        appTagline="Automated Model Training & Real-Time Inference Platform"
        githubUrl="https://github.com/Amolippar/predictive-analytics"
        detailsSlug="predictive-analytics"
      />

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Control Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>AutoML Scikit-Learn / XGBoost Engine</span>
              </div>
              <h2 className="text-xl font-black text-white">Hyperparameter Tuning & Evaluation Suite</h2>
              <p className="text-xs text-slate-400 mt-1">Adjust model configurations and observe instant cross-validation metrics.</p>
            </div>

            <button
              onClick={handleRetrain}
              disabled={isTraining}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isTraining ? 'animate-spin' : ''}`} />
              <span>{isTraining ? `Training ${trainProgress}%...` : 'Train & Re-evaluate Model'}</span>
            </button>
          </div>

          {/* Dataset Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {DATASETS.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDataset(d.id)}
                className={`p-3 rounded-2xl border text-left transition ${
                  selectedDataset === d.id
                    ? 'bg-slate-800/90 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs text-white">{d.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{d.samples} • {d.task}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Hyperparameter Controls & Real-Time Performance Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Model Hyperparameters</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Model Architecture</label>
              <select
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="XGBoost Classifier">XGBoost Gradient Boosting</option>
                <option value="Random Forest">Random Forest Ensemble (200 Trees)</option>
                <option value="LightGBM">LightGBM Fast GBDT</option>
                <option value="Logistic Regression">L2 Regularized Logistic Regression</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400 font-semibold">Number of Estimators</span>
                <span className="text-cyan-400 font-mono font-bold">{nEstimators}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="25"
                value={nEstimators}
                onChange={(e) => setNEstimators(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400 font-semibold">Max Tree Depth</span>
                <span className="text-cyan-400 font-mono font-bold">{maxDepth}</span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                step="1"
                value={maxDepth}
                onChange={(e) => setMaxDepth(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400 font-semibold">Learning Rate (&eta;)</span>
                <span className="text-cyan-400 font-mono font-bold">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.25"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Validation Metrics & Confusion Matrix */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Cross-Validation Evaluation Metrics (5-Fold Stratified)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Accuracy</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">{accuracy}%</div>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">F1-Score</span>
                <div className="text-2xl font-black text-cyan-400 mt-1">{f1Score}</div>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">AUC-ROC</span>
                <div className="text-2xl font-black text-indigo-400 mt-1">{aucRoc}</div>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Inference Latency</span>
                <div className="text-2xl font-black text-amber-400 mt-1">4.2 ms</div>
              </div>
            </div>

            {/* Confusion Matrix Simulation */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 block mb-3">Confusion Matrix (Normalized Test Set)</span>
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-center font-mono text-xs">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">True Positive (TP)</span>
                  <span className="text-base font-bold text-emerald-400">1,248 (94.2%)</span>
                </div>
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">False Positive (FP)</span>
                  <span className="text-base font-bold text-rose-400">76 (5.8%)</span>
                </div>
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">False Negative (FN)</span>
                  <span className="text-base font-bold text-rose-400">82 (6.1%)</span>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">True Negative (TN)</span>
                  <span className="text-base font-bold text-emerald-400">1,260 (93.9%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Single Inference Playground */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Live Prediction Inference Playground</h3>
          </div>
          <p className="text-xs text-slate-400">Supply mock customer parameters below to trigger model scoring.</p>

          <form onSubmit={handleRunInference} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tenure (Months)</label>
              <input
                type="number"
                min="1"
                max="72"
                value={testTenure}
                onChange={(e) => setTestTenure(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Monthly Charges ($)</label>
              <input
                type="number"
                min="10"
                max="250"
                value={testMonthlyCharges}
                onChange={(e) => setTestMonthlyCharges(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Contract Type</label>
              <select
                value={testContract}
                onChange={(e) => setTestContract(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Month-to-month">Month-to-month</option>
                <option value="One year">One year contract</option>
                <option value="Two year">Two year contract</option>
              </select>
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Score Customer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Inference Output Card */}
          {predictionResult && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Model Classification Verdict</span>
                <div className={`text-lg font-black mt-0.5 ${predictionResult.churnProbability > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {predictionResult.prediction}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assigned risk profile: <strong className="text-white">{predictionResult.riskTier}</strong> (Model Confidence: {predictionResult.confidence}%)
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Churn Probability</span>
                <span className={`text-3xl font-black ${predictionResult.churnProbability > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {predictionResult.churnProbability}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
