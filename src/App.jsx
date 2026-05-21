import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import LandingPage from './features/landing/LandingPage';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import DashboardLayout from './features/dashboard/components/DashboardLayout';
import Overview from './features/dashboard/views/Overview';

import AnalyticsWorkspace from './features/dashboard/views/AnalyticsWorkspace';
import DataIntegration from './features/dashboard/views/DataIntegration';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
        <BrowserRouter>
          <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="analytics" element={<AnalyticsWorkspace />} />
                <Route path="data" element={<DataIntegration />} />
              </Route>
            </Route>
          </Routes>
          </ErrorBoundary>
        </BrowserRouter>
    </div>
  );
}

export default App;