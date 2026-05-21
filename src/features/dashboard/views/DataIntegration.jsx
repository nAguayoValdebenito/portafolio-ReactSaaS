import { useEffect, useState } from 'react';
import { Server, Settings, FileText, Globe, Cloud, PlusCircle, Shield, LogIn, RefreshCw, Download, Database, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { getEnterpriseAuditLogs } from '../services/dashboardService';

const actionConfig = {
  login: { icon: LogIn, label: 'Inicio de Sesión', style: 'bg-surface-container-low text-on-surface border-outline-variant/30' },
  sync: { icon: RefreshCw, label: 'Sincronización ERP', style: 'bg-surface-container-low text-on-surface border-outline-variant/30' },
  export: { icon: Download, label: 'Exportación Masiva', style: 'bg-error-container text-on-error-container border-error/30' },
  schema_update: { icon: Database, label: 'Actualización de Esquema', style: 'bg-surface-container-low text-on-surface border-outline-variant/30' },
};

function formatTimestamp(ts) {
  if (!ts) return '—';
  const date = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('es-CL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function DataIntegration() {
  const { currentUser } = useAuth();
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);

  useEffect(() => {
    if (!currentUser?.eid) return;

    let cancelled = false;
    setIsLoadingLogs(true);

    getEnterpriseAuditLogs(currentUser.eid)
      .then((logs) => {
        if (!cancelled) {
          setAuditLogs(logs);
          setIsLoadingLogs(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoadingLogs(false);
      });

    return () => { cancelled = true; };
  }, [currentUser?.eid]);
  return (
    <>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-gutter">
        {/* Card 1 – Local Database */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-200">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <Server size={28} />
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <Settings size={20} />
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">Local Database</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">PostgreSQL Core DB</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: 10m ago</span>
          </div>
        </div>

        {/* Card 2 – CSV Mass Upload */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-300">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <FileText size={28} />
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <Settings size={20} />
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">CSV Mass Upload</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">Automated batch processing</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: 2h ago</span>
          </div>
        </div>

        {/* Card 3 – ERP API Integration */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-400">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <Globe size={28} />
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <Settings size={20} />
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">ERP API Integration</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">Real-time SAP sync</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: Just now</span>
          </div>
        </div>

        {/* Card 4 – Cloud Storage */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-500">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <Cloud size={28} />
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <Settings size={20} />
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">Cloud Storage</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">AWS S3 Data Lake</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: 1h ago</span>
          </div>
        </div>

        {/* Add New Card */}
        <button className="bg-transparent border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all cursor-pointer min-h-[220px] animate-fade-in-up delay-500">
          <PlusCircle size={36} className="mb-3" />
          <span className="font-label-md text-label-md">Añadir nueva fuente de datos</span>
        </button>
      </div>

      {/* Security & Audit Section */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden animate-fade-in-up delay-600">
        {/* Security Banner */}
        <div className="bg-secondary-fixed border-b border-outline-variant/30 p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-secondary-fixed-variant font-bold">Encriptación de Nivel Bancario Activa</h4>
            <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant opacity-80">All data in transit and at rest is secured via AES-256 protocols.</p>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-6 text-sm text-slate-900 font-semibold">User</th>
                <th className="py-3 px-6 text-sm text-slate-900 font-semibold">Action</th>
                <th className="py-3 px-6 text-sm text-slate-900 font-semibold">Timestamp</th>
                <th className="py-3 px-6 text-sm text-slate-900 font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600">
              {isLoadingLogs ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200" />
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                    </td>
                    <td className="py-4 px-6"><div className="h-6 w-28 bg-slate-200 rounded-md" /></td>
                    <td className="py-4 px-6"><div className="h-4 w-36 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="h-4 w-24 bg-slate-200 rounded" /></td>
                  </tr>
                ))
              ) : auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-on-surface-variant">
                    <AlertTriangle size={20} className="mx-auto mb-2" />
                    <p className="font-body-sm text-body-sm">No hay registros de auditoría disponibles.</p>
                  </td>
                </tr>
              ) : (
                auditLogs.map((log, index) => {
                  const initials = getInitials(log.user_name);
                  const config = actionConfig[log.action_type] || { icon: AlertTriangle, label: log.action_type || 'Desconocido', style: 'bg-surface-container-low text-on-surface border-outline-variant/30' };
                  const ActionIcon = config.icon;

                  return (
                    <tr key={log.id || index} className={`${index < auditLogs.length - 1 ? 'border-b border-slate-200' : ''} hover:bg-slate-50 transition-colors duration-200`}>
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs">{initials}</div>
                        <span>{log.user_name || '—'}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-label-sm text-label-sm border ${config.style}`}>
                          <ActionIcon size={14} />
                          {config.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant">{formatTimestamp(log.log_timestamp)}</td>
                      <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">{log.ip_address || '—'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-outline-variant/30 p-4 flex justify-between items-center bg-surface-container-lowest">
          <span className="font-body-sm text-body-sm text-on-surface-variant">Mostrando {auditLogs.length} registro{auditLogs.length !== 1 ? 's' : ''} de auditoría</span>
          <button className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors font-semibold uppercase tracking-wide">
            View Full Audit Trail
          </button>
        </div>
      </div>
    </>
  );
}