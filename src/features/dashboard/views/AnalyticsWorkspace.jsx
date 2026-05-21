import React, { useEffect, useState } from 'react';
import { Calendar, Filter, Plus, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { getEnterpriseMLModels } from '../services/dashboardService';
import { usePredictions } from '../hooks/usePredictions';
import PredictiveChart from '../components/PredictiveChart';

const InfluenceBar = React.memo(({ label, value, color = '#1A5FFF' }) => (
  <div className="group">
    <div className="flex justify-between text-sm mb-2 group-hover:-translate-y-0.5 transition-transform">
      <span className="text-slate-700 font-medium">{label}</span>
      <span className="text-slate-600 font-bold">{value}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2">
      <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  </div>
));

const ModelRow = React.memo(({ name, status, accuracy, actionLabel, actionVariant = 'primary' }) => {
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
        <button className={`font-label-md text-label-md transition-colors ${
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
  
  const { data: rawPredictionData, isLoading: isLoadingPredictions } = usePredictions(currentUser?.eid);

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

    return () => { cancelled = true; };
  }, [currentUser?.eid]);

  const models = mlModels.map((m) => ({
    name: m.modelo_nombre || '—',
    status: statusMap[m.modelo_estado] || 'inactive',
    accuracy: m.modelo_precision != null ? `${m.modelo_precision}%` : '—',
    actionLabel: 'Gestionar',
  }));

  // Map the timestamp to 'name' so the Recharts XAxis can render it natively
  const predictionData = rawPredictionData?.map(d => ({
    ...d,
    name: d.name || d.timestamp
  })) || [];

  const influenceFactors = [
    { label: 'Temperatura del Motor', value: 42 },
    { label: 'Nivel de Vibración', value: 28 },
    { label: 'Humedad Relativa', value: 15 },
    { label: 'Tiempo desde Mantenimiento', value: 10 },
    { label: 'Otros Factores', value: 5 },
  ];

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
            <button className="bg-surface-container-low hover:bg-surface-container-high text-on-surface p-2 rounded transition-all active:scale-95 border border-outline-variant flex items-center justify-center">
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
              <button className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-label-md py-2 px-4 rounded transition-all active:scale-95 flex items-center gap-2 hover:shadow-md">
                <Plus size={16} />
                Entrenar Nuevo
              </button>
            </div>
            <div className="overflow-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low sticky top-0">
                  <tr>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Nombre del Modelo</th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Estado</th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold">Precisión</th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold text-right">Acción</th>
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
            <div className="flex-1 flex flex-col justify-around">
              {influenceFactors.map((factor, i) => (
                <InfluenceBar key={i} {...factor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
