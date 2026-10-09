import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Terminal, 
  Database, 
  Check, 
  Copy, 
  ExternalLink, 
  Server, 
  Layers, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { Github } from '../Icons';

export const DeploymentInfoModal = ({ isOpen, onClose, project }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen || !project) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isSpringBoot = (project.backendTechStack || project.technologies || '').toLowerCase().includes('spring');
  const isNode = (project.backendTechStack || project.technologies || '').toLowerCase().includes('node');
  const isPython = (project.backendTechStack || project.technologies || '').toLowerCase().includes('python');

  const backendCommand = isSpringBoot
    ? './mvnw spring-boot:run'
    : isPython
    ? 'python app.py'
    : 'npm run server';

  const frontendCommand = 'npm install && npm run dev';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {project.deploymentStatus || 'Self-Hosted / Local'}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {project.category || 'Full Stack'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {project.title.split('–')[0].trim()} – Deployment & Architecture
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Architecture Status Alert */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">
                Why isn't this hosted on a static generic cloud link?
              </p>
              <p className="leading-relaxed">
                This project is a genuine full-stack enterprise application requiring a persistent relational database (<span className="font-semibold text-indigo-600 dark:text-indigo-400">MySQL</span>) and a dedicated backend server (<span className="font-semibold text-indigo-600 dark:text-indigo-400">{isSpringBoot ? 'Java Spring Boot' : isPython ? 'Python Flask' : 'Node.js Express'}</span>). Rather than deploying a non-functional static mock, the verified codebase with complete backend logic is provided.
              </p>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Backend Engine</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-1">
                <Server className="w-3.5 h-3.5 text-indigo-500" />
                {project.backendTechStack?.split(',')[0] || 'Spring Boot'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Database Store</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-1">
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                {project.databaseTechStack?.split(',')[0] || 'MySQL'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Client UI</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-1">
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                {project.frontendTechStack?.split(',')[0] || 'React.js'}
              </span>
            </div>
          </div>

          {/* Step-by-Step Local Launch Commands */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-500" /> Step-by-Step Local Run Instructions
            </h3>

            {/* Step 1: Clone repo */}
            <div className="p-3 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono space-y-1.5 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>1. Clone verified repository</span>
                <button
                  onClick={() => copyToClipboard(`git clone ${project.githubUrl || 'https://github.com/Amolippar'}`, 'clone')}
                  className="hover:text-white flex items-center gap-1 text-[10px]"
                >
                  {copiedKey === 'clone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'clone' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="text-emerald-400 block break-all">
                git clone {project.githubUrl || 'https://github.com/Amolippar'}
              </code>
            </div>

            {/* Step 2: Backend */}
            <div className="p-3 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono space-y-1.5 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>2. Start backend server</span>
                <button
                  onClick={() => copyToClipboard(backendCommand, 'backend')}
                  className="hover:text-white flex items-center gap-1 text-[10px]"
                >
                  {copiedKey === 'backend' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'backend' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="text-cyan-400 block">
                {backendCommand}
              </code>
            </div>

            {/* Step 3: Frontend */}
            <div className="p-3 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono space-y-1.5 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>3. Start client dashboard</span>
                <button
                  onClick={() => copyToClipboard(frontendCommand, 'frontend')}
                  className="hover:text-white flex items-center gap-1 text-[10px]"
                >
                  {copiedKey === 'frontend' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'frontend' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="text-amber-400 block">
                {frontendCommand}
              </code>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified codebase by Amol Ippar</span>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" /> View GitHub Repository
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
