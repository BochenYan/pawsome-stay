"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Footer() {
  const { locale } = useLanguage();
  const text = t[locale].footer;
  const isMobile = useIsMobile();

  return (
    <footer style={{
      background:"#2a2018",
      padding:isMobile?"2rem 1.5rem":"2.5rem 4rem",
      display:"flex",
      flexDirection:isMobile?"column":"row",
      justifyContent:"space-between",
      alignItems:"center",
      gap:"1rem",
      textAlign:isMobile?"center":"left"
    }}>
      <div style={{fontSize:"1.2rem",fontWeight:700,color:"#f5f0e8"}}>
        Pawsome<span style={{color:"#c4704f"}}>Stay</span>
      </div>
      <p style={{fontSize:"0.82rem",color:"rgba(255,253,248,0.5)"}}>
        {text.copy}
      </p>
      <ul style={{display:"flex",gap:"2rem",listStyle:"none",margin:0,padding:0}}>
        {text.links.map((link, i) => (
          <li key={i}>
            <a href="#" style={{color:"rgba(255,253,248,0.45)",fontSize:"0.82rem",textDecoration:"none"}}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}