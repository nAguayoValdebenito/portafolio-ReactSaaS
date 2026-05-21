import React from 'react';
import { Code2, Briefcase, Globe, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  producto: [
    { label: 'Características', href: '#' },
    { label: 'Analítica', href: '#' },
    { label: 'Precios', href: '#' },
  ],
  compañia: [
    { label: 'Términos de Servicio', href: '#' },
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Contacto', href: '#' },
  ],
};

const socialIcons = [
  { icon: Globe, href: '#', label: 'Twitter' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
  { icon: Code2, href: '#', label: 'GitHub' },
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
              className="font-body-sm text-body-sm text-slate-400 hover:text-white transition-colors duration-200 w-fit"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-label-md text-label-md text-white font-semibold mb-1">Compañía</span>
          {footerLinks.compañia.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body-sm text-body-sm text-slate-400 hover:text-white transition-colors duration-200 w-fit"
            >
              {link.label}
            </a>
          ))}
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
