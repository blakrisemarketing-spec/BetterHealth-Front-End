// A wide photo under a page's hero: the white look leans on people and the app
// rather than on decoration. `src` is a /photos or /blog/photos path in public.
export default function PagePhoto({ src, alt, className = "", position = "center", loading = "eager" }) {
  return (
    <div className={`px-4 sm:px-6 ${className}`}>
      <img
        src={src}
        alt={alt}
        width="1536"
        height="1024"
        loading={loading}
        className="mx-auto block w-full max-w-[1120px] aspect-[16/9] sm:aspect-[21/9] object-cover rounded-[28px]"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
