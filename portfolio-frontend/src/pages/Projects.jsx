import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Filter, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Code2,
  Sparkles,
  Database,
  Terminal
} from 'lucide-react';
import { Github } from '../components/Icons';
import { getProjects } from '../services/api';
import { INITIAL_PROJECTS } from '../utils/initialData';
import { DeploymentInfoModal } from '../components/showcases/DeploymentInfoModal';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const navigate = useNavigate();

  // Primary categories tailored to the verified projects
  const filters = [
    'All',
    'Full Stack',
    'Spring Boot',
    'React',
    'Machine Learning',
    'Salesforce'
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (isMounted) {
          setProjects(data && data.length > 0 ? data : INITIAL_PROJECTS);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        if (isMounted) setProjects(INITIAL_PROJECTS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = projects.filter((project) => {
    let matchesFilter = true;
    if (selectedFilter !== 'All') {
      const filterLower = selectedFilter.toLowerCase();
      const techLower = (project.technologies || '').toLowerCase();
      const catLower = (project.category || '').toLowerCase();

      if (selectedFilter === 'Full Stack') {
        matchesFilter = catLower.includes('full stack') || techLower.includes('full stack') || techLower.includes('mern');
      } else if (selectedFilter === 'Spring Boot') {
        matchesFilter = catLower.includes('spring') || techLower.includes('spring') || techLower.includes('java');
      } else if (selectedFilter === 'React') {
        matchesFilter = catLower.includes('react') || techLower.includes('react');
      } else if (selectedFilter === 'Machine Learning') {
        matchesFilter = catLower.includes('machine learning') || catLower.includes('ml') || techLower.includes('python') || techLower.includes('scikit');
      } else if (selectedFilter === 'Salesforce') {
        matchesFilter = catLower.includes('salesforce') || techLower.includes('apex') || techLower.includes('salesforce');
      } else {
        matchesFilter = catLower.includes(filterLower) || techLower.includes(filterLower);
      }
    }

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      (project.shortDescription || '').toLowerCase().includes(q) ||
      (project.technologies || '').toLowerCase().includes(q) ||
      (project.slug || '').toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <FolderGit2 className="w-4 h-4" /> Full-Stack Engineering Portfolio
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Featured Projects & Architectures
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Explore 10 verified, production-grade applications engineered by Amol Ippar. Spanning enterprise Java Spring Boot backends, responsive React.js frontends, relational MySQL designs, machine learning dashboards, and Salesforce enterprise tools.
        </p>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-card">
          {/* Technology Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === filter
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, slug, or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Project count summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredProjects.length}</strong> of{' '}
            {projects.length} verified projects
          </span>
          {selectedFilter !== 'All' && (
            <button
              onClick={() => setSelectedFilter('All')}
              className="text-indigo-500 hover:underline font-semibold"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-card p-8">
          <p className="font-bold text-lg text-slate-800 dark:text-slate-200">No projects match your filter</p>
          <p className="text-xs text-slate-500 mt-1">Try another search keyword or switch back to "All".</p>
          <button
            onClick={() => { setSelectedFilter('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            const techBadges = (project.technologies || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);

            const featureBadges = (project.features || '')
              .split(',')
              .map((f) => f.trim())
              .filter(Boolean)
              .slice(0, 3);

            const projectUrl = `/projects/${project.slug || project.id}`;

            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => navigate(projectUrl)}
                className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group cursor-pointer border border-slate-200/80 dark:border-slate-800/80"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(projectUrl);
                  }
                }}
              >
                {/* Top Banner Image with Badges */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={
                      project.imageUrl ||
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/10">
                    {project.category || 'Full Stack'}
                  </div>

                  {project.isFeatured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white backdrop-blur-md shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-md text-[10px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
                    /{project.slug}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Features checklist snippet */}
                    {featureBadges.length > 0 && (
                      <div className="mt-3 space-y-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                        {featureBadges.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech stack badges & Navigation Actions */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {techBadges.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {techBadges.length > 4 && (
                        <span className="text-[10px] text-slate-400 font-semibold self-center">
                          +{techBadges.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2">
                      <Link
                        to={projectUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition inline-flex items-center gap-1.5 group-hover:scale-102"
                      >
                        View Project <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-white hover:bg-slate-800 transition"
                            title="GitHub Code Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveDemoUrl ? (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-white hover:bg-indigo-600 transition"
                            title="Open Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <button
                            onClick={() => setSelectedModalProject(project)}
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition"
                            title="Deployment & Local Setup Guide"
                          >
                            <Terminal className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Deployment & Local Setup Modal */}
      <DeploymentInfoModal
        isOpen={!!selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
        project={selectedModalProject}
      />
    </div>
  );
};
