import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const stories = [
  { id: "garden", title: "In the garden", description: "Slow walks, green silk and quiet corners of the park.", images: ["a-1", "a-2", "a-3", "a-4"] },
  { id: "pup", title: "With their pup", description: "Sand, sunshine and a golden retriever stealing the show.", images: ["b-1", "b-2", "b-3", "b-4", "b-5", "b-6", "b-7"] },
  { id: "estates", title: "Grand estates", description: "Stone columns, long lawns and two people in the middle of it all.", images: ["c-1", "c-2", "c-3", "c-4"] },
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
                  <Image
                    src={`/images/${album.images[0]}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <span className="album-count">{album.images.length} photographs <ArrowUpRight aria-hidden="true" /></span>
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
