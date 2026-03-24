import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import chiWangPhoto from './assets/images/chi-wang.jpg';
import balajiPhoto from './assets/images/balaji-veeramani.jpg';

/* ============================================
   Data
   ============================================ */
const SPEAKERS = [
  {
    name: 'Dawn Song',
    tentative: true,
    role: 'Professor, Computer Science',
    affiliation: 'UC Berkeley',
    photo: 'https://dawnsong.io/dawn-berkeley.png',
    website: 'https://dawnsong.io',
  },
  {
    name: 'Chi Wang',
    tentative: true,
    role: 'Senior Staff Research Scientist',
    affiliation: 'Google DeepMind',
    photo: chiWangPhoto,
    website: 'https://www.linkedin.com/in/chi-wang-autogen',
  },
  {
    name: 'Erica Briscoe',
    tentative: true,
    role: 'Program Manager',
    affiliation: 'DARPA',
    photo: 'https://usea.org/sites/default/files/styles/full-size-scale-800/public/profiles/photos/headshot_0.jpg?itok=-Dhz70JO',
    website: 'https://usea.org/profile/dr-erica-briscoe',
  },
  {
    name: 'Haider Warraich',
    tentative: true,
    role: 'Program Manager',
    affiliation: 'ARPA-H',
    photo: 'https://arpa-h.gov/sites/default/files/2026-02/Haider%20Warraich.png',
    website: 'https://arpa-h.gov/about/people/haider-warraich',
  },
];

const ORGANIZERS = [
  {
    name: 'Dawei Zhou',
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Virginia Tech',
    photo: 'https://website.cs.vt.edu/content/website_cs_vt_edu/en/people/faculty/dawei-zhou/_jcr_content/bio-image.transform/m-medium/image.jpeg',
    website: 'https://cs.vt.edu/people/faculty/dawei-zhou.html',
  },
  {
    name: 'Xuan Wang',
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Virginia Tech',
    photo: 'https://xuanwang91.github.io/images//img/Xuan2016.jpg',
    website: 'https://xuanwang91.github.io',
  },
  {
    name: 'Ran Jin',
    role: 'Professor, Industrial Engineering',
    affiliation: 'Virginia Tech',
    photo: 'https://ise.vt.edu/content/ise_vt_edu/en/people/faculty/jin/_jcr_content/bio-image.img.jpg/1763479673462.jpg',
    website: 'https://www.ise.vt.edu/people/faculty/jin.html',
  },
  {
    name: 'Balaji Veeramani',
    role: 'Associate VP - Data Science, Specialist Leader',
    affiliation: 'Deloitte',
    photo: balajiPhoto,
    website: 'https://www.linkedin.com/in/balaji-veeramani-9a161b9/',
  },
  {
    name: 'James Zou',
    tentative: true,
    role: 'Associate Professor, Computer Science',
    affiliation: 'Stanford University',
    photo: 'https://profiles.stanford.edu/proxy/api/cap/profiles/84123/resources/profilephoto/350x350.1509509766668.jpg',
    website: 'https://www.james-zou.com',
  },
];

const TOPICS = [
  {
    icon: '\u{1F916}',
    title: 'Agentic AI for Manufacturing',
    desc: 'Autonomous agents for production planning, quality control, predictive maintenance, and real-time decision-making in manufacturing environments.',
  },
  {
    icon: '\u{1F3ED}',
    title: 'Autonomous Factory Design',
    desc: 'AI-driven approaches to designing factory layouts, production lines, and supply chain configurations with minimal human intervention.',
  },
  {
    icon: '\u{1F504}',
    title: 'Workflow Automation',
    desc: 'LLM-based systems for automating complex multi-step workflows, process optimization, and intelligent task orchestration.',
  },
  {
    icon: '\u{1F4CB}',
    title: 'AI-Driven Planning & Scheduling',
    desc: 'Advanced planning algorithms leveraging language models for resource allocation, scheduling, and logistics optimization.',
  },
  {
    icon: '\u{1F50D}',
    title: 'Quality & Anomaly Detection',
    desc: 'Using agentic AI for real-time quality inspection, defect detection, root cause analysis, and process monitoring.',
  },
  {
    icon: '\u{1F517}',
    title: 'Human-AI Collaboration',
    desc: 'Interfaces and paradigms for effective human-AI teaming in industrial settings, including safety, trust, and interpretability.',
  },
];

const DATES = [
  { date: 'June 23, 2026', label: 'Workshop Paper Submission Deadline', highlight: true },
  { date: 'July 24, 2026', label: 'Acceptance Notification', note: 'Authors will be notified of decisions' },
  { date: 'August 21, 2026', label: 'Camera-Ready Deadline', note: 'Final versions due' },
  { date: 'October 9, 2026', label: 'Workshop Day', note: 'Hilton Union Square, San Francisco', highlight: true },
];

const SCHEDULE = [
  { time: '8:30 AM - 8:45 AM', title: 'Opening Remarks', speaker: 'Workshop Organizers' },
  { time: '8:45 AM - 9:30 AM', title: 'Keynote Talk 1', speaker: 'TBA' },
  { time: '9:30 AM - 10:15 AM', title: 'Keynote Talk 2', speaker: 'TBA' },
  { time: '10:15 AM - 10:45 AM', title: 'Coffee Break', isBreak: true },
  { time: '10:45 AM - 11:30 AM', title: 'Keynote Talk 3', speaker: 'TBA' },
  { time: '11:30 AM - 12:15 PM', title: 'Contributed Talks (Oral)', speaker: 'Selected Authors' },
  { time: '12:15 PM - 1:30 PM', title: 'Lunch Break', isBreak: true },
  { time: '1:30 PM - 2:15 PM', title: 'Keynote Talk 4', speaker: 'TBA' },
  { time: '2:15 PM - 3:30 PM', title: 'Poster Session', speaker: 'All Accepted Authors' },
  { time: '3:30 PM - 4:00 PM', title: 'Coffee Break', isBreak: true },
  { time: '4:00 PM - 5:00 PM', title: 'Panel Discussion', speaker: 'Invited Panelists' },
  { time: '5:00 PM - 5:15 PM', title: 'Closing Remarks & Best Paper Award', speaker: 'Workshop Organizers' },
];

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#topics', label: 'Topics' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#dates', label: 'Dates' },
  { href: '#submission', label: 'Submission' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#organizers', label: 'Organizers' },
];

/* ============================================
   Components
   ============================================ */

function PersonCard({ person }) {
  return (
    <div className="person-card">
      <div className="person-photo">
        {person.photo ? (
          <img src={person.photo} alt={person.name} loading="lazy" />
        ) : (
          <div className="person-photo-placeholder">
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div className="person-name">{person.name}</div>
      {person.tentative && <div className="person-tentative">(tentative)</div>}
      <div className="person-role">{person.role}</div>
      <div className="person-affiliation">{person.affiliation}</div>
      {person.website && (
        <div className="person-link-wrapper">
          <a href={person.website} className="person-link" target="_blank" rel="noopener noreferrer">
            Website &#8599;
          </a>
        </div>
      )}
    </div>
  );
}

function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function FadeIn({ children, className = '' }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

/* ============================================
   Main App
   ============================================ */
function App() {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Track active section for nav highlighting
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e) => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#top" className="navbar-brand">
            <span>AF</span> @ COLM 2026
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '\u{2715}' : '\u{2630}'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            COLM 2026 Workshop
          </div>
          <h1>Autonomous Factory</h1>
          <p className="hero-subtitle">
            Agentic AI for Design, Planning, Workflow Automation, and Manufacturing
          </p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4C5}'}</span>
              October 9, 2026
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4CD}'}</span>
              Hilton Union Square, San Francisco
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F3DB}\u{FE0F}'}</span>
              Co-located with COLM 2026
            </div>
          </div>
          <div className="hero-actions">
            <a href="#submission" className="btn btn-primary">
              Submit a Paper &#8599;
            </a>
            <a href="#about" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">About</div>
              <h2 className="section-title">Workshop Overview</h2>
              <p className="section-description">
                Bringing together researchers and practitioners at the intersection of agentic AI and industrial automation.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="about-content">
              <div className="about-text">
                <p>
                  The <strong>Autonomous Factory</strong> workshop explores the transformative potential of
                  agentic AI systems in revolutionizing design, planning, workflow automation, and
                  manufacturing processes. As large language models and autonomous agents become
                  increasingly capable, they offer unprecedented opportunities to create intelligent
                  systems that can autonomously manage complex industrial workflows.
                </p>
                <p>
                  This workshop aims to build a community around the emerging intersection of agentic AI
                  and industrial automation, bringing together researchers from NLP, AI planning, robotics,
                  manufacturing, and industrial engineering. We welcome both foundational research and
                  applied work that pushes the boundaries of what autonomous AI systems can achieve in
                  real-world factory and production environments.
                </p>
                <p>
                  We particularly encourage submissions from junior researchers and members of
                  underrepresented groups, and will feature dedicated sessions for works in progress
                  and early-stage research.
                </p>
              </div>
              <div className="about-highlights">
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F3AF}'}</span>
                  <div>
                    <h4>Focused Scope</h4>
                    <p>Dedicated to the intersection of agentic AI and manufacturing, a rapidly growing field.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F91D}'}</span>
                  <div>
                    <h4>Interdisciplinary</h4>
                    <p>Bridging NLP, AI planning, robotics, and industrial engineering communities.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F4AC}'}</span>
                  <div>
                    <h4>Interactive Format</h4>
                    <p>Keynotes, contributed talks, poster sessions, and panel discussions.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F331}'}</span>
                  <div>
                    <h4>Junior Researcher Friendly</h4>
                    <p>Dedicated support for early-career researchers and work-in-progress presentations.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Topics */}
      <section className="section section-alt" id="topics">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Call for Papers</div>
              <h2 className="section-title">Topics of Interest</h2>
              <p className="section-description">
                We invite submissions on a broad range of topics at the intersection of agentic AI and manufacturing. Topics include but are not limited to:
              </p>
            </div>
          </FadeIn>

          <div className="topics-grid">
            {TOPICS.map((topic, i) => (
              <FadeIn key={i}>
                <div className="topic-card">
                  <span className="topic-icon">{topic.icon}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="section" id="speakers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Keynote Speakers</div>
              <h2 className="section-title">Invited Speakers</h2>
              <p className="section-description">
                Leading researchers and practitioners sharing insights on the future of agentic AI in manufacturing.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {SPEAKERS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section section-alt" id="dates">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Important Dates</div>
              <h2 className="section-title">Key Deadlines</h2>
              <p className="section-description">
                All deadlines are 11:59 PM Anywhere on Earth (AoE).
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="timeline">
              {DATES.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className={`timeline-dot ${item.highlight ? 'highlight' : ''}`}></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-label">{item.label}</div>
                    {item.note && <div className="timeline-note">{item.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Submission */}
      <section className="section" id="submission">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Submit</div>
              <h2 className="section-title">Paper Submission</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="submission-card">
              <h3>Submit Your Work</h3>
              <p>
                We welcome original research papers, position papers, and work-in-progress submissions
                on topics related to agentic AI for manufacturing and automation.
              </p>

              <div className="submission-details">
                <div className="submission-detail">
                  <h4>Format</h4>
                  <p>COLM 2026 format, 4-8 pages (excluding references)</p>
                </div>
                <div className="submission-detail">
                  <h4>Review Process</h4>
                  <p>Double-blind peer review</p>
                </div>
                <div className="submission-detail">
                  <h4>Submission Platform</h4>
                  <p>OpenReview</p>
                </div>
              </div>

              <p>
                Accepted papers will be presented as oral talks or posters.
                At least one author of each accepted paper must register for the workshop.
              </p>

              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                href="https://openreview.net"
                className="btn-submit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit on OpenReview &#8599;
              </a>
              <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                OpenReview submission site link will be updated soon.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Schedule */}
      <section className="section section-alt" id="schedule">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Program</div>
              <h2 className="section-title">Tentative Schedule</h2>
              <p className="section-description">
                October 9, 2026 &mdash; Hilton Union Square, San Francisco
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="schedule-table">
              {SCHEDULE.map((item, i) => (
                <div className={`schedule-row ${item.isBreak ? 'break-row' : ''}`} key={i}>
                  <div className="schedule-time">{item.time}</div>
                  <div className="schedule-event">
                    <div className="schedule-event-title">{item.title}</div>
                    {item.speaker && !item.isBreak && (
                      <div className="schedule-event-speaker">{item.speaker}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Organizers */}
      <section className="section" id="organizers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Team</div>
              <h2 className="section-title">Workshop Organizers</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {ORGANIZERS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>Autonomous Factory</span> Workshop
          </div>
          <p className="footer-text">
            Co-located with COLM 2026 &mdash; October 9, 2026 &mdash; San Francisco, USA
          </p>
          <div className="footer-links">
            <a href="https://colmweb.org" target="_blank" rel="noopener noreferrer">COLM 2026</a>
            <a href="https://colmweb.org/cfw.html" target="_blank" rel="noopener noreferrer">Call for Workshops</a>
            <a href="#submission">Submit a Paper</a>
            <a href="mailto:colm-workshops@googlegroups.com">Contact</a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            &copy; 2026 Autonomous Factory Workshop. All participants must follow the{' '}
            <a href="https://colmweb.org" target="_blank" rel="noopener noreferrer">
              COLM Code of Conduct
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
