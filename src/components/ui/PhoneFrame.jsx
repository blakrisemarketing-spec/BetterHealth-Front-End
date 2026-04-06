export default function PhoneFrame({ src, alt, className = "" }) {
  return (
    <div className={`w-full max-w-[280px] rounded-[36px] overflow-hidden bg-[#E8E8E8] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] relative ${className}`}>
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-[#E8E8E8] rounded-b-2xl z-10" />
      {/* Screen */}
      <div className="w-full rounded-[28px] overflow-hidden bg-white">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    </div>
  );
}
