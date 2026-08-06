import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Database, TrendingUp, LayoutDashboard, Bell, BarChart3, Shield } from 'lucide-react';

const services = [
  {
    icon: 'database',
    title: 'Ingestión Masiva de Datos',
    description: 'Conecta múltiples fuentes y consolida tu información en tiempo real sin cuellos de botella.'
  },
  {
    featured: true,
    icon: 'insights',
    title: 'Analítica Predictiva Avanzada',
    description: 'Anticípate a las tendencias del mercado utilizando nuestros modelos de machine learning pre-entrenados.'
  },
  {
    icon: 'monitoring',
    title: 'Motor de KPIs & Reporting',
    description: 'Genera reportes dinámicos y tableros interactivos que tu equipo realmente usará.'
  },
  {
    icon: 'notifications_active',
    title: 'Alertas Inteligentes',
    description: 'Recibe notificaciones automáticas cuando tus métricas se desvíen de los objetivos definidos.'
  },
  {
    icon: 'auto_graph',
    title: 'Modelos de ML Personalizados',
    description: 'Entrena modelos específicos para tu industria con nuestros herramientas de AutoML.'
  },
  {
    icon: 'security',
    title: 'Seguridad Empresarial',
    description: 'Protege tus datos con encriptación de nivel bancario y cumplimiento normativo.'
  }
];

const iconMap = {
  database: Database,
  insights: TrendingUp,
  monitoring: LayoutDashboard,
  notifications_active: Bell,
  auto_graph: BarChart3,
  security: Shield,
};

const GAP_REM = 1.5;
const MIN_SWIPE_DISTANCE = 50;

const ServicesCarousel = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [slideDistance, setSlideDistance] = useState(0);

  const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const gapPx = GAP_REM * remPx;

  const cardsPerView = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 4;
  const maxIndex = services.length - cardsPerView;

  const cardWidthStyle = cardsPerView === 1
    ? '100%'
    : `calc((100% - ${(cardsPerView - 1) * gapPx}px) / ${cardsPerView})`;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [cardsPerView, currentIndex, maxIndex]);

  useEffect(() => {
    if (trackRef.current?.firstElementChild) {
      const cardEl = trackRef.current.firstElementChild;
      setSlideDistance(cardEl.getBoundingClientRect().width + gapPx);
    }
  }, [cardsPerView, windowWidth, gapPx]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

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

  const handlePrev = useCallback(() => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
  }, [isAnimating, currentIndex]);

  const handleNext = useCallback(() => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
  }, [isAnimating, currentIndex, maxIndex]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > MIN_SWIPE_DISTANCE) {
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  }, [handleNext, handlePrev]);

  return (
    <section ref={sectionRef} id="soluciones" className="w-full py-20 px-margin-desktop bg-surface max-w-container-max mx-auto reveal-on-scroll overflow-x-hidden scroll-mt-28">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Plataforma de Inteligencia Industrial Unificada</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Módulos integrados diseñados para optimizar cada fase de tu proceso de análisis de datos.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-6 transition-transform duration-300 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * slideDistance}px)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex-shrink-0 bg-surface-container-lowest p-6 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col gap-4
                ${service.featured
                  ? 'border-2 border-primary ring-4 ring-primary-fixed-dim/20 hover:ring-primary/40'
                  : 'border border-outline-variant hover:ring-2 hover:ring-primary/20'
                }
                ${service.featured ? 'relative pt-8' : ''}
              `}
              style={{ width: cardWidthStyle }}
            >
              {service.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md whitespace-nowrap z-10">
                  Recomendado
                </div>
              )}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                ${service.featured ? 'bg-primary-container text-on-primary mt-2' : 'bg-surface-container text-primary'}
              `}>
                {(() => {
                  const IconComponent = iconMap[service.icon] || Database;
                  return <IconComponent size={24} className={service.featured ? 'text-on-primary' : 'text-primary'} />;
                })()}
              </div>
              <h3 className={`font-headline-md text-headline-md text-lg ${service.featured ? 'text-primary' : 'text-on-surface'}`}>
                {service.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-primary' : 'bg-primary-fixed'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesCarousel;
