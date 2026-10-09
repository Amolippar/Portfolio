import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar, MapPin, CheckCircle2, Sparkles, School } from 'lucide-react';
import { getEducation } from '../services/api';

export const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const data = await getEducation();
        setEducationList(data || []);
      } catch (err) {
        console.error('Error fetching education:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEdu();
  }, []);

  const getIcon = (name) => {
    switch (name) {
      case 'GraduationCap':
        return GraduationCap;
      case 'BookOpen':
        return BookOpen;
      case 'Award':
        return Award;
      default:
        return School;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <GraduationCap className="w-4 h-4" /> Academic Journey
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Education & Qualifications
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          My academic roadmap in Information Technology, computer science fundamentals, and strong analytical problem-solving foundations.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative">
        {/* Vertical Center Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-400 to-indigo-200 dark:to-slate-800 -translate-x-1/2" />

        <div className="space-y-12 sm:space-y-16">
          {educationList.map((item, idx) => {
            const Icon = getIcon(item.iconName);
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node Badge */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 z-10">
                  <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Content Card (Left or Right on desktop) */}
                <div
                  className={`pl-12 sm:pl-0 w-full sm:w-[calc(50%-2.5rem)] ${
                    isEven ? 'sm:text-left sm:pr-0' : 'sm:text-left sm:pl-0'
                  }`}
                >
                  <div className="p-6 sm:p-8 rounded-3xl glass-card hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 space-y-3">
                    {/* Period badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.completionDate}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        Milestone {idx + 1}
                      </span>
                    </div>

                    {/* Degree & Institution */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                        {item.degree}
                      </h3>
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {item.institution}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                      {item.description}
                    </p>

                    {/* Highlights tags */}
                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap gap-2">
                      {idx === 0 && (
                        <>
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Information Technology
                          </span>
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Full Stack Engineering
                          </span>
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Algorithms & Systems
                          </span>
                        </>
                      )}
                      {idx === 1 && (
                        <>
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Mathematics & Physics
                          </span>
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Computer Science
                          </span>
                        </>
                      )}
                      {idx === 2 && (
                        <>
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Science & Mathematics
                          </span>
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            High Distinction
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
