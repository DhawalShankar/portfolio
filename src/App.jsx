import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowRight, Code, Palette, Zap, Sun, Moon, FileText, Lightbulb, Hand, BookOpenCheck, Flower } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);
  const heroRef = useRef(null);
  const characterRef = useRef(null);
  const windowRef = useRef(null);
  const noteRef = useRef(null);
  const windowLeftRef = useRef(null);
  const windowRightRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    if (!showCharacter) return;

    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([windowRef.current, characterRef.current, noteRef.current], { opacity: 0 });
    gsap.set([windowLeftRef.current, windowRightRef.current], { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(characterRef.current, { scale: 0.3, x: 0, y: 30 });
    gsap.set(noteRef.current, { scale: 0 });

    // Animation sequence - adjusted for smaller character and right position
    tl.to(windowRef.current, { opacity: 1, duration: 0.5, delay: 2 })
      .to([windowLeftRef.current, windowRightRef.current], { scaleX: 1, duration: 0.8, ease: 'power2.out' })
      .to(characterRef.current, { scale: 0.5, opacity: 1, y: 10, duration: 0.6, ease: 'back.out(2)' })
      .to(headRef.current, { rotation: -20, transformOrigin: 'center center', duration: 0.4, ease: 'power2.inOut' })
      .to(headRef.current, { rotation: 20, duration: 0.6, ease: 'power2.inOut' })
      .to(headRef.current, { rotation: 0, duration: 0.3, ease: 'power2.inOut' })
      .to(characterRef.current, { scale: 1, y: 80, duration: 1.2, ease: 'power2.out' })
      .to(characterRef.current, {
        x: -200,
        duration: 3,
        ease: 'none',
        onUpdate: function() {
          const bob = Math.sin(this.progress() * Math.PI * 12) * 5;
          gsap.set(characterRef.current, { y: 80 + bob });
        }
      })
      .to(headRef.current, { rotation: 25, duration: 0.3, ease: 'power1.out' })
      .to(characterRef.current, { scale: 1.1, duration: 0.5 }, '<')
      .to(characterRef.current, { y: 60, duration: 0.3, ease: 'power2.out' })
      .to(characterRef.current, { y: 80, duration: 0.3, ease: 'bounce.out' })
      .to(headRef.current, { rotation: 0, duration: 0.3 }, '<')
      .to(characterRef.current, { scale: 1, duration: 0.3 }, '<')
      .to(characterRef.current, { scaleY: 0.85, scaleX: 1.05, duration: 0.4, ease: 'power2.out' })
      .to(characterRef.current, {
        x: -400,
        y: 50,
        duration: 2.5,
        ease: 'power1.inOut',
        onUpdate: function() {
          const sneak = Math.sin(this.progress() * Math.PI * 18) * 4;
          gsap.set(characterRef.current, { y: 50 + sneak });
        }
      })
      .to(characterRef.current, { scaleY: 1, scaleX: 1, duration: 0.4 })
      .to(noteRef.current, { scale: 1, opacity: 1, rotation: 5, duration: 0.6, ease: 'elastic.out(1, 0.6)', delay: 0.3 })
      .to(characterRef.current, { y: 30, duration: 0.4, ease: 'power2.out', delay: 0.5 })
      .to(characterRef.current, { y: 50, duration: 0.4, ease: 'bounce.out' })
      .to(headRef.current, { rotation: -15, duration: 0.2, repeat: 5, yoyo: true, ease: 'power1.inOut' })
      .to(characterRef.current, {
        x: 0,
        duration: 1.5,
        ease: 'power2.in',
        onUpdate: function() {
          const run = Math.sin(this.progress() * Math.PI * 15) * 8;
          gsap.set(characterRef.current, { y: 50 + run });
        }
      })
      .to(characterRef.current, { scale: 0.7, y: 40, duration: 0.5, ease: 'power2.in' })
      .to(characterRef.current, { scale: 0.4, y: 20, duration: 0.4, ease: 'power2.in' })
      .to(characterRef.current, { scale: 0.2, opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' })
      .to([windowLeftRef.current, windowRightRef.current], { scaleX: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.2')
      .to(windowRef.current, { opacity: 0, duration: 0.5, onComplete: () => setShowCharacter(false) }, '+=0.3')
      .to(noteRef.current, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' }, '<');

    return () => tl.kill();
  }, [showCharacter]);

  useEffect(() => {
    // Hero animations
    const heroElements = heroRef.current?.querySelectorAll('.hero-animate');
    heroElements?.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out' }
      );
    });

    // Floating animation
    document.querySelectorAll('.float-animation').forEach((el, i) => {
      gsap.to(el, {
        y: '+=20',
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Scroll animations
    document.querySelectorAll('.scroll-animate').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  const projects = [
    {
      title: "CCS - School Website",
      desc: "A React-based Web App with Razorpay Payment Portal",
      tech: ["ReactJS", "TailwindCSS"],
      icon: BookOpenCheck,
      link: "https://ccs-official.vercel.app/"
    },
    {
      title: "IntelliSign",
      desc: "A CNN based ML software for ASL based Sign Language Translation",
      tech: ["CNN", "OpenCV", "MediaPipe", "Streamlit"],
      icon: Hand,
      link: "https://github.com/DhawalShankar/intellisign.git"
    },
    {
      title: "ElectiveXChange",
      desc: "ElectiveXchange streamlines elective swapping for students, making course selection intuitive, collaborative, and interactive — a modern solution for academic planning.",
      tech: ["Firebase", "Firestore", "ReactJS", "TailwindCSS"],
      icon: Flower,
      link: "https://electivexchange.vercel.app/"
    }
  ];

  const skills = [
    { icon: Lightbulb, name: "Problem Solving", items: ["Java", "Data Structures", "Algorithms"] },
    { icon: Code, name: "Development", items: ["React", "Node.js", "Python", "TailwindCSS", "Firebase"] },
    { icon: Palette, name: "Design", items: ["Figma", "Canva"] },
    { icon: Zap, name: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] }
  ];

  const navLinks = ['About', 'Projects', 'Skills', 'Contact'];

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' : 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 text-slate-900'} min-h-screen transition-colors duration-500`}>
      {/* Animated Window and Character */}
      {showCharacter && (
        <>
          {/* Desktop Version */}
          <div className="fixed top-20 right-8 z-[60] pointer-events-none hidden md:block">
            <div ref={windowRef} className="relative" style={{ width: '120px', height: '110px', opacity: 0 }}>
              <div className="absolute inset-0 bg-black rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent animate-pulse"></div>
                <div ref={windowLeftRef} className="absolute left-0 top-0 bottom-0 right-1/2 bg-gradient-to-r from-slate-900 via-slate-800 to-black" style={{ transformOrigin: 'right center' }} />
                <div ref={windowRightRef} className="absolute right-0 top-0 bottom-0 left-1/2 bg-gradient-to-l from-slate-900 via-slate-800 to-black" style={{ transformOrigin: 'left center' }} />
              </div>

              <div ref={characterRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div ref={headRef} style={{ display: 'inline-block' }}>
                  <img src="/SHIN.png" alt="Shin-chan" style={{ width: '70px', height: 'auto', imageRendering: 'crisp-edges', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
                </div>
              </div>
            </div>

            <div ref={noteRef} className={`absolute top-32 -left-24 ${darkMode ? 'bg-yellow-300' : 'bg-yellow-200'} p-3 rounded-lg shadow-2xl border-2 ${darkMode ? 'border-yellow-400' : 'border-yellow-300'}`} style={{ width: '160px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/60 rounded-sm shadow-sm" style={{ transform: 'translateX(-50%) rotate(-2deg)' }}></div>
              <div className="relative">
                <p className="text-slate-900 text-sm font-bold mb-1" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', cursive" }}>Yo! 👋</p>
                <p className="text-slate-800 text-xs leading-relaxed" style={{ fontFamily: "'Comic Sans MS', cursive" }}>This Guy is looking for a summer internship! Hire Him! 🚀</p>
                <div className="mt-2 pt-1 border-t border-yellow-400/50">
                  <p className="text-slate-600 text-[10px] italic text-right">- Shinchan Nohara</p>
                </div>
              </div>
              <div className="absolute -top-1.5 right-6">
                <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg"></div>
                <div className="w-0.5 h-2 bg-gray-400 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Mobile Version - Micro Character */}
          <div className="fixed bottom-4 right-4 z-[60] pointer-events-none md:hidden">
  <div className="relative">
    <img src="/SHIN.png" alt="Shin-chan" className="w-16 h-16 object-contain" style={{ imageRendering: 'crisp-edges', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
              
              <div className={`absolute -top-16 -left-20 ${darkMode ? 'bg-yellow-300' : 'bg-yellow-200'} p-2 rounded-lg shadow-xl border ${darkMode ? 'border-yellow-400' : 'border-yellow-300'}`} style={{ width: '110px' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/60 rounded-sm shadow-sm" style={{ transform: 'translateX(-50%) rotate(-2deg)' }}></div>
                <p className="text-slate-900 text-[10px] font-bold mb-0.5" style={{ fontFamily: "'Comic Sans MS', cursive" }}>Yo! Hire this Guy! 🚀</p>
                <p className="text-slate-600 text-[8px] italic" style={{ fontFamily: "'Comic Sans MS', cursive" }}>- Shinchan</p>
                <div className="absolute -top-1 right-4">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-md"></div>
                  <div className="w-0.5 h-1.5 bg-gray-400 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full z-[70] ${darkMode ? 'bg-slate-950/80 border-slate-800/50' : 'bg-white/80 border-orange-200/50'} backdrop-blur-lg border-b transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`text-2xl font-bold ${darkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} bg-clip-text text-transparent`}>
            Portfolio
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors duration-300 relative group`}>
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? 'bg-cyan-400' : 'bg-orange-500'} group-hover:w-full transition-all duration-300`}></span>
              </a>
            ))}
            
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-orange-100 hover:bg-orange-200'} transition-all duration-300`} aria-label="Toggle theme">
              {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-slate-700" size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-orange-100'}`}>
              {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-slate-700" size={20} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[65] ${darkMode ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-lg transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
          {navLinks.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors duration-300`}>
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-72 h-72 ${darkMode ? 'bg-cyan-500/20' : 'bg-orange-400/30'} rounded-full blur-3xl float-animation`}></div>
          <div className={`absolute bottom-20 right-10 w-96 h-96 ${darkMode ? 'bg-blue-500/20' : 'bg-amber-400/30'} rounded-full blur-3xl float-animation`}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className={`hero-animate inline-block mb-4 px-4 py-2 ${darkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-orange-100 border-orange-300 text-orange-700'} border rounded-full text-sm`}>
            Available for work
          </div>
          
          <h1 className={`hero-animate text-6xl md:text-8xl font-bold mb-6 ${darkMode ? 'bg-gradient-to-r from-white via-cyan-200 to-blue-400' : 'bg-gradient-to-r from-slate-900 via-orange-600 to-amber-700'} bg-clip-text text-transparent`}>
            Dhawal Shukla
          </h1>
          
          <h2 className={`hero-animate text-3xl md:text-4xl font-semibold mb-4 ${darkMode ? 'text-cyan-300' : 'text-orange-600'}`}>
            Software Developer
          </h2>
          
          <p className={`hero-animate text-xl md:text-2xl ${darkMode ? 'text-slate-300' : 'text-slate-600'} mb-8 max-w-2xl mx-auto`}>
            Crafting exceptional digital experiences through code and design
          </p>
          
          <div className="hero-animate flex gap-4 justify-center flex-wrap">
            <a href="#projects" className={`group px-8 py-4 ${darkMode ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 text-white`}>
              View My Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a href="#contact" className={`px-8 py-4 ${darkMode ? 'border-slate-600 hover:bg-slate-800' : 'border-orange-300 hover:bg-orange-100'} border rounded-full font-semibold transition-all duration-300`}>
              Get in Touch
            </a>
          </div>

          <div className="hero-animate flex gap-6 justify-center mt-12 flex-wrap">
            {[
              { href: "https://github.com/dhawalshankar", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/dhawalshukl", icon: Linkedin, label: "LinkedIn" },
              { href: "https://leetcode.com/u/dhawalshankar/", icon: Code, label: "LeetCode" },
              { href: "https://drive.google.com/file/d/1zodZ1AqMNmWbzGSzmJerYLQGAHMEUwTa/view?usp=drive_link", icon: FileText, label: "Resume" },
              { href: "mailto:dhawalmannu@gmail.com", icon: Mail, label: "Email", isEmail: true }
            ].map(({ href, icon: Icon, label, isEmail }) => (
              <a key={label} href={href} {...(!isEmail && { target: "_blank", rel: "noopener noreferrer" })} className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors hover:scale-110 transform duration-300 flex items-center gap-2`}>
                <Icon size={24} />
                <span className="text-sm">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="scroll-animate text-5xl md:text-6xl font-bold mb-16 text-center">
            Featured <span className={`${darkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} bg-clip-text text-transparent`}>Projects</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="scroll-animate group">
                <div className={`relative overflow-hidden rounded-2xl ${darkMode ? 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600' : 'bg-white border-orange-200 hover:border-orange-400'} border transition-all duration-500 hover:scale-105`}>
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="p-8">
                    <div className="mb-6">
                      <project.icon className={`w-12 h-12 ${darkMode ? 'text-cyan-400' : 'text-orange-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-4`}>{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(tech => (
                        <span key={tech} className={`px-3 py-1 ${darkMode ? 'bg-slate-700/50' : 'bg-orange-100'} rounded-full text-sm`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'} group-hover:gap-3 transition-all duration-300`}>
                      View Project <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-32 px-6 ${darkMode ? 'bg-slate-900/50' : 'bg-orange-50/50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="scroll-animate text-5xl md:text-6xl font-bold mb-16 text-center">
            Skills & <span className={`${darkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} bg-clip-text text-transparent`}>Expertise</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <div key={i} className={`scroll-animate p-8 rounded-2xl ${darkMode ? 'bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50' : 'bg-white border-orange-200 hover:border-orange-400'} border transition-all duration-500 hover:scale-105`}>
                <skill.icon className={`w-12 h-12 ${darkMode ? 'text-cyan-400' : 'text-orange-600'} mb-6`} />
                <h3 className="text-2xl font-bold mb-4">{skill.name}</h3>
                <ul className="space-y-2">
                  {skill.items.map(item => (
                    <li key={item} className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-2`}>
                      <span className={`w-1.5 h-1.5 ${darkMode ? 'bg-cyan-400' : 'bg-orange-500'} rounded-full`}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="scroll-animate text-5xl md:text-6xl font-bold mb-6">
            Let's Work <span className={`${darkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} bg-clip-text text-transparent`}>Together</span>
          </h2>
          <p className={`scroll-animate text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'} mb-12`}>
            Have a project in mind? Let's create something amazing together.
          </p>
          <a href="mailto:dhawalmannu@gmail.com" className={`scroll-animate inline-flex items-center gap-3 px-10 py-5 ${darkMode ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 text-white`}>
            <Mail /> Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 ${darkMode ? 'border-slate-800' : 'border-orange-200'} border-t`}>
        <div className={`max-w-7xl mx-auto text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p>© 2025 Dhawal Shukla. Crafted with passion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;