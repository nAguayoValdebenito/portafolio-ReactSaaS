import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, Settings, FileText, Globe, Cloud, PlusCircle, Shield, LogIn, RefreshCw, Download, Database, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { getEnterpriseAuditLogs, subscribeToIntegrations } from '../services/dashboardService';

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

const sourceLabels = {
  postgresql: 'PostgreSQL',
  csv: 'CSV Mass Upload',
  erp: 'ERP API',
  cloud: 'Cloud Storage',
  new_source: 'Nueva Fuente',
};

const iconMap = {
  postgresql: Server,
  csv: FileText,
  erp: Globe,
  cloud: Cloud,
  default: Database
};

export default function DataIntegration() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const [integrations, setIntegrations] = useState([]);
  const [isLoadingIntegrations, setIsLoadingIntegrations] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    if (activeModal) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeModal]);

  useEffect(() => {
    if (!currentUser?.eid) return;

    let cancelled = false;
    setIsLoadingLogs(true);
    setIsLoadingIntegrations(true);

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

    const unsubscribeIntegrations = subscribeToIntegrations(currentUser.eid, (data) => {
      if (!cancelled) {
        setIntegrations(data);
        setIsLoadingIntegrations(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribeIntegrations();
    };
  }, [currentUser?.eid]);
  return (
    <>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-gutter">
        {isLoadingIntegrations ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col min-h-[220px] animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-lg bg-slate-200" />
                <div className="h-5 w-5 bg-slate-200 rounded" />
              </div>
              <div className="h-5 w-32 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-48 bg-slate-200 rounded mb-4 flex-1" />
              <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
                <div className="h-6 w-24 bg-slate-200 rounded-full" />
                <div className="h-4 w-16 bg-slate-200 rounded" />
              </div>
            </div>
          ))
        ) : (
          integrations.map((integration, index) => {
            const IconComponent = iconMap[integration.type] || iconMap.default;
            const isConnected = integration.status === 'connected' || integration.status === 'Conectado';
            const delayClass = `delay-${Math.min((index + 2) * 100, 500)}`;
            
            return (
              <div key={integration.id || index} className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up ${delayClass}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <IconComponent size={28} />
                  </div>
                  <button onClick={() => setActiveModal(integration.type)} aria-label={`Configurar ${integration.name}`} className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                    <Settings size={20} />
                  </button>
                </div>
                <h4 className="font-label-md text-label-md text-on-surface mb-1">{integration.name || sourceLabels[integration.type] || 'Desconocida'}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">{integration.description || 'Sin descripción'}</p>
                <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm ${isConnected ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-variant text-on-surface-variant'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-primary animate-pulse-subtle' : 'bg-slate-400'}`}></span>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: {formatTimestamp(integration.lastSync) || '—'}</span>
                </div>
              </div>
            );
          })
        )}

        {/* Add New Card */}
        <button onClick={() => setActiveModal('new_source')} className="bg-transparent border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all cursor-pointer min-h-[220px] animate-fade-in-up delay-500">
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
                <th scope="col" className="py-3 px-6 text-sm text-slate-900 font-semibold">User</th>
                <th scope="col" className="py-3 px-6 text-sm text-slate-900 font-semibold">Action</th>
                <th scope="col" className="py-3 px-6 text-sm text-slate-900 font-semibold">Timestamp</th>
                <th scope="col" className="py-3 px-6 text-sm text-slate-900 font-semibold">IP Address</th>
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
          <button onClick={() => navigate('/dashboard/audit-trail')} className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors font-semibold uppercase tracking-wide">
            View Full Audit Trail
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-fade-in-up"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-headline-md text-slate-900">
                Configuración de Fuente: {sourceLabels[activeModal]}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Host / URL</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  placeholder={activeModal === 'postgresql' ? 'localhost:5432' : activeModal === 'csv' ? 's3://my-bucket/uploads' : activeModal === 'erp' ? 'https://sap.example.com/api' : activeModal === 'cloud' ? 'https://s3.amazonaws.com/mybucket' : 'hostname o URL'}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Base de Datos</label>
                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  placeholder={activeModal === 'postgresql' ? 'predictive_db' : activeModal === 'csv' ? 'raw_uploads' : activeModal === 'erp' ? 'erp_production' : activeModal === 'cloud' ? 'data_lake' : 'nombre del esquema'}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Usuario</label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    placeholder="admin"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer">
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}