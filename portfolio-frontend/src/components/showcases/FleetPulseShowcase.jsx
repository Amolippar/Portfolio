import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Car,
  Navigation,
  MapPin,
  Clock,
  Fuel,
  Gauge,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Send,
  Zap,
  RotateCcw,
  Sparkles,
  Phone,
  UserCheck,
  ChevronRight,
  Route
} from 'lucide-react';

export const FleetPulseShowcase = () => {
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'inventory', 'booking', 'drivers'
  const [selectedVehicle, setSelectedVehicle] = useState('FP-104');
  const [vehicleFilter, setVehicleFilter] = useState('ALL');
  
  // Interactive Booking Simulator State
  const [pickupLocation, setPickupLocation] = useState('Pune Airport Hub');
  const [dropLocation, setDropLocation] = useState('Hinjawadi Tech Park');
  const [selectedVehicleType, setSelectedVehicleType] = useState('VAN');
  const [bookingStep, setBookingStep] = useState(0); // 0: Config, 1: Requested, 2: Confirmed, 3: In Transit, 4: Completed
  const [isSimulatingBooking, setIsSimulatingBooking] = useState(false);

  // Simulated Telemetry Timer for dynamic speed/fuel fluctuation
  const [telemetryTick, setTelemetryTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick(prev => (prev + 1) % 100);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Vehicles dataset matching FleetPulse real entities
  const vehicles = [
    {
      id: 'FP-104',
      plate: 'MH-12-FP-104',
      model: 'Tata Ace Super',
      type: 'VAN',
      capacity: '1,500 kg',
      status: 'ON_TRIP',
      driver: 'Rajesh Sharma',
      driverPhone: '+91 98231-10421',
      fuel: 76,
      odometer: '48,210 km',
      speed: 46 + (telemetryTick % 6),
      temp: 87,
      lat: 18.5793,
      lng: 73.7443,
      currentTrip: 'Airport ➔ Hinjawadi Cargo',
      eta: '18 mins'
    },
    {
      id: 'FP-209',
      plate: 'MH-12-FP-209',
      model: 'Mahindra Bolero Maxi',
      type: 'TRUCK',
      capacity: '2,800 kg',
      status: 'ON_TRIP',
      driver: 'Amit Kulkarni',
      driverPhone: '+91 97654-20988',
      fuel: 62,
      odometer: '82,450 km',
      speed: 54 - (telemetryTick % 5),
      temp: 91,
      lat: 18.7025,
      lng: 73.8567,
      currentTrip: 'Chakan MIDC ➔ Hadapsar',
      eta: '34 mins'
    },
    {
      id: 'FP-312',
      plate: 'MH-14-FP-312',
      model: 'Hyundai Aura Prime',
      type: 'SEDAN',
      capacity: '4 Passengers',
      status: 'AVAILABLE',
      driver: 'Suresh Patil',
      driverPhone: '+91 99220-31244',
      fuel: 94,
      odometer: '21,900 km',
      speed: 0,
      temp: 72,
      lat: 18.5204,
      lng: 73.8567,
      currentTrip: 'Idle at Pune Depot',
      eta: 'Ready'
    },
    {
      id: 'FP-405',
      plate: 'MH-12-FP-405',
      model: 'Tata 407 Heavy',
      type: 'TRUCK',
      capacity: '4,500 kg',
      status: 'MAINTENANCE',
      driver: 'Unassigned',
      driverPhone: '—',
      fuel: 38,
      odometer: '124,100 km',
      speed: 0,
      temp: 65,
      lat: 18.5089,
      lng: 73.9260,
      currentTrip: 'Scheduled 50k km Service',
      eta: 'Maintenance'
    }
  ];

  const currentVehicleData = vehicles.find(v => v.id === selectedVehicle) || vehicles[0];

  // Route definitions for interactive booking simulation
  const routesData = {
    'Pune Airport Hub-Hinjawadi Tech Park': { distance: 26.4, duration: 45 },
    'Pune Airport Hub-Chakan MIDC': { distance: 34.2, duration: 58 },
    'Pune Airport Hub-Hadapsar Logistics Depot': { distance: 16.8, duration: 32 },
    'Chakan MIDC-Hinjawadi Tech Park': { distance: 31.0, duration: 52 },
    'Chakan MIDC-Hadapsar Logistics Depot': { distance: 41.5, duration: 68 },
    'Hadapsar Logistics Depot-Hinjawadi Tech Park': { distance: 28.6, duration: 48 }
  };

  const routeKey = `${pickupLocation}-${dropLocation}`;
  const reverseRouteKey = `${dropLocation}-${pickupLocation}`;
  const currentRoute = routesData[routeKey] || routesData[reverseRouteKey] || { distance: 22.0, duration: 38 };

  // Fare computation according to VehiclePricing rules
  const pricingRates = {
    SEDAN: { base: 150, perKm: 14, label: 'Executive Sedan' },
    VAN: { base: 250, perKm: 22, label: 'Cargo Van (1.5T)' },
    TRUCK: { base: 450, perKm: 34, label: 'Heavy Truck (3T+)' }
  };
  const selectedRate = pricingRates[selectedVehicleType];
  const calculatedFare = Math.round(selectedRate.base + currentRoute.distance * selectedRate.perKm);

  // Dispatch simulation sequence
  const startBookingSimulation = () => {
    setIsSimulatingBooking(true);
    setBookingStep(1); // REQUESTED

    setTimeout(() => {
      setBookingStep(2); // CONFIRMED
    }, 1200);

    setTimeout(() => {
      setBookingStep(3); // IN_TRANSIT
    }, 2800);

    setTimeout(() => {
      setBookingStep(4); // COMPLETED
      setIsSimulatingBooking(false);
    }, 5000);
  };

  const resetBookingSimulation = () => {
    setBookingStep(0);
    setIsSimulatingBooking(false);
  };

  // Filtered inventory
  const filteredVehicles = vehicles.filter(v => {
    if (vehicleFilter === 'ALL') return true;
    if (vehicleFilter === 'AVAILABLE') return v.status === 'AVAILABLE';
    if (vehicleFilter === 'ON_TRIP') return v.status === 'ON_TRIP';
    if (vehicleFilter === 'MAINTENANCE') return v.status === 'MAINTENANCE';
    return v.type === vehicleFilter;
  });

  return (
    <div className="rounded-3xl bg-[#0B132B] text-slate-100 border border-blue-900/40 shadow-2xl overflow-hidden relative">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP TELEMETRY STATUS BAR */}
      <div className="px-6 py-4 bg-[#1C2541]/80 border-b border-blue-900/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            FLEETPULSE LIVE TELEMETRY v3.2
          </span>
          <span className="text-slate-400 hidden sm:inline">
            ENGINE: <strong className="text-slate-200">Spring Boot 3 + MySQL</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <div>
            FLEET: <strong className="text-cyan-400">18/24 Active</strong>
          </div>
          <div className="hidden md:block">
            TRIPS TODAY: <strong className="text-emerald-400">47 Dispatched</strong>
          </div>
          <div className="hidden sm:block">
            LATENCY: <strong className="text-amber-400">118ms</strong>
          </div>
          <div className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300">
            GEOAPIFY: Connected
          </div>
        </div>
      </div>

      {/* 2. HERO SHOWCASE HEADLINE */}
      <div className="p-6 sm:p-10 border-b border-blue-900/40 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider uppercase">
          <Truck className="w-3.5 h-3.5" /> High-Performance Logistics Architecture
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          FleetPulse Live Dispatch & Fleet Telemetry System
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
          Interactive full-stack platform built by Amol Ippar to eliminate logistics dispatch bottlenecks. Experience the simulated live tracking radar, Geoapify distance routing, multi-tier pricing calculation, and complete Spring Security JWT state-machine workflow below.
        </p>
      </div>

      {/* 3. INTERACTIVE TAB NAVIGATION */}
      <div className="px-6 pt-4 border-b border-blue-900/40 bg-[#0E1736] flex flex-wrap gap-2">
        {[
          { id: 'map', label: '1. Live Dispatch Radar', icon: Route },
          { id: 'inventory', label: '2. Vehicle Inventory', icon: Truck },
          { id: 'booking', label: '3. Trip Booking & Fare Dispatch', icon: Zap },
          { id: 'drivers', label: '4. Driver Management', icon: UserCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl text-xs sm:text-sm font-bold transition-all border-t border-x ${
                isActive
                  ? 'bg-[#1C2541] text-cyan-400 border-blue-700/80 shadow-lg'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-blue-950/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENTS */}
      <div className="p-6 sm:p-8 bg-[#1C2541]/40">
        {/* TAB 1: LIVE DISPATCH RADAR */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive SVG Radar Route Map */}
            <div className="lg:col-span-2 rounded-2xl bg-[#091024] border border-blue-900/60 p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              {/* Radar Grid Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, #3A86FF 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Map Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Activity className="w-4 h-4 animate-spin text-cyan-400" />
                  PUNE METROPOLITAN LOGISTICS ZONE (GRID 18.52° N, 73.85° E)
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-slate-300 font-mono">
                  SCALE: 1:50,000
                </span>
              </div>

              {/* SVG Transit Lines & Pulsing Waypoints */}
              <div className="relative my-6 h-56 w-full flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 600 240">
                  <defs>
                    <linearGradient id="routeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3A86FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00F5D4" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="routeGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF006E" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#FB5607" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Route Corridor 1 (Airport ➔ Hinjawadi) */}
                  <path
                    d="M 80 50 Q 240 30 340 120 T 520 180"
                    fill="none"
                    stroke="#1E3A8A"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 80 50 Q 240 30 340 120 T 520 180"
                    fill="none"
                    stroke="url(#routeGradient1)"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />

                  {/* Route Corridor 2 (Chakan ➔ Hadapsar) */}
                  <path
                    d="M 480 40 Q 380 130 200 150 T 90 200"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 480 40 Q 380 130 200 150 T 90 200"
                    fill="none"
                    stroke="url(#routeGradient2)"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />

                  {/* Waypoint 1: Pune Airport Hub */}
                  <g transform="translate(80, 50)">
                    <circle r="14" fill="#3A86FF" fillOpacity="0.2" className="animate-ping" />
                    <circle r="6" fill="#3A86FF" />
                    <text x="12" y="-6" fill="#E2E8F0" fontSize="11" fontWeight="bold">
                      Pune Airport Hub
                    </text>
                  </g>

                  {/* Waypoint 2: Hinjawadi Phase 1 */}
                  <g transform="translate(520, 180)">
                    <circle r="14" fill="#00F5D4" fillOpacity="0.2" className="animate-ping" />
                    <circle r="6" fill="#00F5D4" />
                    <text x="-120" y="20" fill="#00F5D4" fontSize="11" fontWeight="bold">
                      Hinjawadi Tech Park
                    </text>
                  </g>

                  {/* Waypoint 3: Chakan MIDC */}
                  <g transform="translate(480, 40)">
                    <circle r="6" fill="#FB5607" />
                    <text x="-90" y="-8" fill="#CBD5E1" fontSize="11" fontWeight="bold">
                      Chakan MIDC
                    </text>
                  </g>

                  {/* Waypoint 4: Hadapsar Depot */}
                  <g transform="translate(90, 200)">
                    <circle r="6" fill="#FF006E" />
                    <text x="14" y="16" fill="#CBD5E1" fontSize="11" fontWeight="bold">
                      Hadapsar Depot
                    </text>
                  </g>

                  {/* Active Vehicle 1 Marker (FP-104) */}
                  <g
                    transform={`translate(${270 + (telemetryTick % 40)}, ${85 + (telemetryTick % 25)})`}
                    onClick={() => setSelectedVehicle('FP-104')}
                    className="cursor-pointer"
                  >
                    <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#00F5D4" />
                    <text x="-14" y="4" fill="#091024" fontSize="9" fontWeight="black">
                      FP-104
                    </text>
                  </g>

                  {/* Active Vehicle 2 Marker (FP-209) */}
                  <g
                    transform={`translate(${330 - (telemetryTick % 35)}, ${135 + (telemetryTick % 15)})`}
                    onClick={() => setSelectedVehicle('FP-209')}
                    className="cursor-pointer"
                  >
                    <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#FB5607" />
                    <text x="-14" y="4" fill="#FFFFFF" fontSize="9" fontWeight="black">
                      FP-209
                    </text>
                  </g>
                </svg>
              </div>

              {/* Vehicle Switcher Bar */}
              <div className="z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-blue-900/60 text-xs">
                <span className="text-slate-400">Select active unit to view telemetry:</span>
                <div className="flex gap-2">
                  {vehicles.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      className={`px-3 py-1 rounded-lg font-mono font-bold transition text-xs ${
                        selectedVehicle === v.id
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                          : 'bg-blue-950/80 text-slate-300 hover:bg-blue-900'
                      }`}
                    >
                      #{v.id} ({v.type})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Telemetry Detail Card */}
            <div className="rounded-2xl bg-[#091024] border border-blue-900/60 p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                      UNIT TELEMETRY
                    </span>
                    <h3 className="text-xl font-black text-white">{currentVehicleData.plate}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      currentVehicleData.status === 'ON_TRIP'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : currentVehicleData.status === 'AVAILABLE'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {currentVehicleData.status}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-blue-950">
                    <span className="text-slate-400">Vehicle Model</span>
                    <span className="font-bold text-white">{currentVehicleData.model}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-blue-950">
                    <span className="text-slate-400">Assigned Driver</span>
                    <span className="font-bold text-cyan-300 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> {currentVehicleData.driver}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-blue-950">
                    <span className="text-slate-400">Driver Contact</span>
                    <span className="font-mono text-slate-300">{currentVehicleData.driverPhone}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-blue-950">
                    <span className="text-slate-400">Active Dispatch</span>
                    <span className="font-semibold text-emerald-400">{currentVehicleData.currentTrip}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-blue-950">
                    <span className="text-slate-400">Estimated Arrival (ETA)</span>
                    <span className="font-mono font-bold text-amber-400">{currentVehicleData.eta}</span>
                  </div>
                </div>

                {/* Telemetry Gauge Indicators */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-center">
                    <Gauge className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
                    <span className="text-[10px] text-slate-400 block">Speed</span>
                    <span className="font-mono font-black text-sm text-white">
                      {currentVehicleData.speed} <span className="text-[10px] font-normal">km/h</span>
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-center">
                    <Fuel className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
                    <span className="text-[10px] text-slate-400 block">Fuel Level</span>
                    <span className="font-mono font-black text-sm text-emerald-400">
                      {currentVehicleData.fuel}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-center">
                    <Cpu className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                    <span className="text-[10px] text-slate-400 block">Engine Temp</span>
                    <span className="font-mono font-black text-sm text-amber-300">
                      {currentVehicleData.temp}°C
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Geoapify API polling coordinates with Spring Data JPA audit logs</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VEHICLE INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {['ALL', 'AVAILABLE', 'ON_TRIP', 'MAINTENANCE', 'SEDAN', 'VAN', 'TRUCK'].map(f => (
                  <button
                    key={f}
                    onClick={() => setVehicleFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      vehicleFilter === f
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-blue-950/80 text-slate-300 hover:bg-blue-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredVehicles.length} of {vehicles.length} entities
              </span>
            </div>

            {/* Inventory Table */}
            <div className="rounded-2xl bg-[#091024] border border-blue-900/60 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-blue-900/60 text-slate-400 font-mono uppercase bg-blue-950/40">
                    <th className="p-3.5">Unit ID</th>
                    <th className="p-3.5">Model / Plate</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Payload</th>
                    <th className="p-3.5">Driver</th>
                    <th className="p-3.5">Fuel Status</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Odometer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/40">
                  {filteredVehicles.map(veh => (
                    <tr
                      key={veh.id}
                      className="hover:bg-blue-950/50 transition cursor-pointer"
                      onClick={() => {
                        setSelectedVehicle(veh.id);
                        setActiveTab('map');
                      }}
                    >
                      <td className="p-3.5 font-mono font-bold text-cyan-400">#{veh.id}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-white">{veh.model}</div>
                        <div className="font-mono text-[11px] text-slate-400">{veh.plate}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                          {veh.type}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-300">{veh.capacity}</td>
                      <td className="p-3.5 text-slate-200">{veh.driver}</td>
                      <td className="p-3.5">
                        <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden mb-1">
                          <div
                            className={`h-full rounded-full ${
                              veh.fuel > 50 ? 'bg-emerald-400' : veh.fuel > 25 ? 'bg-amber-400' : 'bg-rose-500'
                            }`}
                            style={{ width: `${veh.fuel}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{veh.fuel}%</span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            veh.status === 'AVAILABLE'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : veh.status === 'ON_TRIP'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {veh.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-300">{veh.odometer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TRIP BOOKING & FARE DISPATCH */}
        {activeTab === 'booking' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Booking Configurator */}
            <div className="rounded-2xl bg-[#091024] border border-blue-900/60 p-6 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                  INTERACTIVE DISPATCH SIMULATOR
                </span>
                <h3 className="text-xl font-black text-white">Create & Dispatch New Cargo Trip</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Simulates Geoapify Distance API calculation and Spring Boot BookingService state machine.
                </p>
              </div>

              {/* Waypoint Selectors */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block font-semibold mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Origin Hub (Pickup)
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={e => setPickupLocation(e.target.value)}
                    disabled={isSimulatingBooking}
                    className="w-full p-2.5 rounded-xl bg-blue-950/80 border border-blue-900 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Pune Airport Hub">Pune Airport Hub (Viman Nagar)</option>
                    <option value="Chakan MIDC">Chakan Industrial MIDC</option>
                    <option value="Hadapsar Logistics Depot">Hadapsar Logistics Depot</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block font-semibold mb-1 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Destination Depot (Drop-off)
                  </label>
                  <select
                    value={dropLocation}
                    onChange={e => setDropLocation(e.target.value)}
                    disabled={isSimulatingBooking}
                    className="w-full p-2.5 rounded-xl bg-blue-950/80 border border-blue-900 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Hinjawadi Tech Park">Hinjawadi Tech Park (Phase 1)</option>
                    <option value="Hadapsar Logistics Depot">Hadapsar Logistics Depot</option>
                    <option value="Chakan MIDC">Chakan Industrial MIDC</option>
                  </select>
                </div>

                {/* Vehicle Class Selection */}
                <div>
                  <label className="text-slate-400 block font-semibold mb-1 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> Vehicle Category (VehiclePricing Rule)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['SEDAN', 'VAN', 'TRUCK'].map(vType => (
                      <button
                        key={vType}
                        type="button"
                        onClick={() => setSelectedVehicleType(vType)}
                        disabled={isSimulatingBooking}
                        className={`p-2.5 rounded-xl text-center border transition ${
                          selectedVehicleType === vType
                            ? 'bg-blue-900/80 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-blue-950/40 border-blue-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-[11px] uppercase font-bold">{vType}</div>
                        <div className="text-[10px] text-slate-400">
                          ₹{pricingRates[vType].perKm}/km
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geoapify Live Calculation Box */}
              <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-900/60 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-cyan-400" /> Geoapify Route Distance
                  </span>
                  <span className="font-mono font-bold text-white">{currentRoute.distance} km</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Estimated Duration
                  </span>
                  <span className="font-mono font-bold text-white">{currentRoute.duration} mins</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-blue-900/60">
                  <span className="font-bold text-white">Estimated Trip Billing</span>
                  <span className="font-mono font-black text-base text-emerald-400">
                    ₹{calculatedFare}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={startBookingSimulation}
                  disabled={isSimulatingBooking}
                  className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSimulatingBooking ? 'Dispatching...' : 'Simulate Spring Boot Dispatch'}
                </button>
                {bookingStep > 0 && (
                  <button
                    onClick={resetBookingSimulation}
                    className="p-3 rounded-xl bg-blue-950 text-slate-400 hover:text-white border border-blue-900 transition"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Lifecycle State Machine Visualizer */}
            <div className="rounded-2xl bg-[#091024] border border-blue-900/60 p-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                  BOOKING SERVICE STATE MACHINE
                </span>
                <h3 className="text-xl font-black text-white">Spring Boot Entity Lifecycle</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Watch how the Booking entity transitions through validation rules and database persistence.
                </p>
              </div>

              {/* Status Progression Stepper */}
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    status: 'REQUESTED',
                    title: '1. Booking Requested',
                    desc: 'Incoming HTTP POST /api/bookings. Validates payload DTO with Hibernate Bean Validation.'
                  },
                  {
                    step: 2,
                    status: 'CONFIRMED',
                    title: '2. Driver & Vehicle Allocated',
                    desc: 'Optimistic lock assigns Unit #FP-104 and Driver Rajesh Sharma. Sets DriverStatus = ON_DUTY.'
                  },
                  {
                    step: 3,
                    status: 'IN_TRANSIT',
                    title: '3. In-Transit GPS Active',
                    desc: 'Vehicle status updated to ON_TRIP. Periodic GPS telemetry streams to distance aggregator.'
                  },
                  {
                    step: 4,
                    status: 'COMPLETED',
                    title: '4. Trip Completed & Settled',
                    desc: 'Odometer updated, PaymentStatus = PAID, and PDF invoice generated for billing.'
                  }
                ].map(s => {
                  const isDone = bookingStep >= s.step;
                  const isCurrent = bookingStep === s.step;
                  return (
                    <div
                      key={s.step}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-blue-900/40 border-cyan-400 shadow-lg shadow-cyan-500/10'
                          : isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                          : 'bg-blue-950/20 border-blue-900/40 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px]">
                              {s.step}
                            </div>
                          )}
                          <span className="font-bold text-xs text-white">{s.title}</span>
                        </div>
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                            isDone ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500'
                          }`}
                        >
                          {s.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-6">{s.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/40 text-[11px] text-slate-400 font-mono">
                ACTIVE STATUS: <strong className="text-cyan-400">{bookingStep === 0 ? 'IDLE (Click Simulate)' : bookingStep === 4 ? 'TRANSACTION COMMITTED' : 'PROCESSING...'}</strong>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DRIVER MANAGEMENT */}
        {activeTab === 'drivers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Rajesh Sharma',
                id: 'DRV-001',
                phone: '+91 98231-10421',
                rating: '4.9 ★',
                trips: 184,
                dutyHours: '6.5 hrs',
                status: 'ON_DUTY',
                assignedVehicle: 'FP-104 (Tata Ace)'
              },
              {
                name: 'Amit Kulkarni',
                id: 'DRV-002',
                phone: '+91 97654-20988',
                rating: '4.8 ★',
                trips: 242,
                dutyHours: '7.2 hrs',
                status: 'ON_DUTY',
                assignedVehicle: 'FP-209 (Mahindra Bolero)'
              },
              {
                name: 'Suresh Patil',
                id: 'DRV-003',
                phone: '+91 99220-31244',
                rating: '4.95 ★',
                trips: 98,
                dutyHours: '1.0 hrs',
                status: 'AVAILABLE',
                assignedVehicle: 'FP-312 (Hyundai Aura)'
              }
            ].map(drv => (
              <div
                key={drv.id}
                className="p-5 rounded-2xl bg-[#091024] border border-blue-900/60 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{drv.name}</h4>
                    <span className="font-mono text-[10px] text-cyan-400">{drv.id}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      drv.status === 'ON_DUTY'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {drv.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone</span>
                    <span className="font-mono text-slate-200">{drv.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver Rating</span>
                    <span className="font-bold text-amber-400">{drv.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Trips Completed</span>
                    <span className="font-mono text-slate-200">{drv.trips}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shift Time Today</span>
                    <span className="font-mono text-cyan-300">{drv.dutyHours}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-950">
                    <span className="text-slate-400">Current Unit</span>
                    <span className="font-semibold text-white">{drv.assignedVehicle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. TECHNICAL ARCHITECTURE PIPELINE */}
      <div className="p-6 sm:p-10 border-t border-blue-900/60 space-y-6 bg-[#0E1736]">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            FULL-STACK ARCHITECTURAL BLUEPRINT
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Enterprise Client-Server & Data Flow Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Every transaction is validated across a 6-tier architecture from React single-page client to MySQL persistence.
          </p>
        </div>

        {/* Pipeline Nodes Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            {
              step: 'Tier 1',
              title: 'React 19 Frontend',
              tech: 'Vite, Axios, Tailwind',
              desc: 'Client SPA manages optimistic UI updates and dispatch forms.'
            },
            {
              step: 'Tier 2',
              title: 'JWT Auth Filter',
              tech: 'Spring Security 6',
              desc: 'Validates Bearer token signature and extracts role authorities.'
            },
            {
              step: 'Tier 3',
              title: 'REST Controllers',
              tech: 'Spring Web MVC',
              desc: 'BookingController, AdminController with Bean Validation.'
            },
            {
              step: 'Tier 4',
              title: 'Service Layer',
              tech: 'Distance & Booking',
              desc: 'Geoapify API routing & vehicle pricing calculations.'
            },
            {
              step: 'Tier 5',
              title: 'Hibernate JPA',
              tech: 'Spring Data JPA',
              desc: 'Declarative @Transactional isolation & repository queries.'
            },
            {
              step: 'Tier 6',
              title: 'MySQL 8 Database',
              tech: 'fleet database',
              desc: 'Indexed license plates, driver foreign keys, and audit logs.'
            }
          ].map((node, nIdx) => (
            <div
              key={nIdx}
              className="p-4 rounded-2xl bg-[#091024] border border-blue-900/60 flex flex-col justify-between hover:border-cyan-400 transition group"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block mb-1">
                  {node.step}
                </span>
                <h4 className="font-extrabold text-xs text-white group-hover:text-cyan-300 transition">
                  {node.title}
                </h4>
                <div className="text-[10px] text-amber-400 font-mono mt-0.5">{node.tech}</div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. AMOL'S VERIFIED CONTRIBUTIONS */}
      <div className="p-6 sm:p-10 border-t border-blue-900/60 bg-[#0B132B] space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-black text-white">
            Amol Ippar's Verified Engineering Contributions
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1.5">
            <h5 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Spring Security & JWT Access Control
            </h5>
            <p className="text-slate-400 leading-relaxed">
              Implemented stateless JWT authentication filters, password hashing via BCrypt, and role-based route authorizations protecting administrative endpoints.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1.5">
            <h5 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Relational Database Normalization in MySQL
            </h5>
            <p className="text-slate-400 leading-relaxed">
              Designed normalized relational entities (Booking, Vehicle, Driver, VehiclePricing) with foreign key constraints and indexed lookup queries in MySQL.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1.5">
            <h5 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              External Geocoding & Routing Integration
            </h5>
            <p className="text-slate-400 leading-relaxed">
              Created DistanceService integrating external Geoapify Geocoding API to dynamically calculate transit distances, durations, and multi-tier pricing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1.5">
            <h5 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              Responsive React Client & CORS Management
            </h5>
            <p className="text-slate-400 leading-relaxed">
              Engineered the responsive React dashboard with Axios interceptors, centralized API routing, and permissive CORS configuration across local and cloud environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
