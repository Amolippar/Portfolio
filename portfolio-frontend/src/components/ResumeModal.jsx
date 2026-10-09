import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, BookOpen, Briefcase, Code, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_RESUMES } from '../utils/initialData';

export const ResumeModal = ({ isOpen, onClose, profile }) => {
  const [selectedResume, setSelectedResume] = useState(INITIAL_RESUMES[0]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.open(selectedResume.filePath, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = selectedResume.filePath;
    link.download = selectedResume.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header bar */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 shrink-0">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Amol Ippar — Career Resumes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">CDAC Pune PG-DAC (79.50%) | BE IT (SPPU 7.95 CGPA)</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/resume"
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                All 5 Resumes Page <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-600/20"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition ml-2"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Role selector tabs */}
          <div className="px-4 py-3 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Select Role:
            </span>
            {INITIAL_RESUMES.map((res) => (
              <button
                key={res.id}
                onClick={() => setSelectedResume(res)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedResume.id === res.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {res.roleTitle.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Printable Resume Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-sans print:p-0">
            {/* Header info */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">AMOL IPPAR</h1>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-base mt-1">{selectedResume.roleTitle}</p>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-3 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Pune, Maharashtra, India</span>
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> amolippar2003@gmail.com</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> +91 9766043761</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-1 sm:text-right">
                <a href="https://github.com/Amolippar" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">github.com/Amolippar</a>
                <a href="https://www.linkedin.com/in/amol-ippar-87a35a24a/" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">linkedin.com/in/amol-ippar</a>
              </div>
            </div>

            {/* Professional Summary */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Professional Summary
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {selectedResume.summary}
              </p>
            </section>

            {/* Technical Skills Focus */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <Code className="w-4 h-4" /> Targeted Technical Competencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedResume.coreSkills.map((sk, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </section>

            {/* Key Projects */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" /> Featured Project Showcases
              </h2>
              <div className="space-y-3">
                {selectedResume.featuredProjects.map((pName, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">{pName}</span>
                    <Link to="/projects" onClick={onClose} className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1">
                      View Spec <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Education & Qualifications
              </h2>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Post Graduate Diploma in Advanced Computing (PG-DAC)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Centre for Development of Advanced Computing (C-DAC), Pune — 79.50% (Topped SQL & Database Technologies)</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Aug 2025 – Feb 2026</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Bachelor of Engineering — Information Technology (BE IT)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Savitribai Phule Pune University (Anantrao Pawar College of Engineering) — CGPA 7.95</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Completed Dec 2024</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Higher Secondary Certificate (HSC) — Science</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Dayanand Science College, Latur</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">May 2020</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
