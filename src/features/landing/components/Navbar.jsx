import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../../../components/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Features', href: '#', active: true },
    { label: 'Soluciones', href: '#', active: false },
    { label: 'Precios', href: '#', active: false },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-outline-variant dark:border-outline w-full sticky top-0 z-50">
      <div className="flex justify-between items-center h-20 w-full px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">PredictiveSaaS</Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-label-md text-label-md relative pb-1 transition-colors duration-200 group ${
                link.active
                  ? 'text-primary dark:text-primary-fixed font-bold'
                  : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed'
              }`}
            >
              {link.label}
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-primary dark:bg-primary-fixed transform origin-left transition-transform duration-300 ${
                link.active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary" className="w-auto whitespace-nowrap" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
          <Button variant="primary" className="w-auto border border-transparent whitespace-nowrap" onClick={() => navigate('/register')}>Crear Cuenta</Button>
        </div>

        <button
          className="md:hidden text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-outline-variant px-6 py-5 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block font-label-md text-label-md py-2 transition-colors duration-200 ${
                link.active
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <hr className="border-outline-variant" />
          <Button variant="secondary" className="whitespace-nowrap" onClick={() => { navigate('/login'); setIsOpen(false); }}>Iniciar Sesión</Button>
          <Button variant="primary" className="border border-transparent whitespace-nowrap" onClick={() => { navigate('/register'); setIsOpen(false); }}>Crear Cuenta</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
