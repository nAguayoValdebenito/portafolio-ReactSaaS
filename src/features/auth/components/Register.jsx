import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const navigate = useNavigate();

  const [empresa_nombre, setEmpresaNombre] = useState('');
  const [usuario_nombre, setUsuarioNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Step 1: Create the Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Step 2: Generate a unique Enterprise ID (eid)
      const eid = 'emp_' + Date.now();

      // Step 3: Write the enterprise document to Firestore
      await setDoc(doc(db, 'empresas', eid), {
        empresa_nombre,
        empresa_rubro: 'General',
        empresa_fecha_creacion: new Date(),
      });

      // Step 4: Write the user profile document linked to the enterprise
      await setDoc(doc(db, 'usuarios', uid), {
        eid,
        usuario_nombre,
        usuario_email: email,
        usuario_rol: 'administrador',
      });

      // Step 5: Redirect to the protected dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('No se pudo crear la cuenta. Verifica los datos e intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        @keyframes slideUpFade {
          0%   { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInStagger {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-card-entrance {
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .stagger-1 { animation: fadeInStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .stagger-2 { animation: fadeInStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .stagger-3 { animation: fadeInStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .stagger-4 { animation: fadeInStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
        .stagger-5 { animation: fadeInStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }
        .stagger-6 { animation: fadeInStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards; opacity: 0; }
        .stagger-7 { animation: fadeInStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards; opacity: 0; }
      `}</style>

      <div className="bg-[#F9F9F9] text-on-surface min-h-screen flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-lg bg-surface-container-lowest rounded-[12px] shadow-md p-8 md:p-10 border border-outline-variant/30 animate-card-entrance">

          {/* Logo */}
          <div className="text-center mb-8 stagger-1">
            <Link to="/" className="font-headline-lg text-headline-lg font-bold text-primary">
              PredictiveSaaS
            </Link>
          </div>

          {/* Titles */}
          <div className="text-center mb-8 stagger-2">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Crea tu cuenta corporativa</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Comienza a optimizar tus KPIs industriales hoy mismo</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm text-center stagger-2">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleRegister}>

            {/* Company Name */}
            <div className="stagger-3">
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5" htmlFor="company">
                Nombre de la Empresa
              </label>
              <input
                className="w-full font-body-md text-body-md text-on-surface bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A5FFF] focus:ring-4 focus:ring-[#1A5FFF]/20 transition-all duration-300"
                id="company"
                name="company"
                placeholder="ej. Agroinnova S.A."
                type="text"
                required
                value={empresa_nombre}
                onChange={(e) => setEmpresaNombre(e.target.value)}
              />
            </div>

            {/* Full Name */}
            <div className="stagger-4">
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5" htmlFor="name">
                Tu Nombre Completo
              </label>
              <input
                className="w-full font-body-md text-body-md text-on-surface bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A5FFF] focus:ring-4 focus:ring-[#1A5FFF]/20 transition-all duration-300"
                id="name"
                name="name"
                placeholder="Ingresa tu nombre"
                type="text"
                required
                value={usuario_nombre}
                onChange={(e) => setUsuarioNombre(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="stagger-5">
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5" htmlFor="email">
                Correo electrónico profesional
              </label>
              <input
                className="w-full font-body-md text-body-md text-on-surface bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A5FFF] focus:ring-4 focus:ring-[#1A5FFF]/20 transition-all duration-300"
                id="email"
                name="email"
                placeholder="nombre@empresa.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="stagger-6">
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="w-full font-body-md text-body-md text-on-surface bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-[#1A5FFF] focus:ring-4 focus:ring-[#1A5FFF]/20 transition-all duration-300"
                  id="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label="Mostrar contraseña"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-[#1A5FFF] transition-colors duration-200"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start pt-2 stagger-7">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 rounded border-outline-variant text-[#1A5FFF] focus:ring-[#1A5FFF] focus:ring-offset-surface-container-lowest bg-surface-container-lowest cursor-pointer transition-colors duration-200"
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none transition-colors duration-200 hover:text-on-surface" htmlFor="terms">
                  Acepto los Términos de Servicio y Política de Privacidad
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 stagger-7">
              <button
                className="w-full bg-[#1A5FFF] text-white font-label-md text-label-md py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1A5FFF]/30 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#1A5FFF] focus:ring-offset-2 focus:ring-offset-surface-container-lowest flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center stagger-7">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="text-[#1A5FFF] font-semibold hover:underline transition-colors duration-200 hover:text-[#1A5FFF]/80"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}