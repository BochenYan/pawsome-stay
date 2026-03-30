"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Services() {
  const { locale } = useLanguage();
  const text = t[locale].services;
  const isMobile = useIsMobile();

  return (
    <section id="services" style={{padding:isMobile?"3rem 1.5rem":"6rem 4rem",background:"#f5f0e8"}}>
      <div style={{fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"#c4704f",marginBottom:"0.6rem"}}>
        {text.label}
      </div>
      <h2 style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:700,color:"#2d4a3e",marginBottom:"0.85rem"}}>
        {text.title}
      </h2>
      <p style={{color:"#7a6e62",fontSize:"0.95rem",lineHeight:1.75,maxWidth:"500px",marginBottom:"3rem"}}>
        {text.subtitle}
      </p>

      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:"1.25rem"}}>
        {text.items.map((item, i) => (
          <div key={i}
            style={{background:"#fffdf8",borderRadius:"1.5rem",padding:"1.75rem",border:"1px solid rgba(122,92,68,0.1)",transition:"transform 0.2s,box-shadow 0.2s",cursor:"default"}}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(45,74,62,0.12)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <span style={{fontSize:"2rem",marginBottom:"1.1rem",display:"block"}}>{item.icon}</span>
            <h3 style={{fontSize:"1.1rem",fontWeight:600,color:"#2d4a3e",marginBottom:"0.5rem"}}>{item.title}</h3>
            <p style={{fontSize:"0.875rem",color:"#7a6e62",lineHeight:1.65,marginBottom:"1.1rem"}}>{item.desc}</p>
            <div style={{fontSize:"1.05rem",fontWeight:600,color:"#c4704f"}}>
              {item.price} <span style={{fontSize:"0.78rem",color:"#7a6e62",fontWeight:400}}>{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}