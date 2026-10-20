"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("");

  return (
    <main>
      <section className="section-band contact-section pt-32">
        <div className="wrap">
          <div className="section-heading">
            <span className="eyebrow">Say hello</span>
            <h2 className="script-title">Let's tell your story</h2>
            <p className="serif-italic">I'd love to hear about your plans. Share a few details and I'll get back to you personally.</p>
            <span className="ornament" aria-hidden="true" />
          </div>
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
  );
}
