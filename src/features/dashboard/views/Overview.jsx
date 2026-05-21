import React, { useEffect, useState } from 'react';
import MainPerformanceChart from '../components/MainPerformanceChart';
import { useAuth } from '../../../context/AuthContext';
import { getEnterpriseKPIs, getOperationalHistory, subscribeToEnterpriseAlerts } from '../services/dashboardService';
import { TrendingUp, ArrowUp, ArrowDown, CloudOff, Filter } from 'lucide-react';

const KPICard = React.memo(({ kpi, index }) => {
  const delayClass = `delay-${(index + 2) * 100}`;
  const isPositive = kpi.kpi_tendencia === 'up' || (kpi.kpi_variacion && parseFloat(kpi.kpi_variacion) > 0);

  return (
    <div className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up ${delayClass}`}>
      <div className="flex justify-between items-start">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{kpi.kpi_nombre}</span>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <TrendingUp size={20} />
        </div>
      </div>
      <div className="font-display-lg text-display-lg text-on-background">
        {kpi.kpi_valor_actual}
        {kpi.kpi_unidad && <span className="text-2xl text-on-surface-variant ml-1">{kpi.kpi_unidad}</span>}
      </div>
      {kpi.kpi_variacion && (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold w-fit ${isPositive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
          {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {kpi.kpi_variacion}
        </span>
      )}
    </div>
  );
});

export default function Overview() {
  const { currentUser } = useAuth();
  
  const [kpis, setKpis] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.eid) {
      const unsubscribe = subscribeToEnterpriseAlerts(currentUser.eid, (data) => {
        setAlerts(data);
      });
      return () => unsubscribe();
    }
  }, [currentUser?.eid]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (currentUser?.eid) {
        setIsLoading(true);
        setErrorLoading(false);
        try {
          const [kpisData, historyData] = await Promise.all([
            getEnterpriseKPIs(currentUser.eid),
            getOperationalHistory(currentUser.eid)
          ]);
          setKpis(kpisData);
          setChartData(historyData);
        } catch (error) {
          console.error("Error fetching dashboard data", error);
          setErrorLoading(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser?.eid]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (errorLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] animate-fade-in-up">
        <div className="bg-[#fef7e0] border border-[#f0df9f] p-8 rounded-xl text-center max-w-lg shadow-sm">
          <CloudOff className="text-[#b06000] mb-4" size={48} />
          <h3 className="text-[#b06000] font-headline-md mb-2">Error de Sincronización</h3>
          <p className="text-[#b06000] text-body-md font-medium opacity-90">
            Asegúrate de tener los índices de Firestore activos y extensiones de bloqueo de publicidad desactivadas en localhost.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
        {kpis.map((kpi, index) => (
          <KPICard key={kpi.id || index} kpi={kpi} index={index} />
        ))}
      </div>

      {/* Content Area Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Chart Area (2/3) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-6 flex flex-col animate-fade-in-up delay-400">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-background">Historical Performance vs Target Goals</h2>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/50 transition-colors hover:bg-surface-variant cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                OEE %
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/50 transition-colors hover:bg-surface-variant cursor-pointer">
                <span className="w-2 h-2 border-t-2 border-dashed border-outline"></span>
                Target
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[350px]">
            <MainPerformanceChart data={chartData} />
          </div>
        </div>

        {/* Alerts Column (1/3) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-0 flex flex-col overflow-hidden animate-fade-in-up delay-500">
          <div className="p-5 border-b border-outline-variant/30 bg-surface-container-lowest flex justify-between items-center">
            <h2 className="font-headline-md text-headline-md text-on-background">Alertas Inteligentes</h2>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <Filter size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant font-body-sm">
                No hay alertas activas.
              </div>
            ) : (
              alerts.map((alert) => {
                let dotClass = "bg-blue-500";
                if (alert.alerta_nivel === 'critical') dotClass = "bg-error animate-pulse-dot";
                else if (alert.alerta_nivel === 'warning') dotClass = "bg-yellow-500";
                else if (alert.alerta_nivel === 'success') dotClass = "bg-green-500";

                let timeString = '';
                if (alert.alerta_timestamp) {
                  const dateObj = typeof alert.alerta_timestamp.toDate === 'function' 
                    ? alert.alerta_timestamp.toDate() 
                    : new Date(alert.alerta_timestamp);
                  if (!isNaN(dateObj.getTime())) {
                    timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  }
                }

                return (
                  <div key={alert.id} className="p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors duration-200 ease-out flex gap-4 items-start cursor-pointer group">
                    <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotClass}`}></div>
                    <div className="flex flex-col gap-1">
                      <span className="font-body-md text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">{alert.alerta_titulo}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{alert.alerta_detalle}</span>
                      <span className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">{timeString}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest text-center">
            <button className="font-label-md text-label-md text-primary font-semibold hover:underline transition-all">
              Ver todas las alertas
            </button>
          </div>
        </div>
      </div>
    </>
  );
}