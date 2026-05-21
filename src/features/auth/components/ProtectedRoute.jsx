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
  const { currentUser, loading } = useAuth();

  if (loading) return <DashboardSkeleton />;

  if (!currentUser) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
