import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { useToast } from '../../../context/ToastContext';
import { getFirebaseErrorMessage } from '../../../utils/firebaseErrors';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showToast('Correo de recuperación enviado exitosamente. Revisa tu bandeja de entrada.', 'success');
      setIsLoading(false);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error(err);
      showToast(getFirebaseErrorMessage(err), 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-bright text-on-surface min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-[12px] shadow-[0px_10px_20px_rgba(0,0,0,0.05)] border border-surface-container p-8 md:p-10 w-full flex flex-col gap-8 opacity-0-init animate-fade-in-up">
          <div className="text-center flex flex-col gap-2">
            <div className="mb-4 opacity-0-init animate-stagger-1">
              <Link to="/" className="font-headline-md text-headline-md text-primary tracking-tight">PredictiveSaaS</Link>
            </div>
            <h1 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-on-surface opacity-0-init animate-stagger-2">¿Olvidaste tu contraseña?</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant opacity-0-init animate-stagger-3">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleForgotPassword}>
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
            </div>
            <div className="opacity-0-init animate-stagger-5">
              <Button type="submit" isLoading={isLoading}>Enviar enlace de recuperación</Button>
            </div>
          </form>

          <div className="text-center mt-2 border-t border-outline-variant pt-6 opacity-0-init animate-stagger-6">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <Link to="/login" className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors duration-300 hover-underline-animation">Volver al inicio de sesión</Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8 opacity-0-init animate-stagger-6">
          <p className="font-label-sm text-label-sm text-outline">&copy; 2024 PredictiveSaaS. Acceso seguro.</p>
        </div>
      </main>
    </div>
  );
}
