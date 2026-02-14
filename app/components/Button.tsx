export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled,
  type = 'button',
  fullWidth = false,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}) {
  const base =
    'px-7 py-3 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none';

  const styles = {
    primary:
      'bg-navy text-ivory hover:bg-slate hover:shadow-lg hover:-translate-y-0.5',
    secondary:
      'bg-sky text-navy border border-silver/50 hover:border-navy/30 hover:shadow-md hover:-translate-y-0.5',
    outline:
      'bg-ivory text-navy border border-navy/10 hover:border-navy/40 hover:bg-navy/5',
  };

  return (
    <button
      className={`${base} ${styles[variant]} ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
