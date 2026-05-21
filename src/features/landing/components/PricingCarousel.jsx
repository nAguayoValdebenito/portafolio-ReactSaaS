import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import Button from '../../../components/Button';

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
    <section ref={sectionRef} aria-label="Precios" className="w-full py-20 px-margin-desktop bg-surface-container-low border-t border-outline-variant reveal-on-scroll">
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
              <span aria-label="9.990 pesos chilenos por mes" className="font-display-lg text-display-lg text-on-surface">$9.990</span>
              <span aria-hidden="true" className="font-body-md text-body-md text-on-surface-variant">/mes</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3 flex-grow">
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Hasta 10,000 registros
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Dashboards estándar
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Soporte por email
            </li>
          </ul>
          <Button variant="secondary" aria-label="Agendar demo plan Básico">Agendar demo</Button>
        </div>
        {/* Standard (Featured) */}
        <div className="bg-surface-container-lowest rounded-xl border-2 border-primary p-8 shadow-lg relative flex flex-col gap-6 ring-4 ring-primary-fixed-dim/20 transform md:-translate-y-4 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl hover:ring-primary/40">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-label-sm px-4 py-1 rounded-full shadow-sm">
            Más popular
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-primary">Estándar</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span aria-label="19.990 pesos chilenos por mes" className="font-display-lg text-display-lg text-on-surface">$19.990</span>
              <span aria-hidden="true" className="font-body-md text-body-md text-on-surface-variant">/mes</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3 flex-grow">
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Registros ilimitados
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Modelos predictivos básicos
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Alertas en tiempo real
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Soporte prioritario
            </li>
          </ul>
          <Button variant="primary" aria-label="Agendar demo plan Estándar">Agendar demo</Button>
        </div>
        {/* Pro */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-8 shadow-sm flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-primary/20">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Pro</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span aria-label="100.000 pesos chilenos por mes" className="font-display-lg text-display-lg text-on-surface">$100.000</span>
              <span aria-hidden="true" className="font-body-md text-body-md text-on-surface-variant">/mes</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3 flex-grow">
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Infraestructura dedicada
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              Modelos AI personalizados
            </li>
            <li className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Check size={16} className="text-primary flex-shrink-0" />
              API Access
            </li>
          </ul>
          <Button variant="secondary" aria-label="Agendar demo plan Pro">Agendar demo</Button>
        </div>
      </div>
      <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-12 max-w-2xl mx-auto">
        * Todos los precios son por sucursal. ¿Tienes más de una? <a className="text-primary underline" href="#">Escríbenos</a> para un precio especial.
      </p>
    </section>
  );
};

export default PricingCarousel;
