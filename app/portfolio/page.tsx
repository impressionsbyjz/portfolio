import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stories = [
  { id: "garden", title: "In the garden", description: "Slow walks, green silk and quiet corners of the park.", count: 8 },
  { id: "pup", title: "With their pup", description: "Sand, sunshine and a golden retriever stealing the show.", count: 5 },
  { id: "estates", title: "Grand estates", description: "Stone columns, long lawns and two people in the middle of it all.", count: 4 },
];

export default function PortfolioPage() {
  return (
    <main>
      <section className="section-band portfolio-section pt-32">
        <div className="wrap">
          <div className="section-heading">
            <span className="eyebrow">Portfolio</span>
            <h2 className="script-title">The albums</h2>
            <p className="serif-italic">Choose a story and wander through the full gallery.</p>
            <span className="ornament" aria-hidden="true" />
          </div>
          <div className="album-grid">
            {stories.map((album, index) => (
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
    </main>
  );
}
