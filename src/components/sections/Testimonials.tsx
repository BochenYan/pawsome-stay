"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Testimonials() {
  const { locale } = useLanguage();
  const text = t[locale].testimonials;
  const isMobile = useIsMobile();

  return (
    <section id="testimonials" style={{padding:isMobile?"3rem 1.5rem":"6rem 4rem",background:"#f5f0e8"}}>
      <div style={{textAlign:"center",marginBottom:"3rem"}}>
        <div style={{fontSize:"0.72rem",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:"#c4704f",marginBottom:"0.6rem"}}>
          {text.label}
        </div>
        <h2 style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:700,color:"#2d4a3e"}}>
          {text.title}
        </h2>
      </div>

      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:"1.25rem"}}>
        {text.items.map((item, i) => (
          <div key={i} style={{background:"#fffdf8",borderRadius:"1.5rem",padding:"1.75rem",border:"1px solid rgba(122,92,68,0.1)"}}>
            <div style={{color:"#c4704f",fontSize:"0.88rem",letterSpacing:"0.1em",marginBottom:"0.8rem"}}>★★★★★</div>
            <blockquote style={{fontStyle:"italic",fontSize:"0.9rem",color:"#2a2018",lineHeight:1.7,marginBottom:"1.3rem"}}>
              "{item.quote}"
            </blockquote>
            <div style={{display:"flex",alignItems:"center",gap:"0.65rem"}}>
              <div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#2d4a3e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>
                {item.avatar}
              </div>
              <div>
                <div style={{fontSize:"0.875rem",fontWeight:600,color:"#2a2018"}}>{item.name}</div>
                <div style={{fontSize:"0.74rem",color:"#7a6e62"}}>{item.pet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}