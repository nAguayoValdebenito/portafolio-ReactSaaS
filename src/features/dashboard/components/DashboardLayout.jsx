import { useCallback, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { auth } from '../../../services/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, LayoutDashboard, TrendingUp, Brain, Menu, X } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export default function DashboardLayout() {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      showToast('Sesión cerrada correctamente', 'info');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      showToast('Error al cerrar sesión', 'error');
    }
  }, [showToast]);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const navItems = [
    { to: '/dashboard', label: 'Resumen / KPIs', icon: LayoutDashboard, end: true },
    { to: '/dashboard/analytics', label: 'Predicciones / Analítica', icon: TrendingUp },
    { to: '/dashboard/data', label: 'Ingestión / Seguridad', icon: Brain },
  ];

  const renderNavLinks = (onClick) => (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.end}
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile header */}
      <header className="flex md:hidden items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-40">
        <h1 className="text-xl font-semibold text-slate-800">PredictiveSaaS</h1>
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-800">PredictiveSaaS</h1>
          <button
            onClick={closeMenu}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4" onClick={closeMenu}>
          {renderNavLinks(closeMenu)}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={() => { handleLogout(); closeMenu(); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-800">PredictiveSaaS</h1>
          <p className="text-xs text-slate-500 mt-1">Panel de Control</p>
        </div>

        <nav className="flex-1 p-4">
          {renderNavLinks()}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="hidden md:flex bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="flex items-center justify-end w-full px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">
                  {currentUser?.usuario_nombre || 'Usuario'}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {currentUser?.usuario_rol || 'Usuario'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                {currentUser?.usuario_nombre?.charAt(0) || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}