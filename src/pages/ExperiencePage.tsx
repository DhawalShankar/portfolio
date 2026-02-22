import { experience, achievements } from "../data/portfolio";

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400">Roles & Recognition</h3>

      {/* Experience entries */}
      <div className="space-y-6">
        {experience.map((exp, i) => (
          <div key={i} className="border-l-2 border-black pl-5">
            <p className="font-bold text-black text-sm md:text-base">{exp.role}</p>
            <p className="text-xs text-gray-500 mt-0.5 mb-3">
              {exp.org} · {exp.period}
            </p>
            <ul className="space-y-1.5">
              {exp.points.map((point, j) => (
                <li key={j} className="text-xs md:text-sm text-gray-600 flex gap-2">
                  <span className="text-gray-300 shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Poetry & Writing */}
        <div className="border-l-2 border-gray-200 pl-5">
          <p className="font-bold text-black text-sm md:text-base">Poetry & Creative Writing</p>
          <p className="text-xs text-gray-500 mt-0.5 mb-3">Published Works & Awards</p>
          <ul className="space-y-1.5">
            {[
              "Published in Amar Ujala — major Hindi daily newspaper",
              "1st Prize, Slam Poetry Competition at JIIT Noida",
              "Featured works exploring human experience and technology",
            ].map((point, j) => (
              <li key={j} className="text-xs md:text-sm text-gray-600 flex gap-2">
                <span className="text-gray-300 shrink-0">—</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stats grid */}
      <div className="border-t border-gray-100 pt-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">By the Numbers</p>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a) => (
            <div key={a.label} className="bg-gray-50 rounded-lg p-4">
              <p className="font-bold text-black text-sm leading-snug">{a.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}