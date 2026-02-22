import { useState } from "react";
import Bookshelf from "./components/BookShelf";
import BookView from "./components/BookView";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";

export type SectionId = "about" | "projects" | "skills" | "experience" | "contact";

export interface Section {
  id: SectionId;
  label: string;
  color: string;
  textColor: string;
  component: React.FC;
}

export const sections: Section[] = [
  {
    id: "about",
    label: "About",
    color: "bg-rose-400",
    textColor: "text-rose-400",
    component: AboutPage,
  },
  {
    id: "projects",
    label: "Projects",
    color: "bg-amber-400",
    textColor: "text-amber-500",
    component: ProjectsPage,
  },
  {
    id: "skills",
    label: "Skills",
    color: "bg-emerald-400",
    textColor: "text-emerald-500",
    component: SkillsPage,
  },
  {
    id: "experience",
    label: "Experience",
    color: "bg-sky-400",
    textColor: "text-sky-500",
    component: ExperiencePage,
  },
  {
    id: "contact",
    label: "Contact",
    color: "bg-violet-400",
    textColor: "text-violet-500",
    component: ContactPage,
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [visible, setVisible] = useState(false);

  const openSection = (id: SectionId) => {
    setActiveSection(id);
    // slight delay for fade-in
    setTimeout(() => setVisible(true), 10);
  };

  const closeSection = () => {
    setVisible(false);
    setTimeout(() => setActiveSection(null), 350);
  };

  const navigateToSection = (id: SectionId) => {
    // Direct swap without closing — instant section switch
    setActiveSection(id);
  };

  const currentSection = sections.find((s) => s.id === activeSection) ?? null;

  return (
    <main className="min-h-screen bg-white font-['Georgia',serif]">
      {/* Home: bookshelf */}
      <div
        className={`transition-opacity duration-300 ${
          activeSection ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Bookshelf sections={sections} onSelect={openSection} />
      </div>

      {/* Open book view */}
      {activeSection && currentSection && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-350 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <BookView section={currentSection} onClose={closeSection} onNavigate={navigateToSection} />
        </div>
      )}
    </main>
  );
}