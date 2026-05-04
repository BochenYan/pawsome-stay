"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";
import { heroImages } from "@/lib/images";

export default function Hero() {

  const images = heroImages;
  const [currentImg, setCurrentImg] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImg(prev => (prev + 1) % images.length);
        setFade(true);
      }, 800);
    }, 4000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const { locale } = useLanguage();
  const text = t[locale].hero;
  const trust = t[locale].trust;
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
  @keyframes fadeFloat {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .hero-bg-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    animation: fadeFloat 8s ease-in-out infinite;
    pointer-events: none;
    transition: opacity 0.8s ease, background-image 0.8s ease;
  }
`}</style>
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        alignItems: "center",
        padding: isMobile ? "6rem 1.5rem 3rem" : "8rem 4rem 4rem",
        gap: isMobile ? "2rem" : "4rem",
        position: "relative",
        textAlign: isMobile ? "center" : "left",
        background: "#f5f0e8",
        overflow: "hidden",
      }}>
        <div className="hero-bg-img" style={{
          backgroundImage: `url('${images[currentImg]}')`,
          opacity: fade ? (isMobile ? 0.12 : 0.18) : 0,
          backgroundPosition: isMobile ? "center top" : "center",
        }} />
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(45,74,62,0.08)", border: "1px solid rgba(45,74,62,0.2)", color: "#2d4a3e", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.4rem 1rem", borderRadius: "100px", marginBottom: "1.5rem" }}>
            🐾 {text.badge}
          </div>

          <h1 style={{ fontSize: isMobile ? "2.4rem" : "clamp(2.4rem,4.5vw,3.8rem)", fontWeight: 700, color: "#2d4a3e", lineHeight: 1.1, marginBottom: "1.2rem" }}>
            {text.title}
            <em style={{ fontStyle: "italic", color: "#c4704f" }}>{text.titleEm}</em>
            {text.titleEnd}
          </h1>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#7a6e62", maxWidth: isMobile ? "100%" : "480px", margin: isMobile ? "0 auto 2rem" : "0 0 2rem" }}>
            {text.subtitle}
          </p>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
            <a href="#book" style={{ background: "#c4704f", color: "#fffdf8", padding: "0.85rem 1.8rem", borderRadius: "100px", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none" }}>
              {text.cta}
            </a>
            <a href="#services" style={{ color: "#2d4a3e", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none" }}>
              {text.ctaSecondary}
            </a>
            <a href="https://www.rover.com/ambas-refer-a-friend/NvP5wdOQ?sit=lisaj78575" target="_blank" rel="noopener noreferrer" style={{ color: "#7a6e62", fontWeight: 500, fontSize: "0.85rem", textDecoration: "none", borderBottom: "1px solid rgba(122,92,68,0.3)", paddingBottom: "1px" }}>
              {locale === "en" ? "View us on Rover →" : locale === "fr" ? "Nous voir sur Rover →" : "在Rover上查看我们 →"}
            </a>
          </div>
        </div>

        {(
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", padding: "0 2rem" }}>
            <div style={{ width: "100%", maxWidth: isMobile ? "100%" : "620px", aspectRatio: isMobile ? "3/4" : "4/5", borderRadius: "2rem", overflow: "hidden", boxShadow: "0 32px 72px rgba(45,74,62,0.24)", position: "relative" }}>
              <img
                src={images[currentImg]}
                alt="Happy pet"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: fade ? 1 : 0, transition: "opacity 0.8s ease" }}
              />

              {/* Left arrow */}
              <button
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentImg(prev => (prev - 1 + images.length) % images.length);
                    setFade(true);
                  }, 800);
                  startInterval();
                }}
                style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,253,248,0.85)", border: "none", borderRadius: "50%", width: "56px", height: "56px", cursor: "pointer", fontSize: "1.6rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", zIndex: 10 }}
              >
                ←
              </button>

              {/* Right arrow */}
              <button
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentImg(prev => (prev + 1) % images.length);
                    setFade(true);
                  }, 800);
                  startInterval();
                }}
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,253,248,0.85)", border: "none", borderRadius: "50%", width: "56px", height: "56px", cursor: "pointer", fontSize: "1.6rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", zIndex: 10 }}
              >
                →
              </button>

              {/* Dots */}
              <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.4rem" }}>
                {images.map((_, i) => (
                  <div key={i} onClick={() => {
                    setFade(false);
                    setTimeout(() => { setCurrentImg(i); setFade(true); }, 800);
                    startInterval();
                  }}
                    style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === currentImg ? "#fffdf8" : "rgba(255,253,248,0.4)", cursor: "pointer", transition: "background 0.3s" }}
                  />
                ))}
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "1.5rem", left: "0", background: "#fffdf8", borderRadius: "1rem", padding: "0.85rem 1.2rem", boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
              <span style={{ display: "block", fontSize: "1.5rem", fontWeight: 700, color: "#2d4a3e" }}>50+</span>
              <span style={{ fontSize: "0.7rem", color: "#7a6e62", textTransform: "uppercase", letterSpacing: "0.04em" }}>Happy Pets</span>
            </div>
            <div style={{ position: "absolute", top: "2rem", right: "0", background: "#fffdf8", borderRadius: "1rem", padding: "0.85rem 1.2rem", boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}>
              <span style={{ display: "block", fontSize: "1.5rem", fontWeight: 700, color: "#2d4a3e" }}>★ 5.0</span>
              <span style={{ fontSize: "0.7rem", color: "#7a6e62", textTransform: "uppercase", letterSpacing: "0.04em" }}>Avg Rating</span>
            </div>
          </div>
        )}
      </section>

      <div className="animated-bg-green" style={{ padding: isMobile ? "1rem" : "1rem 4rem", display: "flex", justifyContent: "center", gap: isMobile ? "1rem" : "3rem", flexWrap: "wrap" }}>
        {trust.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,253,248,0.8)", fontSize: "0.82rem" }}>
            <span>✓</span><span>{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}