import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans antialiased p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-6">
            <div className="text-red-500 mx-auto w-14 h-14 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Ha ocurrido un error inesperado</h1>
            <p className="text-slate-500 text-sm">
              Algo salió mal. Puedes recargar la aplicación para intentarlo de nuevo.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: '#1A5FFF' }}
            >
              Recargar Aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
