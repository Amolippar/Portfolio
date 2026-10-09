import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Github } from '../../components/Icons';

export const DemoAppHeader = ({ 
  appName, 
  appTagline, 
  githubUrl, 
  detailsSlug,
  accentColor = "bg-indigo-600" 
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shadow-lg">
      <div className="flex items-center gap-3">
        <Link
          to={detailsSlug ? `/projects/${detailsSlug}` : "/projects"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          title="Return to Portfolio Specifications"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Portfolio Project Overview</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="h-4 w-px bg-slate-700 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white">{appName}</span>
          {appTagline && (
            <span className="hidden md:inline text-xs text-slate-400 font-normal">
              — {appTagline}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Interactive Live Application</span>
        </div>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Inspect GitHub Source Code"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </header>
  );
};
