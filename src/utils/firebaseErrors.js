const firebaseErrorDictionary = {
  'auth/invalid-credential': 'El correo electrónico o la contraseña son incorrectos.',
  'auth/user-not-found': 'El correo electrónico o la contraseña son incorrectos.',
  'auth/wrong-password': 'La contraseña ingresada es incorrecta.',
  'auth/email-already-in-use': 'Este correo electrónico ya se encuentra registrado.',
  'auth/weak-password': 'La contraseña es muy débil. Debe tener al menos 6 caracteres.',
  'auth/invalid-email': 'El formato del correo electrónico no es válido.',
};

export function getFirebaseErrorMessage(error) {
  return firebaseErrorDictionary[error?.code] || 'Ha ocurrido un error inesperado. Inténtalo de nuevo.';
}
