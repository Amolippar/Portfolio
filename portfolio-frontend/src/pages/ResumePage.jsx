import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  Printer,
  Sparkles,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Layers,
  X,
  Code2,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_RESUMES } from '../utils/initialData';

export const ResumePage = () => {
  const [activeResume, setActiveResume] = useState(INITIAL_RESUMES[0]);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleOpenPreview = (resume) => {
    setPreviewUrl(resume.filePath);
    setPreviewTitle(resume.roleTitle);
    setPreviewModalOpen(true);
  };

  const handlePrint = (filePath) => {
    const printWindow = window.open(filePath, '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <FileText className="w-4 h-4" /> Role-Specific Career Documents
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Role-Tailored Career Resumes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Recruiters, engineering managers, and technical interviewers: explore 5 distinct, role-tailored resumes for Amol Ippar. Each curriculum vitae aligns specific technical competencies, CDAC PG-DAC honors (79.50%), SPPU BE IT education, and verified full-stack project architectures.
        </p>

        {/* Global Action Highlights */}
        <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> CDAC Pune: 79.50% (Topper in SQL / DB)
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-500" /> SPPU: BE IT (7.95 CGPA)
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-500" /> 10 Verified Engineering Projects
          </div>
        </div>
      </div>

      {/* 5 Career Resume Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {INITIAL_RESUMES.map((resume, idx) => (
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col justify-between space-y-6 hover:border-indigo-500/50 hover:shadow-xl transition-all border border-slate-200/80 dark:border-slate-800/80 group"
          >
            <div className="space-y-4">
              {/* Badge & Target Roles */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {resume.badge}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Updated: {resume.updatedAt}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                  {resume.roleTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {resume.summary}
                </p>
              </div>

              {/* Target Job Titles */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Target Positions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {resume.targetRoles.map((role, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Skills Highlight */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Core Skills Focus:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {resume.coreSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Projects Highlight */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Flagship Showcases:
                </span>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {resume.featuredProjects.map((proj, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions: View, Download, Print */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenPreview(resume)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Resume
                </button>

                <a
                  href={resume.filePath}
                  download={resume.fileName}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              </div>

              <button
                onClick={() => handlePrint(resume.filePath)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Print this Resume"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recruiter Call To Action Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900/90 via-slate-900 to-slate-950 text-white border border-indigo-800/50 shadow-2xl space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            Open for Immediate Joining
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Need a Custom Format or Ready to Schedule an Interview?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I am actively interviewing for Full Stack Developer, Java Backend Engineer, QA Engineer, and Software Engineering positions across Pune, Mumbai, Bangalore, and remote locations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 transition transform hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4" /> Contact Amol Directly
          </Link>

          <a
            href="mailto:amolippar2003@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
          >
            Email: amolippar2003@gmail.com
          </a>

          <a
            href="tel:+919766043761"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
          >
            Call: +91 9766043761
          </a>
        </div>
      </div>

      {/* Interactive PDF Preview Modal */}
      <AnimatePresence>
        {previewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {previewTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={previewUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                  <button
                    onClick={() => handlePrint(previewUrl)}
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Print"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewModalOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Frame */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-2 sm:p-4 overflow-hidden">
                <iframe
                  src={`${previewUrl}#toolbar=1`}
                  title={previewTitle}
                  className="w-full h-full rounded-2xl border border-slate-300 dark:border-slate-800 bg-white"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
