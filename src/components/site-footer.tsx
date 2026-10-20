import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-brand-surface flex items-center justify-center">JAS</div>
          <p>Capturing what matters.</p>
          <span className="signature">For the ones who feel deeply.</span>
        </div>
        <div>
          <h2>Based in</h2>
          <p>Tricity, India</p>
          <p>Weddings, pre-wedding shoots, films</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/portfolio">The albums</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Enquire</Link>
        </div>
        <div className="footer-social">
          <h2>Follow</h2>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Impressions by JZ</span>
        <Link href="/">Back to the beginning <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </footer>
  );
}
