import { profile } from "../data/portfolio";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">Introduction</h3>
        <div className="space-y-4">
          {profile.bio.map((para, i) => (
            <p key={i} className="text-sm md:text-base text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">Education</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="font-semibold text-black text-sm md:text-base">
              B.Tech — Electronics & Communication Engineering
            </p>
            <p className="text-gray-500 text-sm mt-0.5">JIIT Noida · 2023 – Present</p>
            <p className="text-gray-400 text-xs mt-1">CGPA: 7.4 / 10</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold text-black text-sm">Class 12th — CISCE Board</p>
            <p className="text-gray-500 text-sm mt-0.5">2023 · 92.25%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold text-black text-sm">Class 10th — CISCE Board</p>
            <p className="text-gray-500 text-sm mt-0.5">2021 · 97%</p>
          </div>
        </div>
      </div>

      {/* Quick facts */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">Quick Facts</h3>
        <ul className="space-y-2">
          {[
            "📍 Noida, Uttar Pradesh",
            "✉️ dhawalmannu@gmail.com",
            "💻 Backend Developer · Node.js / Express / MongoDB / SQL / Firebase",
            "✍️ Published in Amar Ujala (Hindi daily)",
            "🏆 1st Prize — University Slam Poetry, JIIT Noida",
            "🔗 1k+ LinkedIn followers",
          ].map((fact) => (
            <li key={fact} className="text-sm text-gray-600">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}