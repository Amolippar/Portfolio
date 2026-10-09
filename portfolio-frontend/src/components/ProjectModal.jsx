import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Lightbulb, Target, Layers, Cpu, ArrowRight } from 'lucide-react';
import { Github } from './Icons';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  // Normalize features
  const featureList = Array.isArray(project.features)
    ? project.features
    : typeof project.features === 'string'
    ? project.features.split(',').map((f) => f.trim()).filter(Boolean)
    : [];

  // Normalize technologies
  const techList = Array.isArray(project.technologies)
    ? project.technologies
    : typeof project.technologies === 'string'
    ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop overlay */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden z-10"
        >
          {/* Header image & close button */}
          <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-950">
            <img
              src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
              alt={project.title}
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition z-20 border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md mb-2">
                {project.category || 'Full Stack'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl line-clamp-2">
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Action Buttons Bar */}
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex flex-wrap gap-1.5 items-center">
              {techList.slice(0, 5).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60"
                >
                  {tech}
                </span>
              ))}
              {techList.length > 5 && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  +{techList.length - 5} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                to={`/projects/${project.slug || project.id}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-600/20"
              >
                Full Showcase <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition shadow-sm"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md shadow-emerald-600/20"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 dark:text-slate-300 text-sm">
            {/* Objective & Problem Statement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                  <Target className="w-4 h-4" />
                  <span>Project Objective</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.objective || 'Provide a scalable, reliable modern software solution solving core business bottlenecks.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Problem Statement</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.problemStatement || 'Manual processes and fragmented tools lead to inefficiencies, communication lags, and errors.'}
                </p>
              </div>
            </div>

            {/* Key Features */}
            {featureList.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>Key Features & Functional Scope</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featureList.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Technical Challenges</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.challenges || 'Architecting low-latency state synchronization, strict authorization, and zero downtime.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Implemented Solution</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.solution || 'Engineered modular components, transactional service methods, and automated validation.'}
                </p>
              </div>
            </div>

            {/* Technologies Used */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>Complete Tech Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
