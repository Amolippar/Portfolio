import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Play, Clock, Sparkles } from 'lucide-react';
import { Github } from '../Icons';

export const ProjectCardActions = ({ 
  project, 
  onOpenLiveDemo,
  className = "" 
}) => {
  if (!project) return null;

  const isLive = Boolean(project.liveDemoUrl && project.liveDemoUrl.startsWith('http'));
  const detailsUrl = project.detailsUrl || `/projects/${project.slug || project.id}`;
  const githubUrl = project.githubUrl || 'https://github.com/Amolippar';

  const handleLiveDemoClick = (e) => {
    e.stopPropagation();
    if (isLive) {
      window.open(project.liveDemoUrl, '_blank', 'noopener,noreferrer');
    } else if (onOpenLiveDemo) {
      onOpenLiveDemo(project);
    }
  };

  return (
    <div 
      className={`pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Live Demo Button (Always clearly visible) */}
      {isLive ? (
        <a
          href={project.liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition inline-flex items-center gap-1.5"
          title="Open Live Running Application in New Tab"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Live Demo</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={handleLiveDemoClick}
          className="px-3 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/80 transition inline-flex items-center gap-1.5"
          title="Live Demo Status & Local Run Guide"
        >
          <Play className="w-3.5 h-3.5 text-indigo-500" />
          <span>Live Demo</span>
          <span className="text-[10px] font-medium opacity-75">
            {project.deploymentStatus === 'demo_coming_soon' ? '(Coming Soon)' : '(Pending)'}
          </span>
        </button>
      )}

      {/* 2. View Details Button */}
      <Link
        to={detailsUrl}
        onClick={(e) => e.stopPropagation()}
        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition inline-flex items-center gap-1.5"
        title="View Architecture, Features & Tech Stack"
      >
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      {/* 3. GitHub Source Link */}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-800 transition inline-flex items-center"
          title="View GitHub Source Repository"
          aria-label="GitHub Repository"
        >
          <Github className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};
