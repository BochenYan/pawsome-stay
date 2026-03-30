"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

export default function About() {
  const { locale } = useLanguage();
  const text = t[locale].about;
  const isMobile = useIsMobile();

  return (
    <section id="about" style={{
      padding:isMobile?"3rem 1.5rem":"6rem 4rem",
      background:"#2d4a3e",
      display:"grid",
      gridTemplateColumns:isMobile?"1fr":"auto 1fr",
      gap:isMobile?"2rem":"5rem",
      alignItems:"center",
      textAlign:isMobile?"center":"left"
    }}>
      {!isMobile && (
        <div style={{width:"220px",height:"220px",borderRadius:"50%",background:"rgba(255,253,248,0.1)",border:"2px solid rgba(196,112,79,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"7rem",flexShrink:0}}>
          🐕
        </div>
      )}

      <div>
        <div style={{fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(232,149,109,0.9)",marginBottom:"0.6rem"}}>
          {text.label}
        </div>
        <h2 style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:700,color:"#fffdf8",marginBottom:"1rem"}}>
          {text.title}
        </h2>
        <p style={{color:"rgba(255,253,248,0.72)",fontSize:"0.95rem",lineHeight:1.85,marginBottom:"1rem"}}>
          {text.p1}
        </p>
        <p style={{color:"rgba(255,253,248,0.72)",fontSize:"0.95rem",lineHeight:1.85,marginBottom:"1.75rem"}}>
          {text.p2}
        </p>

        <div style={{display:"flex",flexDirection:"column",gap:"0.7rem",alignItems:isMobile?"center":"flex-start"}}>
          {text.qualities.map((q, i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:"0.65rem",color:"rgba(255,253,248,0.85)",fontSize:"0.88rem"}}>
              <div style={{width:"7px",height:"7px",background:"#c4704f",borderRadius:"50%",flexShrink:0}} />
              {q}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}