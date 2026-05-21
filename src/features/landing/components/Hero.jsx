import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../../../components/Button';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full px-margin-desktop py-20 max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <h1 className="font-display-lg text-display-lg text-primary animate-fade-in-up">
            Transforma tus datos en decisiones. Automatiza tus KPIs.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant animate-fade-in-up animation-delay-100">
            La plataforma inteligente que se conecta a tu operación, predice tendencias y asegura el cumplimiento de tus objetivos comerciales sin complicar a tu equipo.
          </p>
          <div className="pt-4 animate-fade-in-up animation-delay-200">
            <Button variant="primary" className="w-auto" onClick={() => navigate('/register')}>
              Solicitar una Demo <ArrowRight size={24} />
            </Button>
          </div>
        </div>
        {/* Right Mockup */}
        <div className="relative w-full aspect-[4/3] bg-surface-container-low rounded-xl border border-outline-variant shadow-lg p-6 flex flex-col gap-4 animate-float">
          {/* Browser Bar */}
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-outline-variant">
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="mx-auto w-1/2 h-4 bg-surface-container rounded-sm"></div>
          </div>
          {/* Dashboard Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* KPI 1 */}
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-4 shadow-sm flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Ingresos Mensuales</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md text-on-surface">$45.2K</span>
                <span className="font-label-sm text-label-sm text-[#006837]">+14.7%</span>
              </div>
            </div>
            {/* KPI 2 */}
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-4 shadow-sm flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Costos Operativos</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md text-on-surface">$12.4K</span>
                <span className="font-label-sm text-label-sm text-[#006837]">-8.7%</span>
              </div>
            </div>
          </div>
          {/* Chart Area */}
          <div className="flex-grow bg-surface-container-lowest rounded-lg border border-outline-variant p-4 shadow-sm relative overflow-hidden">
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-4">Proyección de Crecimiento</span>
            {/* Fake Chart SVG */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary-fixed-dim to-transparent opacity-20"></div>
            <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 C20,80 40,90 60,40 C80,-10 100,50 100,50 L100,100 Z" fill="none" stroke="#0047ab" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            </svg>
          </div>
          {/* Popup Alert */}
          <div className="absolute bottom-4 right-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-3 shadow-md flex items-center gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#006837]">
              <CheckCircle size={20} fill="currentColor" />
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface block">Objetivo Q3 Alcanzado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
