export default function ServicesPage() {
  return (
    <main>
      <section className="section-band services-section pt-32">
        <div className="wrap">
          <div className="section-heading">
            <span className="eyebrow">Services</span>
            <h2 className="script-title">What I do</h2>
            <p className="serif-italic">Weddings and pre-wedding shoots, each shaped around you, never a template.</p>
            <span className="ornament" aria-hidden="true" />
          </div>
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
    </main>
  );
}
