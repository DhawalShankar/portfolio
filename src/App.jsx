import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowRight, Code, Palette, Zap, Sun, Moon, FileText, Lightbulb,Hand, BookOpenCheck, Flower } from 'lucide-react';

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    // Hero animations
    const heroTimeline = {
      elements: heroRef.current?.querySelectorAll('.hero-animate'),
      delay: 0
    };

    if (heroTimeline.elements) {
      heroTimeline.elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 150);
      });
    }

    // Floating animation for hero elements
    const floatingElements = document.querySelectorAll('.float-animation');
    floatingElements.forEach((el, i) => {
      const animate = () => {
        el.style.transition = 'transform 3s ease-in-out';
        el.style.transform = `translateY(${Math.sin(Date.now() / 1000 + i) * 10}px)`;
        requestAnimationFrame(animate);
      };
      animate();
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "CCS - School Website",
      desc: "A React-based Web App with Razorpay Payment Portal",
      tech: ["ReactJS", "TailwindCSS"],
      icon: BookOpenCheck,
      link:"https://ccs-official.vercel.app/"
    },
    {
      title: "IntelliSign",
      desc: "A CNN based ML software for ASL based Sign Language Translation",
      tech: ["CNN", "OpenCV", "MediaPipe", "Streamlit"],
      icon: Hand,
      link: "https://github.com/DhawalShankar/intellisign.git"
    },
    {
      title: "ISKCON Website Reimagined",
      desc: "A React based Website featuring ISKCON-Kanpur and the rich legacy of ISKCON",
      tech: ["ReactJS", "TailwindCSS"],
      icon: Flower,
      link:"https://iskcon-kanpur.vercel.app/"
    }
  ];

  const skills = [
    { icon: Lightbulb, name: "Problem Solving", items: ["Java", "Data Structures", "Algorithms"] },
    { icon: Code, name: "Development", items: ["React", "Node.js", "Python", "TailwindCSS"] },
    { icon: Palette, name: "Design", items: ["Figma", "Canva"] },
    { icon: Zap, name: "Tools", items: ["Git", "GitHub", "Firebase", "Postman"] }
  ];

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' : 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 text-slate-900'} min-h-screen transition-colors duration-500`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 ${darkMode ? 'bg-slate-950/80 border-slate-800/50' : 'bg-white/80 border-orange-200/50'} backdrop-blur-lg border-b transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`text-2xl font-bold ${darkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} bg-clip-text text-transparent`}>
            Portfolio
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {['About', 'Projects', 'Skills', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} 
                 className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors duration-300 relative group`}>
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? 'bg-cyan-400' : 'bg-orange-500'} group-hover:w-full transition-all duration-300`}></span>
              </a>
            ))}
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-orange-100 hover:bg-orange-200'} transition-all duration-300`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-slate-700" size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-orange-100'}`}
            >
              {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-slate-700" size={20} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 ${darkMode ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-lg transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
          {['About', 'Projects', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
               className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors duration-300`}>
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
            <a href="https://github.com/dhawalshankar" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors hover:scale-110 transform duration-300 flex items-center gap-2`}>
              <Github size={24} />
              <span className="text-sm">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/dhawalshukl" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors hover:scale-110 transform duration-300 flex items-center gap-2`}>
              <Linkedin size={24} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/dhawalshankar/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors hover:scale-110 transform duration-300 flex items-center gap-2`}>
              <Code size={24} />
              <span className="text-sm">LeetCode</span>
            </a>
            <a href="https://drive.google.com/file/d/1zodZ1AqMNmWbzGSzmJerYLQGAHMEUwTa/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors hover:scale-110 transform duration-300 flex items-center gap-2`}>
              <FileText size={24} />
              <span className="text-sm">Resume</span>
            </a>
            <a href="mailto:dhawalmannu@gmail.com" className={`${darkMode ? 'hover:text-cyan-400' : 'hover:text-orange-600'} transition-colors hover:scale-110 transform duration-300 flex items-center gap-2`}>
              <Mail size={24} />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold mb-16 text-center`}>
            Featured <span className={`${darkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-orange-500 to-amber-600'} bg-clip-text text-transparent`}>Projects</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="scroll-animate group">
                <div className={`relative overflow-hidden rounded-2xl ${darkMode ? 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600' : 'bg-white border-orange-200 hover:border-orange-400'} border transition-all duration-500 hover:scale-105`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.icon} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                  
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
                    
                   <a href={project.link} target="_blank" rel="noopener noreferrer" 
   className={`inline-flex items-center gap-2 ${darkMode ? 'text-cyan-400' : 'text-orange-600'} group-hover:gap-3 transition-all duration-300`}>
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
      <section id="skills" ref={skillsRef} className={`py-32 px-6 ${darkMode ? 'bg-slate-900/50' : 'bg-orange-50/50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold mb-16 text-center`}>
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
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold mb-6`}>
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