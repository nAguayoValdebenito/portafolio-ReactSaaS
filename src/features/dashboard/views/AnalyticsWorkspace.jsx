import React, { useEffect } from 'react';

export default function AnalyticsWorkspace() {
  useEffect(() => {
    // Only run animations if user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Animate Chart Lines and Areas
      setTimeout(() => {
        document.getElementById('chart-line')?.classList.add('draw');
        document.getElementById('chart-area')?.classList.add('draw');
        document.getElementById('chart-line-forecast')?.classList.add('draw');
        document.getElementById('chart-confidence')?.classList.add('draw');
        
        // Animate Progress Bars
        const bars = document.querySelectorAll('.bar-fill-target');
        bars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            bar.style.width = targetWidth;
          }
        });
      }, 100);
    } else {
      // For reduced motion, set widths immediately
      const bars = document.querySelectorAll('.bar-fill-target');
      bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
          bar.style.width = targetWidth;
        }
      });
    }
  }, []);

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
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">calendar_today</span>
              <input className="form-input bg-surface border border-outline-variant rounded pl-10 pr-4 py-2 text-body-sm font-body-sm focus:ring-primary focus:border-primary w-full sm:w-72 cursor-pointer" readOnly type="text" value="Últimos 90 Días + 30 Días Pronóstico" />
            </div>
            <button className="bg-surface-container-low hover:bg-surface-container-high text-on-surface p-2 rounded transition-all active:scale-95 border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined">filter_list</span>
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
          <div className="w-full h-80 relative">
            {/* Simulated Chart using SVG */}
            <svg className="w-full h-full preserveAspectRatio-none" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#00327d" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#00327d" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line className="chart-grid" x1="50" x2="950" y1="50" y2="50"></line>
              <line className="chart-grid" x1="50" x2="950" y1="125" y2="125"></line>
              <line className="chart-grid" x1="50" x2="950" y1="200" y2="200"></line>
              <line className="chart-grid" x1="50" x2="950" y1="275" y2="275"></line>
              {/* Vertical Divider for Forecast */}
              <line opacity="0.5" stroke="#737784" strokeDasharray="4,4" x1="700" x2="700" y1="20" y2="275"></line>
              <text fill="#737784" fontFamily="Inter" fontSize="12" fontWeight="600" x="710" y="30">INICIO PRONÓSTICO</text>
              {/* Confidence Interval Area (Forecast) */}
              <path className="chart-confidence" d="M700,100 Q750,80 800,90 T900,70 L900,210 Q800,190 750,180 T700,100 Z" id="chart-confidence"></path>
              {/* Historical Area */}
              <path className="chart-area" d="M50,275 L50,150 Q150,100 250,160 T450,120 T600,180 T700,100 L700,275 Z" id="chart-area"></path>
              {/* Historical Line */}
              <path className="chart-line" d="M50,150 Q150,100 250,160 T450,120 T600,180 T700,100" id="chart-line"></path>
              {/* Forecast Line */}
              <path className="chart-line-forecast" d="M700,100 Q750,120 800,130 T900,110" id="chart-line-forecast"></path>
              {/* Y-Axis Labels */}
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="end" x="40" y="55">100%</text>
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="end" x="40" y="130">75%</text>
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="end" x="40" y="205">50%</text>
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="end" x="40" y="280">25%</text>
              {/* X-Axis Labels */}
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="middle" x="50" y="295">Oct</text>
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="middle" x="266" y="295">Nov</text>
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="middle" x="483" y="295">Dic</text>
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="middle" x="700" y="295">Hoy</text>
              <text fill="#737784" fontFamily="Inter" fontSize="12" textAnchor="middle" x="900" y="295">+30 D</text>
            </svg>
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
                <span className="material-symbols-outlined text-sm">add</span>
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
                  <tr className="hover:bg-[#F0F4F8] transition-colors cursor-pointer group">
                    <td className="p-4 font-medium text-on-background group-hover:text-primary transition-colors">OEE_Pred_v2.4</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-[#e6f4ea] text-[#137333]">Activo</span>
                    </td>
                    <td className="p-4 text-on-background">94.2%</td>
                    <td className="p-4 text-right">
                      <button className="text-primary hover:text-on-primary-fixed-variant font-label-md text-label-md transition-colors">Gestionar</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F0F4F8] transition-colors cursor-pointer group">
                    <td className="p-4 font-medium text-on-background group-hover:text-primary transition-colors">FalloMotor_XGBoost</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-[#fef7e0] text-[#b06000] pulse-badge">Entrenando</span>
                    </td>
                    <td className="p-4 text-on-surface-variant">--</td>
                    <td className="p-4 text-right">
                      <button className="text-error hover:text-on-error-container font-label-md text-label-md transition-colors">Detener</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F0F4F8] transition-colors cursor-pointer group">
                    <td className="p-4 font-medium text-on-background group-hover:text-primary transition-colors">ConsumoEnergia_RNN</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-[#e6f4ea] text-[#137333]">Activo</span>
                    </td>
                    <td className="p-4 text-on-background">89.7%</td>
                    <td className="p-4 text-right">
                      <button className="text-primary hover:text-on-primary-fixed-variant font-label-md text-label-md transition-colors">Gestionar</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F0F4F8] transition-colors cursor-pointer group">
                    <td className="p-4 font-medium text-on-background group-hover:text-primary transition-colors">DesgasteRodamientos</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-surface-variant text-on-surface-variant">Inactivo</span>
                    </td>
                    <td className="p-4 text-on-background">82.1%</td>
                    <td className="p-4 text-right">
                      <button className="text-primary hover:text-on-primary-fixed-variant font-label-md text-label-md transition-colors">Gestionar</button>
                    </td>
                  </tr>
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
              {/* Bar 1 */}
              <div className="group">
                <div className="flex justify-between font-label-sm text-label-sm mb-1 group-hover:-translate-y-0.5 transition-transform">
                  <span className="text-on-background">Temperatura del Motor</span>
                  <span className="text-on-surface-variant font-bold">42%</span>
                </div>
                <svg className="block" height="8" width="100%">
                  <rect className="bar-chart-bg" height="8" width="100%"></rect>
                  <rect className="bar-chart-fill bar-fill-target" data-width="42%" height="8"></rect>
                </svg>
              </div>
              {/* Bar 2 */}
              <div className="group">
                <div className="flex justify-between font-label-sm text-label-sm mb-1 group-hover:-translate-y-0.5 transition-transform">
                  <span className="text-on-background">Nivel de Vibración</span>
                  <span className="text-on-surface-variant font-bold">28%</span>
                </div>
                <svg className="block" height="8" width="100%">
                  <rect className="bar-chart-bg" height="8" width="100%"></rect>
                  <rect className="bar-chart-fill bar-fill-target" data-width="28%" height="8"></rect>
                </svg>
              </div>
              {/* Bar 3 */}
              <div className="group">
                <div className="flex justify-between font-label-sm text-label-sm mb-1 group-hover:-translate-y-0.5 transition-transform">
                  <span className="text-on-background">Humedad Relativa</span>
                  <span className="text-on-surface-variant font-bold">15%</span>
                </div>
                <svg className="block" height="8" width="100%">
                  <rect className="bar-chart-bg" height="8" width="100%"></rect>
                  <rect className="bar-chart-fill bar-fill-target" data-width="15%" height="8"></rect>
                </svg>
              </div>
              {/* Bar 4 */}
              <div className="group">
                <div className="flex justify-between font-label-sm text-label-sm mb-1 group-hover:-translate-y-0.5 transition-transform">
                  <span className="text-on-background">Tiempo desde Mantenimiento</span>
                  <span className="text-on-surface-variant font-bold">10%</span>
                </div>
                <svg className="block" height="8" width="100%">
                  <rect className="bar-chart-bg" height="8" width="100%"></rect>
                  <rect className="bar-chart-fill bar-fill-target" data-width="10%" height="8"></rect>
                </svg>
              </div>
              {/* Bar 5 */}
              <div className="group">
                <div className="flex justify-between font-label-sm text-label-sm mb-1 group-hover:-translate-y-0.5 transition-transform">
                  <span className="text-on-background">Otros Factores</span>
                  <span className="text-on-surface-variant font-bold">5%</span>
                </div>
                <svg className="block" height="8" width="100%">
                  <rect className="bar-chart-bg" height="8" width="100%"></rect>
                  <rect className="bar-chart-fill bar-fill-target" data-width="5%" height="8"></rect>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
