"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Instagram, X } from "lucide-react";

interface Moment {
  photo: string;
  note: string;
  pos?: string;
}

const moments: Moment[] = [
  { photo: "hero-1", note: "I asked them to forget I was there. This is the first breath they let out together.", pos: "50% 38%" },
  { photo: "hero-2", note: "The dog was never a guest. I let him lead, and followed the laughter.", pos: "50% 30%" },
  { photo: "hero-3", note: "I stepped back and let the architecture frame them: two small figures, one enormous promise.", pos: "52% 68%" },
];

const quotes = [
  { quote: "Jas made everything feel so effortless. The photos are even more beautiful than we imagined.", couple: "A & R", place: "Toronto, Ontario" },
  { quote: "Our guests still talk about how calm the day felt. Jas disappeared into the moment and caught every one of them.", couple: "S & M", place: "Toronto, Ontario" },
  { quote: "We forgot the camera was there. Looking through the gallery felt like living the day again.", couple: "N & K", place: "Oshawa, Ontario" },
];

const questions = [
  { q: "Do you travel for destination weddings?", a: "Yes — I love destination weddings and travel worldwide. Travel details are included in your custom quote." },
  { q: "What is included in your packages?", a: "Full-day coverage, a private online gallery, and print-ready edited images. Details are shared on enquiry." },
  { q: "How many photos will we receive?", a: "It depends on your coverage, but expect a full story told in hundreds of carefully edited images." },
  { q: "What is your photography style?", a: "Documentary and editorial: warm, natural light and honest in-between moments over stiff posing." },
  { q: "Do you work with a second shooter?", a: "For larger weddings, yes. I'll recommend what suits your day best." },
  { q: "Can we customize a package?", a: "Absolutely. Every package can be tailored to your timeline and needs." },
  { q: "How do we book you?", a: "Send a message through the contact form. After a conversation, a signed agreement and retainer secure your date." },
  { q: "What is your cancellation policy?", a: "The retainer is non-refundable, and the date can be rescheduled subject to availability. Full terms are in the agreement." },
];

const albums = [
  {
    id: "garden",
    title: "In the garden",
    subtitle: "Sunlight through the leaves, slow steps, and vows spoken softly.",
    images: ["a-1", "a-2", "a-3", "a-4"],
  },
  {
    id: "pup",
    title: "With their pup",
    subtitle: "Sand, sunshine and a golden retriever stealing the show.",
    images: ["b-1", "b-2", "b-3", "b-4", "b-5", "b-6", "b-7"],
  },
  {
    id: "estates",
    title: "Grand estates",
    subtitle: "Architecture that held generations, and a day that made it feel like home.",
    images: ["c-1", "c-2", "c-3", "c-4"],
  },
];

const services = [
  { number: "I", title: "Weddings", copy: "Full-day coverage, told as it unfolds." },
  { number: "II", title: "Pre-wedding", copy: "Relaxed sessions, just the two of you." },
  { number: "III", title: "Wedding films", copy: "The day in motion, cut to feel like memory." },
  { number: "IV", title: "Destination", copy: "Worldwide travel, quoted with your day." },
];

const steps = [
  { number: "01", title: "Enquire", copy: "Send a message through the contact form. I reply within 24–48 hours." },
  { number: "02", title: "Talk", copy: "We talk through your day and tailor a package to your timeline." },
  { number: "03", title: "Secure your date", copy: "A signed agreement and retainer hold your date." },
];

/* Helper to render word-by-word blur fade-in */
function SplitText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="word-wrap">
          <span className="word-inner" style={{ "--w-idx": i } as CSSProperties}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [activeMoment, setActiveMoment] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState("");

  // Smooth Album Image Shuffling
  const [albumHoverIndices, setAlbumHoverIndices] = useState<Record<string, number>>({
    garden: 0,
    pup: 0,
    estates: 0,
  });
  const albumIntervals = useRef<Record<string, NodeJS.Timeout | null>>({});

  // Album Dialog & Lightbox
  const [openedAlbumId, setOpenedAlbumId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Custom Cursor
  const curRef = useRef<HTMLDivElement>(null);
  const curDotRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);

  // Intersection Observer for in-and-out reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    const animatedElements = document.querySelectorAll(".reveal-group");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Header transparency sync: transparent throughout Hero; becomes solid ONLY when Section 2 (#intro) is reached
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const hero = heroRef.current;
          const intro = introRef.current;

          if (hero) {
            const rect = hero.getBoundingClientRect();
            const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
            const progress = Math.min(1, Math.max(0, -rect.top / travel));
            setScrollProgress(progress);
            const step = Math.min(moments.length - 1, Math.floor(progress * moments.length));
            setActiveMoment(step);
          }

          if (intro) {
            const introTop = intro.getBoundingClientRect().top;
            setHeaderSolid(introTop <= 76);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom magnetic cursor tracker
  useEffect(() => {
    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      if (curRef.current && curDotRef.current) {
        curRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        curDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const setCursor = (type: "default" | "big" | "link", label = "") => {
    if (!curRef.current) return;
    curRef.current.className = `cur ${type === "big" ? "big" : type === "link" ? "link" : ""}`;
    curRef.current.innerText = label;
  };

  // Image shuffling handler for albums (Smooth fade)
  const handleAlbumMouseEnter = (albumId: string, maxImages: number) => {
    setCursor("big", "View");
    if (albumIntervals.current[albumId]) clearInterval(albumIntervals.current[albumId]!);
    albumIntervals.current[albumId] = setInterval(() => {
      setAlbumHoverIndices((prev) => ({
        ...prev,
        [albumId]: ((prev[albumId] ?? 0) + 1) % maxImages,
      }));
    }, 1250);
  };

  const handleAlbumMouseLeave = (albumId: string) => {
    setCursor("default");
    if (albumIntervals.current[albumId]) {
      clearInterval(albumIntervals.current[albumId]!);
      albumIntervals.current[albumId] = null;
    }
    setAlbumHoverIndices((prev) => ({
      ...prev,
      [albumId]: 0,
    }));
  };

  const selectedAlbum = albums.find((a) => a.id === openedAlbumId);
  const nextAlbum = albums[(albums.findIndex((a) => a.id === openedAlbumId) + 1) % albums.length];

  return (
    <>
      {/* Background grain */}
      <div className="grain" aria-hidden="true" />

      {/* Custom Cursor Ring & Dot */}
      <div ref={curRef} className="cur" aria-hidden="true" />
      <div ref={curDotRef} className="cur-dot" aria-hidden="true" />

      {/* Header (Fully transparent in Section 1, blurred solid only in Section 2) */}
      <header className={`hdr ${headerSolid ? "solid" : "hero"}`}>
        <div className="wrap">
          <Link
            href="#hero"
            className="logo"
            aria-label="Impressions by JZ home"
            onMouseEnter={() => setCursor("link")}
            onMouseLeave={() => setCursor("default")}
          >
            <Image src="/logo.png" alt="Logo" width={50} height={50} priority />
          </Link>

          <nav className="nav" aria-label="Primary">
            <a href="#portfolio" onMouseEnter={() => setCursor("link")} onMouseLeave={() => setCursor("default")}>
              Albums
            </a>
            <a href="#films" onMouseEnter={() => setCursor("link")} onMouseLeave={() => setCursor("default")}>
              Films
            </a>
            <a href="#services" onMouseEnter={() => setCursor("link")} onMouseLeave={() => setCursor("default")}>
              Services
            </a>
            <a href="#testimonials" onMouseEnter={() => setCursor("link")} onMouseLeave={() => setCursor("default")}>
              Kind words
            </a>
            <a href="#faq" onMouseEnter={() => setCursor("link")} onMouseLeave={() => setCursor("default")}>
              FAQ
            </a>
          </nav>

          <a
            href="#contact"
            className="btn btn--o"
            onMouseEnter={() => setCursor("link")}
            onMouseLeave={() => setCursor("default")}
          >
            Enquire
          </a>

          <button
            className="menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <button
          className="lb-btn lb-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
        <div>
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Albums</a>
          <a href="#films" onClick={() => setMobileMenuOpen(false)}>Films</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Kind words</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Enquire</a>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} id="hero" className="hero-s" aria-label="Featured work">
          <div className="stick">
            {moments.map((m, idx) => {
              const offset = (idx - scrollProgress * (moments.length - 1)) * 80;
              return (
                <div
                  key={m.photo}
                  className="hs-slide"
                  style={{
                    left: `${offset}vw`,
                    width: "80vw",
                  }}
                >
                  <img
                    src={`/images/${m.photo}.webp`}
                    alt=""
                    style={{ objectPosition: m.pos ?? "50% 50%" }}
                  />
                </div>
              );
            })}


            <div className="hero-caps">
              {moments.map((m, idx) => (
                <div key={m.photo} className={`hero-cap ${activeMoment === idx ? "on" : ""}`}>
                  <p>{m.note}</p>
                </div>
              ))}
            </div>

            <div className="scroll-cue" aria-hidden="true">
              <i />
              <span>Scroll to wander</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTRO (Word-by-word reveal) */}
        <section ref={introRef} id="intro" className="sec intro reveal-group">
          <div className="wrap">
            <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>
              Capturing what matters
            </span>
            <h2 className="title">
              <SplitText text="Where art meets your most authentic self" />
            </h2>
            <span className="orn fade-up" style={{ "--delay": "0.4s" } as CSSProperties} aria-hidden="true" />
            <p className="it fade-up" style={{ "--delay": "0.55s" } as CSSProperties}>
              Capturing the quiet beauty of human connection and the raw emotions that define your story.
              Beyond the pose, I seek the soul.
            </p>
          </div>
        </section>

        {/* ALBUMS SECTION WITH SMOOTH CROSSFADE SHUFFLE */}
        <section id="portfolio" className="sec alt reveal-group">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>Portfolio</span>
              <h2 className="title">
                <SplitText text="The albums" />
              </h2>
              <span className="orn fade-up" style={{ "--delay": "0.3s" } as CSSProperties} aria-hidden="true" />
              <p className="it fade-up" style={{ "--delay": "0.45s" } as CSSProperties}>
                Choose a story and wander through the full gallery.
              </p>
            </div>

            <div className="albs fade-up" style={{ "--delay": "0.4s" } as CSSProperties}>
              {albums.map((album) => {
                const currentImgIdx = albumHoverIndices[album.id] ?? 0;
                return (
                  <button
                    key={album.id}
                    className="ac"
                    onClick={() => setOpenedAlbumId(album.id)}
                    onMouseEnter={() => handleAlbumMouseEnter(album.id, album.images.length)}
                    onMouseLeave={() => handleAlbumMouseLeave(album.id)}
                    aria-label={`Open album: ${album.title}`}
                  >
                    <div className="ac__stage">
                      <div className="ac__img">
                        {album.images.map((imgName, imgIdx) => (
                          <img
                            key={imgName}
                            src={`/images/${imgName}.webp`}
                            alt=""
                            className={currentImgIdx === imgIdx ? "on" : ""}
                          />
                        ))}
                        <div className="tks">
                          {album.images.map((_, dotIdx) => (
                            <i key={dotIdx} className={currentImgIdx === dotIdx ? "on" : ""} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ac__cap">
                      <h3>{album.title}</h3>
                      <span className="eyebrow">
                        <b>{album.images.length}</b> photographs
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* WEDDING FILMS */}
        <section id="films" className="sec alt reveal-group">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>In motion</span>
              <h2 className="title">
                <SplitText text="Wedding films" />
              </h2>
              <span className="orn fade-up" style={{ "--delay": "0.3s" } as CSSProperties} aria-hidden="true" />
              <p className="it fade-up" style={{ "--delay": "0.45s" } as CSSProperties}>
                The same in-between moments, in motion — the laughter, the vows and the quiet between.
              </p>
            </div>

            <div className="films-canvas fade-up" style={{ "--delay": "0.5s" } as CSSProperties}>
              <div className="gf">
                <div className="gm">
                  <img src="/images/c-3.webp" alt="A couple walking across a lawn" />
                </div>
              </div>
              <p className="films-link">
                <a
                  href="#contact"
                  className="tl"
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={() => setCursor("default")}
                >
                  Ask about films <ArrowRight size={13} />
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="sec reveal-group">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>Services</span>
              <h2 className="title">
                <SplitText text="What I do" />
              </h2>
              <span className="orn fade-up" style={{ "--delay": "0.3s" } as CSSProperties} aria-hidden="true" />
              <p className="it fade-up" style={{ "--delay": "0.45s" } as CSSProperties}>
                Weddings and pre-wedding shoots, each shaped around you, never a template.
              </p>
            </div>

            <div className="service-cards fade-up" style={{ "--delay": "0.5s" } as CSSProperties}>
              {services.map((s, idx) => (
                <article
                  key={s.number}
                  className="scard"
                  style={{ "--delay": `${0.1 * idx}s` } as CSSProperties}
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={() => setCursor("default")}
                >
                  <span className="eyebrow">{s.number}</span>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                </article>
              ))}
            </div>

            <p className="it fade-up" style={{ textAlign: "center", marginTop: "3.5rem", "--delay": "0.55s" } as CSSProperties}>
              Every package includes full-day coverage, a private online gallery and print-ready edited images.
            </p>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="sec alt reveal-group">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>The process</span>
              <h2 className="title">
                <SplitText text="How it works" />
              </h2>
              <span className="orn fade-up" style={{ "--delay": "0.3s" } as CSSProperties} aria-hidden="true" />
            </div>

            <div className="steps fade-up" style={{ "--delay": "0.45s" } as CSSProperties}>
              {steps.map((st) => (
                <div key={st.number} className="step">
                  <span className="eyebrow">{st.number}</span>
                  <h3>{st.title}</h3>
                  <p>{st.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="sec reveal-group">
          <div className="wrap testimonial-grid">
            <div className="arch-wrap fade-up" style={{ "--delay": "0.2s" } as CSSProperties}>
              <div className="arch">
                <img src="/images/b-4.webp" alt="Couple in sunlight" />
              </div>
            </div>

            <div>
              <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>Kind words</span>
              <h2 className="title" style={{ margin: "0.8rem 0 1.8rem" }}>
                <SplitText text="Love letters" />
              </h2>

              <div className="quote-stage" aria-live="polite">
                <div className="quote-body" key={quoteIndex}>
                  <blockquote>&ldquo;{quotes[quoteIndex].quote}&rdquo;</blockquote>
                  <cite>
                    {quotes[quoteIndex].couple}
                    <small>{quotes[quoteIndex].place}</small>
                  </cite>
                </div>
              </div>

              <div className="quote-controls">
                <span className="eyebrow">
                  {String(quoteIndex + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="round-btn"
                    onClick={() => setQuoteIndex((i) => (i - 1 + quotes.length) % quotes.length)}
                    aria-label="Previous testimonial"
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={() => setCursor("default")}
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    className="round-btn"
                    onClick={() => setQuoteIndex((i) => (i + 1) % quotes.length)}
                    aria-label="Next testimonial"
                    onMouseEnter={() => setCursor("link")}
                    onMouseLeave={() => setCursor("default")}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section id="faq" className="sec alt reveal-group">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>Good to know</span>
              <h2 className="title">
                <SplitText text="Frequently asked" />
              </h2>
              <span className="orn fade-up" style={{ "--delay": "0.3s" } as CSSProperties} aria-hidden="true" />
            </div>

            <div className="faq-list fade-up" style={{ "--delay": "0.45s" } as CSSProperties}>
              {questions.map((item, idx) => (
                <div key={item.q} className={`faq-row ${openFaq === idx ? "open" : ""}`}>
                  <button
                    className="faq-btn"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{item.q}</span>
                    <i aria-hidden="true">+</i>
                  </button>
                  <div className="faq-panel">
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="sec reveal-group">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow fade-up" style={{ "--delay": "0.1s" } as CSSProperties}>Say hello</span>
              <h2 className="title">
                <SplitText text="Let's tell your story" />
              </h2>
              <span className="orn fade-up" style={{ "--delay": "0.3s" } as CSSProperties} aria-hidden="true" />
              <p className="it fade-up" style={{ "--delay": "0.45s" } as CSSProperties}>
                I&apos;d love to hear about your plans. Share a few details and I&apos;ll get back to you personally.
              </p>
            </div>

            <form
              className="cform fade-up"
              style={{ "--delay": "0.5s" } as CSSProperties}
              onSubmit={(e) => {
                e.preventDefault();
                setFormStatus("Thank you. Your message has been received.");
              }}
            >
              <div className="cfield">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="cfield">
                <label htmlFor="email">Your email</label>
                <input id="email" type="email" name="email" required autoComplete="email" />
              </div>
              <div className="cfield">
                <label htmlFor="date">Wedding date (if known)</label>
                <input id="date" type="date" name="date" />
              </div>
              <div className="cfield">
                <label htmlFor="location">Location</label>
                <input id="location" name="location" autoComplete="off" />
              </div>
              <div className="cfield f-wide">
                <label htmlFor="message">A few details about your day</label>
                <textarea id="message" name="message" />
              </div>
              <div className="f-wide cform-foot">
                <p className="it" style={{ fontSize: "1rem" }}>I usually respond within 24–48 hours.</p>
                <button
                  type="submit"
                  className="btn"
                  onMouseEnter={() => setCursor("link")}
                  onMouseLeave={() => setCursor("default")}
                >
                  Send message <ArrowUpRight size={14} />
                </button>
              </div>
              {formStatus && (
                <p className="f-wide it" style={{ color: "var(--gold2)", marginTop: "0.5rem" }}>{formStatus}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* SINGLE UNIFIED FOOTER */}
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <img className="f-logo" src="/logo.png" alt="Impressions by JZ" />
            <p style={{ marginTop: "0.8rem", fontSize: "0.85rem" }}>Capturing what matters.</p>
          </div>

          <div>
            <h2>Based in</h2>
            <p>Toronto, Canada</p>
            <p>Weddings, pre-wedding shoots, films</p>
          </div>

          <div>
            <h2>Follow</h2>
            <div className="footer-social">
              <a href="https://www.instagram.com/impressionsbyjz/" aria-label="Instagram"><Instagram size={15} /></a>
            </div>
          </div>

          <div className="r-text">
            <p className="closing-script">For the ones<br />who feel deeply.</p>
          </div>
        </div>
      </footer>

      {/* ALBUM DIALOG MODAL */}
      <div className={`story-dialog ${openedAlbumId ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="story-bar">
          <button
            type="button"
            className="bar-link"
            onClick={() => setOpenedAlbumId(null)}
            onMouseEnter={() => setCursor("link")}
            onMouseLeave={() => setCursor("default")}
          >
            <ArrowLeft size={15} /> Back
          </button>
          <div className="logo">
            <Image src="/images/b-1.webp" alt="Logo" width={40} height={40} />
          </div>
          <a
            href="#contact"
            className="bar-link"
            onClick={() => setOpenedAlbumId(null)}
            onMouseEnter={() => setCursor("link")}
            onMouseLeave={() => setCursor("default")}
          >
            Enquire <ArrowUpRight size={15} />
          </a>
        </div>

        {selectedAlbum && (
          <>
            <div className="story-header">
              <h2 className="title">{selectedAlbum.title}</h2>
              <span className="orn" aria-hidden="true" />
              <p className="it">{selectedAlbum.subtitle}</p>
              <span className="eyebrow">{selectedAlbum.images.length} photographs</span>
            </div>

            <div className="story-masonry">
              {selectedAlbum.images.map((imgName, idx) => (
                <button
                  type="button"
                  key={imgName}
                  className="masonry-item"
                  onClick={() => setLightboxIndex(idx)}
                  onMouseEnter={() => setCursor("big", "Zoom")}
                  onMouseLeave={() => setCursor("default")}
                >
                  <img src={`/images/${imgName}.webp`} alt={`Photo ${idx + 1}`} loading="lazy" />
                </button>
              ))}
            </div>

            <div className="story-foot">
              <span className="eyebrow">Next album</span>
              <br />
              <button
                type="button"
                className="next-title"
                onClick={() => setOpenedAlbumId(nextAlbum.id)}
                onMouseEnter={() => setCursor("link")}
                onMouseLeave={() => setCursor("default")}
              >
                {nextAlbum.title}
              </button>
              <br />
              <a
                href="#contact"
                className="btn"
                style={{ marginTop: "2rem" }}
                onClick={() => setOpenedAlbumId(null)}
                onMouseEnter={() => setCursor("link")}
                onMouseLeave={() => setCursor("default")}
              >
                Book your date
              </a>
            </div>
          </>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {selectedAlbum && (
        <div className={`lightbox ${lightboxIndex !== null ? "open" : ""}`} role="dialog">
          {lightboxIndex !== null && (
            <>
              <img
                src={`/images/${selectedAlbum.images[lightboxIndex]}.webp`}
                alt="Selected view"
              />
              <button
                className="lb-btn lb-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
              >
                <X size={16} />
              </button>
              <button
                className="lb-btn lb-prev"
                onClick={() =>
                  setLightboxIndex(
                    (i) => (i! - 1 + selectedAlbum.images.length) % selectedAlbum.images.length
                  )
                }
                aria-label="Previous photo"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                className="lb-btn lb-next"
                onClick={() =>
                  setLightboxIndex((i) => (i! + 1) % selectedAlbum.images.length)
                }
                aria-label="Next photo"
              >
                <ArrowRight size={16} />
              </button>
              <span className="lb-counter">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(selectedAlbum.images.length).padStart(2, "0")}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}