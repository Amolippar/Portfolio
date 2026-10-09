import React, { useState } from 'react';
import { 
  Users, 
  Check, 
  X, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  GraduationCap, 
  Send 
} from 'lucide-react';

export const AttendanceShowcase = () => {
  const [students, setStudents] = useState([
    { id: 'IT-01', name: 'Aarav Deshmukh', totalLectures: 40, attended: 35, todayStatus: 'PRESENT' },
    { id: 'IT-02', name: 'Pooja Kulkarni', totalLectures: 40, attended: 29, todayStatus: 'PRESENT' }, // 72.5% defaulter
    { id: 'IT-03', name: 'Rohan Shinde', totalLectures: 40, attended: 38, todayStatus: 'PRESENT' },
    { id: 'IT-04', name: 'Snehal Patil', totalLectures: 40, attended: 28, todayStatus: 'ABSENT' }, // 70% defaulter
    { id: 'IT-05', name: 'Vikram Joshi', totalLectures: 40, attended: 32, todayStatus: 'LATE' }
  ]);

  const setStatus = (id, status) => {
    setStudents(prev =>
      prev.map(st => {
        if (st.id !== id) return st;
        const wasPresent = st.todayStatus === 'PRESENT' || st.todayStatus === 'LATE';
        const isNowPresent = status === 'PRESENT' || status === 'LATE';
        let attendedDelta = 0;
        if (!wasPresent && isNowPresent) attendedDelta = 1;
        if (wasPresent && !isNowPresent) attendedDelta = -1;

        return {
          ...st,
          todayStatus: status,
          attended: Math.max(0, st.attended + attendedDelta)
        };
      })
    );
  };

  const markAllPresent = () => {
    setStudents(prev =>
      prev.map(st => ({
        ...st,
        todayStatus: 'PRESENT',
        attended: st.todayStatus === 'ABSENT' ? st.attended + 1 : st.attended
      }))
    );
  };

  const defaulters = students.filter(st => {
    const pct = Math.round((st.attended / st.totalLectures) * 100);
    return pct < 75;
  });

  return (
    <div className="rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" /> Department of Information Technology (TE-IT B)
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Student Attendance Roster & Defaulter Analytics
          </h3>
        </div>
        <button
          onClick={markAllPresent}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition"
        >
          Mark All Present
        </button>
      </div>

      {/* Defaulter Alert Banner if any student < 75% */}
      {defaulters.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-amber-800 dark:text-amber-300">
              Defaulter Threshold Warning (&lt; 75% Attendance)
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              {defaulters.length} student(s) currently below the university compliance threshold ({defaulters.map(d => d.name).join(', ')}). System automatically stages parent SMS and exam hall-ticket holds.
            </p>
          </div>
        </div>
      )}

      {/* Roster Table */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase bg-slate-100/50 dark:bg-slate-800/40">
              <th className="p-3.5">Roll No</th>
              <th className="p-3.5">Student Name</th>
              <th className="p-3.5">Attended / Total</th>
              <th className="p-3.5">Percentage</th>
              <th className="p-3.5">Defaulter Status</th>
              <th className="p-3.5 text-right">Quick Mark Today</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {students.map(st => {
              const pct = Math.round((st.attended / st.totalLectures) * 100);
              const isDefaulter = pct < 75;

              return (
                <tr key={st.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">{st.id}</td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{st.name}</td>
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                    {st.attended} / {st.totalLectures}
                  </td>
                  <td className="p-3.5 font-mono font-bold">
                    <span className={isDefaulter ? 'text-rose-500' : 'text-emerald-500'}>
                      {pct}%
                    </span>
                  </td>
                  <td className="p-3.5">
                    {isDefaulter ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                        DEFAULTER (&lt;75%)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        CLEAR
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => setStatus(st.id, 'PRESENT')}
                        className={`p-1.5 rounded-lg transition ${
                          st.todayStatus === 'PRESENT'
                            ? 'bg-emerald-500 text-white'
                            : 'text-slate-400 hover:text-emerald-500'
                        }`}
                        title="Mark Present"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setStatus(st.id, 'LATE')}
                        className={`p-1.5 rounded-lg transition ${
                          st.todayStatus === 'LATE'
                            ? 'bg-amber-500 text-white'
                            : 'text-slate-400 hover:text-amber-500'
                        }`}
                        title="Mark Late"
                      >
                        <Clock className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setStatus(st.id, 'ABSENT')}
                        className={`p-1.5 rounded-lg transition ${
                          st.todayStatus === 'ABSENT'
                            ? 'bg-rose-500 text-white'
                            : 'text-slate-400 hover:text-rose-500'
                        }`}
                        title="Mark Absent"
                      >
                        <X className="w-3.5 h-3.5" />
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
  );
};
