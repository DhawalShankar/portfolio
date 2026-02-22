import { Section, SectionId } from "../App";
import { sections } from "../App";
import { useState } from "react";

interface BookViewProps {
  section: Section;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
}

export default function BookView({ section, onClose, onNavigate }: BookViewProps) {
  const PageComponent = section.component;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* ── Navbar ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200 focus:outline-none"
            aria-label="Back to bookshelf"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Desktop tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleNavigate(s.id)}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 focus:outline-none ${
                  s.id === section.id
                    ? `${s.color} text-white font-semibold`
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Mobile right side — current section name + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${section.color} text-white`}>
              {section.label}
            </span>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-1.5 rounded-md text-gray-500 hover:text-black hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                /* X icon */
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop dot indicator */}
          <div className={`hidden md:block w-2 h-2 rounded-full ${section.color}`} />
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2">
            <p className="text-xs uppercase tracking-widest text-gray-300 mb-2 px-2">Navigate to</p>
            <div className="grid grid-cols-2 gap-1.5">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNavigate(s.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors duration-150 focus:outline-none ${
                    s.id === section.id
                      ? `${s.color} text-white`
                      : "text-gray-600 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="pt-2 pb-1">
              <button
                onClick={onClose}
                className="w-full text-xs text-gray-400 hover:text-black py-1.5 text-center transition-colors"
              >
                ← Back to bookshelf
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Open book layout */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row" style={{ height: "75vh" }}>
          {/* Left page — title/decorative */}
          <div
            className={`relative w-full md:w-2/5 flex flex-col justify-between p-10 md:p-14 border-b md:border-b-0 md:border-r border-gray-100`}
          >
            {/* Chapter marker */}
            <div>
              <div className={`w-10 h-1 rounded-full ${section.color} mb-6`} />
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Chapter</p>
              <h2
                className={`text-5xl md:text-6xl font-bold leading-none tracking-tight text-black mb-4`}
              >
                {section.label}
              </h2>
              <p className={`text-sm font-medium ${section.textColor} tracking-wide`}>
                Dhawal Shukla
              </p>
            </div>

            {/* Decorative page lines + page number at bottom */}
            <div className="hidden md:block mt-auto">
              <div className="space-y-2 mb-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-px bg-gray-100"
                    style={{ width: `${60 + i * 5}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-300 tracking-widest">01</p>
            </div>

            {/* Spine shadow */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-100/60 to-transparent pointer-events-none" />
          </div>

          {/* Right page — content */}
          <div className="relative w-full md:w-3/5 flex flex-col min-h-0">
            {/* Horizontal lines (notebook feel) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-gray-50"
                  style={{ top: `${i * 56 + 40}px` }}
                />
              ))}
            </div>

            {/* Scrollable content area */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto p-8 md:p-14">
              <PageComponent />
            </div>

            {/* Page number pinned at bottom — outside scroll */}
            <div className="relative z-10 px-8 md:px-14 py-3 flex justify-end border-t border-gray-50">
              <p className="text-xs text-gray-300 tracking-widest">02</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}