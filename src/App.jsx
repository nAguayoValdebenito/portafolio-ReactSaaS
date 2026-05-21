import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './features/landing/LandingPage';
const ProtectedRoute = React.lazy(() => import('./features/auth/components/ProtectedRoute'));
const Login = React.lazy(() => import('./features/auth/components/Login'));
const Register = React.lazy(() => import('./features/auth/components/Register'));
const ForgotPassword = React.lazy(() => import('./features/auth/components/ForgotPassword'));
const AuthProvider = React.lazy(() => import('./context/AuthContext'));

const DashboardLayout = React.lazy(() => import('./features/dashboard/components/DashboardLayout'));
const Overview = React.lazy(() => import('./features/dashboard/views/Overview'));
const AnalyticsWorkspace = React.lazy(() => import('./features/dashboard/views/AnalyticsWorkspace'));
const DataIntegration = React.lazy(() => import('./features/dashboard/views/DataIntegration'));

const DashboardSkeleton = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const RouteTitleTracker = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'PredictiveSaaS | Industrial Intelligence';
        break;
      case '/dashboard':
        document.title = 'PredictiveSaaS | Operational Overview';
        break;
      case '/dashboard/analytics':
        document.title = 'PredictiveSaaS | Predictive Analytics';
        break;
      case '/dashboard/data':
        document.title = 'PredictiveSaaS | Data Ingestion Hub';
        break;
      default:
        document.title = 'PredictiveSaaS';
    }
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
        <BrowserRouter>
          <RouteTitleTracker />
          <ErrorBoundary>
            <Suspense fallback={<DashboardSkeleton />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/dashboard" element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                      <Route index element={<Overview />} />
                      <Route path="analytics" element={<AnalyticsWorkspace />} />
                      <Route path="data" element={<DataIntegration />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
    </div>
  );
}

export default App;