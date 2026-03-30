"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Hero() {
  const { locale } = useLanguage();
  const text = t[locale].hero;
  const trust = t[locale].trust;
  const isMobile = useIsMobile();

  return (
    <>
      <section style={{
        minHeight:"100vh",
        display:"grid",
        gridTemplateColumns:isMobile?"1fr":"1fr 1fr",
        alignItems:"center",
        padding:isMobile?"6rem 1.5rem 3rem":"8rem 4rem 4rem",
        gap:isMobile?"2rem":"4rem",
        background:"#f5f0e8",
        position:"relative",
        textAlign:isMobile?"center":"left"
      }}>
        <div style={{position:"absolute",top:"-20%",right:"-10%",width:"500px",height:"500px",borderRadius:"50%",background:"rgba(196,112,79,0.1)",pointerEvents:"none"}} />

        <div>
          <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"rgba(45,74,62,0.08)",border:"1px solid rgba(45,74,62,0.2)",color:"#2d4a3e",fontSize:"0.75rem",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.08em",padding:"0.4rem 1rem",borderRadius:"100px",marginBottom:"1.5rem"}}>
            🐾 {text.badge}
          </div>

          <h1 style={{fontSize:isMobile?"2.4rem":"clamp(2.4rem,4.5vw,3.8rem)",fontWeight:700,color:"#2d4a3e",lineHeight:1.1,marginBottom:"1.2rem"}}>
            {text.title}
            <em style={{fontStyle:"italic",color:"#c4704f"}}>{text.titleEm}</em>
            {text.titleEnd}
          </h1>

          <p style={{fontSize:"1.05rem",lineHeight:1.8,color:"#7a6e62",maxWidth:isMobile?"100%":"480px",margin:isMobile?"0 auto 2rem":"0 0 2rem"}}>
            {text.subtitle}
          </p>

          <div style={{display:"flex",gap:"1rem",alignItems:"center",flexWrap:"wrap",justifyContent:isMobile?"center":"flex-start"}}>
            <a href="#book" style={{background:"#c4704f",color:"#fffdf8",padding:"0.85rem 1.8rem",borderRadius:"100px",fontWeight:500,fontSize:"0.95rem",textDecoration:"none"}}>
              {text.cta}
            </a>
            <a href="#services" style={{color:"#2d4a3e",fontWeight:500,fontSize:"0.95rem",textDecoration:"none"}}>
              {text.ctaSecondary}
            </a>
          </div>
        </div>

        {!isMobile && (
          <div style={{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",padding:"0 2rem"}}>
            <div style={{width:"100%",maxWidth:"380px",aspectRatio:"4/5",borderRadius:"2rem",overflow:"hidden",background:"#2d4a3e",boxShadow:"0 32px 72px rgba(45,74,62,0.24)"}}>
              <svg viewBox="0 0 420 525" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
                <rect width="420" height="525" fill="#2d4a3e"/>
                <ellipse cx="210" cy="105" rx="260" ry="175" fill="#3d6b5a" opacity="0.4"/>
                <circle cx="210" cy="245" r="78" fill="#c4704f" opacity="0.9"/>
                <ellipse cx="165" cy="210" rx="25" ry="28" fill="#c4704f" opacity="0.9"/>
                <ellipse cx="255" cy="210" rx="25" ry="28" fill="#c4704f" opacity="0.9"/>
                <circle cx="210" cy="258" r="56" fill="#e8956d"/>
                <circle cx="193" cy="244" r="7" fill="#2a2018"/>
                <circle cx="227" cy="244" r="7" fill="#2a2018"/>
                <circle cx="195" cy="241" r="2.5" fill="white"/>
                <circle cx="229" cy="241" r="2.5" fill="white"/>
                <ellipse cx="210" cy="263" rx="13" ry="8" fill="#c4704f"/>
                <path d="M194 278 Q210 292 226 278" stroke="#2a2018" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <ellipse cx="154" cy="350" rx="19" ry="15" fill="#c4704f"/>
                <ellipse cx="266" cy="350" rx="19" ry="15" fill="#c4704f"/>
                <ellipse cx="154" cy="392" rx="19" ry="15" fill="#e8956d"/>
                <ellipse cx="266" cy="392" rx="19" ry="15" fill="#e8956d"/>
                <ellipse cx="210" cy="342" rx="66" ry="70" fill="#c4704f"/>
                <ellipse cx="210" cy="510" rx="245" ry="70" fill="#1e3329"/>
              </svg>
            </div>
            <div style={{position:"absolute",bottom:"1.5rem",left:"0",background:"#fffdf8",borderRadius:"1rem",padding:"0.85rem 1.2rem",boxShadow:"0 6px 24px rgba(0,0,0,0.1)"}}>
              <span style={{display:"block",fontSize:"1.5rem",fontWeight:700,color:"#2d4a3e"}}>50+</span>
              <span style={{fontSize:"0.7rem",color:"#7a6e62",textTransform:"uppercase",letterSpacing:"0.04em"}}>Happy Pets</span>
            </div>
            <div style={{position:"absolute",top:"2rem",right:"0",background:"#fffdf8",borderRadius:"1rem",padding:"0.85rem 1.2rem",boxShadow:"0 6px 24px rgba(0,0,0,0.1)"}}>
              <span style={{display:"block",fontSize:"1.5rem",fontWeight:700,color:"#2d4a3e"}}>★ 5.0</span>
              <span style={{fontSize:"0.7rem",color:"#7a6e62",textTransform:"uppercase",letterSpacing:"0.04em"}}>Avg Rating</span>
            </div>
          </div>
        )}
      </section>

      <div style={{background:"#2d4a3e",padding:isMobile?"1rem":"1rem 4rem",display:"flex",justifyContent:"center",gap:isMobile?"1rem":"3rem",flexWrap:"wrap"}}>
        {trust.map((item, i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"rgba(255,253,248,0.8)",fontSize:"0.82rem"}}>
            <span>✓</span><span>{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}