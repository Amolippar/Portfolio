import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Server, 
  Database, 
  Wrench, 
  CheckCircle, 
  Shield, 
  Search, 
  Sparkles, 
  Layers,
  Cpu,
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import { getSkills } from '../services/api';

export const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Testing', 'Other'];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend': return Code;
      case 'Backend': return Server;
      case 'Database': return Database;
      case 'Tools': return Wrench;
      case 'Testing': return Activity;
      default: return Shield;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Strong':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Good':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'Intermediate':
        return 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Cpu className="w-4 h-4" /> Technical Proficiency
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Skills & Technologies
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Structured view of technical competencies across frontend interfaces, backend services, databases, development tools, and quality assurance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-card">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Java)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400 glass-card rounded-3xl p-8">
          <p className="font-semibold text-base">No matching skills found.</p>
          <p className="text-xs mt-1">Try clearing your search query or selecting "All".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill, idx) => {
            const Icon = getCategoryIcon(skill.category);
            return (
              <motion.div
                key={skill.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="p-5 rounded-2xl glass-card flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getLevelColor(
                      skill.level
                    )}`}
                  >
                    {skill.level || 'Intermediate'}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Recruiter friendly note */}
      <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-200/50 dark:border-slate-800 text-center max-w-2xl mx-auto">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          💡 Skill proficiencies reflect practical project implementations, coursework rigor, and hands-on coding proficiency without arbitrary inflated percentage metrics.
        </p>
      </div>
    </div>
  );
};
