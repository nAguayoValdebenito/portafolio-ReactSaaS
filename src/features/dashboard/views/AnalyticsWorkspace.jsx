import React, { useEffect, useState } from 'react';
import { Calendar, Filter, Plus, Loader2, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { getEnterpriseMLModels, subscribeToInfluenceFactors } from '../services/dashboardService';
import { usePredictions } from '../hooks/usePredictions';
import PredictiveChart from '../components/PredictiveChart';

const InfluenceBar = React.memo(({ label, value, color = '#1A5FFF' }) => (
  <div className="group">
    <div className="flex justify-between text-sm mb-2 group-hover:-translate-y-0.5 transition-transform">
      <span className="text-slate-700 font-medium">{label}</span>
      <span className="text-slate-600 font-bold">{value}%</span>
    </div>
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${value}%`}
      className="w-full bg-slate-200 rounded-full h-2"
    >
      <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  </div>
));

const ModelRow = React.memo(({ name, status, accuracy, actionLabel, actionVariant = 'primary', onAction }) => {
  const statusStyles = {
    active: 'bg-[#e6f4ea] text-[#137333]',
    training: 'bg-[#fef7e0] text-[#b06000] pulse-badge',
    inactive: 'bg-surface-variant text-on-surface-variant',
  };

  const statusLabels = {
    active: 'Activo',
    training: 'Entrenando',
    inactive: 'Inactivo',
  };

  return (
    <tr className="hover:bg-[#F0F4F8] transition-colors cursor-pointer group">
      <td className="p-4 font-medium text-on-background group-hover:text-primary transition-colors">{name}</td>
      <td className="p-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold ${statusStyles[status] || statusStyles.inactive}`}>
          {statusLabels[status] || status}
        </span>
      </td>
      <td className="p-4 text-on-background">{accuracy}</td>
      <td className="p-4 text-right">
        <button onClick={onAction} className={`font-label-md text-label-md transition-colors ${
          actionVariant === 'danger' ? 'text-error hover:text-on-error-container' : 'text-primary hover:text-on-primary-fixed-variant'
        }`}>
          {actionLabel}
        </button>
      </td>
    </tr>
  );
});

const statusMap = {
  Activo: 'active',
  activo: 'active',
  Entrenando: 'training',
  entrenando: 'training',
  Inactivo: 'inactive',
  inactivo: 'inactive',
};

export default function AnalyticsWorkspace() {
  const { currentUser } = useAuth();
  const [mlModels, setMlModels] = useState([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  
  const [influenceFactors, setInfluenceFactors] = useState([]);
  const [isLoadingFactors, setIsLoadingFactors] = useState(true);
  
  const { data: rawPredictionData, isLoading: isLoadingPredictions } = usePredictions(currentUser?.eid);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isTrainingWizardOpen, setIsTrainingWizardOpen] = useState(false);
  const [managingModel, setManagingModel] = useState(null);

  useEffect(() => {
    if (!currentUser?.eid) return;

    let cancelled = false;
    setIsLoadingModels(true);

    getEnterpriseMLModels(currentUser.eid)
      .then((models) => {
        if (!cancelled) {
          setMlModels(models);
          setIsLoadingModels(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoadingModels(false);
      });

    const unsubscribeFactors = subscribeToInfluenceFactors(currentUser.eid, (factors) => {
      if (!cancelled) {
        setInfluenceFactors(factors);
        setIsLoadingFactors(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribeFactors();
    };
  }, [currentUser?.eid]);

  const models = mlModels.map((m) => ({
    name: m.modelo_nombre || '—',
    status: statusMap[m.modelo_estado] || 'inactive',
    accuracy: m.modelo_precision != null ? `${m.modelo_precision}%` : '—',
    actionLabel: 'Gestionar',
    onAction: () => setManagingModel(m.modelo_nombre || 'Modelo'),
  }));

  // Map the timestamp to 'name' so the Recharts XAxis can render it natively
  const predictionData = rawPredictionData?.map(d => ({
    ...d,
    name: d.name || d.timestamp
  })) || [];

  return (
    <>
      <div className="max-w-container-max mx-auto flex flex-col gap-gutter">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-[#EEEEEE] gap-4 animate-fade-in-up delay-300">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <label className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap">Seleccionar Métrica:</label>
            <select className="form-select bg-surface border border-outline-variant rounded text-body-md font-body-md focus:ring-primary focus:border-primary py-2 px-3 w-full sm:w-64 transition-shadow hover:shadow-sm cursor-pointer">
              <option>Eficiencia OEE</option>
              <option>Tiempo Medio Entre Fallas (MTBF)</option>
              <option>Consumo Energético</option>
            </select>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto hover:shadow-sm transition-shadow rounded">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
              <input className="form-input bg-surface border border-outline-variant rounded pl-10 pr-4 py-2 text-body-sm font-body-sm focus:ring-primary focus:border-primary w-full sm:w-72 cursor-pointer" readOnly type="text" value="Últimos 90 Días + 30 Días Pronóstico" />
            </div>
            <button onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)} aria-label="Filtrar análisis" className="bg-surface-container-low hover:bg-surface-container-high text-on-surface p-2 rounded transition-all active:scale-95 border border-outline-variant flex items-center justify-center">
              <Filter size={20} />
            </button>
          </div>
        </div>
        
        {/* Main Forecasting Chart */}
        <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-[#EEEEEE] p-6 flex flex-col animate-fade-in-up delay-400">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-background">Proyección de Eficiencia OEE</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Modelo ARIMA optimizado. Intervalo de confianza del 95%.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-primary"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Histórico</span>
              </div>
              <div className="flex items-center gap-1 ml-3">
                <div className="w-3 h-0.5 bg-primary border-t border-dashed"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Pronóstico</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[400px]">
            <PredictiveChart data={predictionData} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter animate-fade-in-up delay-500">
          {/* Left Card: Models */}
          <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-[#EEEEEE] flex flex-col h-[400px]">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <div>
                <h3 className="font-headline-md text-headline-lg-mobile md:text-headline-md text-on-background">Modelos ML Personalizados</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Gestión del pipeline AutoML</p>
              </div>
              <button onClick={() => setIsTrainingWizardOpen(!isTrainingWizardOpen)} className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-label-md py-2 px-4 rounded transition-all active:scale-95 flex items-center gap-2 hover:shadow-md">
                <Plus size={16} />
                Entrenar Nuevo
              </button>
            </div>
            <div className="overflow-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low sticky top-0">
                  <tr>
                    <th scope="col" className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Nombre del Modelo</th>
                    <th scope="col" className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Estado</th>
                    <th scope="col" className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Precisión</th>
                    <th scope="col" className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm divide-y divide-outline-variant">
                  {isLoadingModels ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="p-4"><div className="h-4 w-36 bg-slate-200 rounded" /></td>
                        <td className="p-4"><div className="h-5 w-16 bg-slate-200 rounded-full" /></td>
                        <td className="p-4"><div className="h-4 w-12 bg-slate-200 rounded" /></td>
                        <td className="p-4"><div className="h-4 w-16 bg-slate-200 rounded ml-auto" /></td>
                      </tr>
                    ))
                  ) : models.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-on-surface-variant">
                        <p className="font-body-sm text-body-sm">No hay modelos ML entrenados aún.</p>
                      </td>
                    </tr>
                  ) : (
                    models.map((model, i) => (
                      <ModelRow key={i} {...model} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Right Card: Influence Factors */}
          <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-[#EEEEEE] flex flex-col h-[400px] p-6">
            <div className="mb-6">
              <h3 className="font-headline-md text-headline-lg-mobile md:text-headline-md text-on-background">Factores de Influencia</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">SHAP Values para OEE_Pred_v2.4</p>
            </div>
            <div className="flex-1 flex flex-col justify-around overflow-hidden">
              {isLoadingFactors ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-2">
                      <div className="h-4 w-1/3 bg-slate-200 rounded" />
                      <div className="h-4 w-8 bg-slate-200 rounded" />
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="h-2 rounded-full bg-slate-200" style={{ width: `${100 - i * 15}%` }} />
                    </div>
                  </div>
                ))
              ) : influenceFactors.length === 0 ? (
                <div className="flex items-center justify-center h-full text-on-surface-variant">
                  <p className="font-body-sm text-body-sm">No hay factores de influencia registrados.</p>
                </div>
              ) : (
                influenceFactors.map((factor, i) => (
                  <InfluenceBar 
                    key={factor.id || i} 
                    label={factor.label || factor.nombre || 'Desconocido'} 
                    value={factor.value || factor.valor || 0} 
                    color={factor.color} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel Dropdown */}
      {isFilterPanelOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsFilterPanelOpen(false)}>
          <div className="absolute top-28 right-6 md:right-margin-desktop z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-5 w-80 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-label-md text-label-md text-slate-900 font-semibold">Filtros de Análisis</h4>
              <button onClick={() => setIsFilterPanelOpen(false)} aria-label="Cerrar filtros" className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-slate-600 mb-1">Rango de Fechas</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">
                  <option>Últimos 7 Días</option>
                  <option>Últimos 30 Días</option>
                  <option>Últimos 90 Días</option>
                  <option>Personalizado</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-slate-600 mb-1">Tipo de Modelo</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">
                  <option>Todos</option>
                  <option>ARIMA</option>
                  <option>Prophet</option>
                  <option>Random Forest</option>
                  <option>Red Neuronal</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-slate-600 mb-1">Estado</label>
                <div className="flex flex-wrap gap-2">
                  {['Activo', 'Entrenando', 'Inactivo'].map((s) => (
                    <label key={s} className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <button className="w-full py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Training Wizard Overlay */}
      {isTrainingWizardOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsTrainingWizardOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-headline-md text-slate-900">Entrenar Nuevo Modelo</h3>
              <button onClick={() => setIsTrainingWizardOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer" aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Nombre del Modelo</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Ej: OEE_Pred_v3.0" />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Algoritmo</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">
                  <option>ARIMA</option>
                  <option>Prophet</option>
                  <option>Random Forest</option>
                  <option>LSTM (Red Neuronal)</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Métrica Objetivo</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">
                  <option>Eficiencia OEE</option>
                  <option>MTBF</option>
                  <option>Consumo Energético</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-slate-700 mb-1">Conjunto de Datos</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <p className="text-sm text-slate-500">Arrastra un archivo CSV o haz clic para seleccionar</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
              <button onClick={() => setIsTrainingWizardOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                Cancelar
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">
                Iniciar Entrenamiento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Model Overlay */}
      {managingModel && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setManagingModel(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-headline-md text-slate-900">Gestión: {managingModel}</h3>
              <button onClick={() => setManagingModel(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer" aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-sm text-slate-700">Precisión Actual</span>
                <span className="text-sm font-semibold text-slate-900">94.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-sm text-slate-700">Último Entrenamiento</span>
                <span className="text-sm font-semibold text-slate-900">15 May 2026</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-sm text-slate-700">Versión</span>
                <span className="text-sm font-semibold text-slate-900">v2.4</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-slate-200">
              <button className="w-full py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">
                Re-entrenar Modelo
              </button>
              <button className="w-full py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                Descargar Artefactos
              </button>
              <button className="w-full py-2 text-sm font-medium text-error bg-white border border-error/30 rounded-lg hover:bg-error-container transition-colors cursor-pointer">
                Desactivar Modelo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
