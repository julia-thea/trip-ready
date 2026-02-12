export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled,
  type = 'button',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  const styles = {
    primary:
      'px-7 py-2.5 bg-navy text-ivory text-sm font-semibold rounded-xl hover:bg-slate hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'px-7 py-2.5 bg-sky text-navy text-sm font-semibold rounded-xl border border-silver/50 hover:border-navy/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    outline:
      'px-7 py-2.5 bg-ivory text-navy text-sm font-medium rounded-xl  border border-navy/10 hover:border-navy/40 hover:bg-navy/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button className={styles[variant]} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
