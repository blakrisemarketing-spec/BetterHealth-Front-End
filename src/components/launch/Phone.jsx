/**
 * A slim, modern phone: thin black bezel, dynamic island, soft shadow.
 * The screen is 276px wide, the size the coded app screens are drawn for,
 * so scale the whole phone with `scale` rather than changing its width.
 */
export default function Phone({ children, label, scale = 1, className = "", style }) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: 294 * scale, height: 622 * scale, ...style }}
    >
      <div
        role="img"
        aria-label={label}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: 294, height: 622, transform: `scale(${scale})` }}
      >
        <div
          className="w-full h-full rounded-[48px] bg-[#111] p-[9px]"
          style={{
            boxShadow:
              "0 50px 100px -20px rgba(30,42,39,0.35), 0 30px 60px -30px rgba(30,42,39,0.4), inset 0 0 0 1.5px #2a2a2a",
          }}
        >
          <div className="relative w-full h-full rounded-[39px] overflow-hidden bg-cream" style={{ isolation: "isolate" }}>
            <div aria-hidden="true" className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[86px] h-[25px] rounded-full bg-black z-20" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
