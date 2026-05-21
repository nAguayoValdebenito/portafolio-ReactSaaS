import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const SkeletonSidebar = () => (
  <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full animate-pulse">
    <div className="p-6 border-b border-slate-200">
      <div className="h-6 w-40 bg-slate-200 rounded" />
      <div className="h-3 w-24 bg-slate-100 rounded mt-2" />
    </div>
    <nav className="flex-1 p-4 space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-11 bg-slate-100 rounded-lg" />
      ))}
    </nav>
    <div className="p-4 border-t border-slate-200">
      <div className="h-11 bg-slate-100 rounded-lg" />
    </div>
  </aside>
);

const SkeletonHeader = () => (
  <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
    <div className="flex items-center justify-end px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="text-right space-y-1">
          <div className="h-4 w-24 bg-slate-200 rounded ml-auto" />
          <div className="h-3 w-16 bg-slate-100 rounded ml-auto" />
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200" />
      </div>
    </div>
  </header>
);

const DashboardSkeleton = () => (
  <div className="flex min-h-screen bg-slate-50">
    <SkeletonSidebar />
    <div className="flex-1 md:ml-64">
      <SkeletonHeader />
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 animate-pulse">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="w-8 h-8 rounded-full bg-slate-100" />
              </div>
              <div className="h-8 w-28 bg-slate-200 rounded" />
              <div className="h-5 w-16 bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
            <div className="flex justify-between mb-6">
              <div className="h-5 w-72 bg-slate-200 rounded" />
              <div className="flex gap-2">
                <div className="h-7 w-16 bg-slate-100 rounded-full" />
                <div className="h-7 w-16 bg-slate-100 rounded-full" />
              </div>
            </div>
            <div className="h-72 bg-slate-100 rounded-lg" />
          </div>
          <div className="bg-white border border-slate-200 rounded-xl animate-pulse">
            <div className="p-5 border-b border-slate-200">
              <div className="h-5 w-36 bg-slate-200 rounded" />
            </div>
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 mt-1" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

const ProtectedRoute = () => {
  const { currentUser, loading, authError } = useAuth();

  if (loading) return <DashboardSkeleton />;

  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md bg-white rounded-xl shadow p-8 text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Error de Autenticación</h2>
          <p className="text-slate-600 mb-6">{authError}</p>
          <a href="/login" className="inline-block bg-[#1A5FFF] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Volver a Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  if (currentUser.emailVerified === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md bg-white rounded-xl shadow p-8 text-center border border-yellow-100">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Verifica tu correo electrónico</h2>
          <p className="text-slate-600 mb-6">
            Por favor, verifica tu correo electrónico antes de ingresar al panel industrial. Revisa tu bandeja de entrada o spam.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-block bg-[#1A5FFF] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors mr-2"
          >
            Ya lo verifiqué
          </button>
          <a href="/login" className="inline-block bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors">
            Volver a Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
