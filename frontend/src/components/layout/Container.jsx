export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}