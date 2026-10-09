import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Fuel, 
  Calendar, 
  Users, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  Shield,
  Activity,
  DollarSign,
  Phone,
  Search,
  Filter
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

export const FleetPulseDemo = () => {
  const [activeTab, setActiveTab] = useState('radar');
  const [selectedVehicle, setSelectedVehicle] = useState('FP-104');
  const [origin, setOrigin] = useState('Pune Central Logistics Hub');
  const [destination, setDestination] = useState('Hinjawadi Tech Park Phase 2');
  const [selectedClass, setSelectedClass] = useState('Sedan');
  const [bookingStep, setBookingStep] = useState(0);
  const [searchVehicles, setSearchVehicles] = useState('');

  // Sample fleet vehicles
  const [vehicles, setVehicles] = useState([
    { id: 'FP-101', make: 'Tata Ace Gold', class: 'Mini Truck', license: 'MH-12-AQ-4491', status: 'AVAILABLE', fuel: 82, location: 'Pune Central Hub', driver: 'Suresh Patil' },
    { id: 'FP-104', make: 'Maruti Suzuki Dzire', class: 'Sedan', license: 'MH-14-BT-9104', status: 'IN_TRANSIT', fuel: 64, location: 'Hinjawadi Ph-1', driver: 'Rahul Deshmukh' },
    { id: 'FP-209', make: 'Mahindra Bolero Maxi', class: 'Delivery Van', license: 'MH-12-CX-3209', status: 'MAINTENANCE', fuel: 24, location: 'Chakan Service Depot', driver: 'Unassigned' },
    { id: 'FP-315', make: 'Ashok Leyland 1616', class: 'Heavy Truck', license: 'MH-14-DG-7715', status: 'AVAILABLE', fuel: 95, location: 'Hadapsar Cargo Yard', driver: 'Amit Shinde' },
    { id: 'FP-402', make: 'Toyota Innova Crysta', class: 'SUV', license: 'MH-12-ER-5502', status: 'IN_TRANSIT', fuel: 58, location: 'Viman Nagar VIP Terminal', driver: 'Vikram Joshi' },
  ]);

  // Sample drivers
  const [drivers, setDrivers] = useState([
    { id: 'DRV-1', name: 'Rahul Deshmukh', phone: '+91 98234-11029', status: 'ON_DUTY', assignedVehicle: 'FP-104', rating: 4.9, hours: '6.5 hrs today' },
    { id: 'DRV-2', name: 'Suresh Patil', phone: '+91 94220-88192', status: 'AVAILABLE', assignedVehicle: 'FP-101', rating: 4.8, hours: '2.0 hrs today' },
    { id: 'DRV-3', name: 'Amit Shinde', phone: '+91 97660-44101', status: 'ON_DUTY', assignedVehicle: 'FP-315', rating: 4.7, hours: '7.1 hrs today' },
    { id: 'DRV-4', name: 'Vikram Joshi', phone: '+91 98901-33214', status: 'ON_DUTY', assignedVehicle: 'FP-402', rating: 4.9, hours: '4.2 hrs today' },
  ]);

  const distances = {
    'Hinjawadi Tech Park Phase 2': { km: 18.4, time: '38 mins', baseFare: 420 },
    'Chakan MIDC Industrial Area': { km: 34.2, time: '55 mins', baseFare: 780 },
    'Hadapsar Cargo Logistics Depot': { km: 14.8, time: '32 mins', baseFare: 360 },
    'Ranjangaon MIDC Hub': { km: 52.0, time: '1 hr 15 mins', baseFare: 1150 }
  };

  const currentQuote = distances[destination] || { km: 20, time: '40 mins', baseFare: 450 };
  const multiplier = selectedClass === 'Heavy Truck' ? 2.2 : selectedClass === 'Delivery Van' ? 1.5 : 1.0;
  const calculatedFare = Math.round(currentQuote.baseFare * multiplier);

  const bookingSteps = ['REQUESTED', 'CONFIRMED', 'DISPATCHED', 'IN_TRANSIT', 'COMPLETED'];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="FleetPulse"
        appTagline="Enterprise Fleet & Logistics Dispatch Portal"
        githubUrl="https://github.com/Amolippar/fleetpulse"
        detailsSlug="fleetpulse"
      />

      {/* Main App Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top KPI Header */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Vehicles</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-white">{vehicles.length}</span>
              <Truck className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[11px] text-emerald-400">2 In-Transit • 2 Available</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Active Drivers</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-emerald-400">3 On-Duty</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[11px] text-slate-400">1 Standby Reserve</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Avg Fleet Fuel</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-amber-400">65.4%</span>
              <Fuel className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[11px] text-slate-400">Optimal Range</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">System Security</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-cyan-400">JWT RBAC</span>
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[11px] text-cyan-400/80">Spring Security 6 Active</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'radar' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Live GPS Telemetry & Radar
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'booking' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Trip Booking & Fare Dispatch
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'fleet' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Vehicle Fleet Inventory ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'drivers' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Driver Shift Management
          </button>
        </div>

        {/* Tab 1: Live GPS Radar */}
        {activeTab === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Pune Transit Radar</span>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800">
                  Telemetry Stream: Online
                </span>
              </div>

              {/* Interactive Vector Radar Grid */}
              <div className="relative my-8 h-64 flex items-center justify-center">
                <svg className="w-full h-full max-h-64" viewBox="0 0 600 300">
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3A86FF" />
                      <stop offset="100%" stopColor="#00F5D4" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="50" y1="50" x2="550" y2="50" stroke="#1E293B" strokeDasharray="4 4" />
                  <line x1="50" y1="150" x2="550" y2="150" stroke="#1E293B" strokeDasharray="4 4" />
                  <line x1="50" y1="250" x2="550" y2="250" stroke="#1E293B" strokeDasharray="4 4" />

                  {/* Route Paths */}
                  <path d="M 80 180 Q 220 80 340 140 T 520 100" fill="none" stroke="url(#routeGrad)" strokeWidth="3" strokeDasharray="6 6" />

                  {/* Nodes */}
                  <circle cx="80" cy="180" r="10" fill="#3A86FF" />
                  <text x="70" y="215" fill="#94A3B8" fontSize="11" fontFamily="monospace">Pune Central Hub</text>

                  <circle cx="340" cy="140" r="10" fill="#8338EC" />
                  <text x="290" y="175" fill="#94A3B8" fontSize="11" fontFamily="monospace">Hinjawadi Phase 2</text>

                  <circle cx="520" cy="100" r="10" fill="#00F5D4" />
                  <text x="460" y="135" fill="#94A3B8" fontSize="11" fontFamily="monospace">Chakan MIDC</text>

                  {/* Moving Vehicle Blip */}
                  <circle cx="230" cy="120" r="8" fill="#10B981" className="animate-pulse" />
                  <text x="245" y="125" fill="#10B981" fontSize="12" fontWeight="bold">FP-104 (54 km/h)</text>
                </svg>
              </div>

              <div className="z-10 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span>Selected: <strong className="text-white">FP-104 (Maruti Dzire)</strong></span>
                <span>Driver: <strong className="text-indigo-400">Rahul Deshmukh</strong></span>
                <span>Destination: <strong className="text-emerald-400">Hinjawadi Ph-2</strong></span>
              </div>
            </div>

            {/* Selected Vehicle Telemetry */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Live Vehicle Telemetry</h3>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-black text-indigo-400">FP-104</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    IN_TRANSIT
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Speed:</span>
                    <strong className="text-white">54.2 km/h</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Engine Temp:</span>
                    <strong className="text-emerald-400">89°C (Normal)</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Fuel Tank:</span>
                    <strong className="text-amber-400">64% (28 Liters)</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Odometer:</span>
                    <strong className="text-white">42,891 km</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedVehicle('FP-104')}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 transition text-white flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4" /> Request Engine Diagnostics
                </button>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 transition text-slate-300 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" /> Dispatch New Trip to FP-104
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Trip Booking & Fare Dispatch */}
        {activeTab === 'booking' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Simulate Trip Dispatch</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Pickup Origin</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Destination Target</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    {Object.keys(distances).map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Vehicle Classification</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Sedan', 'Delivery Van', 'Heavy Truck'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedClass(c)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition ${
                          selectedClass === c ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fare Summary Box */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-2 mt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Geoapify Calculated Distance:</span>
                    <strong className="text-white">{currentQuote.km} km</strong>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Est. Transit Duration:</span>
                    <strong className="text-white">{currentQuote.time}</strong>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-indigo-800/60">
                    <span className="font-bold text-slate-200">Total Dispatch Fare:</span>
                    <strong className="text-lg font-black text-emerald-400">₹{calculatedFare}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setBookingStep((prev) => (prev + 1) % bookingSteps.length)}
                  className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Advance Lifecycle Step: {bookingSteps[bookingStep]}
                </button>
              </div>
            </div>

            {/* Spring Boot Booking Lifecycle Stepper */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Spring Boot Booking State Machine</h3>
              <p className="text-xs text-slate-400">
                Demonstrates how FleetPulse's transactional Spring Service enforces the lifecycle of a trip reservation from initial user booking to delivery confirmation.
              </p>
              <div className="space-y-3 pt-2">
                {bookingSteps.map((step, idx) => {
                  const isCurrent = idx === bookingStep;
                  const isDone = idx < bookingStep;
                  return (
                    <div
                      key={step}
                      className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
                        isCurrent
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : isDone
                          ? 'bg-emerald-950/30 border-emerald-800 text-emerald-400'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-current">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold font-mono">{step}</div>
                          <div className="text-[10px] text-slate-400">
                            {step === 'REQUESTED' && 'Payload received by BookingController.java'}
                            {step === 'CONFIRMED' && 'Assigned vehicle locked in MySQL with optimistic lock'}
                            {step === 'DISPATCHED' && 'Driver acknowledged trip via Mobile view'}
                            {step === 'IN_TRANSIT' && 'Live GPS telemetry streaming to dispatcher'}
                            {step === 'COMPLETED' && 'Trip closed & invoice persisted to audit ledger'}
                          </div>
                        </div>
                      </div>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isCurrent && <Clock className="w-4 h-4 text-indigo-400 animate-spin" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Vehicle Fleet Inventory */}
        {activeTab === 'fleet' && (
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Vehicle Inventory Directory</h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter by ID, make, license..."
                  value={searchVehicles}
                  onChange={(e) => setSearchVehicles(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Vehicle ID</th>
                    <th className="py-3 px-3">Make / Model</th>
                    <th className="py-3 px-3">Class</th>
                    <th className="py-3 px-3">License Plate</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Fuel Level</th>
                    <th className="py-3 px-3">Assigned Driver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {vehicles
                    .filter((v) => v.id.toLowerCase().includes(searchVehicles.toLowerCase()) || v.make.toLowerCase().includes(searchVehicles.toLowerCase()))
                    .map((v) => (
                      <tr key={v.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-3 font-bold text-indigo-400">{v.id}</td>
                        <td className="py-3 px-3 text-slate-200 font-sans">{v.make}</td>
                        <td className="py-3 px-3 text-slate-400 font-sans">{v.class}</td>
                        <td className="py-3 px-3 text-slate-300">{v.license}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            v.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            v.status === 'IN_TRANSIT' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-200">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full ${v.fuel > 50 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${v.fuel}%` }} />
                            </div>
                            <span>{v.fuel}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-sans">{v.driver}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Driver Management */}
        {activeTab === 'drivers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drivers.map((drv) => (
              <div key={drv.id} className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{drv.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{drv.id} • {drv.phone}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    drv.status === 'ON_DUTY' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {drv.status}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Vehicle:</span>
                    <strong className="text-indigo-400 font-mono">{drv.assignedVehicle}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver Safety Rating:</span>
                    <strong className="text-amber-400">★ {drv.rating} / 5.0</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Logged Shift:</span>
                    <strong className="text-white">{drv.hours}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
