import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  Code2, 
  Layers, 
  Database, 
  Terminal, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  FolderGit2, 
  Cpu, 
  Compass, 
  Zap,
  Briefcase
} from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { getProfile, getProjects } from '../services/api';
import { ProjectModal } from '../components/ProjectModal';
import { ResumeModal } from '../components/ResumeModal';
import { DeploymentInfoModal } from '../components/showcases/DeploymentInfoModal';

export const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDeploymentProject, setSelectedDeploymentProject] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, projectsData] = await Promise.all([
          getProfile(),
          getProjects()
        ]);
        setProfile(profileData);
        // Take top 3 projects as featured
        const featured = (projectsData || []).filter(p => p.isFeatured).slice(0, 3);
        setFeaturedProjects(featured.length > 0 ? featured : (projectsData || []).slice(0, 3));
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Experience', value: profile?.experienceStat || 'Fresher', icon: Briefcase, color: 'text-indigo-500' },
    { label: 'Completed Projects', value: profile?.projectsStat || '10+', icon: FolderGit2, color: 'text-emerald-500' },
    { label: 'Technologies', value: profile?.technologiesStat || '15+', icon: Cpu, color: 'text-cyan-500' },
    { label: 'Education', value: profile?.educationStat || 'BE - IT', icon: GraduationCap, color: 'text-amber-500' },
  ];

  const coreTech = [
    'React.js', 'Java', 'Spring Boot', 'MySQL', 'Tailwind CSS', 'REST APIs', 
    'Spring Security', 'JWT', 'JavaScript', 'Node.js', 'Express.js', 'Git'
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Full-time Roles & Projects
              </div>

              {/* Title & Headline */}
              <div className="space-y-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Hello, I'm
                </h2>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {profile?.fullName || 'Amol Ippar'}
                </h1>
                <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent pt-1">
                  {profile?.title || 'Full Stack Developer | React.js | Java | Spring Boot'}
                </p>
              </div>

              {/* Introduction */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {profile?.bio ||
                  'Passionate software developer and problem solver with a strong foundation in frontend and backend development. I enjoy building responsive, scalable and user-friendly web applications using modern technologies.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
                >
                  View My Projects <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/70 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition transform hover:-translate-y-0.5"
                >
                  Contact Me
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition transform hover:-translate-y-0.5"
                >
                  <FileText className="w-4 h-4" /> Career Resumes (5 Roles)
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">
                  Follow:
                </span>
                <a
                  href={profile?.githubUrl || 'https://github.com/amolippar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-slate-700 hover:border-transparent transition shadow-sm"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile?.linkedinUrl || 'https://linkedin.com/in/amol-ippar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-indigo-600 hover:border-transparent transition shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile?.email || 'ipparamol99@gmail.com'}`}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-rose-600 hover:border-transparent transition shadow-sm"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Profile Image with Modern Glow & Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center relative"
            >
              <div className="relative w-72 h-72 sm:w-88 sm:h-88">
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 blur-2xl opacity-40 animate-pulse-slow" />
                
                {/* Border Container */}
                <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-white dark:border-slate-900">
                    <img
                      src="/images/amol-profile.jpg"
                      alt="Amol Ippar - Software Developer"
                      className="profile-image" 
                    />
                  </div>
                </div>

                {/* Floating Tech Pill 1 */}
                <div className="absolute -bottom-2 -left-4 px-3.5 py-2 rounded-2xl glass-card flex items-center gap-2 shadow-xl animate-float">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Frontend</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">React.js</p>
                  </div>
                </div>

                {/* Floating Tech Pill 2 */}
                <div className="absolute -top-3 -right-3 px-3.5 py-2 rounded-2xl glass-card flex items-center gap-2 shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Backend</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">Spring Boot</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CORE TECH BADGES TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
            Core Technologies & Stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {coreTech.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-3xl glass-card flex flex-col items-center text-center group hover:border-indigo-500/50"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center ${item.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {item.value}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. ABOUT ME SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 glass-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500">
                <Sparkles className="w-4 h-4" /> About Me
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Software Developer with Strong Foundation in Web Technologies & Engineering
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a passionate software developer with a Bachelor of Engineering in Information Technology from Savitribai Phule Pune University (graduated December 2024). I enjoy creating modern web applications and solving real-world problems through technology. My primary interests include frontend development, backend development, REST APIs and database-driven applications.
                </p>
                <p>
                  I focus on writing clean, readable code and architecting scalable solutions. Whether developing responsive UI interfaces using React and Tailwind CSS or building secure RESTful backends with Spring Boot and MySQL, I strive for high performance, maintainability, and great user experiences.
                </p>
              </div>

              {/* Core Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Problem-solving mindset & analytical logic</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Continuous learning & agile adaptation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full stack layered REST architecture</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Clean database schema design & validation</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/education"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Education Timeline <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <Link
                  to="/skills"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Explore Technical Skills <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm p-6 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700/60 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Quick Overview
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Degree</span>
                    <span className="font-semibold text-slate-900 dark:text-white">BE — Information Technology (2024)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Location</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Pune, Maharashtra, India</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Focus Areas</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Full Stack, Spring Boot, React, MySQL</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Availability</span>
                    <span className="font-semibold text-emerald-500">Immediate Joiner / Open to relocation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
              <FolderGit2 className="w-4 h-4" /> Selected Portfolio Work
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition"
          >
            View All 10 Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => navigate(`/projects/${project.slug || project.id}`)}
              className="rounded-3xl glass-card overflow-hidden flex flex-col group hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                  {project.category || 'Featured'}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug || project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemoUrl ? (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-500"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDeploymentProject(project);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        title="Deployment & Architecture Guide"
                      >
                        <Terminal className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Cpu className="w-96 h-96" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Let's Build Something Great Together
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Looking for a dedicated Full Stack Developer?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              I am open for full-time opportunities, software development roles, and impactful engineering projects. Feel free to reach out directly through the contact form or email.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-white text-indigo-900 hover:bg-slate-100 transition shadow-lg shadow-black/20"
              >
                Get In Touch Today
              </Link>
              <button
                onClick={() => setResumeModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm border border-white/20 bg-white/10 hover:bg-white/20 text-white transition"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        profile={profile}
      />

      <DeploymentInfoModal
        isOpen={!!selectedDeploymentProject}
        onClose={() => setSelectedDeploymentProject(null)}
        project={selectedDeploymentProject}
      />
    </div>
  );
};
