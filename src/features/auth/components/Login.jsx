import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { useToast } from '../../../context/ToastContext';
import { getFirebaseErrorMessage } from '../../../utils/firebaseErrors';
import { useAuth } from '../../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (justLoggedIn && currentUser && !hasNavigated.current) {
      hasNavigated.current = true;
      showToast('¡Bienvenido a PredictiveSaaS!', 'success');
      navigate('/dashboard');
    }
  }, [currentUser, justLoggedIn, navigate, showToast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setJustLoggedIn(true);
    } catch (err) {
      console.error(err);
      showToast(getFirebaseErrorMessage(err), 'error');
      setIsLoading(false);
    }
  };

  return (
    <>
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
              <div className="flex flex-col gap-4">
                <div className="opacity-0-init animate-stagger-4">
                  <InputField
                    label="Correo Electrónico"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@empresa.com"
                    required
                  />
                </div>
                <div className="opacity-0-init animate-stagger-5">
                  <InputField
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    rightElement={
                      <button
                        aria-label="Mostrar contraseña"
                        className="text-outline-variant hover:text-primary transition-colors duration-200 group"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                         <span className="group-hover:scale-110 transition-transform duration-200">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </span>
                      </button>
                    }
                  />
                </div>
              </div>
              {/* Options Row */}
              <div className="flex justify-end items-center opacity-0-init animate-stagger-6">
                <Link to="/forgot-password" className="text-sm text-[#1A5FFF] hover:text-blue-700 transition-all duration-200 ease-out hover:scale-105 inline-block">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="opacity-0-init animate-stagger-6">
                <Button type="submit" isLoading={isLoading}>Iniciar Sesión</Button>
              </div>
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