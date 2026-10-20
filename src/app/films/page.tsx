import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FilmsPage() {
  return (
    <main>
      <section className="films-section section-band pt-32">
        <div className="wrap films-layout">
          <div className="film-image">
            <Image src="/images/films-1.webp" alt="A couple walking together beneath the trees" width={800} height={500} loading="lazy" />
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
    </main>
  );
}
