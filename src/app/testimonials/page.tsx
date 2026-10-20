"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  { quote: "Jas made everything feel so effortless. The photos are even more beautiful than we imagined.", couple: "A & R", place: "Toronto, Canada" },
  { quote: "Our guests still talk about how calm the day felt. Jas disappeared into the moment and caught every one of them.", couple: "S & M", place: "Toronto, Canada" },
  { quote: "We forgot the camera was there. Looking through the gallery felt like living the day again.", couple: "N & K", place: "Tricity, India" },
];

export default function TestimonialsPage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const activeQuote = quotes[quoteIndex] ?? quotes[0];

  return (
    <main>
      <section className="section-band testimonials-section pt-32">
        <div className="wrap testimonial-layout">
          <div className="testimonial-image">
            <Image src="/images/b-4.webp" alt="A couple celebrating in a sunlit garden" width={400} height={533} loading="lazy" />
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
    </main>
  );
}
