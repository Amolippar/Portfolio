import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  ShieldAlert, 
  CheckCircle2, 
  SlidersHorizontal, 
  Database, 
  Terminal, 
  RefreshCw, 
  Zap, 
  Lock, 
  Unlock, 
  Activity, 
  Code2,
  Server
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

const INITIAL_RULES = [
  { id: 'VR-01', name: 'Account_PAN_Validation', object: 'Account', type: 'Validation Rule', active: true, errorCondition: 'ISBLANK(PAN_Number__c) && Type == "Enterprise"' },
  { id: 'VR-02', name: 'Billing_Address_Required', object: 'Account', type: 'Validation Rule', active: true, errorCondition: 'ISBLANK(BillingCountry) || ISBLANK(BillingPostalCode)' },
  { id: 'VR-03', name: 'Opportunity_Stage_Gate', object: 'Opportunity', type: 'Validation Rule', active: true, errorCondition: 'ISPICKVAL(StageName, "Closed Won") && ISBLANK(Contract_Number__c)' },
  { id: 'TR-01', name: 'AccountTriggerHandler.cls', object: 'Account', type: 'Apex Trigger', active: true, errorCondition: 'beforeInsert, beforeUpdate, afterInsert' },
  { id: 'TR-02', name: 'OpportunityRollupTrigger.cls', object: 'Opportunity', type: 'Apex Trigger', active: true, errorCondition: 'afterUpdate, afterDelete' },
  { id: 'FL-01', name: 'Lead_Auto_Assignment_Flow', object: 'Lead', type: 'Record-Triggered Flow', active: true, errorCondition: 'Triggers on Lead creation where Status == "New"' }
];

export const SalesforceSwitcherDemo = () => {
  const [rules, setRules] = useState(INITIAL_RULES);
  const [selectedProfile, setSelectedProfile] = useState('Data Migration ETL User');
  const [selectedObject, setSelectedObject] = useState('ALL');
  const [auditLog, setAuditLog] = useState([
    { id: 1, time: '10:42 AM', action: 'Bypass initialized for Profile: Data Migration ETL User by Amol Ippar' },
    { id: 2, time: '10:38 AM', action: 'Tooling API query: SELECT Id, ValidationName, Active FROM ValidationRule' }
  ]);

  const toggleRule = (id) => {
    setRules(prev => prev.map(r => {
      if (r.id === id) {
        const nextState = !r.active;
        setAuditLog(prevLog => [
          {
            id: Date.now(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            action: `${r.name} state set to ${nextState ? 'ACTIVE' : 'BYPASSED'} for ${selectedProfile}`
          },
          ...prevLog.slice(0, 7)
        ]);
        return { ...r, active: nextState };
      }
      return r;
    }));
  };

  const bypassAll = () => {
    setRules(prev => prev.map(r => ({ ...r, active: false })));
    setAuditLog(prevLog => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `GLOBAL OVERRIDE: All validations & triggers bypassed for bulk data loading.`
      },
      ...prevLog.slice(0, 7)
    ]);
  };

  const activateAll = () => {
    setRules(prev => prev.map(r => ({ ...r, active: true })));
    setAuditLog(prevLog => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `SAFETY RESTORED: All production validation rules and apex triggers enabled.`
      },
      ...prevLog.slice(0, 7)
    ]);
  };

  const filteredRules = rules.filter(r => 
    selectedObject === 'ALL' || r.object === selectedObject
  );

  const activeCount = rules.filter(r => r.active).length;
  const bypassedCount = rules.filter(r => !r.active).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="Salesforce Switcher"
        appTagline="Validation Rule & Apex Trigger Bypass Utility"
        githubUrl="https://github.com/Amolippar/sf-validation-manager"
        detailsSlug="salesforce-validation-switcher"
      />

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Org Banner & Switch Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-2">
                <Cloud className="w-3.5 h-3.5" />
                <span>Salesforce Org: Enterprise Edition (NA-142)</span>
              </div>
              <h2 className="text-xl font-black text-white">Hierarchical Bypass Custom Settings Console</h2>
              <p className="text-xs text-slate-400 mt-1">Granularly toggle validation rules & triggers without deploying code packages or invalidating test classes.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={bypassAll}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Unlock className="w-4 h-4" />
                <span>Bypass All for ETL</span>
              </button>
              <button
                onClick={activateAll}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>Enforce All Rules</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">Target Profile / User Context</label>
              <select
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Data Migration ETL User">Data Migration ETL User (API Only)</option>
                <option value="System Administrator">System Administrator</option>
                <option value="Standard Sales User">Standard Sales User</option>
                <option value="Integration Specialist">Integration Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">Object Domain</label>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['ALL', 'Account', 'Opportunity', 'Lead'].map(obj => (
                  <button
                    key={obj}
                    onClick={() => setSelectedObject(obj)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      selectedObject === obj ? 'bg-sky-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {obj}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Governor Limit Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>SOQL Queries Usage</span>
              <span className="text-white font-mono">18 / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: '18%' }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">82 queries available before governor exception</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>DML Rows Impacted</span>
              <span className="text-white font-mono">2,410 / 10,000</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Bulk chunking 200 records / batch</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>CPU Execution Time</span>
              <span className="text-white font-mono">342 ms / 10,000 ms</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '3.4%' }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Optimal performance index</span>
          </div>
        </div>

        {/* Rule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRules.map(rule => (
            <motion.div
              key={rule.id}
              layout
              className={`p-5 rounded-3xl border transition shadow-lg flex flex-col justify-between ${
                rule.active 
                  ? 'bg-slate-900/90 border-slate-800' 
                  : 'bg-amber-950/20 border-amber-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                    {rule.object} • {rule.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    rule.active 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {rule.active ? 'ACTIVE' : 'BYPASSED'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{rule.name}</h4>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-[11px] text-slate-400 break-all">
                  {rule.errorCondition}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Bypass Setting:</span>
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                    rule.active
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {rule.active ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{rule.active ? 'Click to Bypass' : 'Restore Rule'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audit Log Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Salesforce Tooling API Live Event Stream</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 max-h-36 overflow-y-auto space-y-1 text-slate-400">
            {auditLog.map(entry => (
              <div key={entry.id} className="flex gap-2">
                <span className="text-sky-400 font-semibold">[{entry.time}]</span>
                <span className="text-slate-300">{entry.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
