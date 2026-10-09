import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Heart, Sparkles, MapPin, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
                AI
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Amol Ippar</h3>
                <p className="text-xs font-semibold text-indigo-500">Full Stack Developer | Java & React.js</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Passionate software engineer building resilient, scalable, and responsive web applications with clean architecture and modern user experience. Open to software engineering roles.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>Pune, Maharashtra, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Education Timeline
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Career Resumes (5 Roles)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Connect With Me
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://github.com/Amolippar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-slate-700 transition"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/amol-ippar-87a35a24a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-indigo-600 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:amolippar2003@gmail.com"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-rose-600 transition"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <Link
              to="/admin/login"
              className="text-xs text-slate-400 hover:text-indigo-500 transition inline-block"
            >
              Admin Portal
            </Link>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Amol Ippar. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" /> React.js & Spring Boot
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-indigo-500 transition"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
