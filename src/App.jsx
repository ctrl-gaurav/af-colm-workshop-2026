import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import chiWangPhoto from './assets/images/chi-wang.jpg';
import balajiPhoto from './assets/images/balaji-veeramani.jpg';
import weiWangPhoto from './assets/images/wei_wang.jpg';
import goldbergPhoto from './assets/images/goldberg.jpg';
import qiangHuangPhoto from './assets/images/qiang_huang.png';
import peterBelingPhoto from './assets/images/peter-beling.png';
import jillesVreekenPhoto from './assets/images/jilles-vreeken.jpg';
import jamesMoorePhoto from './assets/images/james-moore.jpg';
import marthaGardnerPhoto from './assets/images/martha-gardner.png';

/* ============================================
   Data
   ============================================ */
const SPEAKERS = [
  {
    name: 'Wei Chen',
    tentative: true,
    role: 'Professor, Mechanical Engineering',
    affiliation: 'Northwestern University',
    photo: 'https://www.mccormick.northwestern.edu/images/research-and-faculty/directory/chen-wei.jpg',
    website: 'https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/chen-wei.html',
  },
  {
    name: 'Lihui Wang',
    tentative: true,
    role: 'Professor, Production Engineering',
    affiliation: 'KTH Royal Institute of Technology',
    photo: 'https://www.kth.se/files/avatar/lihuiw',
    website: 'https://www.kth.se/profile/lihuiw',
  },
  {
    name: 'Ken Goldberg',
    tentative: true,
    role: 'Professor, IEOR & EECS',
    affiliation: 'UC Berkeley',
    photo: goldbergPhoto,
    website: 'https://goldberg.berkeley.edu',
  },
  {
    name: 'Wei Wang',
    tentative: true,
    role: 'Professor, Computer Science',
    affiliation: 'UCLA',
    photo: weiWangPhoto,
    website: 'https://web.cs.ucla.edu/~weiwang/',
  },
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
    name: 'Albert Shih',
    tentative: true,
    role: 'Professor, Mechanical Engineering',
    affiliation: 'University of Michigan',
    photo: 'https://me.engin.umich.edu/wp-content/uploads/2019/08/shih-albert-photo.jpg',
    website: 'https://me.engin.umich.edu/people/faculty/albert-shih/',
    backup: true,
  },
];

const PANELISTS = [
  {
    name: 'Erica Briscoe',
    tentative: true,
    role: 'Program Manager',
    affiliation: 'DARPA',
    photo: 'https://usea.org/sites/default/files/styles/full-size-scale-800/public/profiles/photos/headshot_0.jpg?itok=-Dhz70JO',
    website: 'https://usea.org/profile/dr-erica-briscoe',
  },
  {
    name: 'Martha M. Gardner',
    tentative: true,
    role: 'Chief Scientist (Retired)',
    affiliation: 'GE',
    photo: marthaGardnerPhoto,
    website: null,
  },
  {
    name: 'James Moore',
    tentative: true,
    role: 'Fellow',
    affiliation: 'MIET',
    photo: jamesMoorePhoto,
    website: 'https://www.linkedin.com/in/james-moore-miet-340076a7/',
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
    name: 'Jilles Vreeken',
    role: 'Tenured Faculty',
    affiliation: 'CISPA Helmholtz Center',
    photo: jillesVreekenPhoto,
    website: 'https://cispa.de/en/people/jilles.vreeken',
  },
  {
    name: 'Balaji Veeramani',
    role: 'Associate VP - Data Science, Specialist Leader',
    affiliation: 'Deloitte',
    photo: balajiPhoto,
    website: 'https://www.linkedin.com/in/balaji-veeramani-9a161b9/',
  },
  {
    name: 'Ran Jin',
    role: 'Professor, Industrial Engineering',
    affiliation: 'Virginia Tech',
    photo: 'https://ise.vt.edu/content/ise_vt_edu/en/people/faculty/jin/_jcr_content/bio-image.img.jpg/1763479673462.jpg',
    website: 'https://www.ise.vt.edu/people/faculty/jin.html',
  },
  {
    name: 'Kimberly P. Ellis',
    role: 'Professor, Industrial & Systems Engineering',
    affiliation: 'Virginia Tech',
    photo: 'https://ise.vt.edu/content/ise_vt_edu/en/people/faculty/ellis/_jcr_content/bio-image.img.jpg/1763479673462.jpg',
    website: 'https://ise.vt.edu/people/faculty/ellis.html',
  },
  {
    name: 'Peter Beling',
    role: 'Professor, Data Science',
    affiliation: 'University of Virginia',
    photo: peterBelingPhoto,
    website: 'https://datascience.virginia.edu/people/peter-beling',
  },
  {
    name: 'Qiang Huang',
    role: 'Professor, Industrial & Systems Engineering',
    affiliation: 'University of Southern California',
    photo: qiangHuangPhoto,
    website: 'https://viterbi.usc.edu/directory/faculty/Huang/Qiang',
  },
];

const TOPICS = [
  {
    icon: '\u{1F916}',
    title: 'LLM Agents for Design & Engineering',
    desc: 'Language models and agents for design, engineering analysis, process planning, scheduling, and supply-chain reasoning.',
  },
  {
    icon: '\u{1F3ED}',
    title: 'Tool-Using & Multimodal Systems',
    desc: 'Systems that work with physical simulators, digital twins, robotics, and industrial data platforms to solve real manufacturing problems.',
  },
  {
    icon: '\u{1F6E1}\u{FE0F}',
    title: 'Reliability, Safety & Oversight',
    desc: 'Interpretability, safety, and human-AI collaboration in manufacturing settings where mistakes are costly.',
  },
  {
    icon: '\u{1F4CA}',
    title: 'Benchmarks & Evaluation',
    desc: 'Datasets, evaluation protocols, and case studies built specifically for testing agentic AI in manufacturing contexts.',
  },
  {
    icon: '\u{1F504}',
    title: 'Process Planning & Scheduling',
    desc: 'AI-driven approaches for multi-step production planning, resource allocation, and supply chain coordination.',
  },
  {
    icon: '\u{1F517}',
    title: 'Supply Chain Intelligence',
    desc: 'Agentic systems for supply chain decision-making, handling uncertainty, cost constraints, and downstream execution needs.',
  },
];

const DATES = [
  { date: 'June 23, 2026', label: 'Workshop Paper Submission Deadline', highlight: true },
  { date: 'July 24, 2026', label: 'Acceptance Notification', note: 'Authors will be notified of decisions' },
  { date: 'August 21, 2026', label: 'Camera-Ready Deadline', note: 'Final versions due' },
  { date: 'October 9, 2026', label: 'Workshop Day', note: 'Hilton Union Square, San Francisco', highlight: true },
];

const SCHEDULE = [
  { time: '8:00 AM - 8:10 AM', title: 'Opening Remarks & Workshop Overview', speaker: 'Workshop Organizers' },
  { time: '8:10 AM - 9:50 AM', title: 'Keynote 1 + Keynote 2', speaker: '50 min each including Q&A' },
  { time: '9:50 AM - 10:10 AM', title: 'Coffee Break', isBreak: true },
  { time: '10:10 AM - 11:50 AM', title: 'Keynote 3 + Keynote 4', speaker: '50 min each including Q&A' },
  { time: '11:50 AM - 1:10 PM', title: 'Poster Session, Networking & Community Meetup', speaker: 'All Accepted Authors' },
  { time: '1:10 PM - 2:00 PM', title: 'Panel: Agentic AI for Real Manufacturing', speaker: 'Invited Panelists' },
  { time: '2:00 PM - 3:40 PM', title: 'Keynote 5 + Keynote 6', speaker: '50 min each including Q&A' },
  { time: '3:40 PM - 4:00 PM', title: 'Coffee Break & Social Event', isBreak: true },
  { time: '4:00 PM - 4:45 PM', title: 'Contributed Spotlight Talks', speaker: '8-10 min each including Q&A' },
  { time: '4:45 PM - 5:00 PM', title: 'Closing Discussion, Highlights & Next Steps', speaker: 'Workshop Organizers' },
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
      {person.backup && <div className="person-tentative">(backup)</div>}
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
            <span>ManuGenesis</span> @ COLM 2026
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
          <h1>ManuGenesis</h1>
          <p className="hero-subtitle">
            Agentic AI for Autonomous Design, Manufacturing, and Supply Chain
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
                Where agentic AI meets real-world design, manufacturing, and supply chain workflows.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Large language models can now reason over goals, plan multi-step actions, use external tools,
                  and work with humans in the loop. This matters a lot for design, manufacturing, and supply chains,
                  where decisions are tightly connected: design choices depend on engineering constraints,
                  manufacturing plans depend on what tools and processes are available, and supply chain decisions
                  have to deal with uncertainty, cost, and what happens downstream.
                </p>
                <p>
                  These workflows are multi-stage, information-heavy, and cut across technical documents, simulation
                  tools, enterprise software, robotics, and human know-how. They need AI systems that can coordinate
                  across steps, pull together different kinds of information, and support decisions under real
                  constraints.
                </p>
                <p>
                  <strong>ManuGenesis</strong> brings together researchers and practitioners who are interested in
                  grounding language-model-based agents in high-impact industrial workflows. At the same time, we
                  want to use these workflows to push forward research on planning, tool use, multimodal reasoning,
                  human-AI collaboration, and working with digital twins and simulators.
                </p>
                <p>
                  We welcome students, early-career researchers, and members of underrepresented groups,
                  and will have dedicated space for work-in-progress and spotlight presentations.
                </p>
              </div>
              <div className="about-highlights">
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F3AF}'}</span>
                  <div>
                    <h4>Grounded in Real Workflows</h4>
                    <p>Focused on actual design, manufacturing, and supply chain problems, not just benchmarks.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F91D}'}</span>
                  <div>
                    <h4>Cross-Disciplinary</h4>
                    <p>Connecting language models, planning, robotics, optimization, and manufacturing research.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F4AC}'}</span>
                  <div>
                    <h4>Full-Day Program</h4>
                    <p>Keynotes, panel discussion, poster sessions, spotlight talks, and networking.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F331}'}</span>
                  <div>
                    <h4>Open to All Career Stages</h4>
                    <p>Flexible formats for early-stage work, with support for students and junior researchers.</p>
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
                We invite submissions across a wide range of topics connecting agentic AI with design, manufacturing, and supply chains. Topics include but are not limited to:
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
                Researchers and practitioners from academia, industry, and government working at the frontier of agentic AI and manufacturing.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {SPEAKERS.filter(s => !s.backup).map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="section-header" style={{ marginTop: '60px', marginBottom: '30px' }}>
              <div className="section-label">Panelists</div>
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>Panel Discussion</h2>
              <p className="section-description">
                Agentic AI for real manufacturing settings: perspectives from government, industry, and engineering.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {PANELISTS.map((person, i) => (
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
                We accept extended abstracts (2-4 pages), short research papers, system/demo papers,
                and position papers. All submissions are non-archival.
              </p>

              <div className="submission-details">
                <div className="submission-detail">
                  <h4>Format</h4>
                  <p>2-4 pages extended abstract or short paper (excluding references)</p>
                </div>
                <div className="submission-detail">
                  <h4>Review Process</h4>
                  <p>At least two reviews per submission via OpenReview</p>
                </div>
                <div className="submission-detail">
                  <h4>Submission Platform</h4>
                  <p>OpenReview</p>
                </div>
              </div>

              <p>
                We welcome both mature projects and early-stage work. Each submission will be
                reviewed for relevance, clarity, technical or practical contribution, and potential
                to start discussion. Accepted papers will be presented as posters or spotlight talks.
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
                October 9, 2026 | Hilton Union Square, San Francisco
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
            <span>ManuGenesis</span> Workshop
          </div>
          <p className="footer-text">
            Co-located with COLM 2026 | October 9, 2026 | San Francisco, USA
          </p>
          <div className="footer-links">
            <a href="https://colmweb.org" target="_blank" rel="noopener noreferrer">COLM 2026</a>
            <a href="https://colmweb.org/cfw.html" target="_blank" rel="noopener noreferrer">Call for Workshops</a>
            <a href="#submission">Submit a Paper</a>
            <a href="mailto:manugenesis@googlegroups.com">Contact</a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            &copy; 2026 ManuGenesis Workshop. All participants must follow the{' '}
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
