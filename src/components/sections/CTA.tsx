"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function CTA() {
  const { locale } = useLanguage();
  const text = t[locale].cta;

  return (
    <div style={{ padding: "0 4rem 6rem", background: "#f5f0e8" }}>
      <section id="book" className="animated-bg-terra" style={{
        borderRadius: "2rem",
        padding: "4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#fffdf8", marginBottom: "0.85rem" }}>
          {text.title}
        </h2>
        <p style={{ color: "rgba(255,253,248,0.8)", fontSize: "1rem", marginBottom: "2rem" }}>
          {text.subtitle}
        </p>
        <a href="#" style={{ background: "#fffdf8", color: "#c4704f", padding: "0.85rem 2.2rem", borderRadius: "100px", fontSize: "1rem", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
          {text.button}
        </a>
      </section>
    </div>
  );
}