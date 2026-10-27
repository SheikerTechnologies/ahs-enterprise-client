export function StatusStamp({
  status,
  className = "",
}: {
  status: "COMPLETED" | "ONGOING";
  className?: string;
}) {
  const isComplete = status === "COMPLETED";
  return (
    <span
      className={`stamp inline-flex items-center gap-1.5 rounded-sm border-2 px-2.5 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.14em] ${
        isComplete
          ? "border-chart-green text-chart-green"
          : "border-amber text-amber-dark"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isComplete ? "bg-chart-green" : "bg-amber"
        }`}
      />
      {status}
    </span>
  );
}
