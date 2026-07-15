// THE LIVING SCORE: An asymmetric monochrome editorial page where typography, rules, and whitespace create musical rhythm.
import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const projects = [
  {
    number: "01",
    title: "Score Octopus",
    question: "Upload one master-score PDF. The system detects instruments and produces print-ready individual parts—turning hours of repetitive preparation into a simpler workflow.",
    status: "Working prototype",
    image: "/images/score_octopus.png",
  },
  {
    number: "02",
    title: "Musicianship Tools",
    question: "A growing family of focused tools—including a MIDI score follower and rhythm trainer—designed to support independent practice beyond rehearsal.",
    status: "In development",
    image: "/images/score_follower_screenshot.jpeg",
  },
  {
    number: "03",
    title: "AI Practice Companion",
    question: "Real-time guidance that identifies what went wrong, diagnoses why it happened, and offers a practical strategy for the next repetition.",
    status: "Research & prototyping",
    image: "/images/trumpet_boy.jpeg",
  },
];

const founders = [
  {
    number: "01",
    name: "Francis Tan",
    role: "Co-founder · Conductor, educator & learning-sciences researcher",
    image: "/images/francis_tan.jpeg",
    note: "Francis Tan is Resident Conductor at the National University of Singapore Centre for the Arts and Academic Coordinator for NUS Arts-for-All. His work and research focus on learning sciences within music education, instrumental and ensemble pedagogy, and AI-assisted musical learning. At AImplified Creatives, he researches and develops creative technology and AI-assisted tools for personalised music learning, ensemble rehearsal, and creative work.",
  },
  {
    number: "02",
    name: "Dr. Lim Teck Chuan",
    role: "Co-founder · Data science & AI specialist",
    image: "/images/lim_teck_chuan.jpeg",
    note: "Teck Chuan Lim (PhD) began his career in health and medical engineering before specialising in data science and artificial intelligence for complex systems optimisation. His current work focuses on Generative and Agentic AI for workflow acceleration and human-AI collaboration in multinational environments. His interests include rapid prototyping, practical AI applications, and accessible approaches to technology-enabled creativity and learning.",
  },
];

function SectionLabel({ number, children, inverted = false }: { number: string; children: React.ReactNode; inverted?: boolean }) {
  return (
    <div className={`section-label ${inverted ? "text-white/55" : "text-black/45"}`}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

function LogoIcon({ className = "h-9 w-9", inverted = false }: { className?: string; inverted?: boolean }) {
  const baseColor = inverted ? "text-white" : "text-black";
  return (
    <svg className={`${className} ${baseColor}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main bold disc */}
      <circle cx="45" cy="50" r="35" fill="currentColor" />
      {/* Interrupted precise wave-like cut */}
      <path
        d="M 12 50 C 25 30, 35 70, 48 50 C 60 30, 70 70, 78 50"
        stroke={inverted ? "#0a0a0a" : "white"}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small orbiting satellite dot */}
      <circle cx="88" cy="35" r="7" fill="currentColor" />
    </svg>
  );
}

function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#top" className="wordmark" aria-label="AImplified Creatives, home">
      <LogoIcon className="h-9 w-9" inverted={inverted} />
      <span className={inverted ? "text-white" : "text-black"}>
        <strong>AI</strong>mplified <span>Creatives</span>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(Boolean(window.localStorage.getItem("aimplified-subscriber")));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const promise = (async () => {
      const { error } = await supabase.from("subscribers").insert([{ email: cleanEmail }]);
      if (error) {
        throw new Error(error.message || "Failed to save subscription.");
      }
    })();

    toast.promise(promise, {
      loading: "Saving your subscription...",
      success: () => {
        window.localStorage.setItem("aimplified-subscriber", cleanEmail);
        setSubscribed(true);
        return "You’re on the list. We’ll keep it thoughtful.";
      },
      error: (err: any) => {
        console.error("Supabase error:", err);
        return err.message || "Failed to save subscription.";
      },
    });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-white text-black">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/92 backdrop-blur-md">
        <div className="site-shell flex h-[76px] items-center justify-between">
          <Wordmark />
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
            <a className="nav-link" href="#projects">Projects</a>
            <a className="nav-link" href="#founders">Founders</a>
            <a className="nav-link" href="#mailing-list">Mailing list</a>
          </nav>
          <button
            className="icon-button md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-black/10 bg-white px-5 py-6 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-5 font-medium">
              <a href="#projects" onClick={closeMenu}>Projects</a>
              <a href="#founders" onClick={closeMenu}>Founders</a>
              <a href="#mailing-list" onClick={closeMenu}>Mailing list</a>
            </div>
          </motion.nav>
        )}
      </header>

      <main>
        <section className="relative min-h-[94svh] border-b border-black/15 pt-[76px]">
          <div className="hero-art" aria-hidden="true" />
          <div className="site-shell relative z-10 grid min-h-[calc(94svh-76px)] grid-cols-1 items-end gap-10 pb-10 pt-20 md:grid-cols-12 md:pb-14 md:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              className="md:col-span-9"
            >
              <p className="eyebrow mb-7">A creative studio for music education</p>
              <h1 className="display-heading max-w-[980px]">
                The future music classroom will be shaped by <em>music educators.</em>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="md:col-span-3 md:pb-3"
            >
              <p className="max-w-sm text-base leading-7 text-black/65">
                We explore how emerging technology can help educators create more personal, adaptive, and imaginative ways to learn music.
              </p>
              <a className="btn-primary mt-8" href="#story">
                Read our story <ArrowDown size={15} />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="story" className="section-space bg-white">
          <div className="site-shell grid grid-cols-1 gap-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <SectionLabel number="01">Our story</SectionLabel>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {/* Part 1: Why We Started */}
              <div>
                <span className="text-xs uppercase tracking-[0.16em] text-black/45">Why We Started</span>
                <h2 className="section-heading mt-4">
                  Every student deserves the chance to <em>thrive.</em>
                </h2>
                <div className="mt-8 border-t border-black/20 pt-7">
                  <p className="body-large max-w-xl">
                    We believe every student deserves a learning experience that is engaging, personalised, and inspiring. Yet many music educators face the same challenge: limited time, diverse learning needs, and finite resources.
                  </p>
                </div>
              </div>

              {/* Part 2: A classroom that changed everything */}
              <div className="mt-16">
                <h3 className="font-display text-2xl md:text-3xl font-medium">A classroom that changed everything.</h3>
                <div className="mt-6 grid gap-8 border-t border-black/10 pt-6 sm:grid-cols-2">
                  <p className="text-base leading-7 text-black/75">
                    The idea for <strong>AI</strong>mplified Creatives began while leading a school band that could rehearse only once a week because of resource constraints. The students were eager and full of potential, but rehearsals were spent developing the fundamentals of performance technique and music literacy, leaving little opportunity for interpretation, ensemble playing, and artistic expression.
                  </p>
                  <p className="text-base leading-7 text-black/75">
                    Whenever specialist tutors were available, everything changed. Students arrived better prepared, rehearsals became more musical, and teachers could focus on creativity instead of constant technical correction.
                  </p>
                </div>
              </div>

              {/* Part 3: The insight */}
              <div className="mt-16">
                <h3 className="font-display text-2xl md:text-3xl font-medium">The insight.</h3>
                <div className="mt-6 border-t border-black/10 pt-6">
                  <p className="body-large max-w-xl">
                    The experience revealed a simple truth: personalised learning makes a remarkable difference, but it is difficult to deliver consistently. Most teachers cannot provide every student with individual guidance, and many schools cannot afford the additional support their students need.
                  </p>
                </div>
              </div>

              {/* Part 4: Our Solution */}
              <div className="mt-20 border-t border-black/25 pt-12">
                <span className="text-xs uppercase tracking-[0.16em] text-black/45">Our Solution</span>
                <h2 className="section-heading mt-4">
                  AIMplified Creatives exists to help <em>bridge that gap.</em>
                </h2>
                <div className="mt-8 border-t border-black/20 pt-7">
                  <p className="body-large max-w-xl">
                    We combine music pedagogy with AI to help educators personalise learning, create adaptive learning experiences, design engaging lessons, and extend meaningful learning beyond the classroom. Our goal is to amplify great teaching, giving every student more opportunities to learn, create, and grow, while giving educators more time to focus on what matters most: inspiring the next generation of musicians.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-10 text-white md:py-14">
          <div className="site-shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <p className="font-display text-3xl leading-tight md:text-5xl">We discover. We test. We teach. We build.</p>
            <p className="max-w-sm text-sm leading-6 text-white/58">
              One experiment at a time—so educators can spend more time making music.
            </p>
          </div>
        </section>

        <section id="projects" className="section-space bg-[#f2f2ef]">
          <div className="site-shell">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-3">
                <SectionLabel number="02">Ongoing projects</SectionLabel>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <h2 className="section-heading">Ideas moving from question to <em>working tool.</em></h2>
                <p className="mt-7 max-w-xl text-base leading-7 text-black/58">
                  Our work connects rehearsal preparation, independent practice, and meaningful feedback—always beginning with a real educational need.
                </p>
              </div>
            </div>

            <div className="mt-16 border-t border-black/25 md:mt-24">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="project-row group"
                >
                  <div className="project-number">{project.number}</div>
                  <div className="relative overflow-hidden bg-white aspect-[3/2]">
                    {project.title === "Musicianship Tools" ? (
                      <>
                        <img
                          src="/images/score_follower_screenshot.jpeg"
                          alt="Score Follower"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                        />
                        <img
                          src="/images/rhythm_trainer_screenshot.jpeg"
                          alt="Rhythm Trainer"
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.025]"
                        />
                      </>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <p className="status-line"><span />{project.status}</p>
                      <h3 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">{project.title}</h3>
                    </div>
                    <p className="mt-8 max-w-xl text-base leading-7 text-black/62">{project.question}</p>
                  </div>
                  <ArrowUpRight className="project-arrow" size={22} aria-hidden="true" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space border-y border-black/15 bg-white">
          <div className="site-shell grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <SectionLabel number="03">Upcoming workshop</SectionLabel>
            </div>
            <div className="md:col-span-5 md:col-start-5">
              <p className="eyebrow mb-6">24 July 2026 · WBAS Symposium</p>
              <h2 className="section-heading">Music EdTech Solutions: AI and the Future Music Classroom</h2>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <p className="body-large">
                At the Wind Bands Association of Singapore Symposium, participants will use four structured prompts to build a mobile-first School Band Hub with announcements, schedules, and resources—showing how educators can move from tool users to tool builders without needing to code.
              </p>
              <Link href="/guide" className="btn-primary mt-6 w-full text-center text-xs">
                View Prompt Guide →
              </Link>
              <p className="mt-7 text-sm text-black/45">Hands-on workshop led by Francis Tan & Teck Chuan Lim, PhD</p>
            </div>
          </div>
        </section>

        <section id="founders" className="section-space bg-black text-white">
          <div className="site-shell">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-3">
                <SectionLabel number="04" inverted>About the founders</SectionLabel>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <h2 className="section-heading text-white">
                  Music first. Technology with <em>purpose.</em>
                </h2>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-white/58">
                  AImplified Creatives was started by two educators asking a practical question: how can technology give music teachers more time, more agency, and better ways to meet every learner?
                </p>
              </div>
            </div>

            <div className="mt-20 grid border-t border-white/20 md:grid-cols-2">
              {founders.map((founder) => (
                <article key={founder.name} className="founder-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs tracking-[0.2em] text-white/35">{founder.number}</span>
                      {founder.image && (
                        <div className="h-24 w-24 overflow-hidden rounded-full border border-white/25">
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className="h-full w-full object-cover filter grayscale contrast-[1.05] hover:grayscale-0 hover:contrast-100 transition-all duration-300"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-14 md:mt-20">
                      <h3 className="font-display text-5xl leading-none md:text-6xl">{founder.name}</h3>
                      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/45">{founder.role}</p>
                      <p className="mt-8 max-w-lg text-base leading-7 text-white/65">{founder.note}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="mailing-list" className="section-space bg-white">
          <div className="site-shell grid grid-cols-1 gap-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <SectionLabel number="05">Mailing list</SectionLabel>
            </div>
            <div className="md:col-span-7 md:col-start-5">
              <p className="eyebrow mb-7">Follow AImplified Creatives</p>
              <h2 className="section-heading max-w-3xl">
                Follow what we <em>build next.</em>
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-black/58">
                Receive project updates, workshop announcements, and useful ideas at the meeting point of music education and technology. No noise—only something worth sharing.
              </p>

              {subscribed ? (
                <div className="mt-12 flex items-center gap-4 border-y border-black py-6" role="status">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"><Check size={17} /></span>
                  <div>
                    <p className="font-medium">You’re part of the journey.</p>
                    <p className="mt-1 text-sm text-black/50">We’ll write when there is something worth hearing.</p>
                  </div>
                </div>
              ) : (
                <form className="signup-form mt-12" onSubmit={handleSubmit} noValidate>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <button type="submit">
                    Join the list <ArrowUpRight size={17} />
                  </button>
                </form>
              )}
              <p className="mt-4 text-xs leading-5 text-black/40">A considered note from time to time. Unsubscribe whenever you like.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/15 bg-white py-8">
        <div className="site-shell flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <Wordmark />
          <div className="text-left text-xs leading-5 text-black/42 sm:text-right">
            <p>Shaping what music education might become.</p>
            <p>© {new Date().getFullYear()} AImplified Creatives</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
