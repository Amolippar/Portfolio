import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  GraduationCap, 
  Cpu, 
  Mail, 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  User, 
  CheckCircle2, 
  X, 
  Save, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Search,
  Eye,
  Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getProfile, 
  updateProfile, 
  getEducation, 
  createEducation, 
  updateEducation, 
  deleteEducation,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getContactMessages,
  deleteContactMessage,
  markContactMessageRead,
  getDashboardStats
} from '../services/api';
import { Toast } from '../components/Toast';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'skills' | 'education' | 'profile' | 'messages'
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
    totalEducation: 0,
    totalMessages: 0,
    unreadMessages: 0
  });

  // State slices
  const [profile, setProfile] = useState({});
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);

  // Modals & form states
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    technologies: '',
    shortDescription: '',
    problemStatement: '',
    objective: '',
    challenges: '',
    solution: '',
    features: '',
    githubUrl: '',
    liveDemoUrl: '',
    imageUrl: '',
    isFeatured: false,
    displayOrder: 0
  });

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    level: 'Strong',
    iconName: 'Code',
    displayOrder: 0
  });

  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [eduForm, setEduForm] = useState({
    degree: '',
    institution: '',
    completionDate: '',
    description: '',
    iconName: 'GraduationCap',
    displayOrder: 0
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [loading, setLoading] = useState(true);

  // Load all data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [pStats, pProfile, pEdu, pSkills, pProjects, pMsgs] = await Promise.all([
        getDashboardStats().catch(() => null),
        getProfile().catch(() => ({})),
        getEducation().catch(() => []),
        getSkills().catch(() => []),
        getProjects().catch(() => []),
        getContactMessages().catch(() => [])
      ]);

      if (pStats) {
        setStats(pStats);
      } else {
        setStats({
          totalProjects: pProjects?.length || 0,
          totalSkills: pSkills?.length || 0,
          totalEducation: pEdu?.length || 0,
          totalMessages: pMsgs?.length || 0,
          unreadMessages: pMsgs?.filter(m => !m.isRead)?.length || 0
        });
      }

      setProfile(pProfile || {});
      setEducationList(pEdu || []);
      setSkillsList(pSkills || []);
      setProjectsList(pProjects || []);
      setMessagesList(pMsgs || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      showToast('Error loading some dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Profile Save
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      showToast('Profile updated successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    }
  };

  // Project Handlers
  const openNewProject = () => {
    setEditingProject(null);
    setProjectForm({
      slug: '',
      title: '',
      category: 'Full Stack',
      technologies: '',
      shortDescription: '',
      problemStatement: '',
      objective: '',
      challenges: '',
      solution: '',
      features: '',
      githubUrl: '',
      liveDemoUrl: '',
      imageUrl: '',
      isFeatured: false,
      displayOrder: projectsList.length + 1
    });
    setProjectModalOpen(true);
  };

  const openEditProject = (p) => {
    setEditingProject(p);
    setProjectForm({
      slug: p.slug || '',
      title: p.title || '',
      category: p.category || 'Full Stack',
      technologies: p.technologies || '',
      shortDescription: p.shortDescription || '',
      problemStatement: p.problemStatement || '',
      objective: p.objective || '',
      challenges: p.challenges || '',
      solution: p.solution || '',
      features: p.features || '',
      githubUrl: p.githubUrl || '',
      liveDemoUrl: p.liveDemoUrl || '',
      imageUrl: p.imageUrl || '',
      isFeatured: !!p.isFeatured,
      displayOrder: p.displayOrder || 0
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        slug: (projectForm.slug || projectForm.title || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      };

      if (editingProject) {
        const res = await updateProject(editingProject.id, payload);
        setProjectsList(prev => prev.map(p => p.id === editingProject.id ? res : p));
        showToast('Project updated successfully!');
      } else {
        const res = await createProject(payload);
        setProjectsList(prev => [...prev, res]);
        showToast('Project created successfully!');
      }
      setProjectModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save project', 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjectsList(prev => prev.filter(p => p.id !== id));
      showToast('Project deleted successfully!');
      loadAllData();
    } catch (err) {
      showToast('Failed to delete project', 'error');
    }
  };

  // Skill Handlers
  const openNewSkill = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      category: 'Frontend',
      level: 'Strong',
      iconName: 'Code',
      displayOrder: skillsList.length + 1
    });
    setSkillModalOpen(true);
  };

  const openEditSkill = (s) => {
    setEditingSkill(s);
    setSkillForm({
      name: s.name || '',
      category: s.category || 'Frontend',
      level: s.level || 'Strong',
      iconName: s.iconName || 'Code',
      displayOrder: s.displayOrder || 0
    });
    setSkillModalOpen(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        const res = await updateSkill(editingSkill.id, skillForm);
        setSkillsList(prev => prev.map(s => s.id === editingSkill.id ? res : s));
        showToast('Skill updated successfully!');
      } else {
        const res = await createSkill(skillForm);
        setSkillsList(prev => [...prev, res]);
        showToast('Skill created successfully!');
      }
      setSkillModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save skill', 'error');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await deleteSkill(id);
      setSkillsList(prev => prev.filter(s => s.id !== id));
      showToast('Skill deleted successfully!');
      loadAllData();
    } catch (err) {
      showToast('Failed to delete skill', 'error');
    }
  };

  // Education Handlers
  const openNewEdu = () => {
    setEditingEdu(null);
    setEduForm({
      degree: '',
      institution: '',
      completionDate: '',
      description: '',
      iconName: 'GraduationCap',
      displayOrder: educationList.length + 1
    });
    setEduModalOpen(true);
  };

  const openEditEdu = (ed) => {
    setEditingEdu(ed);
    setEduForm({
      degree: ed.degree || '',
      institution: ed.institution || '',
      completionDate: ed.completionDate || '',
      description: ed.description || '',
      iconName: ed.iconName || 'GraduationCap',
      displayOrder: ed.displayOrder || 0
    });
    setEduModalOpen(true);
  };

  const handleSaveEdu = async (e) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        const res = await updateEducation(editingEdu.id, eduForm);
        setEducationList(prev => prev.map(e => e.id === editingEdu.id ? res : e));
        showToast('Education record updated!');
      } else {
        const res = await createEducation(eduForm);
        setEducationList(prev => [...prev, res]);
        showToast('Education record added!');
      }
      setEduModalOpen(false);
      loadAllData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save education', 'error');
    }
  };

  const handleDeleteEdu = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await deleteEducation(id);
      setEducationList(prev => prev.filter(e => e.id !== id));
      showToast('Education entry deleted!');
      loadAllData();
    } catch (err) {
      showToast('Failed to delete education', 'error');
    }
  };

  // Messages Handlers
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await deleteContactMessage(id);
      setMessagesList(prev => prev.filter(m => m.id !== id));
      showToast('Message deleted successfully!');
      loadAllData();
    } catch (err) {
      showToast('Failed to delete message', 'error');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      const res = await markContactMessageRead(id);
      setMessagesList(prev => prev.map(m => m.id === id ? res : m));
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="p-6 rounded-3xl glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Admin Management Console
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Logged in as <span className="font-semibold text-indigo-500">{user?.username || 'admin'}</span> (ROLE_ADMIN)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={loadAllData}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Total Projects</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalProjects}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-500 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Total Skills</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalSkills}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Education Records</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalEducation}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Contact Messages</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalMessages}</h3>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { key: 'projects', label: 'Projects', count: projectsList.length, icon: FolderGit2 },
          { key: 'skills', label: 'Skills', count: skillsList.length, icon: Cpu },
          { key: 'education', label: 'Education', count: educationList.length, icon: GraduationCap },
          { key: 'profile', label: 'Profile Information', icon: User },
          { key: 'messages', label: 'Messages', count: messagesList.length, icon: Mail }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Portfolio Projects ({projectsList.length})
            </h2>
            <button
              onClick={openNewProject}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </button>
          </div>

          <div className="rounded-2xl glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Technologies</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {projectsList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
                          {p.category || 'General'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        {p.technologies}
                      </td>
                      <td className="py-3.5 px-4">
                        {p.isFeatured ? (
                          <span className="text-emerald-500 font-bold">Yes ★</span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <a
                          href={`/projects/${p.slug || p.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 inline-block"
                          title="View Public Project Page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditProject(p)}
                          className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. SKILLS TAB */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Technical Skills ({skillsList.length})
            </h2>
            <button
              onClick={openNewSkill}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>

          <div className="rounded-2xl glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Skill Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Proficiency Level</th>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {skillsList.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {s.name}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                          {s.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                          {s.level || 'Intermediate'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {s.displayOrder}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          onClick={() => openEditSkill(s)}
                          className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(s.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. EDUCATION TAB */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Education Milestones ({educationList.length})
            </h2>
            <button
              onClick={openNewEdu}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>

          <div className="space-y-3">
            {educationList.map((ed) => (
              <div
                key={ed.id}
                className="p-5 rounded-2xl glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{ed.degree}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {ed.completionDate}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-indigo-500">{ed.institution}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{ed.description}</p>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => openEditEdu(ed)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEdu(ed.id)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PROFILE TAB */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="p-8 rounded-3xl glass-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile & Bio Settings</h2>
              <p className="text-xs text-slate-500">Update personal info and hero statistics shown on the public site</p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                value={profile.fullName || ''}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Professional Title</label>
              <input
                type="text"
                value={profile.title || ''}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone</label>
              <input
                type="text"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Location</label>
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Avatar Image URL</label>
              <input
                type="text"
                value={profile.avatarUrl || ''}
                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GitHub URL</label>
              <input
                type="text"
                value={profile.githubUrl || ''}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">LinkedIn URL</label>
              <input
                type="text"
                value={profile.linkedinUrl || ''}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Short Bio / Hero Introduction</label>
            <textarea
              rows={3}
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          {/* Stat Cards fields */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Experience Stat</label>
              <input
                type="text"
                value={profile.experienceStat || ''}
                onChange={(e) => setProfile({ ...profile, experienceStat: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Projects Stat</label>
              <input
                type="text"
                value={profile.projectsStat || ''}
                onChange={(e) => setProfile({ ...profile, projectsStat: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Technologies Stat</label>
              <input
                type="text"
                value={profile.technologiesStat || ''}
                onChange={(e) => setProfile({ ...profile, technologiesStat: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Education Stat</label>
              <input
                type="text"
                value={profile.educationStat || ''}
                onChange={(e) => setProfile({ ...profile, educationStat: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </form>
      )}

      {/* 5. MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Contact Messages Inbox ({messagesList.length})
            </h2>
          </div>

          {messagesList.length === 0 ? (
            <div className="p-12 rounded-3xl glass-card text-center text-slate-400">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-bold text-sm">No messages received yet</p>
              <p className="text-xs mt-1">Submitted messages through the Contact page will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messagesList.map((m) => (
                <div
                  key={m.id}
                  className={`p-6 rounded-2xl glass-card space-y-3 transition border ${
                    m.isRead
                      ? 'border-slate-200 dark:border-slate-800'
                      : 'border-indigo-500/40 bg-indigo-500/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{m.name}</h3>
                      <span className="text-xs text-slate-400">&lt;{m.email}&gt;</span>
                      {!m.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                          New
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {m.createdAt ? new Date(m.createdAt).toLocaleString() : 'Recent'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      Subject: {m.subject}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-line leading-relaxed">
                      {m.message}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                        className="text-xs font-semibold text-indigo-500 hover:underline inline-flex items-center gap-1"
                      >
                        Reply via Email <ExternalLink className="w-3 h-3" />
                      </a>
                      {!m.isRead && (
                        <button
                          onClick={() => handleMarkRead(m.id)}
                          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-3"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(m.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROJECT MODAL (ADD / EDIT) */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white">
                {editingProject ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button onClick={() => setProjectModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <option value="React">React</option>
                    <option value="Spring Boot">Spring Boot</option>
                    <option value="Node.js">Node.js</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Full Stack">Full Stack</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold">Technologies (comma separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="React.js, Spring Boot, MySQL, JWT..."
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Problem Statement</label>
                <textarea
                  rows={2}
                  value={projectForm.problemStatement}
                  onChange={(e) => setProjectForm({ ...projectForm, problemStatement: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Project Objective</label>
                <textarea
                  rows={2}
                  value={projectForm.objective}
                  onChange={(e) => setProjectForm({ ...projectForm, objective: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold">Technical Challenges</label>
                  <textarea
                    rows={2}
                    value={projectForm.challenges}
                    onChange={(e) => setProjectForm({ ...projectForm, challenges: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold">Solution</label>
                  <textarea
                    rows={2}
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold">Key Features (comma separated)</label>
                <input
                  type="text"
                  placeholder="User authentication, Food menu, Cart, Razorpay payment..."
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold">Live Demo URL</label>
                  <input
                    type="text"
                    value={projectForm.liveDemoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveDemoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold">Image URL</label>
                  <input
                    type="text"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.isFeatured}
                    onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                    className="rounded text-indigo-600"
                  />
                  Feature on Home Page
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SKILL MODAL (ADD / EDIT) */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {editingSkill ? 'Edit Skill' : 'Add Technical Skill'}
              </h3>
              <button onClick={() => setSkillModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React.js, Spring Boot"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Category *</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Testing">Testing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold">Proficiency Level *</label>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Good">Good</option>
                  <option value="Strong">Strong</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDUCATION MODAL (ADD / EDIT) */}
      {eduModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {editingEdu ? 'Edit Education' : 'Add Education Record'}
              </h3>
              <button onClick={() => setEduModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold">Degree / Certification *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bachelor of Engineering — Information Technology"
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Institution / University *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Savitribai Phule Pune University"
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Completion Period / Year *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Completed: December 2024"
                  value={eduForm.completionDate}
                  onChange={(e) => setEduForm({ ...eduForm, completionDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Description</label>
                <textarea
                  rows={3}
                  placeholder="Coursework details, academic focus..."
                  value={eduForm.description}
                  onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEduModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
};
