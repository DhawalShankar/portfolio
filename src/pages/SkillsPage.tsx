import { skills } from "../data/portfolio";

export default function SkillsPage() {
  return (
    <div className="space-y-6">
      <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400">Technical Arsenal</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {skills.map((group) => (
          <div key={group.category} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-700 text-xs rounded-full hover:bg-black hover:text-white hover:border-black transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DSA mention */}
      <div className="border-t border-gray-100 pt-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Problem Solving</p>
        <div className="flex items-center gap-4">
          <a
            href="https://leetcode.com/u/dhawalshankar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black border-b border-gray-200 hover:border-black transition-colors duration-200"
          >
            LeetCode → @dhawalshankar
          </a>
          <span className="text-xs text-gray-400">Data Structures & Algorithms</span>
        </div>
      </div>
    </div>
  );
}