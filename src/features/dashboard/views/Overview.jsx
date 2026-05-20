export default function Overview() {
  return (
    <>
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
        {/* Card 1 – Eficiencia OEE */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-200">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Eficiencia OEE</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
          </div>
          <div className="font-display-lg text-display-lg text-on-background">87.4%</div>
          <div className="flex items-center gap-1 text-[13px] text-green-700 font-medium">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            <span>+2.4% vs last month</span>
          </div>
        </div>

        {/* Card 2 – Mermas de Producción */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-300">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Mermas de Producción</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">trending_down</span>
            </div>
          </div>
          <div className="font-display-lg text-display-lg text-on-background">1.2%</div>
          <div className="flex items-center gap-1 text-[13px] text-green-700 font-medium">
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            <span>-0.5% vs last month</span>
          </div>
        </div>

        {/* Card 3 – Consumo Energético */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-400">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Consumo Energético</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </div>
          </div>
          <div className="font-display-lg text-display-lg text-on-background">
            420 <span className="text-2xl text-on-surface-variant">kWh</span>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-yellow-600 font-medium">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            <span>+1.1% vs last month</span>
          </div>
        </div>

        {/* Card 4 – Tiempo de Actividad */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-500">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tiempo de Actividad</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
          </div>
          <div className="font-display-lg text-display-lg text-on-background">99.8%</div>
          <div className="flex items-center gap-1 text-[13px] text-secondary font-medium">
            <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
            <span>Stable</span>
          </div>
        </div>
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
          <div className="flex-1 relative min-h-[300px] border-l border-b border-outline-variant/50 flex items-end pt-4 pr-4">
            {/* Y Axis Labels */}
            <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-[11px] text-on-surface-variant font-medium py-4">
              <span>100%</span>
              <span>90%</span>
              <span>80%</span>
              <span>70%</span>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 top-4 bottom-0 left-0 right-4 flex flex-col justify-between z-0">
              <div className="border-t border-outline-variant/20 w-full"></div>
              <div className="border-t border-outline-variant/20 w-full"></div>
              <div className="border-t border-outline-variant/20 w-full"></div>
              <div className="border-t border-outline-variant/20 w-full"></div>
            </div>

            {/* Target Line */}
            <div className="absolute top-[20%] left-0 right-4 border-t-2 border-dashed border-outline/50 z-10"></div>

            {/* Faux Data Line SVG */}
            <svg className="absolute inset-0 h-full w-full z-20 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path
                className="text-primary drop-shadow-md animate-draw-line"
                d="M0,70 Q10,65 20,50 T40,45 T60,30 T80,35 T100,15"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              {/* Data points */}
              <circle className="chart-point fill-surface-container-lowest stroke-primary stroke-[1.5]" cx="0" cy="70" r="1.5"><title>Jan: 75%</title></circle>
              <circle className="chart-point fill-surface-container-lowest stroke-primary stroke-[1.5]" cx="20" cy="50" r="1.5"><title>Feb: 82%</title></circle>
              <circle className="chart-point fill-surface-container-lowest stroke-primary stroke-[1.5]" cx="40" cy="45" r="1.5"><title>Mar: 84%</title></circle>
              <circle className="chart-point fill-surface-container-lowest stroke-primary stroke-[1.5]" cx="60" cy="30" r="1.5"><title>Apr: 89%</title></circle>
              <circle className="chart-point fill-surface-container-lowest stroke-primary stroke-[1.5]" cx="80" cy="35" r="1.5"><title>May: 87%</title></circle>
              <circle className="chart-point fill-surface-container-lowest stroke-primary stroke-[1.5]" cx="100" cy="15" r="1.5"><title>Jun: 95%</title></circle>
            </svg>

            {/* X Axis Labels */}
            <div className="absolute -bottom-6 left-0 right-4 flex justify-between text-[11px] text-on-surface-variant font-medium px-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Alerts Column (1/3) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-0 flex flex-col overflow-hidden animate-fade-in-up delay-500">
          <div className="p-5 border-b border-outline-variant/30 bg-surface-container-lowest flex justify-between items-center">
            <h2 className="font-headline-md text-headline-md text-on-background">Alertas Inteligentes</h2>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              filter_list
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Alert Item 1 (Critical) */}
            <div className="p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors duration-200 ease-out flex gap-4 items-start cursor-pointer group">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-error flex-shrink-0 animate-pulse-dot"></div>
              <div className="flex flex-col gap-1">
                <span className="font-body-md text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">Desviación en línea 4</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Caída brusca de presión detectada. Requiere atención inmediata.</span>
                <span className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">Hace 10 min</span>
              </div>
            </div>

            {/* Alert Item 2 (Warning) */}
            <div className="p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors duration-200 ease-out flex gap-4 items-start cursor-pointer group">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-yellow-500 flex-shrink-0"></div>
              <div className="flex flex-col gap-1">
                <span className="font-body-md text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">Mantenimiento preventivo sugerido</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Motor principal M2 acercándose a límite de horas de operación.</span>
                <span className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">Hace 1 hora</span>
              </div>
            </div>

            {/* Alert Item 3 (Success) */}
            <div className="p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors duration-200 ease-out flex gap-4 items-start cursor-pointer group">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="flex flex-col gap-1">
                <span className="font-body-md text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">Objetivo Q3 alcanzado</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Producción de turno superó meta establecida en un 5%.</span>
                <span className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">Ayer, 14:30</span>
              </div>
            </div>

            {/* Alert Item 4 (Critical) */}
            <div className="p-4 hover:bg-surface-container-low transition-colors duration-200 ease-out flex gap-4 items-start cursor-pointer group">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-error flex-shrink-0"></div>
              <div className="flex flex-col gap-1">
                <span className="font-body-md text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">Anomalía detectada en Sensor PT-12</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Lecturas fuera de rango operativo estándar durante &gt;5 min.</span>
                <span className="font-label-sm text-label-sm text-outline mt-1 text-[11px]">Ayer, 09:15</span>
              </div>
            </div>
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