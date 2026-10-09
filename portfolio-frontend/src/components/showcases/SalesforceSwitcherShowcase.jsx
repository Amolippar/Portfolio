import React, { useState } from 'react';
import { 
  Cloud, 
  ToggleLeft, 
  ToggleRight, 
  ShieldCheck, 
  Terminal, 
  Check, 
  Layers, 
  Zap,
  CheckCircle2 
} from 'lucide-react';

export const SalesforceSwitcherShowcase = () => {
  const [selectedObject, setSelectedObject] = useState('Opportunity');
  const [selectedProfile, setSelectedProfile] = useState('ETL_Data_Migration_User');
  
  const [bypasses, setBypasses] = useState({
    validationRules: true,
    apexTriggers: true,
    workflowFlows: false
  });

  const toggleBypass = (key) => {
    setBypasses(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isAnyBypassed = bypasses.validationRules || bypasses.apexTriggers || bypasses.workflowFlows;

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5" /> Apex Custom Metadata & Trigger Framework
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Salesforce Granular Automation Bypass Console
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 px-3 py-1.5 rounded-xl border border-sky-500/20">
          <Zap className="w-4 h-4" /> 95%+ Apex Test Coverage Verified
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Interactive Switchboard */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-5">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-500 dark:text-slate-400 block font-semibold mb-1">
                Target SObject
              </label>
              <select
                value={selectedObject}
                onChange={e => setSelectedObject(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold"
              >
                <option value="Opportunity">Opportunity</option>
                <option value="Account">Account</option>
                <option value="WorkOrder">WorkOrder</option>
                <option value="VehicleBooking__c">VehicleBooking__c</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 dark:text-slate-400 block font-semibold mb-1">
                Execution Profile Scope
              </label>
              <select
                value={selectedProfile}
                onChange={e => setSelectedProfile(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs"
              >
                <option value="ETL_Data_Migration_User">ETL Data Migration User</option>
                <option value="System_Administrator">System Administrator</option>
                <option value="Global_Org_Override">Global Org Override</option>
              </select>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2">
            {[
              {
                key: 'validationRules',
                label: 'Validation Rule Bypass ($Setup.Bypass_Config__c)',
                desc: 'Suppresses formula validation error alerts during bulk bulk-load inserts.'
              },
              {
                key: 'apexTriggers',
                label: 'TriggerHandler Framework Bypass',
                desc: 'Prevents synchronous trigger execution in TriggerHandler.cls.'
              },
              {
                key: 'workflowFlows',
                label: 'Lightning Flow / Process Automation Bypass',
                desc: 'Suppresses record-triggered autolaunched flows on DML commit.'
              }
            ].map(item => {
              const isActive = bypasses[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleBypass(item.key)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:border-sky-500 transition group"
                >
                  <div className="space-y-0.5 pr-3">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-sky-500 transition">
                      {item.label}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <div>
                    {isActive ? (
                      <ToggleRight className="w-8 h-8 text-sky-500 shrink-0" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Simulated Apex Execution Log */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-sky-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> APEX SYSTEM DEBUG LOG
              </span>
              <span className="text-[10px] text-slate-400 font-bold">SOQL: 1 / 100 GOVERNOR LIMIT</span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-300">
              <p className="text-slate-500">
                // Evaluation for context: {selectedProfile} on {selectedObject}
              </p>
              <p>
                <span className="text-purple-400">BypassSetting__mdt</span> setting = [SELECT Bypassed__c FROM BypassSetting__mdt WHERE SObject__c = '{selectedObject}'];
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400">
                  ▶ Validation Rule Status: <strong className="text-white">{bypasses.validationRules ? 'BYPASS ACTIVE (Suppressing errors)' : 'ENFORCED (Standard)'}</strong>
                </div>
                <div className="text-sky-400">
                  ▶ Trigger Handler Status: <strong className="text-white">{bypasses.apexTriggers ? 'BYPASS ACTIVE (Zero CPU overhead)' : 'FIRING (Standard handler)'}</strong>
                </div>
                <div className="text-amber-400">
                  ▶ Flow Automation Status: <strong className="text-white">{bypasses.workflowFlows ? 'BYPASS ACTIVE' : 'ENFORCED'}</strong>
                </div>
              </div>
              <p className="text-slate-400 text-[10px] pt-1">
                Execution Time: <span className="text-emerald-400 font-bold">{isAnyBypassed ? '12ms' : '480ms'}</span> (CPU governor capacity preserved by {isAnyBypassed ? '97.5%' : '0%'}).
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero code deployment required. Controlled entirely via cached Custom Metadata.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
