import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let profileUnsubscribe;

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoaded(true);

      if (profileUnsubscribe) {
        profileUnsubscribe();
        profileUnsubscribe = null;
      }

      if (user) {
        setProfileLoaded(false);
        setAuthError(null);

        const userDocRef = doc(db, 'usuarios', user.uid);
        
        profileUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCurrentUser({
              ...user,
              ...userData
            });
            setProfileLoaded(true);
            setAuthError(null);
          } else {
            setCurrentUser(null);
            setAuthError('Perfil de usuario no encontrado o incompleto.');
            setProfileLoaded(true);
          }
        }, (error) => {
          console.error("Error fetching user data from Firestore:", error);
          setCurrentUser(null);
          setAuthError('Error de sincronización con la base de datos.');
          setProfileLoaded(true);
        });

      } else {
        setCurrentUser(null);
        setProfileLoaded(true);
        setAuthError(null);
      }
    });

    return () => {
      authUnsubscribe();
      if (profileUnsubscribe) profileUnsubscribe();
    };
  }, []);

  const loading = !authLoaded || !profileLoaded;

  const value = useMemo(() => ({
    currentUser,
    loading,
    authError
  }), [currentUser, loading, authError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
