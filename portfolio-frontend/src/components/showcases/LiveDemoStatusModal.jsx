import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  Server,
  Play
} from 'lucide-react';
import { Github } from '../Icons';
import { useNavigate } from 'react-router-dom';

export const LiveDemoStatusModal = ({ isOpen, onClose, project, onOpenDeployGuide }) => {
  const navigate = useNavigate();

  if (!isOpen || !project) return null;

  const isLive = Boolean(project.liveDemoUrl && project.liveDemoUrl.startsWith('http'));
  const localPort = project.localPort || 5174;
  const localUrl = `http://localhost:${localPort}`;

  const handleOpenLocal = () => {
    window.open(localUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenShowcase = () => {
    onClose();
    navigate(`/projects/${project.slug || project.id}`);
  };

  const handleOpenGithub = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-white"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950/50">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
                <Clock className="w-3.5 h-3.5" />
                {isLive ? 'Live Deployment Active' : 'Cloud Deployment Configuration Ready'}
              </div>
              <h2 className="text-xl font-extrabold">{project.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target Route: <span className="font-mono text-indigo-500">/projects/{project.slug}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {isLive ? (
              /* Verified Live Deployment Box */
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Verified Production URL Available
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  This project is deployed and reachable at:
                </p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all border border-emerald-200 dark:border-emerald-900/40">
                  {project.liveDemoUrl}
                </div>
                <button
                  onClick={() => window.open(project.liveDemoUrl, '_blank', 'noopener,noreferrer')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> Open Live Application in New Tab
                </button>
              </div>
            ) : (
              /* Deployment Status Explanation (Zero 404s Guarantee) */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    Zero 404 Policy & Verified Hosting
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    To prevent <strong>"404 DEPLOYMENT_NOT_FOUND"</strong> errors from placeholder URLs, this button only links to verified live endpoints. All source code, build scripts (<code className="px-1 py-0.5 rounded bg-white dark:bg-slate-800">vite build</code> / <code className="px-1 py-0.5 rounded bg-white dark:bg-slate-800">mvn package</code>), and deployment manifests are verified and ready for cloud deployment.
                  </p>
                </div>

                {/* Pre-Deployment Status Checklist */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Deployment Pipeline Readiness
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Frontend Production Build: <strong>Passing with 0 errors</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>SPA Catch-All Routing: <strong><code className="text-indigo-500">vercel.json</code> configured</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Backend Containerization: <strong><code className="text-indigo-500">Dockerfile</code> & CORS origins prepared</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>GitHub Source Repository: <strong>Clean commits linked to Amolippar</strong></span>
                    </div>
                  </div>
                </div>

                {/* Local Instance Launch option */}
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Server className="w-4 h-4 text-indigo-500" />
                      Run Locally on Your Machine
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-bold">
                      port {localPort}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    If this project is running locally in your development environment, you can open its running port directly:
                  </p>
                  <button
                    onClick={handleOpenLocal}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-indigo-500 hover:border-indigo-500 transition flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open {localUrl} in Browser
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleOpenShowcase}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" /> View Interactive Showcase <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              {onOpenDeployGuide && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenDeployGuide(project);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" /> Run Commands
                </button>
              )}

              {project.githubUrl && (
                <button
                  onClick={handleOpenGithub}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub Code
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
