export default function Badge({ children, variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-primary-bg text-primary border-primary/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    muted: "bg-section-alt text-text-secondary border-border",
  };

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
