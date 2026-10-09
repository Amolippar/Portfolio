import React, { useState } from 'react';
import { 
  Factory, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  Wrench, 
  ClipboardCheck, 
  RotateCcw 
} from 'lucide-react';

export const ManufacturingShowcase = () => {
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-9042',
      title: 'Planetary Gearbox Housing',
      partNumber: 'GB-HX-802',
      qty: 120,
      machine: 'CNC Lathe Line 3',
      operator: 'Ramesh Pawar',
      stage: 'IN_PRODUCTION', // DRAFT, APPROVED, IN_PRODUCTION, QA_INSPECTION, COMPLETED
      defects: 0
    },
    {
      id: 'WO-9043',
      title: 'Hydraulic Actuator Rod',
      partNumber: 'HYD-ACT-104',
      qty: 450,
      machine: 'Precision Grinder #2',
      operator: 'Sunil Jadhav',
      stage: 'APPROVED',
      defects: 1
    },
    {
      id: 'WO-9044',
      title: 'Aerospace Impeller Blade',
      partNumber: 'AERO-IMP-99',
      qty: 40,
      machine: '5-Axis Milling Cell',
      operator: 'Mahesh Deshmukh',
      stage: 'QA_INSPECTION',
      defects: 0
    }
  ]);

  const stages = [
    { key: 'DRAFT', label: '1. Draft Job' },
    { key: 'APPROVED', label: '2. Supervisor Approved' },
    { key: 'IN_PRODUCTION', label: '3. In Production' },
    { key: 'QA_INSPECTION', label: '4. QA Sign-Off' },
    { key: 'COMPLETED', label: '5. Completed' }
  ];

  const advanceStage = (id) => {
    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id !== id) return wo;
        const currentIndex = stages.findIndex(s => s.key === wo.stage);
        if (currentIndex < stages.length - 1) {
          return { ...wo, stage: stages[currentIndex + 1].key };
        }
        return wo;
      })
    );
  };

  const resetStages = () => {
    setWorkOrders([
      {
        id: 'WO-9042',
        title: 'Planetary Gearbox Housing',
        partNumber: 'GB-HX-802',
        qty: 120,
        machine: 'CNC Lathe Line 3',
        operator: 'Ramesh Pawar',
        stage: 'IN_PRODUCTION',
        defects: 0
      },
      {
        id: 'WO-9043',
        title: 'Hydraulic Actuator Rod',
        partNumber: 'HYD-ACT-104',
        qty: 450,
        machine: 'Precision Grinder #2',
        operator: 'Sunil Jadhav',
        stage: 'APPROVED',
        defects: 1
      },
      {
        id: 'WO-9044',
        title: 'Aerospace Impeller Blade',
        partNumber: 'AERO-IMP-99',
        qty: 40,
        machine: '5-Axis Milling Cell',
        operator: 'Mahesh Deshmukh',
        stage: 'QA_INSPECTION',
        defects: 0
      }
    ]);
  };

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Factory className="w-3.5 h-3.5" /> Shop Floor Work Order Execution
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Manufacturing Lifecycle State Machine & Quality Control
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetStages}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white p-2 rounded-xl bg-slate-100 dark:bg-slate-800 transition"
            title="Reset simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Interactive Work Orders Kanban Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workOrders.map(wo => {
          const currentStageIndex = stages.findIndex(s => s.key === wo.stage);
          const isDone = wo.stage === 'COMPLETED';

          return (
            <div
              key={wo.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {wo.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : wo.stage === 'QA_INSPECTION'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-indigo-500/20 text-indigo-500'
                    }`}
                  >
                    {wo.stage}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{wo.title}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Part: {wo.partNumber}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span>Batch Quantity</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{wo.qty} Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Machine Assigned</span>
                    <span className="text-slate-800 dark:text-slate-200">{wo.machine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Station Operator</span>
                    <span className="text-slate-800 dark:text-slate-200">{wo.operator}</span>
                  </div>
                </div>

                {/* Stepper Progress Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Workflow Progress</span>
                    <span>{Math.round(((currentStageIndex + 1) / stages.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Advance Action Button */}
              <div>
                {!isDone ? (
                  <button
                    onClick={() => advanceStage(wo.id)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Advance to Next Stage <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-full py-2 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Production Order Completed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
