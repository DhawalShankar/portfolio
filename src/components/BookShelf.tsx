import { Section, SectionId } from "../App";

interface BookshelfProps {
  sections: Section[];
  onSelect: (id: SectionId) => void;
}

export default function Bookshelf({ sections, onSelect }: BookshelfProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-12 px-6"
      style={{ background: "#f7f3ee" }}
    >
      {/* Header */}
      <header className="text-center w-full max-w-3xl">
        <p
          className="text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: "#b89a7a", fontFamily: "'Georgia', serif" }}
        >
          Portfolio
        </p>
        <h1
          className="leading-none mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 600,
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "#1a1208",
            letterSpacing: "0.03em",
          }}
        >
          Dhawal Shukla
        </h1>
        <p
          className="text-base md:text-xl"
          style={{
            color: "#7a6650",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "0.04em",
          }}
        >
          Backend Developer &nbsp;·&nbsp; ECE @ JIIT &nbsp;·&nbsp; Writer
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-16" style={{ background: "#c9a97a" }} />
          <span style={{ color: "#c9a97a", fontSize: "1.1rem" }}>✦</span>
          <div className="h-px w-16" style={{ background: "#c9a97a" }} />
        </div>
      </header>

      {/* Wooden Bookcase */}
      <div className="w-full max-w-2xl mt-8">
        <div
          className="relative rounded-t-sm"
          style={{
            background: "linear-gradient(135deg, #6b3f1a 0%, #8b5a2b 30%, #7a4e22 60%, #5c3410 100%)",
            padding: "14px 14px 0 14px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Cabinet top rail */}
          <div
            className="absolute -top-3 left-0 right-0 rounded-t-sm"
            style={{
              height: "14px",
              background: "linear-gradient(180deg, #c49a5a 0%, #a07840 50%, #8b6232 100%)",
              boxShadow: "0 -2px 0 #d4aa6a, inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          />

          {/* Inner back wall */}
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #3d2208 0%, #2e1a06 100%)",
              padding: "20px 12px 0 12px",
            }}
          >
            {/* Back wall grain */}
            {[10, 25, 42, 58, 74, 90].map((pct) => (
              <div
                key={pct}
                className="absolute top-0 bottom-0 opacity-10"
                style={{ left: `${pct}%`, width: "1px", background: "#8b5a2b" }}
              />
            ))}

            {/* Books */}
            <div className="flex items-end justify-center gap-1.5 md:gap-2 relative z-10">
              {sections.map((section, i) => (
                <Book key={section.id} section={section} index={i} onSelect={onSelect} />
              ))}
            </div>

            {/* Shelf surface */}
            <div
              style={{
                height: "16px",
                background: "linear-gradient(180deg, #c49a5a 0%, #a07840 60%, #8b6232 100%)",
                boxShadow: "inset 0 3px 8px rgba(0,0,0,0.4), 0 2px 0 rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Cabinet base */}
          <div
            style={{
              height: "20px",
              background: "linear-gradient(180deg, #7a4e22 0%, #5c3410 60%, #3d2008 100%)",
              borderRadius: "0 0 4px 4px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Floor shadow */}
        <div
          style={{
            height: "10px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.25) 0%, transparent 70%)",
            marginTop: "2px",
          }}
        />
      </div>

      {/* Footer hint — clearly visible */}
      <div className="text-center mt-8">
        <p
          style={{
            color: "#8a6a4a",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "0.95rem",
            letterSpacing: "0.05em",
          }}
        >
          — click a book to open —
        </p>
      </div>
    </div>
  );
}

interface BookProps {
  section: Section;
  index: number;
  onSelect: (id: SectionId) => void;
}

const heights = ["210px", "255px", "188px", "238px", "205px"];
const bookWidths = ["58px", "50px", "62px", "54px", "58px"];

const bookColors: Record<string, { bg: string; shadow: string }> = {
  "bg-rose-400":    { bg: "linear-gradient(90deg, #c0394f, #e05070, #c8405a)", shadow: "#8b1a2a" },
  "bg-amber-400":   { bg: "linear-gradient(90deg, #b87000, #e09020, #c07a10)", shadow: "#7a4800" },
  "bg-emerald-400": { bg: "linear-gradient(90deg, #0a7a5a, #10a07a, #0d8a68)", shadow: "#064a38" },
  "bg-sky-400":     { bg: "linear-gradient(90deg, #0a6890, #1490c0, #0c78a8)", shadow: "#05405c" },
  "bg-violet-400":  { bg: "linear-gradient(90deg, #5a2a9a, #7c4ac8, #6438b0)", shadow: "#38186a" },
};

function Book({ section, index, onSelect }: BookProps) {
  const colors = bookColors[section.color] ?? { bg: "#888", shadow: "#555" };

  return (
    <button
      onClick={() => onSelect(section.id)}
      aria-label={`Open ${section.label}`}
      className="relative flex-shrink-0 flex items-center justify-center cursor-pointer group focus:outline-none select-none transition-transform duration-300 ease-out hover:-translate-y-5 active:translate-y-0"
      style={{
        height: heights[index] ?? "220px",
        width: bookWidths[index] ?? "54px",
        background: colors.bg,
        borderRadius: "2px 2px 0 0",
        boxShadow: `4px 0 0 ${colors.shadow}, inset 4px 0 8px rgba(0,0,0,0.2)`,
      }}
    >
      {/* Spine binding crease */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: "10px", background: "linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.05))" }}
      />

      {/* Decorative bands */}
      <div className="absolute left-0 right-0" style={{ top: "18px", height: "3px", background: "rgba(255,255,255,0.2)" }} />
      <div className="absolute left-0 right-0" style={{ top: "24px", height: "1px", background: "rgba(255,255,255,0.1)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "22px", height: "3px", background: "rgba(255,255,255,0.2)" }} />
      <div className="absolute left-0 right-0" style={{ bottom: "16px", height: "1px", background: "rgba(255,255,255,0.1)" }} />

      {/* Page edge top */}
      <div
        className="absolute left-2.5 right-0"
        style={{
          top: "-5px",
          height: "6px",
          background: "linear-gradient(90deg, #d8d0c0, #f0ebe0, #e4ddd0, #f5f0e8)",
          borderRadius: "1px 2px 0 0",
        }}
      />

      {/* Label */}
      <span
        className="relative z-10 font-bold uppercase select-none"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          color: "#fff",
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          fontFamily: "'Georgia', serif",
        }}
      >
        {section.label}
      </span>

      {/* Hover shimmer */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/12 transition-colors duration-300" />
    </button>
  );
}