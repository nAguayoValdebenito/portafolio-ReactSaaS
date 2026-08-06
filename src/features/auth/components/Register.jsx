import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { useToast } from '../../../context/ToastContext';
import { getFirebaseErrorMessage } from '../../../utils/firebaseErrors';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [empresa_nombre, setEmpresaNombre] = useState('');
  const [usuario_nombre, setUsuarioNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      const eid = 'emp_' + crypto.randomUUID();

      const batch = writeBatch(db);

      batch.set(doc(db, 'empresas', eid), {
        empresa_nombre,
        empresa_rubro: 'General',
        empresa_fecha_creacion: new Date(),
      });

      batch.set(doc(db, 'usuarios', uid), {
        eid,
        usuario_nombre,
        usuario_email: email,
        usuario_rol: 'administrador',
      });

      await batch.commit();

      showToast('¡Bienvenido a PredictiveSaaS!', 'success');
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      showToast(getFirebaseErrorMessage(err), 'error');
      setLoading(false);
    }
  };

  const getPasswordStrength = (pw) => {
    if (!pw) return { score: 0, width: 0, label: '', barClass: '', textClass: '' };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/\d/.test(pw)) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;

    if (score === 1) return { score, width: 33, label: 'Débil', barClass: 'bg-error', textClass: 'text-error' };
    if (score === 2) return { score, width: 66, label: 'Media', barClass: 'bg-secondary', textClass: 'text-secondary' };
    return { score, width: 100, label: 'Fuerte', barClass: 'bg-primary', textClass: 'text-primary' };
  };

  const strength = getPasswordStrength(password);

  return (
    <>
      <div className="bg-surface-bright text-on-surface min-h-screen flex items-center justify-center p-4 antialiased">
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

          {/* Form */}
          <form className="space-y-5" onSubmit={handleRegister}>

            <div className="stagger-3">
              <InputField
                label="Nombre de la Empresa"
                type="text"
                name="company"
                value={empresa_nombre}
                onChange={(e) => setEmpresaNombre(e.target.value)}
                placeholder="ej. Agroinnova S.A."
                required
              />
            </div>

            <div className="stagger-4">
              <InputField
                label="Tu Nombre Completo"
                type="text"
                name="name"
                value={usuario_nombre}
                onChange={(e) => setUsuarioNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div className="stagger-5">
              <InputField
                label="Correo electrónico profesional"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@empresa.com"
                required
              />
            </div>

            <div className="stagger-6">
              <InputField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
                rightElement={
                  <button
                    aria-label="Mostrar contraseña"
                    className="text-outline hover:text-primary transition-colors duration-200"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="flex items-center">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </span>
                  </button>
                }
              />
            </div>

            {password && (
              <div className="stagger-6 -mt-3 px-0.5">
                <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${strength.barClass}`} style={{ width: `${strength.width}%` }} />
                </div>
                <p className={`font-label-sm text-label-sm mt-1 ${strength.textClass}`}>{strength.label}</p>
              </div>
            )}

            {/* Terms */}
            <div className="flex items-start pt-2 stagger-7">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface-container-lowest bg-surface-container-lowest cursor-pointer transition-colors duration-200"
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

            <div className="pt-4 stagger-7">
              <Button type="submit" disabled={loading} isLoading={loading}>
                Crear Cuenta
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center stagger-7">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline transition-colors duration-200 hover:text-primary-container"
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