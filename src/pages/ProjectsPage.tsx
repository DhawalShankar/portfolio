import { projects } from "../data/portfolio";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400">Featured Work</h3>

      {projects.map((project, i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-lg p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
        >
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-semibold text-black text-sm md:text-base leading-snug">
              {project.title}
            </h4>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="shrink-0 text-gray-300 hover:text-black transition-colors duration-200"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>

          <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 text-xs rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}