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

// Standalone Interactive Application Demos
import { FleetPulseDemo } from './pages/demos/FleetPulseDemo';
import { AnnaRestroDemo } from './pages/demos/AnnaRestroDemo';
import { CineVaultDemo } from './pages/demos/CineVaultDemo';
import { StockTrailDemo } from './pages/demos/StockTrailDemo';
import { InstagramDemo } from './pages/demos/InstagramDemo';
import { ManufacturingDemo } from './pages/demos/ManufacturingDemo';
import { AttendanceDemo } from './pages/demos/AttendanceDemo';
import { PredictiveAnalyticsDemo } from './pages/demos/PredictiveAnalyticsDemo';
import { SalesforceSwitcherDemo } from './pages/demos/SalesforceSwitcherDemo';
import { PortfolioDemo } from './pages/demos/PortfolioDemo';

// Layout wrapper for pages that display Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');
  const isDemo = location.pathname.startsWith('/demo/');

  // For standalone live applications, render full-screen without portfolio chrome
  if (isDemo) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </div>
    );
  }

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
              {/* Public Portfolio Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/contact" element={<Contact />} />

              {/* Standalone Interactive Application Live Demos */}
              <Route path="/demo/fleetpulse" element={<FleetPulseDemo />} />
              <Route path="/demo/annarestro" element={<AnnaRestroDemo />} />
              <Route path="/demo/cinevault" element={<CineVaultDemo />} />
              <Route path="/demo/stocktrail" element={<StockTrailDemo />} />
              <Route path="/demo/instagram-clone" element={<InstagramDemo />} />
              <Route path="/demo/manufacturing-work-orders" element={<ManufacturingDemo />} />
              <Route path="/demo/student-attendance-system" element={<AttendanceDemo />} />
              <Route path="/demo/predictive-analytics" element={<PredictiveAnalyticsDemo />} />
              <Route path="/demo/salesforce-validation-switcher" element={<SalesforceSwitcherDemo />} />
              <Route path="/demo/developer-portfolio" element={<PortfolioDemo />} />

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

              {/* Catch-all redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
