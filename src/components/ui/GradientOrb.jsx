export default function GradientOrb({ color = "green", size = "600px", className = "" }) {
  const colors = {
    green: "rgba(13,148,136,0.12)",
    blue: "rgba(14,165,233,0.08)",
    mixed: "rgba(13,148,136,0.08)",
  };

  return (
    <div
      className={`absolute rounded-full pointer-events-none animate-orb-drift ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
}
