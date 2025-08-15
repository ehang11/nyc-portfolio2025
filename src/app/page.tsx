import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Mail, Github, Linkedin, ExternalLink, ArrowUpRight } from "lucide-react"

/**
 * Sleek, modern, responsive portfolio for a Software Engineer (New York).
 * - Tech: React + TailwindCSS + Framer Motion (animations)
 * - Design: minimalist, white bg, dark gray text, electric blue accent
 * - A11y: semantic HTML, ARIA labels, visible focus, prefers-reduced-motion
 * - Mobile-first: grid/flex responsive layout
 * - Sections: About, Skills, Projects, Experience, Contact
 * - Smooth scrolling & subtle hover/fade-in effects
 * - Placeholder content throughout (swap with real data)
 *
 * HOW TO USE:
 * 1) Drop this component into a Next.js / React app. For Next.js 13+, put it in app/page.tsx (or page.jsx) and export default PortfolioPage.
 * 2) Ensure TailwindCSS is installed. Add the accent color via CSS variables below or Tailwind config if desired.
 * 3) Replace placeholder content, images, and links.
 */

// Accent & theme via CSS variables. You can move these into globals.css if preferred.
const ThemeStyles = () => (
  <style>{`
    :root {
      --bg: #ffffff;
      --text: #111827; /* gray-900 */
      --muted: #6b7280; /* gray-500 */
      --card: #f8fafc; /* slate-50 */
      --border: #e5e7eb; /* gray-200 */
      --accent: #0AE0FF; /* "electric blue" */
    }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); }
    .focus-ring:focus { outline: 3px solid var(--accent); outline-offset: 2px; border-radius: 0.5rem; }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `}</style>
)

// Reusable section wrapper with enter-viewport animation
function Section({
  id,
  ariaLabel,
  className = "",
  children,
}: {
  id: string
  ariaLabel: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [inView, controls])

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}

// Simple badge for tech stacks
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
      {children}
    </span>
  )
}

// Navbar
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-[var(--border)]"
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="font-semibold tracking-tight focus-ring"
          aria-label="Home"
        >
          <span className="text-xl">NYC Engineer</span>
        </a>
        <button
          className="md:hidden p-2 rounded focus-ring"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                className="hover:text-[var(--accent)] transition-colors focus-ring"
                href={l.href}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="md:hidden border-t border-[var(--border)] px-5 pb-3 pt-2 space-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                className="block py-2 focus-ring"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

// Hero
function Hero() {
  return (
    <div id="home" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Electric blue rings */}
        <div
          className="absolute -top-24 -right-40 h-80 w-80 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-40 h-80 w-80 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 60%)",
          }}
        />
      </div>

      <Section id="about" ariaLabel="About Me" className="pt-16 sm:pt-20 lg:pt-24">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] items-center gap-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Johar R Warsol
            </motion.h1>
            <p className="mt-3 text-xl text-[var(--muted)]">
              Software Engineer · New York, NY
            </p>
            <p className="mt-6 max-w-prose leading-relaxed">
              I build fast, accessible web experiences and elegant backend systems. My
              focus is crafting scalable products with a clean UX, modern tooling, and
              thoughtful performance—so teams can ship with confidence.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge>React</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Node.js</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Next.js</Badge>
            </div>
            <div className="mt-8 flex gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-black shadow-sm transition hover:translate-y-[-1px] focus-ring"
              >
                View Projects <ArrowUpRight size={18} aria-hidden />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3 font-semibold transition hover:border-[var(--text)] focus-ring"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="justify-self-center">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
              alt="Professional headshot placeholder"
              className="h-48 w-48 sm:h-56 sm:w-56 rounded-2xl object-cover shadow-lg border border-[var(--border)]"
            />
          </div>
        </div>
      </Section>
    </div>
  )
}

// Skills grid with icons (Devicon CDN placeholders)
function Skills() {
  const skills = [
    {
      name: "JavaScript",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Node.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "PostgreSQL",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Docker",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg",
    },
    {
      name: "Git",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
  ]
  return (
    <Section id="skills" ariaLabel="Skills" className="py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((s) => (
          <div
            key={s.name}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:shadow-md"
          >
            <img
              src={s.src}
              alt={`${s.name} logo`}
              className="h-10 w-10 opacity-90 group-hover:opacity-100"
            />
            <span className="text-sm font-medium">{s.name}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

// Project card
function ProjectCard({
  title,
  thumb,
  desc,
  stack,
  github,
  demo,
}: {
  title: string
  thumb: string
  desc: string
  stack: string[]
  github?: string
  demo?: string
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={thumb}
          alt={`${title} screenshot`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <header className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <div className="flex gap-2 shrink-0">
            {github && (
              <a
                href={github}
                className="inline-flex items-center gap-1 text-sm hover:text-[var(--accent)] focus-ring"
                aria-label="GitHub link"
              >
                <Github size={18} aria-hidden />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                className="inline-flex items-center gap-1 text-sm hover:text-[var(--accent)] focus-ring"
                aria-label="Live demo link"
              >
                <ExternalLink size={18} aria-hidden />
              </a>
            )}
          </div>
        </header>
        <p className="mt-2 text-[var(--muted)] text-sm leading-relaxed">{desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  const projects = [
    {
      title: "Roomer – Find great roommates",
      thumb:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      desc: "Listings app with maps, advanced filters, and secure auth. Built for speed and clean UX.",
      stack: ["Next.js", "React", "Tailwind", "PostgreSQL", "Prisma", "Vercel"],
      github: "https://github.com/placeholder/roomer",
      demo: "https://example.com/roomer",
    },
    {
      title: "TradeOps – Real-time incident search",
      thumb:
        "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
      desc: "Unified search across Oracle/MS SQL for rapid root-cause analysis and improved uptime.",
      stack: ["Spring Boot", "React", "Oracle", "MS SQL", "Data JPA"],
      github: "https://github.com/placeholder/tradeops",
      demo: "https://example.com/tradeops",
    },
    {
      title: "GridPro – 1M+ row data explorer",
      thumb:
        "https://images.unsplash.com/photo-1551281044-8f785ba67e45?q=80&w=1200&auto=format&fit=crop",
      desc: "AG Grid with server-side pagination, lazy loading, and dynamic filtering for massive datasets.",
      stack: ["Angular", "AG Grid", "Node", "Kubernetes"],
      github: "https://github.com/placeholder/gridpro",
      demo: "https://example.com/gridpro",
    },
  ]

  return (
    <Section id="projects" ariaLabel="Projects" className="py-16">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
        <a href="#contact" className="text-sm hover:text-[var(--accent)] focus-ring">
          Need something similar?
        </a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </Section>
  )
}

// Experience timeline
function Experience() {
  const items = [
    {
      org: "BNY Mellon",
      role: "Full Stack Developer – Finance Corporate Services",
      time: "Sept 2022 – Present",
      bullets: [
        "Automated batch workflows to cut SLA breaches by ~40% and accelerate reporting cycles.",
        "Real‑time incident search across Oracle/MS SQL (Spring Data JPA) to speed root‑cause analysis.",
        "AG Grid UI with server pagination and lazy loading for 1M+ rows; faster loads and less bandwidth.",
      ],
    },
    {
      org: "Fidelity Investments",
      role: "Software Engineer – Digital Experience",
      time: "Sept 2016 – Nov 2017",
      bullets: [
        "Revamped IRA interface with Angular + Spring; measurable drop in support call volume.",
        "Built REST APIs and contributed to a web‑first approach with test‑driven development.",
      ],
    },
    {
      org: "Cambo Box – Cambodian Restaurant",
      role: "Restauranteur – Owner",
      time: "May 2018 – Aug 2023",
      bullets: [
        "End‑to‑end operations, marketing, and process design; 90%+ customer satisfaction.",
      ],
    },
  ]

  return (
    <Section id="experience" ariaLabel="Experience" className="py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">Experience</h2>
      <ol className="relative border-s border-[var(--border)]">
        {items.map((x, i) => (
          <li key={i} className="ms-6 pb-8">
            <span
              className="absolute -start-3 mt-1 h-6 w-6 rounded-full border border-[var(--border)] bg-[var(--card)]"
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                {x.role} · {x.org}
              </h3>
              <time className="text-sm text-[var(--muted)]">{x.time}</time>
            </div>
            <ul className="mt-2 list-disc ps-5 text-sm text-[var(--muted)] space-y-1">
              {x.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}

// Contact form (client-only). Replace FORM_ENDPOINT with your service or Next.js API route.
function Contact() {
  const [status, setStatus] = useState<{
    type: "idle" | "ok" | "error"
    message?: string
  }>({ type: "idle" })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    try {
      // Replace with your endpoint, e.g., "/api/contact" (Next.js) or a Formspree URL
      const FORM_ENDPOINT = "/api/contact" // TODO: implement server handler
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus({ type: "ok", message: "Thanks! I'll get back to you soon." })
      e.currentTarget.reset()
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Email me directly instead.",
      })
    }
  }

  return (
    <Section id="contact" ariaLabel="Contact" className="py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Contact</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
        >
          <div className="grid gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 focus-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 focus-ring"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 focus-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-black shadow-sm transition hover:translate-y-[-1px] focus-ring"
            >
              Send <Mail size={18} aria-hidden />
            </button>
            {status.type !== "idle" && (
              <p
                role="status"
                className={`text-sm ${
                  status.type === "ok" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </form>

        <div className="space-y-6">
          <p className="text-[var(--muted)] leading-relaxed">
            Want to collaborate, hire me, or just say hello? Reach out via the form, or
            connect on social.
          </p>
          <ul className="space-y-3" aria-label="Social links">
            <li>
              <a
                href="https://www.linkedin.com/in/your-handle"
                className="group inline-flex items-center gap-3 focus-ring"
              >
                <Linkedin aria-hidden />{" "}
                <span className="underline decoration-[var(--accent)]/40 underline-offset-4 group-hover:decoration-[var(--accent)]">
                  LinkedIn
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/your-handle"
                className="group inline-flex items-center gap-3 focus-ring"
              >
                <Github aria-hidden />{" "}
                <span className="underline decoration-[var(--accent)]/40 underline-offset-4 group-hover:decoration-[var(--accent)]">
                  GitHub
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:you@email.com"
                className="group inline-flex items-center gap-3 focus-ring"
              >
                <Mail aria-hidden />{" "}
                <span className="underline decoration-[var(--accent)]/40 underline-offset-4 group-hover:decoration-[var(--accent)]">
                  you@email.com
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} Johar R Warsol. All rights reserved.
        </p>
        <a href="#home" className="text-sm hover:text-[var(--accent)] focus-ring">
          Back to top
        </a>
      </div>
    </footer>
  )
}

export default function PortfolioPage() {
  return (
    <main className="relative" role="main">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:ring-4 focus:ring-[var(--accent)] focus:rounded-md"
      >
        Skip to content
      </a>
      <ThemeStyles />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
