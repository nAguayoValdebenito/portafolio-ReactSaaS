import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

// Icons
const SuccessIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idCounter = useRef(0);
  const timersRef = useRef([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    idCounter.current += 1;
    const id = idCounter.current;
    
    setToasts((prev) => [...prev, { id, message, type }]);

    const timerId = setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== timerId);
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);

    timersRef.current.push(timerId);
  }, []);

  const value = {
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          let styleClass = "bg-white border text-gray-800";
          let Icon = InfoIcon;
          
          if (toast.type === 'success') {
            styleClass = "bg-green-50 text-green-600 border-green-200";
            Icon = SuccessIcon;
          } else if (toast.type === 'error') {
            styleClass = "bg-red-50 text-red-600 border-red-200";
            Icon = ErrorIcon;
          } else if (toast.type === 'info') {
            styleClass = "bg-blue-50 text-blue-600 border-blue-200";
          }

          return (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm border pointer-events-auto transition-all ${styleClass}`}
              role="alert"
            >
              <Icon />
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
