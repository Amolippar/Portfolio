import axios from 'axios';
import { INITIAL_PROFILE, INITIAL_EDUCATION, INITIAL_SKILLS, INITIAL_PROJECTS } from '../utils/initialData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to inject JWT bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch unauthorized states
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on protected route, clean token
      if (window.location.pathname.startsWith('/admin/dashboard')) {
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Profile APIs
export const getProfile = async () => {
  try {
    const res = await api.get('/profile');
    return res.data.data;
  } catch (err) {
    console.warn('API getProfile failed, using fallback profile data:', err.message);
    return INITIAL_PROFILE;
  }
};

export const updateProfile = async (profileData) => {
  const res = await api.put('/profile', profileData);
  return res.data.data;
};

// Education APIs
export const getEducation = async () => {
  try {
    const res = await api.get('/education');
    return res.data.data && res.data.data.length > 0 ? res.data.data : INITIAL_EDUCATION;
  } catch (err) {
    console.warn('API getEducation failed, using fallback education data:', err.message);
    return INITIAL_EDUCATION;
  }
};

export const createEducation = async (data) => {
  const res = await api.post('/education', data);
  return res.data.data;
};

export const updateEducation = async (id, data) => {
  const res = await api.put(`/education/${id}`, data);
  return res.data.data;
};

export const deleteEducation = async (id) => {
  const res = await api.delete(`/education/${id}`);
  return res.data;
};

// Skill APIs
export const getSkills = async () => {
  try {
    const res = await api.get('/skills');
    return res.data.data && res.data.data.length > 0 ? res.data.data : INITIAL_SKILLS;
  } catch (err) {
    console.warn('API getSkills failed, using fallback skills data:', err.message);
    return INITIAL_SKILLS;
  }
};

export const createSkill = async (data) => {
  const res = await api.post('/skills', data);
  return res.data.data;
};

export const updateSkill = async (id, data) => {
  const res = await api.put(`/skills/${id}`, data);
  return res.data.data;
};

export const deleteSkill = async (id) => {
  const res = await api.delete(`/skills/${id}`);
  return res.data;
};

// Project APIs
export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    return res.data.data && res.data.data.length > 0 ? res.data.data : INITIAL_PROJECTS;
  } catch (err) {
    console.warn('API getProjects failed, using fallback projects data:', err.message);
    return INITIAL_PROJECTS;
  }
};

export const getProjectById = async (id) => {
  try {
    const res = await api.get(`/projects/${id}`);
    return res.data.data;
  } catch (err) {
    const match = INITIAL_PROJECTS.find(p => String(p.id) === String(id) || p.slug === String(id));
    if (match) return match;
    throw err;
  }
};

export const getProjectBySlug = async (slug) => {
  try {
    const res = await api.get(`/projects/${slug}`);
    return res.data.data;
  } catch (err) {
    console.warn(`API getProjectBySlug (${slug}) fallback:`, err.message);
    const match = INITIAL_PROJECTS.find(p => p.slug === slug || String(p.id) === String(slug));
    if (match) return match;
    throw err;
  }
};

export const createProject = async (data) => {
  const res = await api.post('/projects', data);
  return res.data.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

// Contact APIs
export const submitContactMessage = async (data) => {
  const res = await api.post('/contact', data);
  return res.data;
};

export const getContactMessages = async () => {
  const res = await api.get('/contact');
  return res.data.data;
};

export const deleteContactMessage = async (id) => {
  const res = await api.delete(`/contact/${id}`);
  return res.data;
};

export const markContactMessageRead = async (id) => {
  const res = await api.patch(`/contact/${id}/read`);
  return res.data.data;
};

export const getDashboardStats = async () => {
  const res = await api.get('/contact/stats');
  return res.data.data;
};

// Auth APIs
export const loginAdmin = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export default api;
