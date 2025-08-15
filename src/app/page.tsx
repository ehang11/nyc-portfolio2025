"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  Download,
  Briefcase,
  Code2,
  Layers,
  Rocket,
  Globe,
  FileText,
  Star,
  Award,
  Calendar,
} from "lucide-react"

/**
 * Full-fledged professional portfolio (TypeScript + App Router + Tailwind + Framer Motion)
 * Sections:
 * - Hero (CTA + quick stats)
 * - Services / What I Do
 * - Skills (compact chips w/ small logos)
 * - Projects (filterable grid: All / Web / Data / Infra)
 * - Case Studies (spotlight cards)
 * - Experience (timeline)
 * - Testimonials (quotes)
 * - Credentials (certs & education)
 * - Contact (form + socials)
 * - Footer
 *
 * Accessibility: semantic sections, labeled controls, visible focus, skip link, reduced motion friendly.
 * Design: minimalist, neutral grays, soft accent (electric blue), tight vertical rhythm.
 */

/* --- tiny design utilities --- */
const ThemeStyles = () => (
  <style>{`
    .focus-ring:focus { outline: 3px solid var(--accent); outline-offset: 2px; border-radius: 0.5rem; }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
  `}</style>
)

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
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const controls = useAnimation()
  useEffect(() => {
    if (inView) controls.start("visible")
  }, [inView, controls])
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-zinc-600">
      {children}
    </span>
  )
}

/* --- Navbar --- */
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#experience", label: "Experience" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#credentials", label: "Credentials" },
    { href: "#contact", label: "Contact" },
  ]
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <nav
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a href="#home" className="focus-ring text-sm font-semibold tracking-tight">
          JR • NYC
        </a>
        <button
          className="md:hidden p-2 rounded focus-ring"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <ul className="hidden md:flex items-center gap-5 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                className="focus-ring text-zinc-700 hover:text-[var(--accent)] transition-colors"
                href={l.href}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="md:hidden border-t border-[var(--border)] px-5 py-2 space-y-1 bg-white">
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

/* --- Hero --- */
function Hero() {
  const stats = [
    { label: "Years Experience", value: "7+" },
    { label: "Projects Delivered", value: "30+" },
    { label: "Production Uptime", value: "99.9%" },
  ]
  return (
    <div id="home">
      <Section id="about" ariaLabel="About Me" className="pt-10 sm:pt-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            >
              Eric Hang
            </motion.h1>
            <p className="mt-2 text-lg text-zinc-600">Software Engineer · New York, NY</p>
            <p className="mt-5 max-w-prose leading-relaxed text-zinc-700">
              I craft reliable web platforms and performant backends. I combine design
              sense with engineering rigor to ship scalable products that are fast,
              accessible, and maintainable.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge>React</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Node.js</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Next.js</Badge>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:-translate-y-0.5 focus-ring"
              >
                View Projects <ArrowUpRight size={16} aria-hidden />
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-zinc-800 focus-ring"
              >
                <Download size={16} /> Download Résumé
              </a>
            </div>
            <ul className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 text-center"
                >
                  <p className="text-xl font-semibold">{s.value}</p>
                  <p className="text-xs text-zinc-600">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="justify-self-center">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
              alt="Professional headshot placeholder"
              className="h-44 w-44 sm:h-52 sm:w-52 rounded-xl object-cover shadow border border-[var(--border)]"
            />
          </div>
        </div>
      </Section>
    </div>
  )
}

/* --- Services --- */
function Services() {
  const cards = [
    {
      icon: <Code2 size={18} />,
      title: "Frontend Engineering",
      desc: "Accessible, responsive UIs in React/Next.js with strong DX and test coverage.",
    },
    {
      icon: <Layers size={18} />,
      title: "Backend & APIs",
      desc: "Robust REST/GraphQL services with Node/Java, SQL modeling, auth, and observability.",
    },
    {
      icon: <Rocket size={18} />,
      title: "Performance & DX",
      desc: "Profiling, caching, CI/CD, and refactors that reduce latency and boost throughput.",
    },
    {
      icon: <Globe size={18} />,
      title: "Cloud & Infra",
      desc: "Vercel, AWS, containers, and pragmatic infra-as-code for fast, safe deploys.",
    },
  ]
  return (
    <Section id="services" ariaLabel="Services" className="py-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">What I Do</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <article
            key={c.title}
            className="rounded-xl border border-[var(--border)] bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-zinc-700 mb-2">
              {c.icon} <span className="font-semibold">{c.title}</span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">{c.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* --- Skills --- */
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
  ] as const

  const groups = [
    { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { label: "Backend", items: ["Node.js", "Java (Spring)", "REST/GraphQL"] },
    { label: "Data", items: ["PostgreSQL", "Prisma", "Caching"] },
    { label: "Ops", items: ["Docker", "K8s", "Vercel/AWS"] },
  ]

  return (
    <Section id="skills" ariaLabel="Skills" className="py-12">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>
        <p className="text-sm text-zinc-600">
          A blend of product-focused UI work and pragmatic systems engineering.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {skills.map((s) => (
          <span
            key={s.name}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-sm text-zinc-700 transition hover:shadow-sm"
          >
            <img
              src={s.src}
              alt={`${s.name} logo`}
              className="h-6 w-6 opacity-75 grayscale transition"
              style={{ minWidth: 24, minHeight: 24 }}
            />
            {s.name}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div
            key={g.label}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
          >
            <p className="text-sm font-semibold mb-2">{g.label}</p>
            <ul className="text-sm text-zinc-600 space-y-1">
              {g.items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* --- Projects (filterable) --- */
type Project = {
  title: string
  cat: "Web" | "Data" | "Infra"
  thumb: string
  desc: string
  stack: string[]
  github?: string
  demo?: string
}

function Projects() {
  const all: Project[] = [
    {
      title: "Roomer – Find great roommates",
      cat: "Web",
      thumb:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      desc: "Listings app with maps, advanced filters, and secure auth.",
      stack: ["Next.js", "React", "Tailwind", "PostgreSQL", "Prisma", "Vercel"],
      github: "https://github.com/placeholder/roomer",
      demo: "https://example.com/roomer",
    },
    {
      title: "TradeOps – Real-time incident search",
      cat: "Data",
      thumb:
        "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
      desc: "Unified search across Oracle/MS SQL for rapid root-cause analysis.",
      stack: ["Spring Boot", "React", "Oracle", "MS SQL", "Data JPA"],
      github: "https://github.com/placeholder/tradeops",
      demo: "https://example.com/tradeops",
    },
    {
      title: "GridPro – 1M+ row data explorer",
      cat: "Web",
      thumb:
        "https://images.unsplash.com/photo-1551281044-8f785ba67e45?q=80&w=1200&auto=format&fit=crop",
      desc: "AG Grid with server-side pagination and dynamic filtering.",
      stack: ["Angular", "AG Grid", "Node", "Kubernetes"],
      github: "https://github.com/placeholder/gridpro",
      demo: "https://example.com/gridpro",
    },
    {
      title: "Infra Pipelines — CI/CD",
      cat: "Infra",
      thumb:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
      desc: "Containerized builds, preview deploys, and rollout safety via feature flags.",
      stack: ["Docker", "GitHub Actions", "K8s", "Vercel"],
    },
  ]

  const categories = ["All", "Web", "Data", "Infra"] as const
  const [active, setActive] = useState<(typeof categories)[number]>("All")
  const filtered = useMemo(
    () => (active === "All" ? all : all.filter((p) => p.cat === active)),
    [active]
  )

  return (
    <Section id="projects" ariaLabel="Projects" className="py-12">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
        <div className="flex items-center gap-2 text-sm">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-3 py-1.5 transition focus-ring ${
                active === c
                  ? "bg-[var(--accent)] border-[var(--accent)] text-black"
                  : "border-[var(--border)] bg-white text-zinc-700 hover:shadow-sm"
              }`}
              aria-pressed={active === c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-white transition hover:shadow-md"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={p.thumb}
                alt={`${p.title} screenshot`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-4">
              <header className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-semibold leading-tight">
                  {p.title}
                </h3>
                <div className="flex gap-2 shrink-0">
                  {p.github && (
                    <a
                      href={p.github}
                      className="inline-flex items-center gap-1 text-sm text-zinc-700 hover:text-[var(--accent)] focus-ring"
                      aria-label="GitHub link"
                    >
                      <Github size={18} aria-hidden />
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      className="inline-flex items-center gap-1 text-sm text-zinc-700 hover:text-[var(--accent)] focus-ring"
                      aria-label="Live demo link"
                    >
                      <ExternalLink size={18} aria-hidden />
                    </a>
                  )}
                </div>
              </header>
              <p className="mt-2 text-zinc-600 text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--card)] px-2.5 py-1 text-xs text-zinc-600 border border-[var(--border)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* --- Case Studies --- */
function CaseStudies() {
  const cases = [
    {
      title: "Checkout Speed: –38% time-to-interactive",
      result: "Core Web Vitals improved to passing across 95% pages; conversions +6.4%.",
      bullets: [
        "Code-splitting & route-level prefetch",
        "Edge caching of API responses",
        "Image policy & priority hints",
      ],
      link: "#",
    },
    {
      title: "Data Explorer: 1M+ rows under 200ms perceived",
      result: "Server-side pagination + virtualization reduced bandwidth by 70%.",
      bullets: [
        "AG Grid server-mode",
        "Async chunked filters",
        "Web workers for transforms",
      ],
      link: "#",
    },
  ]
  return (
    <Section id="case-studies" ariaLabel="Case Studies" className="py-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Case Studies</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {cases.map((c) => (
          <article
            key={c.title}
            className="rounded-xl border border-[var(--border)] bg-white p-5 transition hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-zinc-700">
              <FileText size={18} /> <h3 className="text-lg font-semibold">{c.title}</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-600">{c.result}</p>
            <ul className="mt-3 text-sm text-zinc-700 space-y-1 list-disc ps-5">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <a
              href={c.link}
              className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[var(--accent)] focus-ring"
            >
              Read more <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* --- Experience --- */
function Experience() {
  const items = [
    {
      org: "BNY Mellon",
      role: "Full Stack Developer — Finance Corporate Services",
      time: "Sept 2022 – Present",
      bullets: [
        "Automated batch workflows to reduce SLA breaches ~40% and accelerate reporting cycles.",
        "Real-time incident search across Oracle/MS SQL with Spring Data JPA.",
        "AG Grid with server pagination for 1M+ rows; faster loads and lower bandwidth.",
      ],
    },
    {
      org: "Fidelity Investments",
      role: "Software Engineer — Digital Experience",
      time: "Sept 2016 – Nov 2017",
      bullets: [
        "Revamped IRA interface with Angular + Spring; reduced support call volume.",
        "Built REST APIs; contributed to TDD and web-first architecture.",
      ],
    },
    {
      org: "Cambo Box (Restaurant)",
      role: "Owner / Operator",
      time: "May 2018 – Aug 2023",
      bullets: ["Operations, marketing, and process design; 90%+ customer satisfaction."],
    },
  ] as const

  return (
    <Section id="experience" ariaLabel="Experience" className="py-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Experience</h2>
      <ol className="relative border-s border-[var(--border)]">
        {items.map((x, i) => (
          <li key={i} className="ms-6 pb-7">
            <span
              className="absolute -start-3 mt-1 h-5 w-5 rounded-full border border-[var(--border)] bg-[var(--card)]"
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base sm:text-lg font-semibold">
                {x.role} · {x.org}
              </h3>
              <time className="flex items-center gap-1 text-sm text-zinc-500">
                <Calendar size={14} /> {x.time}
              </time>
            </div>
            <ul className="mt-2 list-disc ps-5 text-sm text-zinc-600 space-y-1">
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

/* --- Testimonials --- */
function Testimonials() {
  const quotes = [
    {
      quote:
        "Johar took our flaky prototype and turned it into a rock-solid app. Measurable impact within weeks.",
      name: "A. Product Lead",
      title: "Fintech Platform",
    },
    {
      quote:
        "Very strong on performance and developer experience. Our build times dropped dramatically.",
      name: "S. Eng Manager",
      title: "E-commerce",
    },
  ]
  return (
    <Section id="testimonials" ariaLabel="Testimonials" className="py-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Testimonials</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {quotes.map((q) => (
          <figure
            key={q.quote}
            className="rounded-xl border border-[var(--border)] bg-white p-5"
          >
            <Star className="text-yellow-500" size={18} aria-hidden />
            <blockquote className="mt-3 text-zinc-700 leading-relaxed">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-zinc-600">
              {q.name} · {q.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

/* --- Credentials (certs/education) --- */
function Credentials() {
  const items = [
    {
      icon: <Award size={18} />,
      title: "AWS Certified Cloud Practitioner",
      org: "Amazon Web Services",
      year: "2024",
    },
    {
      icon: <Award size={18} />,
      title: "Scrum Master (PSM I)",
      org: "Scrum.org",
      year: "2023",
    },
    {
      icon: <Briefcase size={18} />,
      title: "B.S. Computer Science",
      org: "Your University",
      year: "2016",
    },
  ]
  return (
    <Section id="credentials" ariaLabel="Credentials" className="py-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Credentials</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div
            key={i.title}
            className="rounded-xl border border-[var(--border)] bg-white p-4"
          >
            <div className="flex items-center gap-2 text-zinc-700">
              {i.icon} <p className="font-semibold">{i.title}</p>
            </div>
            <p className="text-sm text-zinc-600">{i.org}</p>
            <p className="text-xs text-zinc-500 mt-1">{i.year}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* --- Contact --- */
function Contact() {
  const [status, setStatus] = useState<{
    type: "idle" | "ok" | "error"
    message?: string
  }>({ type: "idle" })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/contact", {
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
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Email me directly instead.",
      })
    }
  }

  return (
    <Section id="contact" ariaLabel="Contact" className="py-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
        <a
          href="mailto:you@email.com"
          className="hidden md:inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[var(--accent)] focus-ring"
        >
          <Mail size={16} /> Email
        </a>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:-translate-y-0.5 focus-ring"
            >
              Send <ArrowUpRight size={16} aria-hidden />
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

        <div className="space-y-5">
          <p className="text-zinc-600 leading-relaxed">
            Want to collaborate or hire me? Let’s talk about your goals and how we can
            ship confidently.
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

/* --- Footer --- */
function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Johar R Warsol.
        </p>
        <a
          href="#home"
          className="text-sm text-zinc-700 hover:text-[var(--accent)] focus-ring"
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}

/* --- Page --- */
export default function Page() {
  return (
    <main className="relative">
      {/* Keep the palette in globals.css; ensure :root vars exist there */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:ring-4 focus:ring-[var(--accent)] focus:rounded-md"
      >
        Skip to content
      </a>
      <ThemeStyles />
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <CaseStudies />
      <Experience />
      <Testimonials />
      <Credentials />
      <Contact />
      <Footer />
    </main>
  )
}
