"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const moments = [
  { photo: 0, note: "I asked them to forget I was there. This is the first breath they let out together.", name: "A softer kind of forever" },
  { photo: 12, note: "The dog was never a guest. I let him lead, and followed the laughter.", name: "The whole family" },
  { photo: 14, note: "I stepped back and let the architecture frame them: two small figures, one enormous promise.", name: "A little grandeur" },
  { photo: 6, note: "No count of three. I waited for the moment the pose gave way to joy.", name: "Joy, unhurried" },
  { photo: 11, note: "Golden hour, no direction. I walked behind them and let the shore set the pace.", name: "Where the day wanders" },
];

const quotes = [
  { quote: "Jas made everything feel so effortless. The photos are even more beautiful than we imagined.", couple: "A & R", place: "Toronto, Canada" },
  { quote: "Our guests still talk about how calm the day felt. Jas disappeared into the moment and caught every one of them.", couple: "S & M", place: "Toronto, Canada" },
  { quote: "We forgot the camera was there. Looking through the gallery felt like living the day again.", couple: "N & K", place: "Tricity, India" },
];

const questions = [
  ["Do you travel for destination weddings?", "Yes — I love destination weddings and travel worldwide. Travel details are included in your custom quote."],
  ["What is included in your packages?", "Full-day coverage, a private online gallery, and print-ready edited images. Details are shared on enquiry."],
  ["How many photos will we receive?", "It depends on your coverage, but expect a full story told in hundreds of carefully edited images."],
  ["What is your photography style?", "Documentary and editorial: warm, natural light and honest in-between moments over stiff posing."],
  ["Do you work with a second shooter?", "For larger weddings, yes. I'll recommend what suits your day best."],
  ["Can we customize a package?", "Absolutely. Every package can be tailored to your timeline and needs."],
  ["How do we book you?", "Send a message through the contact form. After a conversation, a signed agreement and retainer secure your date."],
  ["What is your cancellation policy?", "The retainer is non-refundable, and the date can be rescheduled subject to availability. Full terms are in the agreement."],
];

export default function Home() {
  const [momentIndex, setMomentIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const activeMoment = moments[momentIndex] ?? moments[0];
  const activeQuote = quotes[quoteIndex] ?? quotes[0];

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const section = document.getElementById("hero");
        if (section) {
          const travel = Math.max(1, section.offsetHeight - window.innerHeight);
          const progress = Math.min(0.999, Math.max(0, -section.getBoundingClientRect().top / travel));
          setMomentIndex(Math.floor(progress * moments.length));
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="portfolio">
      <main>
        <section id="hero" className="hero-section" aria-label="Wedding stories">
          <div className="hero-sticky">
            <div className="hero-photo-placeholder bg-brand-ink flex items-center justify-center text-white">
              <p className="text-xl">Photo {activeMoment.photo + 1}</p>
            </div>
            <div className="hero-veil" />
            <p className="hero-script">For the ones<br />who feel deeply.</p>
            <div className="hero-copy" key={momentIndex}>
              <span className="eyebrow">Weddings, as they felt</span>
              <p className="hero-note">{activeMoment.note}</p>
              <span className="hero-name">{activeMoment.name}</span>
            </div>
            <h1 className="visually-hidden">Wedding photography for the real ones</h1>
            <span className="scroll-cue"><i aria-hidden="true" /> Scroll to wander</span>
          </div>
        </section>

        <section className="intro-section section-band">
          <div className="wrap intro-layout">
            <div className="intro-polaroids" aria-label="A couple surrounded by the beauty of their wedding day">
              <figure className="polaroid polaroid-back">
                <div className="aspect-[0.88] bg-brand-line" />
                <figcaption>the good stuff</figcaption>
              </figure>
              <figure className="polaroid polaroid-front">
                <div className="aspect-[0.88] bg-brand-line" />
                <figcaption>just as it was</figcaption>
              </figure>
            </div>
            <div className="intro-copy">
              <span className="eyebrow">Capturing what matters</span>
              <h2 className="script-title">Where art meets your most authentic self</h2>
              <p className="serif-italic">Capturing the quiet beauty of human connection and the raw emotions that define your story. Beyond the pose, I seek the soul.</p>
              <div className="signature">With care, Jas</div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-band portfolio-section">
          <div className="wrap">
            <SectionHeading eyebrow="Portfolio" title="The albums" subtitle="Choose a story and wander through the full gallery." />
            <div className="album-grid">
              {[
                { id: "garden", title: "In the garden", count: 8 },
                { id: "pup", title: "With their pup", count: 5 },
                { id: "estates", title: "Grand estates", count: 4 },
              ].map((album, index) => (
                <Link key={album.id} href={`/portfolio/${album.id}`} className={`album-card album-card-${index + 1}`}>
                  <span className="album-image">
                    <div className="w-full h-full bg-brand-line" />
                    <span className="album-count">{album.count} photographs <ArrowUpRight aria-hidden="true" /></span>
                  </span>
                  <span className="album-caption">
                    <span className="album-title">{album.title}</span>
                    <span className="eyebrow">View story</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="films" className="films-section section-band">
          <div className="wrap films-layout">
            <div className="film-image">
              <div className="w-full aspect-[16/10] bg-brand-line" />
              <span className="film-image-label">A day that moves like memory</span>
            </div>
            <div className="film-copy">
              <span className="eyebrow">In motion</span>
              <h2 className="script-title">Wedding films</h2>
              <p className="serif-italic">The same in-between moments, in motion — the laughter, the vows and the quiet between.</p>
              <Link className="text-link" href="/contact">Ask about films <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section id="services" className="section-band services-section">
          <div className="wrap">
            <SectionHeading eyebrow="Services" title="What I do" subtitle="Weddings and pre-wedding shoots, each shaped around you, never a template." />
            <div className="service-grid">
              {[
                ["I", "Weddings", "Full-day coverage, told as it unfolds."],
                ["II", "Pre-wedding", "Relaxed sessions, just the two of you."],
                ["III", "Wedding films", "The day in motion, cut to feel like memory."],
                ["IV", "Destination", "Worldwide travel, quoted with your day."],
              ].map(([number, title, copy]) => (
                <article className="service-item" key={number}>
                  <span className="eyebrow">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <p className="included-note serif-italic">Every package includes full-day coverage, a private online gallery and print-ready edited images.</p>
          </div>
        </section>

        <section className="section-band process-section">
          <div className="wrap">
            <SectionHeading eyebrow="The process" title="How it works" />
            <div className="process-grid">
              {[
                ["01", "Enquire", "Send a message through the contact form. I reply within 24–48 hours."],
                ["02", "Talk", "We talk through your day and tailor a package to your timeline."],
                ["03", "Secure your date", "A signed agreement and retainer hold your date."],
              ].map(([number, title, copy]) => (
                <article className="process-step" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section-band testimonials-section">
          <div className="wrap testimonial-layout">
            <div className="testimonial-image">
              <div className="w-full aspect-[3/4] bg-brand-line" />
            </div>
            <div className="testimonial-copy">
              <span className="eyebrow">Kind words</span>
              <h2 className="script-title">Love letters</h2>
              <div className="quote-stage" aria-live="polite" aria-atomic="true">
                <blockquote key={quoteIndex} className="serif-quote">
                  "{activeQuote.quote}"
                  <cite>{activeQuote.couple}<small>{activeQuote.place}</small></cite>
                </blockquote>
              </div>
              <div className="quote-controls">
                <span className="eyebrow">{String(quoteIndex + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(quotes.length).padStart(2, "0")}</span>
                <div>
                  <Button variant="ghost" size="icon" className="round-control" aria-label="Previous testimonial" onClick={() => setQuoteIndex((quoteIndex - 1 + quotes.length) % quotes.length)}>
                    <ArrowLeft />
                  </Button>
                  <Button variant="ghost" size="icon" className="round-control" aria-label="Next testimonial" onClick={() => setQuoteIndex((quoteIndex + 1) % quotes.length)}>
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section-band faq-section">
          <div className="wrap">
            <SectionHeading eyebrow="Good to know" title="Frequently asked" />
            <div className="faq-list">
              {questions.map(([question, answer], index) => (
                <article className={`faq-item${questionIndex === index ? " is-open" : ""}`} key={question}>
                  <h3>
                    <Button variant="ghost" className="faq-trigger" aria-expanded={questionIndex === index} aria-controls={`answer-${index}`} onClick={() => setQuestionIndex(questionIndex === index ? null : index)}>
                      <span>{question}</span>
                      <span className="faq-icon" aria-hidden="true">{questionIndex === index ? "−" : "+"}</span>
                    </Button>
                  </h3>
                  <div id={`answer-${index}`} className="faq-answer" hidden={questionIndex !== index}>
                    <p>{answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-band contact-section">
          <div className="wrap">
            <SectionHeading eyebrow="Say hello" title="Let's tell your story" subtitle="I'd love to hear about your plans. Share a few details and I'll get back to you personally." />
            <form className="contact-form" onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const name = String(data.get("name") ?? "").trim();
              const email = String(data.get("email") ?? "").trim();
              if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
                setFormStatus("Please add your name and a valid email so I can reply.");
                return;
              }
              setFormStatus("Thank you — your message is ready. Email delivery will be available once a contact service is connected.");
            }}>
              <label className="contact-field">
                <span>Your name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className="contact-field">
                <span>Your email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className="contact-field">
                <span>Wedding date (if known)</span>
                <input name="date" type="date" />
              </label>
              <label className="contact-field">
                <span>Location</span>
                <input name="location" autoComplete="off" />
              </label>
              <label className="contact-field field-wide">
                <span>A few details about your day</span>
                <textarea name="message" rows={3} />
              </label>
              <div className="form-bottom">
                <p className="serif-italic">I usually respond within 24–48 hours.</p>
                <Button type="submit" variant="default" className="portfolio-button">Send message <ArrowUpRight aria-hidden="true" /></Button>
              </div>
              <p className="form-status field-wide" role="status" aria-live="polite">{formStatus}</p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="script-title">{title}</h2>
      {subtitle && <p className="serif-italic">{subtitle}</p>}
      <span className="ornament" aria-hidden="true" />
    </div>
  );
}
