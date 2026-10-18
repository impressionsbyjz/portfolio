import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import logoAsset from "@/assets/jas-logo.jpg.asset.json";
import p00 from "@/assets/photo-00.jpg.asset.json";
import p01 from "@/assets/photo-01.jpg.asset.json";
import p02 from "@/assets/photo-02.jpg.asset.json";
import p03 from "@/assets/photo-03.jpg.asset.json";
import p04 from "@/assets/photo-04.jpg.asset.json";
import p05 from "@/assets/photo-05.jpg.asset.json";
import p06 from "@/assets/photo-06.jpg.asset.json";
import p07 from "@/assets/photo-07.jpg.asset.json";
import p08 from "@/assets/photo-08.jpg.asset.json";
import p09 from "@/assets/photo-09.jpg.asset.json";
import p10 from "@/assets/photo-10.jpg.asset.json";
import p11 from "@/assets/photo-11.jpg.asset.json";
import p12 from "@/assets/photo-12.jpg.asset.json";
import p13 from "@/assets/photo-13.jpg.asset.json";
import p14 from "@/assets/photo-14.jpg.asset.json";
import p15 from "@/assets/photo-15.jpg.asset.json";
import p16 from "@/assets/photo-16.jpg.asset.json";
import p17 from "@/assets/photo-17.jpg.asset.json";
import p18 from "@/assets/photo-18.jpg.asset.json";

const photos = [p00, p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15, p16, p17, p18];
const stories = [
  { id: "garden", title: "In the garden", description: "Slow walks, green silk and quiet corners of the park.", images: [0, 3, 1, 4, 5, 2, 6, 7] },
  { id: "pup", title: "With their pup", description: "Sand, sunshine and a golden retriever stealing the show.", images: [12, 8, 9, 11, 10] },
  { id: "estates", title: "Grand estates", description: "Stone columns, long lawns and two people in the middle of it all.", images: [15, 14, 13, 16] },
];
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
  ["Do you work with a second shooter?", "For larger weddings, yes. I’ll recommend what suits your day best."],
  ["Can we customize a package?", "Absolutely. Every package can be tailored to your timeline and needs."],
  ["How do we book you?", "Send a message through the contact form. After a conversation, a signed agreement and retainer secure your date."],
  ["What is your cancellation policy?", "The retainer is non-refundable, and the date can be rescheduled subject to availability. Full terms are in the agreement."],
];

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "JAS — Wedding Photography for the Real Ones" },
      { name: "description", content: "Documentary and editorial wedding photography in Tricity, India and worldwide. Authentic, timeless wedding stories by Jas." },
      { property: "og:title", content: "JAS — Wedding Photography for the Real Ones" },
      { property: "og:description", content: "Documentary and editorial wedding photography. Authentic, timeless, yours." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "JAS — Wedding Photography for the Real Ones" },
      { name: "twitter:description", content: "Documentary and editorial wedding photography. Authentic, timeless, yours." },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&family=Pinyon+Script&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Impressions by JZ",
        description: "Documentary and editorial wedding photography in Tricity, India, with destination wedding coverage worldwide.",
        areaServed: ["Tricity, India", "Worldwide"],
        serviceType: ["Wedding photography", "Pre-wedding photography", "Wedding films"],
        image: logoAsset.url,
      }),
    }],
  }),
});

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [momentIndex, setMomentIndex] = useState(0);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const story = stories.find((item) => item.id === storyId) ?? null;
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
        setScrolled(window.scrollY > window.innerHeight * 0.75);
        ticking = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (photoIndex === null || !story) return;
      if (event.key === "ArrowRight") setPhotoIndex((photoIndex + 1) % story.images.length);
      if (event.key === "ArrowLeft") setPhotoIndex((photoIndex - 1 + story.images.length) % story.images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [photoIndex, story]);

  const chooseStory = (id: string | null) => {
    setStoryId(id);
    setPhotoIndex(null);
    if (id) window.history.replaceState(null, "", `#album/${id}`);
    else if (window.location.hash.startsWith("#album/")) window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  const cyclePhoto = (direction: number) => {
    if (!story || photoIndex === null) return;
    setPhotoIndex((photoIndex + direction + story.images.length) % story.images.length);
  };

  return (
    <div className="portfolio">
      <header className={`site-header${scrolled ? " is-solid" : " is-hero"}`}>
        <div className="header-inner wrap">
          <a className="brand-mark" href="#hero" aria-label="JAS — back to top"><img src={logoAsset.url} alt="Impressions by JZ" /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#portfolio">Albums</a><a href="#films">Films</a><a href="#services">Services</a><a href="#testimonials">Kind words</a><a href="#faq">FAQ</a>
          </nav>
          <Button variant="ghost" className="header-cta" asChild><a href="#contact">Enquire <ArrowUpRight aria-hidden="true" /></a></Button>
          <Button variant="ghost" size="sm" className="menu-trigger" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}<span>{menuOpen ? "Close" : "Menu"}</span></Button>
        </div>
      </header>
      <nav id="mobile-nav" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div>{[["Albums", "#portfolio"], ["Films", "#films"], ["Services", "#services"], ["Kind words", "#testimonials"], ["FAQ", "#faq"], ["Enquire", "#contact"]].map(([label, href]) => <a key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
      </nav>

      <main>
        <section id="hero" className="hero-section" aria-label="Wedding stories">
          <div className="hero-sticky">
            <img key={activeMoment.photo} className="hero-photo" src={photos[activeMoment.photo]?.url} alt={moments[momentIndex]?.note ?? "A wedding day, held gently in the garden"} fetchPriority="high" />
            {momentIndex < moments.length - 1 && <img className="hero-peek" src={photos[moments[momentIndex + 1]?.photo]?.url} alt="" aria-hidden="true" />}
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
              <figure className="polaroid polaroid-back"><img src={photos[3]?.url} alt="Newlyweds laughing together in a leafy garden" loading="lazy" /><figcaption>the good stuff</figcaption></figure>
              <figure className="polaroid polaroid-front"><img src={photos[12]?.url} alt="A couple sharing a quiet moment with their dog" loading="lazy" /><figcaption>just as it was</figcaption></figure>
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
              {stories.map((item, index) => <button className={`album-card album-card-${index + 1}`} type="button" key={item.id} onClick={() => chooseStory(item.id)} aria-label={`Open the album: ${item.title}`}>
                <span className="album-image"><img src={photos[item.images[0]]?.url} alt="" loading="lazy" /><span className="album-count">{item.images.length} photographs <ArrowUpRight aria-hidden="true" /></span></span>
                <span className="album-caption"><span className="album-title">{item.title}</span><span className="eyebrow">View story</span></span>
              </button>)}
            </div>
          </div>
        </section>

        <section id="films" className="films-section section-band">
          <div className="wrap films-layout">
            <div className="film-image"><img src={photos[13]?.url} alt="A couple walking together beneath the trees" loading="lazy" /><span className="film-image-label">A day that moves like memory</span></div>
            <div className="film-copy"><span className="eyebrow">In motion</span><h2 className="script-title">Wedding films</h2><p className="serif-italic">The same in-between moments, in motion — the laughter, the vows and the quiet between.</p><a className="text-link" href="#contact">Ask about films <ArrowRight aria-hidden="true" /></a></div>
          </div>
        </section>

        <section id="services" className="section-band services-section">
          <div className="wrap"><SectionHeading eyebrow="Services" title="What I do" subtitle="Weddings and pre-wedding shoots, each shaped around you, never a template." />
            <div className="service-grid">{[
              ["I", "Weddings", "Full-day coverage, told as it unfolds."], ["II", "Pre-wedding", "Relaxed sessions, just the two of you."], ["III", "Wedding films", "The day in motion, cut to feel like memory."], ["IV", "Destination", "Worldwide travel, quoted with your day."],
            ].map(([number, title, copy]) => <article className="service-item" key={number}><span className="eyebrow">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
            <p className="included-note serif-italic">Every package includes full-day coverage, a private online gallery and print-ready edited images.</p>
          </div>
        </section>

        <section className="section-band process-section">
          <div className="wrap"><SectionHeading eyebrow="The process" title="How it works" />
            <div className="process-grid">{[["01", "Enquire", "Send a message through the contact form. I reply within 24–48 hours."], ["02", "Talk", "We talk through your day and tailor a package to your timeline."], ["03", "Secure your date", "A signed agreement and retainer hold your date."]].map(([number, title, copy]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section id="testimonials" className="section-band testimonials-section">
          <div className="wrap testimonial-layout">
            <div className="testimonial-image"><img src={photos[6]?.url} alt="A couple celebrating in a sunlit garden" loading="lazy" /></div>
            <div className="testimonial-copy"><span className="eyebrow">Kind words</span><h2 className="script-title">Love letters</h2><div className="quote-stage" aria-live="polite" aria-atomic="true"><blockquote key={quoteIndex} className="serif-quote">“{activeQuote.quote}”<cite>{activeQuote.couple}<small>{activeQuote.place}</small></cite></blockquote></div>
              <div className="quote-controls"><span className="eyebrow">{String(quoteIndex + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(quotes.length).padStart(2, "0")}</span><div><Button variant="ghost" size="icon" className="round-control" aria-label="Previous testimonial" onClick={() => setQuoteIndex((quoteIndex - 1 + quotes.length) % quotes.length)}><ArrowLeft /></Button><Button variant="ghost" size="icon" className="round-control" aria-label="Next testimonial" onClick={() => setQuoteIndex((quoteIndex + 1) % quotes.length)}><ArrowRight /></Button></div></div>
            </div>
          </div>
        </section>

        <section id="faq" className="section-band faq-section"><div className="wrap"><SectionHeading eyebrow="Good to know" title="Frequently asked" />
          <div className="faq-list">{questions.map(([question, answer], index) => <article className={`faq-item${questionIndex === index ? " is-open" : ""}`} key={question}><h3><Button variant="ghost" className="faq-trigger" aria-expanded={questionIndex === index} aria-controls={`answer-${index}`} onClick={() => setQuestionIndex(questionIndex === index ? null : index)}><span>{question}</span><span className="faq-icon" aria-hidden="true">{questionIndex === index ? "−" : "+"}</span></Button></h3><div id={`answer-${index}`} className="faq-answer" hidden={questionIndex !== index}><p>{answer}</p></div></article>)}</div>
        </div></section>

        <section id="contact" className="section-band contact-section"><div className="wrap"><SectionHeading eyebrow="Say hello" title="Let’s tell your story" subtitle="I’d love to hear about your plans. Share a few details and I’ll get back to you personally." />
          <form className="contact-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get("name") ?? "").trim(); const email = String(data.get("email") ?? "").trim(); if (!name || !/^\S+@\S+\.\S+$/.test(email)) { setFormStatus("Please add your name and a valid email so I can reply."); return; } setFormStatus("Thank you — your message is ready. Email delivery will be available once a contact service is connected."); }}>
            <label className="contact-field"><span>Your name</span><input name="name" autoComplete="name" required /></label>
            <label className="contact-field"><span>Your email</span><input name="email" type="email" autoComplete="email" required /></label>
            <label className="contact-field"><span>Wedding date (if known)</span><input name="date" type="date" /></label>
            <label className="contact-field"><span>Location</span><input name="location" autoComplete="off" /></label>
            <label className="contact-field field-wide"><span>A few details about your day</span><textarea name="message" rows={3} /></label>
            <div className="form-bottom"><p className="serif-italic">I usually respond within 24–48 hours.</p><Button type="submit" variant="default" className="portfolio-button">Send message <ArrowUpRight aria-hidden="true" /></Button></div>
            <p className="form-status field-wide" role="status" aria-live="polite">{formStatus}</p>
          </form>
        </div></section>
      </main>

      <footer className="site-footer"><div className="wrap footer-grid">
        <div className="footer-brand"><img src={logoAsset.url} alt="Impressions by JZ" /><p>Capturing what matters.</p><span className="signature">For the ones who feel deeply.</span></div>
        <div><h2>Based in</h2><p>Tricity, India</p><p>Weddings, pre-wedding shoots, films</p></div>
        <div><h2>Explore</h2><a href="#portfolio">The albums</a><a href="#services">Services</a><a href="#contact">Enquire</a></div>
        <div className="footer-social"><h2>Follow</h2><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram aria-hidden="true" /></a></div>
      </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Impressions by JZ</span><a href="#hero">Back to the beginning <ArrowUpRight aria-hidden="true" /></a></div></footer>

      <Dialog open={Boolean(story)} onOpenChange={(open) => { if (!open) chooseStory(null); }}>
        <DialogContent className="story-dialog">
          {story && <>
            <div className="story-toolbar"><Button variant="ghost" size="sm" onClick={() => chooseStory(null)}><ArrowLeft aria-hidden="true" /> Back to albums</Button><a className="brand-mark dialog-logo" href="#hero" onClick={() => chooseStory(null)} aria-label="JAS — home"><img src={logoAsset.url} alt="Impressions by JZ" /></a><Button variant="ghost" size="sm" asChild><a href="#contact" onClick={() => chooseStory(null)}>Enquire <ArrowUpRight aria-hidden="true" /></a></Button></div>
            <div className="story-heading"><span className="eyebrow">{story.images.length} photographs</span><DialogTitle className="script-title">{story.title}</DialogTitle><DialogDescription className="serif-italic">{story.description}</DialogDescription></div>
            <div className="story-gallery">{story.images.map((photoNumber, index) => <button type="button" key={`${photoNumber}-${index}`} onClick={() => setPhotoIndex(index)} aria-label={`Open photograph ${index + 1} of ${story.images.length}`}><img src={photos[photoNumber]?.url} alt={`${story.title} — photograph ${index + 1}`} loading="lazy" /></button>)}</div>
            <div className="story-next"><span className="eyebrow">Next story</span><button type="button" onClick={() => chooseStory(stories[(stories.findIndex((item) => item.id === story.id) + 1) % stories.length]?.id ?? null)}>{stories[(stories.findIndex((item) => item.id === story.id) + 1) % stories.length]?.title}<ArrowRight aria-hidden="true" /></button></div>
          </>}
        </DialogContent>
      </Dialog>

      <Dialog open={photoIndex !== null && Boolean(story)} onOpenChange={(open) => { if (!open) setPhotoIndex(null); }}>
        <DialogContent className="photo-dialog">
          {story && photoIndex !== null && <>
            <DialogTitle className="visually-hidden">{story.title} — photograph {photoIndex + 1}</DialogTitle><DialogDescription className="visually-hidden">Wedding photograph in the {story.title.toLowerCase()} gallery.</DialogDescription>
            <Button variant="ghost" size="icon" className="photo-close" aria-label="Close photograph" onClick={() => setPhotoIndex(null)}><X /></Button>
            <Button variant="ghost" size="icon" className="photo-previous" aria-label="Previous photograph" onClick={() => cyclePhoto(-1)}><ChevronLeft /></Button>
            <img className="lightbox-photo" src={photos[story.images[photoIndex]]?.url} alt={`${story.title} — photograph ${photoIndex + 1}`} />
            <Button variant="ghost" size="icon" className="photo-next" aria-label="Next photograph" onClick={() => cyclePhoto(1)}><ChevronRight /></Button>
            <span className="photo-counter">{String(photoIndex + 1).padStart(2, "0")} / {String(story.images.length).padStart(2, "0")}</span>
          </>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2 className="script-title">{title}</h2>{subtitle && <p className="serif-italic">{subtitle}</p>}<span className="ornament" aria-hidden="true" /></div>;
}