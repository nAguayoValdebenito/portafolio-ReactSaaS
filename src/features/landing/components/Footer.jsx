import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Briefcase, Globe, Mail, MapPin } from 'lucide-react';

const scrollToSection = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${id}`);
  }
};

const footerLinks = {
  producto: [
    { label: 'Características', href: '#features' },
    { label: 'Analítica', href: '#soluciones' },
    { label: 'Precios', href: '#precios' },
  ],
  compañia: [
    { label: 'Términos de Servicio', to: '/terms', type: 'route' },
    { label: 'Política de Privacidad', to: '/privacy', type: 'route' },
    { label: 'Contacto', href: 'mailto:soporte@predictivesaas.com', type: 'external' },
  ],
};

const socialIcons = [
  { icon: Globe, href: 'https://twitter.com/predictivesaas', label: 'Twitter' },
  { icon: Briefcase, href: 'https://linkedin.com/company/predictivesaas', label: 'LinkedIn' },
  { icon: Code2, href: 'https://github.com/predictivesaas', label: 'GitHub' },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <span className="font-headline-md text-headline-md text-white">PredictiveSaaS</span>
          <p className="font-body-sm text-body-sm text-slate-400 leading-relaxed">
            Transforma tus datos en decisiones inteligentes con nuestra plataforma de analítica predictiva.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-label-md text-label-md text-white font-semibold mb-1">Producto</span>
          {footerLinks.producto.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href.slice(1))}
              className="font-body-sm text-body-sm text-slate-400 hover:text-white transition-colors duration-200 w-fit"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-label-md text-label-md text-white font-semibold mb-1">Compañía</span>
          {footerLinks.compañia.map((link) => {
            if (link.type === 'route') {
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className="font-body-sm text-body-sm text-slate-400 hover:text-white transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className="font-body-sm text-body-sm text-slate-400 hover:text-white transition-colors duration-200 w-fit"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-label-md text-label-md text-white font-semibold mb-1">Contacto</span>
          <a
            href="mailto:soporte@predictivesaas.com"
            className="flex items-center gap-2 font-body-sm text-body-sm text-slate-400 hover:text-white transition-colors duration-200 w-fit"
          >
            <Mail size={14} className="flex-shrink-0" />
            soporte@predictivesaas.com
          </a>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-slate-400">
            <MapPin size={14} className="flex-shrink-0" />
            Santiago, Chile
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800">
        <p className="font-body-sm text-body-sm text-slate-500 text-center">
          &copy; 2026 PredictiveSaaS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
