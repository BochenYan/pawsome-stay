"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Navbar() {
  const { locale, setLocale } = useLanguage("zh");
  const text = t[locale].nav;
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(245,240,232,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(122,92,68,0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 4rem" }}>
        <a href="#" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2d4a3e", textDecoration: "none", letterSpacing: "-0.02em" }}>
          Pawsome<span style={{ color: "#c4704f" }}>Stay</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {!isMobile && (
            <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
              <li><a href="#services" style={{ fontSize: "0.82rem", fontWeight: 500, color: "#7a6e62", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>{text.services}</a></li>
              <li><a href="#about" style={{ fontSize: "0.82rem", fontWeight: 500, color: "#7a6e62", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>{text.about}</a></li>
              <li><a href="#testimonials" style={{ fontSize: "0.82rem", fontWeight: 500, color: "#7a6e62", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>{text.reviews}</a></li>
              <li><a href="#book" style={{ fontSize: "0.82rem", fontWeight: 500, color: "#fffdf8", textDecoration: "none", background: "#2d4a3e", padding: "0.5rem 1.2rem", borderRadius: "100px" }}>{text.bookNow}</a></li>
            </ul>
          )}

          <div style={{ display: "flex", background: "rgba(45,74,62,0.08)", border: "1px solid rgba(45,74,62,0.2)", borderRadius: "100px", padding: "3px", gap: "2px" }}>
            <button onClick={() => setLocale("en")} style={{ padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "inherit", background: locale === "en" ? "#2d4a3e" : "transparent", color: locale === "en" ? "#fffdf8" : "#7a6e62" }}>EN</button>
            <button onClick={() => setLocale("fr")} style={{ padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "inherit", background: locale === "fr" ? "#2d4a3e" : "transparent", color: locale === "fr" ? "#fffdf8" : "#7a6e62" }}>FR</button>
            <button onClick={() => setLocale("zh")} style={{ padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "inherit", background: locale === "zh" ? "#2d4a3e" : "transparent", color: locale === "zh" ? "#fffdf8" : "#7a6e62" }}>中文</button>
          </div>

          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#2d4a3e", padding: "0" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <div style={{ background: "rgba(245,240,232,0.98)", borderTop: "1px solid rgba(122,92,68,0.1)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <a href="#services" onClick={() => setMenuOpen(false)} style={{ fontSize: "0.9rem", fontWeight: 500, color: "#7a6e62", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>{text.services}</a>
          <a href="#about" onClick={() => setMenuOpen(false)} style={{ fontSize: "0.9rem", fontWeight: 500, color: "#7a6e62", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>{text.about}</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} style={{ fontSize: "0.9rem", fontWeight: 500, color: "#7a6e62", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>{text.reviews}</a>
          <a href="#book" onClick={() => setMenuOpen(false)} style={{ fontSize: "0.9rem", fontWeight: 500, color: "#fffdf8", textDecoration: "none", background: "#2d4a3e", padding: "0.75rem 1.5rem", borderRadius: "100px", textAlign: "center" }}>{text.bookNow}</a>
        </div>
      )}
    </nav>
  );
}