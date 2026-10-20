"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";

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

export default function FAQPage() {
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);

  return (
    <main>
      <section className="section-band faq-section pt-32">
        <div className="wrap">
          <div className="section-heading">
            <span className="eyebrow">Good to know</span>
            <h2 className="script-title">Frequently asked</h2>
            <span className="ornament" aria-hidden="true" />
          </div>
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
    </main>
  );
}
