import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Education } from './pages/Education';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { ResumePage } from './pages/ResumePage';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

// Layout wrapper for pages that display Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {!isAdminDashboard && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Pages */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect to projects or home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
