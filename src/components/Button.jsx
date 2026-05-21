const variantStyles = {
  primary: {
    base: 'bg-[#1A5FFF] text-white shadow-sm hover:shadow-md focus:ring-[#1A5FFF]',
    spinner: 'text-white',
  },
  secondary: {
    base: 'bg-white text-slate-700 border border-slate-300 shadow-sm hover:bg-slate-50 hover:shadow-md focus:ring-slate-400',
    spinner: 'text-slate-700',
  },
  danger: {
    base: 'bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md focus:ring-red-500',
    spinner: 'text-white',
  },
};

const Spinner = ({ spinnerColor }) => (
  <svg className={`animate-spin h-5 w-5 ${spinnerColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const Button = ({ children, type = 'button', onClick, disabled, isLoading, variant = 'primary', className = '' }) => {
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || isLoading}
    className={`w-full font-label-md text-label-md py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 ${styles.base} ${isLoading ? 'pointer-events-none' : ''} ${className}`}
  >
    {isLoading ? <Spinner spinnerColor={styles.spinner} /> : children}
  </button>
  );
};

export default Button;
