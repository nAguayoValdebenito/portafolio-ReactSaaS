import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch the user's profile document from the 'usuarios' collection
          const userDocRef = doc(db, 'usuarios', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            // Merge the auth session payload with the Firestore record
            setCurrentUser({
              ...user,
              eid: userData.eid,
              usuario_nombre: userData.usuario_nombre,
              usuario_email: userData.usuario_email,
              usuario_rol: userData.usuario_rol,
              ...userData // include any other potential user data
            });
          } else {
            // Fallback if the user document doesn't exist yet
            setCurrentUser({ ...user });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setCurrentUser({ ...user });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
