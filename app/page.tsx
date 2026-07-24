'use client';

import { useState, useEffect, useRef } from 'react';
import { experienceData } from './data/experience';
import { educationData } from './data/education';
import { projectData } from './data/projects';

export default function Home() {
  const [mousePos, setMousePos] = useState ({ x: 0, y: 0});
  const [activeSection, setActiveSection] = useState('About');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showStickyHeaderBg, setShowStickyHeaderBg] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [isStickyHovered, setIsStickyHovered] = useState(false);
  const [stickyHoverPos, setStickyHoverPos] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const sectionOptions = ['About', 'Experience', 'Education', 'Projects'];

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePos({x: e.clientX, y: e.clientY});
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 16;
      setShowScrollTop(window.scrollY > 120);
      setShowStickyHeaderBg(scrolled);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSectionDropdown(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldShowStickyTitle = showStickyHeaderBg || activeSection !== 'About';
  const isSectionButtonDisabled = !showStickyHeaderBg && activeSection === 'About';

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowSectionDropdown(false);
    }
  };

  useEffect(() => {
    const sectionLabels: Record<string, string> = {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
    };

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(sectionLabels[visible[0].target.id] ?? 'About');
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    ['about', 'experience', 'education', 'projects'].forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans text-slate-400 antialiased selection:bg-teal-300 selection:text-slate-900">
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.07), transparent 80%)`
        }}
      />
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-32 md:px-12 md:pt-36 md:pb-36 lg:px-24 lg:pt-28 lg:pb-28">
        <div
          className={`fixed inset-x-0 left-1/2 top-4 z-20 mx-auto w-full max-w-7xl -translate-x-1/2 overflow-visible rounded-3xl bg-slate-950/90 px-5 py-4 transition-all duration-300 ease-out md:px-10 lg:px-5 lg:py-3 ${showStickyHeaderBg ? 'bg-transparent backdrop-blur-none' : 'bg-transparent backdrop-blur-none'}`}
          onMouseEnter={() => showStickyHeaderBg && setIsStickyHovered(true)}
          onMouseLeave={() => setIsStickyHovered(false)}
          onMouseMove={(event) => {
            const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
            setStickyHoverPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
          }}
        >
          <div ref={dropdownRef} className="relative w-full text-left">
            <div className="relative w-full overflow-hidden rounded-3xl">
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${showStickyHeaderBg && isStickyHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: `radial-gradient(circle at ${stickyHoverPos.x}px ${stickyHoverPos.y}px, rgba(45, 212, 191, 0.18), transparent 55%)` }}
              />
              <button
                type="button"
                onClick={() => !isSectionButtonDisabled && setShowSectionDropdown(prev => !prev)}
                disabled={isSectionButtonDisabled}
                className={`relative w-full rounded-3xl border border-teal-300/30 ${showSectionDropdown ? 'bg-teal-300/15 text-slate-100' : 'bg-slate-800/30 text-slate-200'} backdrop-blur-md px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider transition duration-200 ${isSectionButtonDisabled ? 'opacity-0 pointer-events-none' : 'cursor-pointer hover:bg-teal-300/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300'}`}
              >
                {activeSection}
              </button>
            </div>

            {showSectionDropdown && (
              <div className="absolute left-0 right-0 top-full mt-3 w-full rounded-3xl bg-teal-300/10 backdrop-blur-md p-2 shadow-2xl shadow-slate-800/30 ring-1 ring-teal-300/20">
                {sectionOptions.map(section => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => scrollToSection(section)}
                    className={`block w-full rounded-3xl px-4 py-3 text-left text-sm transition duration-150 cursor-pointer ${activeSection === section ? 'bg-slate-900/80 text-teal-300 font-semibold' : 'text-slate-200 hover:bg-slate-800/20 hover:text-teal-300'}`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* LEFT PANEL: STICKY Header Block*/}
          <header className="lg:sticky lg:top-12 lg:-mt-20 lg:self-start lg:h-[calc(100vh-4rem)] lg:w-4/12 lg:flex lg:flex-col lg:justify-between lg:pt-8 lg:pb-16 text-center lg:text-left">
            <div className="lg:flex lg:flex-col lg:items-start">
              <h1 className="text-[40px] font-bold tracking-tight text-slate-200 sm:text-[32px]">
                Syed Azmain
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Full-Stack Software Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal mx-auto lg:mx-0">
                I build high-performance, acessible, and scalable enterprise applications for the web.
              </p>
            </div>
              {/* Contact Footer*/}
            <div className="mt-8 flex justify-center gap-5 text-sm text-slate-400 lg:justify-start">
              <a href="https://www.linkedin.com/in/syedazmain" className="hover:text-teal-300 transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
              </a>
              <a href="https://www.github.com/azmain1217" className="hover:text-teal-300 transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
              </a>
            </div>
          </header>

          {/* RIGHT PANEL: Scrollable Timeline content*/}
          <main className="lg:w-8/12 lg:py-8 lg:-mt-20">
            <div className="mt-4 lg:mt-4">
              <section
                id="about"
                className="mb-10 scroll-mt-16 text-sm font-normal leading-relaxed text-slate-400 md:mb-16 lg:mb-24 lg:scroll-mt-24"
                aria-label="About me"
              >
            <div className="space-y-4">
      <p>
        Back in 2016, I took my first step into professional software engineering as an intern with the <span className="font-medium text-slate-200 hover:text-teal-300 transition-colors">City of New York (FISA)</span>. That experience transformed into a full-time engineering role post-grad and sparked my passion for building reliable full-stack applications. Since then, I’ve scaled software across diverse environments—from managing spatial utility data at <span className="font-medium text-slate-200 hover:text-teal-300 transition-colors">National Grid</span> to driving enterprise UI architecture.
      </p>
      <p>
        My main focus these days is engineering high-performance, accessible global interfaces at <span className="font-medium text-slate-200 hover:text-teal-300 transition-colors">UPS</span>. I own frontend feature development for our global shipping applications, building systems optimized with modern state management pipelines and streamlined API communication protocols.
      </p>
      <p>
        I thrive at the intersection of technical execution and code quality, actively exploring AI-assisted workflows like <span className="font-medium text-slate-200">GitHub Copilot</span> to accelerate feature deliveries, optimizing backend workflows, and fostering a strong collaborative environment across cross-functional engineering teams.
      </p>
    </div>

            </section>
          </div>
            <section id="experience">
              <h2 className="mb-8 text-sm font-semibold uppercase text-slate-200">
                Experience
              </h2>
              <ol className="group/list space-y-12">
                {experienceData.map((item, idx) => (
                  <li
                    key={idx}
                    className="group relative grid pb-1 transition-all sm:grid-cols-10 sm:gap-10 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50"
                  >
                    {/*Date Column*/}
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-3">
                      {item.dateRange}
                    </header>

                    {/* Card Content Column*/}
                    <div className="z-10 sm:col-span-7">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <div>
                          <span className="inline-flex items-baseline max-w-full whitespace-normal wrap-break-word font-medium leading-tight text-slate-200 group-hover:text-teal-300 transition-colors text-base">
                            {item.title} · {item.company}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-normal mt-0.5">
                          {item.location}
                        </div>
                      </h3>

                      {/* Bullet list description block*/}
                      <ul className="mt-4 space-y-2.5 text-sm leading-normal list-none pl-0 text-slate-400">
                        {item.bullets.map((bullet, bIdx) => (
                          <li className="flex items-start gap-2 before:inline-block before:mt-0.5 before:text-teal-300 before:content-['▹']" key={bIdx}>
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Flex Skill Tag Pills*/}
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                        {item.skills.map((skill, sIdx) => (
                          <li className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300" key={sIdx}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section id="education" className="mt-16">
              <h2 className="mb-8 text-sm font-semibold uppercase text-slate-200">
                Education
              </h2>
              <div className="space-y-6">
                {educationData.map((item, idx) => (
                  <article
                    key={idx}
                    className="rounded-3xl border border-slate-800 bg-slate-950/50 p-6 shadow-xl shadow-slate-950/10"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-slate-200">{item.schoolName}</p>
                        <p className="mt-2 text-sm text-slate-400">{item.degreeMajor}</p>
                      </div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.graduationYear}</p>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">{item.location}</p>
                  </article>
                ))}
              </div>
            </section>
            <section id="projects" className="mt-16">
              <h2 className="mb-8 text-sm font-semibold uppercase text-slate-200">
                Projects
              </h2>
              <div className="space-y-6">
                {projectData.map((project, idx) => (
                  <article
                    key={idx}
                    className="rounded-3xl border border-slate-800 bg-slate-950/50 p-6 shadow-xl shadow-slate-950/10"
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
                      <div className="overflow-hidden rounded-3xl bg-slate-900 sm:w-48 sm:shrink-0">
                        <img
                          src={project.imageLink}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-200">{project.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-slate-400">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-medium text-teal-300">
                          {project.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="rounded-full bg-teal-400/10 px-3 py-1">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
          © 2026 Syed Azmain. All rights reserved.
        </div>
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/10 p-3 text-slate-100 shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition-all duration-300 ease-out hover:bg-teal-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
        </svg>
      </button>
    </div>
  );
}
