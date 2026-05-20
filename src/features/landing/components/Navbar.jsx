import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-surface dark:bg-surface shadow-sm border-b border-outline-variant dark:border-outline docked full-width top-0 z-50 sticky">
      <div className="flex justify-between items-center h-20 w-full px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-gutter">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">PredictiveSaaS</Link>
        </div>
        <nav className="hidden md:flex gap-gutter items-center">
          <a className="font-label-md text-label-md text-primary dark:text-primary-fixed font-bold pb-1 transition-all duration-150 relative group" href="#">
            Features
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary dark:bg-primary-fixed transform origin-left transition-transform duration-300 scale-x-100"></span>
          </a>
          <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 relative group pb-1" href="#">
            Soluciones
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary dark:bg-primary-fixed transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </a>
          <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 relative group pb-1" href="#">
            Precios
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary dark:bg-primary-fixed transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors">Iniciar Sesión</Link>
          <Link to="/register" className="font-label-md text-label-md bg-primary-container text-on-primary hover:bg-primary transition-all duration-300 hover:scale-105 hover:shadow-lg px-4 py-2 rounded-lg shadow-sm">Crear Cuenta</Link>
        </div>
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
