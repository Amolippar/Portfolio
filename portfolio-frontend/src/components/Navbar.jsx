import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sun, Moon, FileText, Send, ShieldCheck, LogOut, Sparkles } from 'lucide-react';
import { ResumeModal } from './ResumeModal';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Education', path: '/education' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-[#0B0F19]/85 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                AI
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Amol Ippar
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500">
                  Full Stack Dev
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* View Resumes Button */}
              <Link
                to="/resume"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                Resumes
              </Link>


              {/* Hire Me CTA Button */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/25 transition transform hover:-translate-y-0.5"
              >
                <Send className="w-3.5 h-3.5" />
                Hire Me
              </Link>

              {/* Admin Access Indicator */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-800">
                  <Link
                    to="/admin/dashboard"
                    className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-xs font-semibold flex items-center gap-1"
                    title="Admin Dashboard"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 transition"
                    title="Logout Admin"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  className="p-2 rounded-xl text-slate-400 hover:text-indigo-500 transition ml-1"
                  title="Admin Portal"
                >
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* Mobile Hamburger & Theme toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              <Link
                to="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <FileText className="w-4 h-4 text-indigo-500" /> Career Resumes
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
              >
                <Send className="w-4 h-4" /> Hire Me
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center justify-between pt-2">
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-semibold text-emerald-500 flex items-center gap-1"
                  >
                    <ShieldCheck className="w-4 h-4" /> Go to Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-rose-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-500 text-center pt-2 flex items-center justify-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Login Portal
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};
