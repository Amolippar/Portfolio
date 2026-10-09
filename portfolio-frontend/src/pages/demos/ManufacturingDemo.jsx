import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Search, 
  ShieldCheck, 
  Cpu, 
  X, 
  BarChart2,
  Sliders,
  Sparkles
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

const STAGES = [
  { id: 'BACKLOG', name: 'Planning & Backlog', color: 'border-slate-700 bg-slate-900/50' },
  { id: 'MACHINING', name: 'CNC & Machining', color: 'border-blue-500/30 bg-blue-950/20' },
  { id: 'ASSEMBLY', name: 'Assembly & Wiring', color: 'border-amber-500/30 bg-amber-950/20' },
  { id: 'QA_INSPECTION', name: 'Quality Inspection', color: 'border-purple-500/30 bg-purple-950/20' },
  { id: 'COMPLETED', name: 'Final Dispatch', color: 'border-emerald-500/30 bg-emerald-950/20' }
];

const INITIAL_ORDERS = [
  {
    id: "WO-9401",
    partName: "Hydraulic Pump Flange 40mm",
    sku: "HYD-FLG-40",
    stage: "MACHINING",
    priority: "HIGH",
    quantity: 120,
    operator: "Rajesh K.",
    machine: "CNC Lathe #04",
    deadline: "Today, 5:00 PM",
    tolerance: "±0.005 mm"
  },
  {
    id: "WO-9402",
    partName: "Electric Stator Core Assembly",
    sku: "ELE-STT-12",
    stage: "ASSEMBLY",
    priority: "MEDIUM",
    quantity: 50,
    operator: "Sunil M.",
    machine: "Winding Station #02",
    deadline: "Tomorrow, 11:00 AM",
    tolerance: "±0.02 mm"
  },
  {
    id: "WO-9403",
    partName: "Titanium Turbine Rotor Blade",
    sku: "AER-BLD-09",
    stage: "QA_INSPECTION",
    priority: "CRITICAL",
    quantity: 16,
    operator: "Dr. Ananya P.",
    machine: "CMM Coordinate Station",
    deadline: "In 2 Hours",
    tolerance: "±0.001 mm"
  },
  {
    id: "WO-9404",
    partName: "Cast Iron Gear Housing",
    sku: "GBX-CAS-88",
    stage: "BACKLOG",
    priority: "LOW",
    quantity: 200,
    operator: "Unassigned",
    machine: "Line 3 Milling",
    deadline: "3 Days",
    tolerance: "±0.05 mm"
  },
  {
    id: "WO-9399",
    partName: "Automotive Transmission Shaft",
    sku: "TRN-SHF-01",
    stage: "COMPLETED",
    priority: "HIGH",
    quantity: 80,
    operator: "Vikas G.",
    machine: "Heat Treat Cell #01",
    deadline: "Dispatched",
    tolerance: "±0.003 mm"
  }
];

export const ManufacturingDemo = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // New order form state
  const [newPartName, setNewPartName] = useState('');
  const [newQuantity, setNewQuantity] = useState(50);
  const [newPriority, setNewPriority] = useState('MEDIUM');
  const [newMachine, setNewMachine] = useState('CNC Mill #01');

  const advanceStage = (id, e) => {
    e.stopPropagation();
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const currentIndex = STAGES.findIndex(s => s.id === order.stage);
        if (currentIndex < STAGES.length - 1) {
          return { ...order, stage: STAGES[currentIndex + 1].id };
        }
      }
      return order;
    }));
  };

  const rollbackStage = (id, e) => {
    e.stopPropagation();
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const currentIndex = STAGES.findIndex(s => s.id === order.stage);
        if (currentIndex > 0) {
          return { ...order, stage: STAGES[currentIndex - 1].id };
        }
      }
      return order;
    }));
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newPartName) return;

    const newOrder = {
      id: `WO-${Math.floor(9405 + Math.random() * 500)}`,
      partName: newPartName,
      sku: `PRD-${Math.floor(100 + Math.random() * 900)}`,
      stage: 'BACKLOG',
      priority: newPriority,
      quantity: parseInt(newQuantity, 10),
      operator: 'Floor Lead',
      machine: newMachine,
      deadline: '48 Hours',
      tolerance: '±0.01 mm'
    };

    setOrders([newOrder, ...orders]);
    setNewPartName('');
    setAddModalOpen(false);
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.operator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || o.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="Manufacturing Work Orders"
        appTagline="Industrial Discrete Floor Shop Coordination System"
        githubUrl="https://github.com/Amolippar/manufacturing-workorders"
        detailsSlug="manufacturing-work-orders"
      />

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Active Floor Orders</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-white">{orders.filter(o => o.stage !== 'COMPLETED').length}</span>
              <Factory className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">5 production cells active</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Overall OEE Health</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-emerald-400">89.4%</span>
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[11px] text-emerald-500 mt-1 block">+2.1% above target threshold</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">QA Pass Rate</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-purple-400">99.2%</span>
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Zero tolerance deviations</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Completed Today</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-cyan-400">{orders.filter(o => o.stage === 'COMPLETED').length}</span>
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Dispatched to logistics</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search order ID, part, tech..."
                className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    filterPriority === p ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5 justify-center"
          >
            <Plus className="w-4 h-4" />
            <span>New Work Order</span>
          </button>
        </div>

        {/* Interactive Kanban Stages Board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {STAGES.map(stage => {
            const stageOrders = filteredOrders.filter(o => o.stage === stage.id);
            return (
              <div
                key={stage.id}
                className={`rounded-2xl border p-3 flex flex-col min-h-[500px] ${stage.color}`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <span className="font-bold text-xs text-slate-200">{stage.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300">
                    {stageOrders.length}
                  </span>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto">
                  {stageOrders.map(order => (
                    <motion.div
                      key={order.id}
                      layout
                      onClick={() => setSelectedOrder(order)}
                      className="p-3.5 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-xl shadow-md cursor-pointer space-y-2.5 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-indigo-400 font-mono">{order.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          order.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          order.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {order.priority}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{order.partName}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{order.sku} • {order.quantity} units</span>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{order.machine}</span>
                        <span className="text-slate-300 font-medium">{order.operator}</span>
                      </div>

                      {/* Stage Progression Controls */}
                      <div className="flex items-center justify-between gap-1 pt-1">
                        {stage.id !== 'BACKLOG' && (
                          <button
                            onClick={(e) => rollbackStage(order.id, e)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] flex items-center gap-1 transition"
                            title="Rollback stage"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        <span className="text-[9px] text-slate-500 font-medium">Click for specs</span>
                        {stage.id !== 'COMPLETED' && (
                          <button
                            onClick={(e) => advanceStage(order.id, e)}
                            className="p-1 px-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] flex items-center gap-1 transition ml-auto"
                            title="Advance to next station"
                          >
                            <span>Next</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {stageOrders.length === 0 && (
                    <div className="py-12 text-center text-slate-600 text-xs">
                      No orders in this station
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Work Order Modal */}
      <AnimatePresence>
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">Create Production Work Order</h3>
                <button onClick={() => setAddModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Part / Assembly Name</label>
                  <input
                    type="text"
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                    placeholder="e.g. Stainless Drive Axle"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Batch Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                      <option value="CRITICAL">CRITICAL</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Target Machine Tool</label>
                  <input
                    type="text"
                    value={newMachine}
                    onChange={(e) => setNewMachine(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Schedule to Backlog
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Specs / Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono text-indigo-400 font-bold">{selectedOrder.id} Specs</span>
                  <h3 className="text-base font-bold text-white">{selectedOrder.partName}</h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Catalog SKU</span>
                  <span className="font-mono text-white font-bold">{selectedOrder.sku}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Batch Size</span>
                  <span className="text-white font-bold">{selectedOrder.quantity} Units</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Inspection Tolerance</span>
                  <span className="text-emerald-400 font-bold">{selectedOrder.tolerance}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Current Station</span>
                  <span className="text-white font-bold">{selectedOrder.stage}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-500 block mb-1">Station Operator & Timeline</span>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{selectedOrder.operator}</span>
                  <span className="text-amber-400 font-medium">Target: {selectedOrder.deadline}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
              >
                Close Specification
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
