import { profile } from "../data/portfolio";

interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: string;
}

const contacts: ContactItem[] = [
  {
    label: "Email",
    value: "dhawalmannu@gmail.com",
    href: `mailto:${profile.links.email}`,
    icon: "✉",
  },
  {
    label: "GitHub",
    value: "@dhawalshankar",
    href: profile.links.github,
    icon: "◈",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dhawalshukl",
    href: profile.links.linkedin,
    icon: "◉",
  },
  {
    label: "LeetCode",
    value: "@dhawalshankar",
    href: profile.links.leetcode,
    icon: "◐",
  },
  {
    label: "Resume",
    value: "View / Download PDF",
    href: profile.links.resume,
    icon: "◻",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Get in Touch</h3>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Open to collaborating on interesting projects, discussing emerging technologies, or
          exploring opportunities in full-stack development and embedded systems.
        </p>
      </div>

      <div className="space-y-2">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-black hover:shadow-sm group transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-lg w-5 text-center group-hover:text-black transition-colors duration-200">
                {c.icon}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400">{c.label}</p>
                <p className="text-sm font-medium text-black">{c.value}</p>
              </div>
            </div>
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-gray-200 group-hover:text-black transition-colors duration-200"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6">
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
          Thanks for visiting. 📚
        </p>
      </div>
    </div>
  );
}