import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Database,
  Wrench,
  Activity,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  FileText,
  AlertCircle,
  ShieldCheck,
  Workflow,
  Target,
  Compass,
  Terminal,
  BookOpen
} from 'lucide-react';
import { Github } from '../components/Icons';
import { getProjectBySlug, getProjects } from '../services/api';
import { INITIAL_PROJECTS } from '../utils/initialData';
import { FleetPulseShowcase } from '../components/showcases/FleetPulseShowcase';
import { AnnaRestroShowcase } from '../components/showcases/AnnaRestroShowcase';
import { PredictiveShowcase } from '../components/showcases/PredictiveShowcase';
import { ManufacturingShowcase } from '../components/showcases/ManufacturingShowcase';
import { SalesforceSwitcherShowcase } from '../components/showcases/SalesforceSwitcherShowcase';
import { AttendanceShowcase } from '../components/showcases/AttendanceShowcase';
import { InstagramShowcase } from '../components/showcases/InstagramShowcase';
import { CineVaultShowcase } from '../components/showcases/CineVaultShowcase';
import { StockTrailShowcase } from '../components/showcases/StockTrailShowcase';
import { DeploymentInfoModal } from '../components/showcases/DeploymentInfoModal';
import { LiveDemoStatusModal } from '../components/showcases/LiveDemoStatusModal';
import { normalizeProject } from '../config/projectsConfig';
import { Play } from 'lucide-react';

export const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);
  const [isLiveDemoModalOpen, setIsLiveDemoModalOpen] = useState(false);


  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const loadProjectData = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        // Fetch all projects for next/prev pagination
        const allList = await getProjects();
        const baseList = allList && allList.length > 0 ? allList : INITIAL_PROJECTS;
        if (isMounted) setAllProjects(baseList.map(normalizeProject));

        // Fetch current project by slug
        let foundProject = null;
        try {
          foundProject = await getProjectBySlug(slug);
        } catch (e) {
          console.warn('API getProjectBySlug failed, checking local initial data:', e);
          foundProject = INITIAL_PROJECTS.find(
            p => p.slug === slug || String(p.id) === String(slug)
          );
        }

        if (isMounted) {
          if (foundProject) {
            setProject(normalizeProject(foundProject));
          } else {
            setNotFound(true);
          }
        }

      } catch (err) {
        console.error('Failed to load project details:', err);
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProjectData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Loading project specifications...
        </p>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Project Not Found
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          We couldn't find a project matching <code className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-indigo-500 font-mono text-xs">/projects/{slug}</code>. It might have been updated or renamed.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Projects
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            Portfolio Home
          </Link>
        </div>
      </div>
    );
  }

  // Parse list badges
  const featuresList = (project.features || '')
    .split(',')
    .map(f => f.trim())
    .filter(Boolean);

  const frontendTech = (project.frontendTechStack || project.technologies || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  const backendTech = (project.backendTechStack || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  const databaseTech = (project.databaseTechStack || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  const toolsTech = (project.tools || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  // Next / Previous projects calculation
  const projectList = allProjects.length > 0 ? allProjects : INITIAL_PROJECTS;
  const currentIndex = projectList.findIndex(
    p => p.slug === project.slug || String(p.id) === String(project.id)
  );
  const prevProject = currentIndex > 0 ? projectList[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projectList.length - 1
      ? projectList[currentIndex + 1]
      : null;

  const renderShowcase = () => {
    if (!project) return null;
    const s = (project.slug || '').toLowerCase();
    if (s.includes('fleetpulse')) return <FleetPulseShowcase />;
    if (s.includes('annarestro') || s.includes('restaurant')) return <AnnaRestroShowcase />;
    if (s.includes('predictive')) return <PredictiveShowcase />;
    if (s.includes('manufacturing')) return <ManufacturingShowcase />;
    if (s.includes('salesforce') || s.includes('validation')) return <SalesforceSwitcherShowcase />;
    if (s.includes('attendance')) return <AttendanceShowcase />;
    if (s.includes('instagram')) return <InstagramShowcase />;
    if (s.includes('cinevault') || s.includes('movie')) return <CineVaultShowcase />;
    if (s.includes('stocktrail') || s.includes('finance')) return <StockTrailShowcase />;
    return null;
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Top Breadcrumb & Navigation Bar */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Quick Next / Prev Switcher */}
        <div className="flex items-center gap-2">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              title={`Previous: ${prevProject.title}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </Link>
          ) : (
            <span className="opacity-40 px-3 py-1.5 text-xs text-slate-400 cursor-not-allowed">
              Previous
            </span>
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              title={`Next: ${nextProject.title}`}
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="opacity-40 px-3 py-1.5 text-xs text-slate-400 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </nav>

      {/* Hero Banner Section */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            {project.category || 'Full Stack'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {project.status || 'Completed'}
          </span>
          {project.deploymentStatus && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              {project.deploymentStatus}
            </span>
          )}
          {project.isFeatured && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured Engineering Project
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Action Link Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" /> Live Demo
            </a>
          ) : (
            <button
              onClick={() => setIsLiveDemoModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition shadow-sm"
            >
              <Play className="w-4 h-4 text-indigo-500" /> Live Demo (Deploy Pending)
            </button>
          )}

          <button
            onClick={() => setIsDeploymentModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition shadow-sm"
          >
            <Terminal className="w-4 h-4" /> Architecture & Run Guide
          </button>


          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}

          {project.githubFrontendUrl && project.githubFrontendUrl !== project.githubUrl && (
            <a
              href={project.githubFrontendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:border-indigo-500 border border-transparent transition"
            >
              <Github className="w-4 h-4" /> Frontend Repo
            </a>
          )}

          {project.githubBackendUrl && project.githubBackendUrl !== project.githubUrl && (
            <a
              href={project.githubBackendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:border-indigo-500 border border-transparent transition"
            >
              <Github className="w-4 h-4" /> Backend Repo
            </a>
          )}

          {project.documentationUrl && (
            <a
              href={project.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <FileText className="w-4 h-4" /> Documentation & README
            </a>
          )}
        </div>
      </header>

      {/* Interactive Showcase Section (FleetPulse, AnnaRestro, etc.) */}
      {renderShowcase() && (
        <section aria-label="Interactive Product Showcase" className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Interactive Product Showcase & System Simulation
            </h2>
          </div>
          {renderShowcase()}
        </section>
      )}

      {/* Featured Image Display */}
      <section aria-label="Project Preview Banner" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl max-h-[480px] bg-slate-950">
        <img
          src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
          alt={project.title}
          className="w-full h-full object-cover object-center max-h-[480px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs">
          <span className="font-semibold backdrop-blur-md bg-black/40 px-3 py-1 rounded-lg">
            Production Screenshot & Architecture Scope
          </span>
          <span className="font-mono text-slate-300">
            SLUG: /{project.slug}
          </span>
        </div>
      </section>

      {/* 2-Column Main Layout: Details & Side Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
        {/* Left 2 Columns: In-Depth Breakdown */}
        <div className="lg:col-span-2 space-y-10">
          {/* Detailed Full Description */}
          {project.fullDescription && (
            <section className="p-6 sm:p-8 rounded-3xl glass-card space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-indigo-500" /> Executive Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </section>
          )}

          {/* Problem Statement & Objective Cards */}
          {(project.problemStatement || project.objective) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.problemStatement && (
                <section className="p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-3">
                  <h3 className="text-base font-extrabold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <Target className="w-4 h-4" /> The Problem Statement
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </section>
              )}

              {project.objective && (
                <section className="p-6 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 space-y-3">
                  <h3 className="text-base font-extrabold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Solution Objective
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.objective}
                  </p>
                </section>
              )}
            </div>
          )}

          {/* Challenges & Technical Resolution */}
          {(project.challenges || project.solution) && (
            <section className="p-6 sm:p-8 rounded-3xl glass-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <Workflow className="w-6 h-6 text-indigo-500" /> Technical Engineering & Challenges
              </h2>

              {project.challenges && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Engineering Challenges Encountered
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="space-y-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    Architectural Solution Implemented
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Architecture & Workflow */}
          {project.architecture && (
            <section className="p-6 sm:p-8 rounded-3xl glass-card space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-indigo-500" /> System Architecture & Workflow
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.architecture}
              </p>
            </section>
          )}

          {/* Key Functional Features */}
          {featuresList.length > 0 && (
            <section className="p-6 sm:p-8 rounded-3xl glass-card space-y-5">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Core Features & Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {featuresList.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Amol's Engineering Contribution / Responsibilities */}
          {project.responsibilities && (
            <section className="p-6 sm:p-8 rounded-3xl glass-card space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-indigo-500" /> Amol's Role & Engineering Contributions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {project.responsibilities}
              </p>
            </section>
          )}
        </div>

        {/* Right Column: Tech Stack Breakdown Sidebar */}
        <aside className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-6 sticky top-24">
            <h3 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              Tech Stack Breakdown
            </h3>

            {/* Frontend Tech */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" /> Frontend Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {frontendTech.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Tech */}
            {backendTech.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-500" /> Backend Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {backendTech.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Database Tech */}
            {databaseTech.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-500" /> Database & ORM
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {databaseTech.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tools & DevOps */}
            {toolsTech.length > 0 && (
              <div className="space-y-2.5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-500" /> Tools & Engineering
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {toolsTech.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Summary Meta */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Category</span>
                <span className="font-bold text-slate-900 dark:text-white">{project.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-bold text-emerald-500">{project.status || 'Completed'}</span>
              </div>
              <div className="flex justify-between">
                <span>Engineer</span>
                <span className="font-bold text-slate-900 dark:text-white">Amol Ippar</span>
              </div>
            </div>

            {/* Bottom Inquiries CTA */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-600/20"
              >
                Inquire About This Project
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Navigation Pagination Bar */}
      <footer className="pt-10 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> View All 10 Projects
        </Link>

        <div className="flex items-center gap-3">
          {prevProject && (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition"
            >
              <ChevronLeft className="w-4 h-4" /> {prevProject.title.split('–')[0].trim()}
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition"
            >
              {nextProject.title.split('–')[0].trim()} <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </footer>

      {/* Live Demo Status & Launch Modal */}
      <LiveDemoStatusModal
        isOpen={isLiveDemoModalOpen}
        onClose={() => setIsLiveDemoModalOpen(false)}
        project={project}
        onOpenDeployGuide={() => setIsDeploymentModalOpen(true)}
      />

      {/* Deployment & Local Setup Modal */}
      <DeploymentInfoModal
        isOpen={isDeploymentModalOpen}
        onClose={() => setIsDeploymentModalOpen(false)}
        project={project}
      />
    </article>
  );
};

