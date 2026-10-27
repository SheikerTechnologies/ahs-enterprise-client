export function CornerMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="corner-mark -left-[9px] -top-[9px]" />
      <span className="corner-mark -right-[9px] -top-[9px]" />
      <span className="corner-mark -bottom-[9px] -left-[9px]" />
      <span className="corner-mark -bottom-[9px] -right-[9px]" />
    </div>
  );
}
