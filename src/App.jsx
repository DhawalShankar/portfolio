import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Code, Sun, Moon, Book, ExternalLink, Award, Briefcase, GraduationCap, FileText, Github, Linkedin } from 'lucide-react';
import { Menu, X } from 'lucide-react';
  
    const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
   


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Mobile Navigation Component
const MobileNav = ({ darkMode, pages, currentPage, goToPage, onClose }) => (
  <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 25 }}
    className={`fixed inset-y-0 right-0 w-64 z-50 shadow-2xl ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}
  >
    <div className="p-6">
      <button
        onClick={onClose}
        className={`mb-8 p-2 rounded-full ${
          darkMode ? 'bg-slate-800' : 'bg-orange-100'
        }`}
      >
        <X className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
      </button>

      <nav className="space-y-4">
        {pages.map((page, idx) => (
          <button
            key={page.id}
            onClick={() => {
              goToPage(idx);
              onClose();
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              currentPage === idx
                ? darkMode
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'bg-orange-100 text-orange-600 font-semibold'
                : darkMode
                ? 'text-slate-400 hover:bg-slate-800'
                : 'text-amber-700 hover:bg-orange-50'
            }`}
          >
            {page.title}
          </button>
        ))}
      </nav>
    </div>
  </motion.div>
);

// Mobile Header Component (no header tag - will be wrapped by parent)
const MobileHeader = ({ darkMode, setDarkMode, onMenuClick }) => (
  <nav
  className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between
    backdrop-blur-md shadow-sm transition-colors duration-300
    ${
      darkMode
        ? 'bg-slate-900/80 border-b border-slate-800'
        : 'bg-white/80 border-b border-orange-200'
    }`}
>
    <h1 className={`text-lg font-bold ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
      Dhawal Shukla
    </h1>
    
    <div className="flex items-center gap-3">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${
          darkMode ? 'bg-slate-800' : 'bg-orange-100'
        }`}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </button>
      
      <button
        onClick={onMenuClick}
        className={`p-2 rounded-full ${
          darkMode ? 'bg-slate-800' : 'bg-orange-100'
        }`}
      >
        <Menu className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
      </button>
    </div>
  </nav>
);

// Mobile Navigation Dots
const MobilePageIndicator = ({ darkMode, currentPage, totalPages, goToPage }) => (
  <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
    {[...Array(totalPages)].map((_, idx) => (
      <button
        key={idx}
        onClick={() => goToPage(idx)}
        className={`w-2 h-2 rounded-full transition-all ${
          currentPage === idx
            ? darkMode
              ? 'bg-cyan-400 w-6'
              : 'bg-orange-600 w-6'
            : darkMode
            ? 'bg-slate-600'
            : 'bg-orange-200'
        }`}
      />
    ))}
  </div>
);
// Touch-enabled page navigation
const MobilePageWrapper = ({ children, onSwipeLeft, onSwipeRight }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) onSwipeLeft();
    if (isRightSwipe) onSwipeRight();
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="w-full"
    >
      {children}
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState('blackhole');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "Dhawal Shukla - Portfolio";
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowIntro(false);
      return;
    }

    const blackholeTimer = setTimeout(() => setIntroPhase('flash'), 3000);
    const flashTimer = setTimeout(() => setIntroPhase('bookReveal'), 4000);
    const revealTimer = setTimeout(() => setIntroPhase('ready'), 5500);

    return () => {
      clearTimeout(blackholeTimer);
      clearTimeout(flashTimer);
      clearTimeout(revealTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBookClick = () => {
    if (introPhase === 'ready') {
      setShowIntro(false);
    }
  };

  const pages = [
    { id: 'cover', title: 'Cover', component: CoverPage },
    { id: 'about', title: 'About', component: AboutPage },
    { id: 'projects', title: 'Projects', component: ProjectsPage },
    { id: 'skills', title: 'Skills', component: SkillsPage },
    { id: 'experience', title: 'Experience', component: ExperiencePage },
    { id: 'contact', title: 'Contact', component: ContactPage }
  ];

  const goToPage = (index) => {
    if (index >= 0 && index < pages.length) {
      setDirection(index > currentPage ? 1 : -1);
      setCurrentPage(index);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showIntro) return;
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, showIntro]);

  const CurrentPageComponent = pages[currentPage].component;

  if (showIntro) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black" style={{ cursor: introPhase === 'ready' ? 'none' : 'default' }}>
        {introPhase === 'ready' && (
          <motion.div
            className="fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
            style={{
              left: cursorPos.x - 6,
              top: cursorPos.y - 6,
            }}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {introPhase === 'blackhole' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-96 h-96"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #000 0%, #1a1a2e 50%, #0f3460 100%)'
                }}
                animate={{
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(16, 185, 129, 0.3), transparent)',
                  filter: 'blur(20px)'
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 18 * Math.PI / 180) * 200],
                    y: [0, Math.sin(i * 18 * Math.PI / 180) * 200],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeIn"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {introPhase === 'flash' && (
          <>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, times: [0, 0.5, 1] }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5), transparent)'
              }}
              animate={{
                scale: [0, 3],
                opacity: [1, 0]
              }}
              transition={{ duration: 1 }}
            />
          </>
        )}

        {(introPhase === 'bookReveal' || introPhase === 'ready') && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative cursor-pointer"
              onClick={handleBookClick}
              whileHover={introPhase === 'ready' ? { scale: 1.05 } : {}}
              style={{ perspective: '2000px' }}
            >
              <motion.div
                className="relative w-80 h-96 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 rounded-lg shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)'
                }}
                animate={{
                  rotateY: introPhase === 'ready' ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: 4,
                  repeat: introPhase === 'ready' ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/50 to-transparent" />
                
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Book className="w-16 h-16 text-amber-200 mb-4 mx-auto" />
                    <h1 className="text-4xl font-bold text-amber-100 mb-2">
                      Dhawal Shukla
                    </h1>
                    <p className="text-amber-300 text-lg">Backend Engineer | Writer</p>
                    
                    {introPhase === 'ready' && (
                      <motion.p
                        className="text-amber-200 text-sm mt-8"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Click to enter →
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-amber-950 to-transparent" />
              </motion.div>

              {introPhase === 'ready' && [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 150],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 150],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
<div className={`min-h-screen transition-colors duration-500 overflow-hidden ${
  darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
}`}>
  {isMobile ? (
    <MobileHeader 
      darkMode={darkMode} 
      setDarkMode={setDarkMode}
      onMenuClick={() => setMobileMenuOpen(true)}
    />
  ) : (
    <header className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm ${
      darkMode ? 'bg-slate-900/80' : 'bg-white/80'
    } shadow-sm`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
          Dhawal Shukla
        </h1>
        
        <div className="flex items-center gap-6">
          {pages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => goToPage(idx)}
              className={`text-sm transition-all duration-200 ${
                currentPage === idx
                  ? darkMode
                    ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                    : 'text-orange-600 font-semibold border-b-2 border-orange-600'
                  : darkMode
                  ? 'text-slate-400 hover:text-cyan-400'
                  : 'text-amber-700 hover:text-orange-600'
              }`}
            >
              {page.title}
            </button>
          ))}
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-orange-100 hover:bg-orange-200'
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>
      </nav>
    </header>
  )}
<AnimatePresence>
  {mobileMenuOpen && isMobile && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setMobileMenuOpen(false)}
      />
      <MobileNav
        darkMode={darkMode}
        pages={pages}
        currentPage={currentPage}
        goToPage={goToPage}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )}
</AnimatePresence>

<div className="pt-24 pb-16 flex items-center justify-center min-h-screen px-4">
        <div className="relative" style={{ perspective: '2000px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={{
                enter: (direction) => ({
                  rotateY: direction > 0 ? 180 : -180,
                  opacity: 0,
                  scale: 0.8,
                }),
                center: {
                  rotateY: 0,
                  opacity: 1,
                  scale: 1,
                },
                exit: (direction) => ({
                  rotateY: direction > 0 ? -180 : 180,
                  opacity: 0,
                  scale: 0.8,
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
              className={`w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden ${
                darkMode ? 'bg-slate-800' : 'bg-white'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                minHeight: '600px'
              }}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-6 ${
                darkMode ? 'bg-gradient-to-r from-slate-900 to-slate-800' : 'bg-gradient-to-r from-amber-900 to-amber-800'
              }`} />
              
              <div className="pl-6">
                <CurrentPageComponent darkMode={darkMode} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div><MobilePageWrapper
          onSwipeLeft={() => goToPage(currentPage + 1)}
          onSwipeRight={() => goToPage(currentPage - 1)}
          darkMode={darkMode}
        >
                <div className={`pt-16 ${isMobile ? 'px-4' : 'px-8'}`}>
        
          <div className={`${isMobile ? 'min-h-[70vh]' : 'min-h-screen'} flex items-center justify-center`}>
            {/* Your page content */}
            <div className={`text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <h1 className="text-3xl font-bold mb-4">Page {currentPage + 1}</h1>
              <p className="text-sm text-slate-500">
                {isMobile ? 'Use Navbar to navigate' : 'Use arrow keys or buttons'}
              </p>
            </div>
          </div>
        
      </div>
      </MobilePageWrapper>
{/* Mobile page indicator */}
{isMobile ? (
  <MobilePageIndicator
    darkMode={darkMode}
    currentPage={currentPage}
    totalPages={pages.length}
    goToPage={goToPage}
  />
) : (
  <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-30">
    <button
      onClick={prevPage}
      disabled={currentPage === 0}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
        currentPage === 0
          ? 'opacity-50 cursor-not-allowed'
          : darkMode
          ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400'
          : 'bg-white hover:bg-orange-100 text-orange-600 shadow-lg'
      }`}
    >
      <ChevronLeft className="w-5 h-5" />
      <span className="font-medium">Previous</span>
    </button>

    <div className={`px-4 py-2 rounded-full ${
      darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-amber-800 shadow-lg'
    }`}>
      Page {currentPage + 1} of {pages.length}
    </div>

    <button
      onClick={nextPage}
      disabled={currentPage === pages.length - 1}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
        currentPage === pages.length - 1
          ? 'opacity-50 cursor-not-allowed'
          : darkMode
          ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400'
          : 'bg-white hover:bg-orange-100 text-orange-600 shadow-lg'
      }`}
    >
      <span className="font-medium">Next</span>
      <ChevronRight className="w-5 h-5" />
    </button>
    </div>
  )}
</div>
    
  );
};

const CoverPage = ({ darkMode }) => (
  <div
  className={`p-6 md:p-12 flex flex-col items-center justify-center min-h-[600px] ${
    darkMode ? 'text-white' : 'text-slate-900'
  }`}
>
  <div className="flex justify-center mb-8">
    <div
      className={`w-40 h-40 rounded-full border-4 overflow-hidden transition-all duration-300
        ${
          darkMode
            ? 'border-cyan-400 bg-slate-800 shadow-[0_0_25px_rgba(34,211,238,0.35)]'
            : 'border-orange-500 bg-orange-100 shadow-[0_0_25px_rgba(234,88,12,0.35)]'
        }`}
    >
      <img
        src="/ds.png"
        alt="Dhawal Shukla"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center w-full"
    >
      <motion.h1
        className={`text-3xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Dhawal Shukla
      </motion.h1>
      <p className={`text-lg md:text-2xl mb-2 ${darkMode ? 'text-slate-300' : 'text-amber-800'}`}>
        Backend Engineer
      </p>
      <p className={`text-sm md:text-lg mb-8 ${darkMode ? 'text-slate-400' : 'text-amber-600'}`}>
        DSA • 1.2k+ LinkedIn Followers • Writer
      </p>

      <div className="flex flex-wrap gap-3 md:gap-6 justify-center mt-12">
        <SocialLink icon={Mail} label="Email" href="mailto:dhawalmannu@gmail.com" darkMode={darkMode} />
        <SocialLink icon={Github} label="GitHub" href="https://github.com/dhawalshankar" darkMode={darkMode} />
        <SocialLink icon={FileText} label="Resume" href="https://drive.google.com/file/d/1zodZ1AqMNmWbzGSzmJerYLQGAHMEUwTa/view?usp=sharing" darkMode={darkMode} />
        <SocialLink icon={Linkedin} label="LinkedIn" href="https://linkedin.com/in/dhawalshukl" darkMode={darkMode} />
        <SocialLink icon={Code} label="LeetCode" href="https://leetcode.com/u/dhawalshankar/" darkMode={darkMode} />
      </div>
    </motion.div>
  </div>
);

const SocialLink = ({ icon: Icon, label, href, darkMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 ${
      darkMode
        ? 'bg-slate-700 hover:bg-slate-600 text-cyan-400'
        : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
    }`}
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-6 h-6" />
    <span className="text-xs font-medium">{label}</span>
  </motion.a>
);

const AboutPage = ({ darkMode }) => (
  <div className={`p-12 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
    <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
      About Me
    </h2>
    <div className="space-y-6 text-lg leading-relaxed">
      <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
        I'm a B.Tech student in Electronics and Communication Engineering at JIIT Noida, passionate about bridging hardware and software through full-stack development and embedded systems.
      </p>
      <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
        My journey includes building production-ready platforms like Cosmo India Prakashan (serving 100+ users) and ElectiveXChange (700+ users), alongside hands-on experience with UAV systems, Arduino automation, and ML-based assistive technology.
      </p>
      <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
        Beyond engineering, I'm a published writer with works featured in Amar Ujala and a 1st prize winner in university-level slam poetry. I believe creativity and technical rigor aren't opposites—they're complementary forces.
      </p>
      
      <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-orange-50'}`}>
        <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
          <GraduationCap className="inline w-6 h-6 mr-2" />
          Education
        </h3>
        <div className="space-y-2">
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            B.Tech in Electronics and Communication Engineering • JIIT Noida
          </p>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            2023 - 2027
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsPage = ({ darkMode }) => (
  <div className={`p-12 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
    <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
      Featured Projects
    </h2>
    <div className="space-y-6">
      <Project
        darkMode={darkMode}
        title="Cosmo India Prakashan"
        description="Media and publishing company platform with 100+ active users. Built serverless REST API with Node.js on Vercel, implementing JWT authentication, Razorpay payment integration, and automated email notifications."
        tech={['Node.js', 'MongoDB', 'JWT', 'Razorpay', 'Vercel']}
        link="https://cosmoindiaprakashan.in"
      />
      <Project
        darkMode={darkMode}
        title="ElectiveXChange"
        description="Course preference matching platform serving 700+ students at JIIT. Implemented priority-based matching algorithm reducing post-allotment confusion by 80% through automated 2-way elective exchange discovery."
        tech={['React', 'Firebase', 'Google OAuth', 'TailwindCSS']}
        link="https://electivexchange.vercel.app"
      />
      <Project
        darkMode={darkMode}
        title="IntelliSign - Sign Language Translator"
        description="Real-time sign language recognition system using OpenCV and MediaPipe for assistive technology. Implemented CNN-based classification for accurate gesture detection."
        tech={['Python', 'OpenCV', 'MediaPipe', 'TensorFlow']}
        link="#"
      />
      <Project
        darkMode={darkMode}
        title="UAV Quadcopter Assembly"
        description="Professional quadcopter assembly integrating Pixhawk controller, ESCs, GPS, and telemetry. Performed ArduPilot simulation and studied DGCA airspace regulations."
        tech={['ArduPilot', 'Pixhawk', 'UART/I2C', 'Flight Systems']}
        link="#"
      />
    </div>
  </div>
);

const Project = ({ darkMode, title, description, tech, link }) => (
  <motion.div
    className={`p-6 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-orange-50'}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h3>
    <p className={`mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
      {description}
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map(t => (
        <span
          key={t}
          className={`px-3 py-1 rounded-full text-sm ${
            darkMode ? 'bg-slate-600 text-slate-200' : 'bg-white text-amber-800'
          }`}
        >
          {t}
        </span>
      ))}
    </div>
    {link !== '#' && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 font-medium ${
          darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-orange-600 hover:text-orange-700'
        }`}
      >
        View Project <ExternalLink className="w-4 h-4" />
      </a>
    )}
  </motion.div>
);

const SkillsPage = ({ darkMode }) => (
  <div className={`p-12 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
    <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
      Technical Skills
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkillCategory
        darkMode={darkMode}
        title="Programming"
        skills={['JavaScript', 'Java', 'Python', 'C/C++', 'SQL']}
      />
      <SkillCategory
        darkMode={darkMode}
        title="Backend & APIs"
        skills={['Node.js', 'Express.js', 'MongoDB', 'Firestore', 'REST APIs']}
      />
      <SkillCategory
        darkMode={darkMode}
        title="Frontend"
        skills={['React', 'TailwindCSS', 'HTML/CSS', 'Responsive Design']}
      />
      <SkillCategory
        darkMode={darkMode}
        title="Embedded Systems"
        skills={['Arduino', 'Pixhawk/ArduPilot', 'UART/I2C', 'Sensor Integration']}
      />
      <SkillCategory
        darkMode={darkMode}
        title="Auth & Integrations"
        skills={['JWT', 'bcrypt', 'Google OAuth', 'Razorpay', 'Nodemailer']}
      />
      <SkillCategory
        darkMode={darkMode}
        title="Tools & Platforms"
        skills={['Git/GitHub', 'Vercel', 'Firebase', 'Linux', 'MATLAB']}
      />
    </div>
  </div>
);

const SkillCategory = ({ darkMode, title, skills }) => (
  <div className={`p-6 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-orange-50'}`}>
    <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span
          key={skill}
          className={`px-3 py-1 rounded-full text-sm ${
            darkMode ? 'bg-slate-600 text-slate-200' : 'bg-white text-amber-800'
          }`}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ExperiencePage = ({ darkMode }) => (
  <div className={`p-12 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
    <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
      Experience & Leadership
    </h2>
    <div className="space-y-8">
      <div className={`border-l-4 pl-6 ${darkMode ? 'border-cyan-400' : 'border-orange-600'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
          <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Core Team Member
          </h3>
        </div>
        <p className={`mb-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
          Developer Student Club, JIIT Noida • 2025 - Present
        </p>
        <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
          Co-organized technical workshops and hackathons, fostering community engagement in emerging technologies. Led development initiatives and mentored peers in full-stack development.
        </p>
      </div>

      <div className={`border-l-4 pl-6 ${darkMode ? 'border-cyan-400' : 'border-orange-600'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Award className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
          <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Poetry & Creative Writing
          </h3>
        </div>
        <p className={`mb-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
          Published Works & Awards
        </p>
        <ul className={`space-y-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          <li>• Published in Amar Ujala (Major Hindi Daily)</li>
          <li>• 1st Prize - Slam Poetry Competition, JIIT Noida</li>
          <li>• Featured works exploring human experiences</li>
        </ul>
      </div>

      <div className={`p-6 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-orange-50'}`}>
        <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
          Key Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>800+ Total Users</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Across deployed platforms</p>
          </div>
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>1k+ LinkedIn Network</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Professional connections</p>
          </div>
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Multiple Publications</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Poetry & technical writing</p>
          </div>
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Open Source</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Active GitHub contributor</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = ({ darkMode }) => (
  <div className={`p-12 ${darkMode ? 'text-white' : 'text-slate-900'} flex flex-col items-center justify-center min-h-[600px]`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-2xl"
    >
      <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`}>
        Let's Connect
      </h2>
      <p className={`text-xl mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
        Open to collaborating on innovative projects, discussing emerging technologies, or exploring opportunities in full-stack development and embedded systems.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <a
          href="mailto:dhawalmannu@gmail.com"
          className={`p-6 rounded-lg transition-all duration-300 ${
            darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <Mail className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Email</p>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>dhawalmannu@gmail.com</p>
        </a>
        
        <a
          href="https://linkedin.com/in/dhawalshukl"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-lg transition-all duration-300 ${
            darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <Linkedin className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>LinkedIn</p>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>1k+ Followers</p>
        </a>
        
        <a
          href="https://github.com/dhawalshankar"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-lg transition-all duration-300 ${
            darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <Github className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>GitHub</p>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>@dhawalshankar</p>
        </a>
        
        <a
          href="https://leetcode.com/u/dhawalshankar/"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-lg transition-all duration-300 ${
            darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <Code className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>LeetCode</p>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>@dhawalshankar</p>
        </a>
      </div>
      
      <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        Thanks for Visiting! See you again! 📚
      </p>
    </motion.div>
  </div>
);

export default App;