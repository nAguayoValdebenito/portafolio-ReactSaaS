import React, { useEffect, useRef } from 'react';

const PricingCarousel = () => {
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
    <section ref={sectionRef} className="w-full py-20 px-margin-desktop bg-surface-container-low border-t border-outline-variant reveal-on-scroll">
      <div className="max-w-container-max mx-auto text-center mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Soluciones Flexibles. Resultados Reales.</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Elige el plan que mejor se adapte al volumen de tus datos y a las necesidades de tu equipo.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-8">
        {/* Basic */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-8 shadow-sm flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-primary/20">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Básico</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-on-surface">$9.990</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/mes</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3 flex-grow">
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Hasta 10,000 registros
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Dashboards estándar
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Soporte por email
            </li>
          </ul>
          <button className="w-full py-3 rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-primary-fixed transition-colors">
            Agendar demo
          </button>
        </div>
        {/* Standard (Featured) */}
        <div className="bg-surface-container-lowest rounded-xl border-2 border-primary p-8 shadow-lg relative flex flex-col gap-6 ring-4 ring-primary-fixed-dim/20 transform md:-translate-y-4 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl hover:ring-primary/40">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-label-sm px-4 py-1 rounded-full shadow-sm">
            Más popular
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-primary">Estándar</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-on-surface">$19.990</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/mes</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3 flex-grow">
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Registros ilimitados
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Modelos predictivos básicos
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Alertas en tiempo real
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Soporte prioritario
            </li>
          </ul>
          <button className="w-full py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-sm">
            Agendar demo
          </button>
        </div>
        {/* Pro */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-8 shadow-sm flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-primary/20">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Pro</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-on-surface">$100.000</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/mes</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3 flex-grow">
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Infraestructura dedicada
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              Modelos AI personalizados
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-sm">check</span>
              API Access
            </li>
          </ul>
          <button className="w-full py-3 rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-primary-fixed transition-colors">
            Agendar demo
          </button>
        </div>
      </div>
      <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-12 max-w-2xl mx-auto">
        * Todos los precios son por sucursal. ¿Tienes más de una? <a className="text-primary underline" href="#">Escríbenos</a> para un precio especial.
      </p>
    </section>
  );
};

export default PricingCarousel;
