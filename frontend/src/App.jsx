import { useState, useEffect, useRef } from "react";
import "./App.css";

const skills = [
  { name: "C++",        color: "#ef4444" },
  { name: "Java",       color: "#f59e0b" },
  { name: "JavaScript", color: "#fbbf24" },
  { name: "Node.js",    color: "#4ade80" },
  { name: "Express.js", color: "#a78bfa" },
  { name: "MongoDB",    color: "#f43f5e" },
  { name: "MySQL",      color: "#fb923c" },
  { name: "JSP / JDBC", color: "#fcd34d" },
  { name: "AWS",        color: "#f59e0b" },
  { name: "Docker",     color: "#60a5fa" },
  { name: "HTML",       color: "#ef4444" },
  { name: "CSS",        color: "#c084fc" },
  { name: "Git",        color: "#f97316" },
  { name: "DSA",        color: "#fb7185" },
];

const projects = [
  {
    title: "Employee Management System",
    desc: "Full-stack multi-tenant platform for workforce management. Features JWT company authentication, employee CRUD, department search, and a live dashboard. MVC architecture — deployed live on Render.",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT", "HTML/CSS/JS"],
    links: [
      { label: "Live Demo ↗", url: "https://lnkd.in/gGEigkER" },
      { label: "GitHub ↗",    url: "https://lnkd.in/gJkFWHZS" },
    ],
    icon: "◈",
    accent: "#f43f5e",
  },
  {
    title: "Gym Membership Management System",
    desc: "Dynamic web application built with Java, JSP & JDBC. Handles member registration, secure login, and real-time MySQL data management — structured using a mini MVC-style architecture.",
    tags: ["Java", "JSP", "JDBC", "MySQL", "CSS"],
    links: [
      { label: "GitHub ↗", url: "https://lnkd.in/gw8eJN3c" },
    ],
    icon: "⬡",
    accent: "#f59e0b",
  },
  {
    title: "Music Fest Website",
    desc: "Collaborative frontend project built with a 5-member team using the Design Thinking methodology — Empathize, Define, Ideate, Prototype, Test. Delivers an engaging music festival experience.",
    tags: ["HTML", "CSS", "JavaScript", "Team Project"],
    links: [
      { label: "Live Demo ↗", url: "https://lnkd.in/gMEhVqDH" },
      { label: "GitHub ↗",    url: "https://lnkd.in/gV-vZfTR" },
    ],
    icon: "◉",
    accent: "#fb923c",
  },
];

// Curated: only certifications that add real value to a dev CV
const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    icon: "✺",
    highlight: true,
  },
  {
    title: "AWS Academy — Machine Learning Foundations",
    issuer: "Amazon Web Services",
    year: "2024",
    icon: "✺",
    highlight: true,
  },
  {
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    icon: "✺",
    highlight: false,
  },
  {
    title: "MongoDB Node.js Developer Path",
    issuer: "MongoDB & SmartBridge",
    year: "2024",
    icon: "◆",
    highlight: true,
  },
  {
    title: "Containerization 101 — Docker Bootcamp",
    issuer: "AWS Cloud Club, KIET",
    year: "2025",
    icon: "◈",
    highlight: false,
  },
  {
    title: "AI For Everyone",
    issuer: "DeepLearning.AI / Coursera — Andrew Ng",
    year: "2024",
    icon: "◉",
    highlight: true,
  },
  {
    title: "Programming Using Java",
    issuer: "Infosys Springboard",
    year: "2024",
    icon: "◆",
    highlight: false,
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function SkillChip({ name, color }) {
  return (
    <span className="skill-chip" style={{ "--chip-color": color }}>
      <span className="chip-dot" />
      {name}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`project-card ${visible ? "fade-in" : ""}`}
      style={{ "--card-accent": project.accent, animationDelay: `${index * 0.12}s` }}
    >
      <div className="project-header">
        <div className="project-icon-wrap" style={{ "--icon-color": project.accent }}>
          <span className="project-icon">{project.icon}</span>
        </div>
        <div className="project-links">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="project-link"
              style={{ "--link-color": project.accent }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((t) => (
          <span key={t} className="project-tag" style={{ "--tag-color": project.accent }}>{t}</span>
        ))}
      </div>
      <div className="project-glow" style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }} />
    </div>
  );
}

export default function App() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeNav, setActiveNav] = useState("about");
  const [skillsRef, skillsVisible] = useInView();
  const [certsRef, certsVisible] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const sections = ["about", "skills", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveNav(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="app">
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-text">PSM</span>
          <span className="nav-logo-dot" />
        </div>
        <div className="nav-links">
          {["about", "skills", "projects", "contact"].map((s) => (
            <a key={s} href={`#${s}`} className={`nav-link ${activeNav === s ? "active" : ""}`}>{s}</a>
          ))}
        </div>
        <div className="nav-badge">Open to Work</div>
      </nav>

      {/* ── Hero ── */}
      <header className={`hero ${heroVisible ? "hero-visible" : ""}`}>
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          <span>Full Stack Developer · AI &amp; ML</span>
          <span className="hero-eyebrow-line" />
        </div>
        <h1 className="hero-name">
          <span className="hero-first">Prajesh Singh</span>
          <span className="hero-last gradient-text">Meena</span>
        </h1>
        <p className="hero-tagline">
          Building scalable systems &amp; modern interfaces
          <br />
          <span className="hero-sub">KIET'28 · B.Tech CSE (AI &amp; ML) · DPSGV Alumnus</span>
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </div>
        <div className="hero-scroll-hint">
          <span className="scroll-line" />
          <span className="scroll-label">scroll</span>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="main-grid">

        {/* LEFT */}
        <aside className="left-col">

          <section id="about" className="glass-card">
            <div className="card-label"><span className="label-line" />about</div>
            <p className="about-text">
              2nd-year B.Tech student in <strong>CSE (AI &amp; ML)</strong> at KIET Group of Institutions.
              I build full-stack web applications with clean architecture, from Node.js backends to cloud deployments on AWS.
            </p>
            <p className="about-text">
              Active learner, AWS certified, and consistently shipping projects from idea to
              <em> live deployment</em>. I enjoy working at the intersection of backend engineering and product thinking.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-num gradient-text">3+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num gradient-text">7+</span>
                <span className="stat-label">Certs</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num gradient-text">2028</span>
                <span className="stat-label">Graduating</span>
              </div>
            </div>
          </section>

          <section className="glass-card">
            <div className="card-label"><span className="label-line" />education</div>
            <div className="edu-item">
              <div className="edu-dot" />
              <div>
                <div className="edu-degree">B.Tech — CSE (AI &amp; ML)</div>
                <div className="edu-school">KIET Group of Institutions, Ghaziabad</div>
                <div className="edu-meta">2024 – 2028</div>
              </div>
            </div>
            <div className="edu-item">
              <div className="edu-dot edu-dot-gold" />
              <div>
                <div className="edu-degree">Class XII — Science (PCM)</div>
                <div className="edu-school">Delhi Public School, Ghaziabad Vasundhara</div>
                <div className="edu-meta">DPSGV Alumnus</div>
              </div>
            </div>
          </section>

          <section id="contact" className="glass-card">
            <div className="card-label"><span className="label-line" />contact</div>
            <div className="contact-list">
              <a href="tel:9625152768" className="contact-item">
                <span className="contact-icon">◎</span>
                <span className="contact-val">+91 9625152768</span>
              </a>
              <a href="mailto:prajesh.2428cseaiml9@kiet.edu" className="contact-item">
                <span className="contact-icon">✦</span>
                <span className="contact-val">prajesh.2428cseaiml9@kiet.edu</span>
              </a>
              <a href="mailto:prajeshmeena10b@gmail.com" className="contact-item">
                <span className="contact-icon">✦</span>
                <span className="contact-val">prajeshmeena10b@gmail.com</span>
              </a>
              <a href="https://github.com/prajeshmeena69" target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-icon">⌥</span>
                <span className="contact-val">github.com/prajeshmeena69</span>
              </a>
              <a href="http://www.linkedin.com/in/prajesh-singh-meena-607437327" target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-icon">◈</span>
                <span className="contact-val">linkedin · prajesh-singh-meena</span>
              </a>
            </div>
          </section>

        </aside>

        {/* RIGHT */}
        <section className="right-col">

          <div id="skills" className="glass-card" ref={skillsRef}>
            <div className="card-label"><span className="label-line" />skills &amp; technologies</div>
            <div className={`skills-grid ${skillsVisible ? "skills-visible" : ""}`}>
              {skills.map((s, i) => (
                <div key={s.name} className="skill-wrap" style={{ animationDelay: `${i * 0.05}s` }}>
                  <SkillChip name={s.name} color={s.color} />
                </div>
              ))}
            </div>
          </div>

          <div id="projects" className="projects-section">
            <div className="card-label standalone-label">
              <span className="label-line" />projects
            </div>
            <div className="projects-list">
              {projects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </div>
          </div>

          <div className="glass-card" ref={certsRef}>
            <div className="card-label"><span className="label-line" />certifications</div>
            <div className={`certs-list ${certsVisible ? "certs-visible" : ""}`}>
              {certifications.map((c, i) => (
                <div
                  key={i}
                  className={`cert-item ${c.highlight ? "cert-highlight" : ""}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="cert-icon">{c.icon}</div>
                  <div className="cert-body">
                    <div className="cert-title">{c.title}</div>
                    <div className="cert-meta">{c.issuer} · {c.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>

      <footer className="footer">
        <span className="footer-line" />
        <span className="footer-text">
          Designed &amp; Built by <span className="gradient-text">Prajesh Singh Meena</span> · KIET'28
        </span>
        <span className="footer-line" />
      </footer>
    </div>
  );
}