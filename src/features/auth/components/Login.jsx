import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <>
      <style>{`
        .opacity-0-init { opacity: 0; }
        
        .hover-underline-animation {
            position: relative;
        }
        .hover-underline-animation::after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: currentColor;
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
        }
        .hover-underline-animation:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }

        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-stagger-1 { animation: fadeInUp 0.6s ease-out 0.1s forwards; }
        .animate-stagger-2 { animation: fadeInUp 0.6s ease-out 0.2s forwards; }
        .animate-stagger-3 { animation: fadeInUp 0.6s ease-out 0.3s forwards; }
        .animate-stagger-4 { animation: fadeInUp 0.6s ease-out 0.4s forwards; }
        .animate-stagger-5 { animation: fadeInUp 0.6s ease-out 0.5s forwards; }
        .animate-stagger-6 { animation: fadeInUp 0.6s ease-out 0.6s forwards; }
      `}</style>

      <div className="bg-surface-bright text-on-surface min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
        <main className="w-full max-w-md">
          {/* Main Card Container */}
          <div className="bg-surface-container-lowest rounded-[12px] shadow-[0px_10px_20px_rgba(0,0,0,0.05)] border border-surface-container p-8 md:p-10 w-full flex flex-col gap-8 opacity-0-init animate-fade-in-up">
            {/* Header Section */}
            <div className="text-center flex flex-col gap-2">
              <div className="mb-4 opacity-0-init animate-stagger-1">
                <Link to="/" className="font-headline-md text-headline-md text-primary tracking-tight">PredictiveSaaS</Link>
              </div>
              <h1 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-on-surface opacity-0-init animate-stagger-2">Bienvenido de nuevo</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant opacity-0-init animate-stagger-3">Ingresa tus credenciales para acceder a tu panel de control.</p>
            </div>
            
            {/* Login Form */}
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              
              {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-4">
                {/* Email Field */}
                <div className="flex flex-col gap-2 opacity-0-init animate-stagger-4">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Correo Electrónico</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 placeholder:text-outline shadow-sm focus:shadow-md" 
                    id="email" 
                    name="email" 
                    placeholder="nombre@empresa.com" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* Password Field */}
                <div className="flex flex-col gap-2 opacity-0-init animate-stagger-5">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Contraseña</label>
                  <div className="relative w-full">
                    <input 
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 pr-10 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 placeholder:text-outline shadow-sm focus:shadow-md" 
                      id="password" 
                      name="password" 
                      placeholder="••••••••" 
                      required 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      aria-label="Mostrar contraseña" 
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-outline-variant hover:text-primary transition-colors duration-200 group" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-200" data-icon="visibility">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Options Row */}
              <div className="flex justify-end items-center opacity-0-init animate-stagger-6">
                <a className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors duration-300 hover-underline-animation" href="#">¿Olvidaste tu contraseña?</a>
              </div>
              {/* Primary Action */}
              <button 
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 opacity-0-init animate-stagger-6" 
                type="submit"
              >
                Iniciar Sesión
              </button>
            </form>
            {/* Footer / Sign Up Link */}
            <div className="text-center mt-2 border-t border-outline-variant pt-6 opacity-0-init animate-stagger-6">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                ¿No tienes una cuenta? <Link to="/register" className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors duration-300 ml-1 hover-underline-animation">Crear cuenta</Link>
              </p>
            </div>
          </div>
          {/* Trust Indicators / Simple Footer below card */}
          <div className="text-center mt-8 opacity-0-init animate-stagger-6">
            <p className="font-label-sm text-label-sm text-outline">
              © 2024 PredictiveSaaS. Acceso seguro.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}