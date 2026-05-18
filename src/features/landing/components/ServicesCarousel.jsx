import React, { useEffect, useRef } from 'react';

const ServicesCarousel = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-margin-desktop bg-surface max-w-container-max mx-auto reveal-on-scroll">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Plataforma de Inteligencia Industrial Unificada</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Módulos integrados diseñados para optimizar cada fase de tu proceso de análisis de datos.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden pb-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-primary/20 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">database</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface text-lg">Ingestión Masiva de Datos</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">Conecta múltiples fuentes y consolida tu información en tiempo real sin cuellos de botella.</p>
        </div>
        {/* Card 2 (Featured) */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-primary shadow-md relative flex flex-col gap-4 ring-4 ring-primary-fixed-dim/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-primary/40 pt-8 overflow-visible">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-label-sm px-4 py-1 rounded-full shadow-sm font-bold z-10 whitespace-nowrap">Recomendado</div>
          <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center mt-2">
            <span className="material-symbols-outlined">insights</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary text-lg">Analítica Predictiva Avanzada</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">Anticípate a las tendencias del mercado utilizando nuestros modelos de machine learning pre-entrenados.</p>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-primary/20 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">monitoring</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface text-lg">Motor de KPIs &amp; Reporting</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">Genera reportes dinámicos y tableros interactivos que tu equipo realmente usará.</p>
        </div>
        {/* Card 4 (Partial) */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4 opacity-50 translate-x-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:opacity-100 hover:ring-2 hover:ring-primary/20">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">notifications_active</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface text-lg">Alertas Inteligentes</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">Recibe notificaciones automáticas cuando...</p>
        </div>
      </div>
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8 md:hidden">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="w-2 h-2 rounded-full bg-primary-fixed"></div>
        <div className="w-2 h-2 rounded-full bg-primary-fixed"></div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
