import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Search, 
  Calendar, 
  BookOpen, 
  Sparkles,
  Send,
  Check,
  X
} from 'lucide-react';
import { DemoAppHeader } from './DemoAppHeader';

const INITIAL_ROSTER = [
  { rollNo: "IT-301", name: "Aarav Sharma", totalLectures: 42, attended: 38, isPresentToday: true },
  { rollNo: "IT-302", name: "Ananya Deshmukh", totalLectures: 42, attended: 40, isPresentToday: true },
  { rollNo: "IT-303", name: "Rohan Kulkarni", totalLectures: 42, attended: 28, isPresentToday: false }, // 66.6% Defaulter
  { rollNo: "IT-304", name: "Sneha Patil", totalLectures: 42, attended: 39, isPresentToday: true },
  { rollNo: "IT-305", name: "Aditya Joshi", totalLectures: 42, attended: 35, isPresentToday: true },
  { rollNo: "IT-306", name: "Pooja Shinde", totalLectures: 42, attended: 29, isPresentToday: false }, // 69.0% Defaulter
  { rollNo: "IT-307", name: "Kunal Verma", totalLectures: 42, attended: 37, isPresentToday: true },
  { rollNo: "IT-308", name: "Tanvi Pawar", totalLectures: 42, attended: 41, isPresentToday: true },
  { rollNo: "IT-309", name: "Vikas Gaikwad", totalLectures: 42, attended: 25, isPresentToday: false }, // 59.5% Defaulter
  { rollNo: "IT-310", name: "Riya Nair", totalLectures: 42, attended: 36, isPresentToday: true },
];

export const AttendanceDemo = () => {
  const [roster, setRoster] = useState(INITIAL_ROSTER);
  const [selectedDivision, setSelectedDivision] = useState('TE-IT Div-A');
  const [selectedSubject, setSelectedSubject] = useState('Distributed Systems & Cloud (IT-502)');
  const [filterDefaulters, setFilterDefaulters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const toggleStudent = (rollNo) => {
    setRoster(prev => prev.map(student => {
      if (student.rollNo === rollNo) {
        const nextStatus = !student.isPresentToday;
        return {
          ...student,
          isPresentToday: nextStatus,
          attended: nextStatus ? student.attended + 1 : student.attended - 1
        };
      }
      return student;
    }));
  };

  const markAllPresent = () => {
    setRoster(prev => prev.map(student => {
      if (!student.isPresentToday) {
        return { ...student, isPresentToday: true, attended: student.attended + 1 };
      }
      return student;
    }));
    setToastMessage("All students marked PRESENT for current session.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalStudents = roster.length;
  const presentCount = roster.filter(s => s.isPresentToday).length;
  const absentCount = totalStudents - presentCount;
  const todayTurnout = Math.round((presentCount / totalStudents) * 100);

  // Compute defaulters (< 75%)
  const defaulters = roster.filter(s => {
    const pct = Math.round((s.attended / (s.totalLectures + 1)) * 100);
    return pct < 75;
  });

  const filteredRoster = roster.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const pct = Math.round((student.attended / (student.totalLectures + 1)) * 100);
    const matchesDefaulter = !filterDefaulters || pct < 75;
    return matchesSearch && matchesDefaulter;
  });

  const handleExportCSV = () => {
    setToastMessage("Attendance report generated & exported as CSV successfully!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <DemoAppHeader
        appName="Student Attendance System"
        appTagline="Academic Roll Call & Defaulter Analytics Portal"
        githubUrl="https://github.com/Amolippar/student-attendance"
        detailsSlug="student-attendance-system"
      />

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Academic Session Selector Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Department of Information Technology</span>
              </div>
              <h2 className="text-xl font-black text-white">Daily Attendance Register & Roll Call</h2>
              <p className="text-xs text-slate-400 mt-1">Prof. Amol Ippar • Academic Year 2025-26 Semester VI</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={markAllPresent}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark All Present</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setEmailModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Alert Defaulters ({defaulters.length})</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">Class & Division</label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="TE-IT Div-A">TE-IT Division A (Roll 301 - 360)</option>
                <option value="TE-IT Div-B">TE-IT Division B (Roll 361 - 420)</option>
                <option value="BE-IT Div-A">BE-IT Division A (Roll 401 - 470)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">Lecture Course</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Distributed Systems & Cloud (IT-502)">Distributed Systems & Cloud (IT-502)</option>
                <option value="Advanced Java & Spring Boot (IT-504)">Advanced Java & Spring Boot (IT-504)</option>
                <option value="Machine Learning Lab (IT-508)">Machine Learning Lab (IT-508)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1">Time Slot</label>
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono">
                10:15 AM - 11:15 AM (Room 402)
              </div>
            </div>
          </div>
        </div>

        {/* Real-time KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Enrolled</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-white">{totalStudents}</span>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Division A Roster</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Present Today</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-emerald-400">{presentCount}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[11px] text-emerald-500 mt-1 block">{todayTurnout}% Session Attendance</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Absent Today</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-rose-400">{absentCount}</span>
              <XCircle className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-[11px] text-rose-500 mt-1 block">Requires leave verification</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Critical Defaulters</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-amber-400">{defaulters.length}</span>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[11px] text-amber-500 mt-1 block">&lt; 75% Cumulative threshold</span>
          </div>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold text-center">
            {toastMessage}
          </div>
        )}

        {/* Roll Call Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Student Attendance Roster</h3>
              <p className="text-xs text-slate-400">Click Present / Absent pills to toggle attendance status in real time.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or roll no..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={() => setFilterDefaulters(!filterDefaulters)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  filterDefaulters
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {filterDefaulters ? 'Showing Defaulters Only' : 'Show All Students'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Roll No</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Cumulative Attended</th>
                  <th className="py-3.5 px-4">Aggregate %</th>
                  <th className="py-3.5 px-4">Standing Status</th>
                  <th className="py-3.5 px-4 text-right">Today's Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredRoster.map(student => {
                  const pct = Math.round((student.attended / (student.totalLectures + 1)) * 100);
                  const isDefaulter = pct < 75;

                  return (
                    <tr key={student.rollNo} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{student.rollNo}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{student.name}</td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {student.attended} / {student.totalLectures + 1} lectures
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-black ${isDefaulter ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {pct}%
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full rounded-full ${isDefaulter ? 'bg-rose-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {isDefaulter ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-[10px] font-bold">
                            DEFAULTER (&lt;75%)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                            REGULAR
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => toggleStudent(student.rollNo)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                              student.isPresentToday
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Present</span>
                          </button>
                          <button
                            onClick={() => toggleStudent(student.rollNo)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                              !student.isPresentToday
                                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Absent</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Alert Defaulters Modal */}
      <AnimatePresence>
        {emailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Send Defaulter Notice</h3>
                </div>
                <button onClick={() => setEmailModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                You are about to dispatch an automated attendance warning email and SMS to <strong className="text-amber-400">{defaulters.length} students</strong> currently below the mandatory 75% University attendance requirement.
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <span className="text-slate-400 font-semibold block">Notice Recipients:</span>
                {defaulters.map(d => (
                  <div key={d.rollNo} className="flex justify-between text-slate-300">
                    <span>{d.name} ({d.rollNo})</span>
                    <span className="text-rose-400 font-bold">{Math.round((d.attended / (d.totalLectures + 1)) * 100)}%</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setEmailModalOpen(false);
                  setToastMessage("Notices dispatched to all 3 defaulters via automated mail queue!");
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
              >
                Confirm & Dispatch Warning
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
