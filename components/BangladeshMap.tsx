import type { Project } from "@/lib/data";

const positions = [
  { x: 40, y: 32 },
  { x: 54, y: 38 },
  { x: 58, y: 52 },
  { x: 70, y: 46 },
  { x: 79, y: 60 },
  { x: 62, y: 70 },
  { x: 32, y: 70 },
  { x: 48, y: 82 },
];

export function BangladeshMap({ projects }: { projects: Project[] }) {
  const visibleProjects = projects.slice(0, Math.min(projects.length, positions.length));

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#111827] p-4 md:p-6">
      <svg viewBox="0 0 100 100" className="mx-auto block h-[360px] w-full max-w-xl">
        <path
          d="M26 17 L42 8 L56 11 L67 19 L76 28 L82 36 L87 51 L82 62 L74 70 L67 78 L55 90 L44 84 L39 74 L30 68 L18 58 L22 48 L19 33 Z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />
        <path
          d="M44 28 L58 25 L61 36 L68 42 L64 51 L58 58 L49 56 L42 48 Z"
          fill="rgba(255,200,87,0.15)"
          stroke="rgba(255,200,87,0.3)"
          strokeWidth="1"
        />
        {visibleProjects.map((project, index) => {
          const point = positions[index % positions.length];
          return (
            <g key={project.slug}>
              <circle cx={point.x} cy={point.y} r="2.2" fill="#F7B945" />
              <circle cx={point.x} cy={point.y} r="4.8" fill="rgba(247,185,69,0.18)" />
              <text x={point.x + 3} y={point.y - 3} fontSize="4" fill="#E5E7EB" >
                {project.code.replace("PRJ-", "")}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-6 flex flex-wrap gap-2">
        {visibleProjects.map((project) => (
          <span
            key={project.slug}
            className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/70"
          >
            {project.location}
          </span>
        ))}
      </div>
    </div>
  );
}
