"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const initial: FormData = {
  name: "", email: "", phone: "",
};

export default function Booking() {
  const { locale } = useLanguage();
  const text = t[locale].cta;
  const isMobile = useIsMobile();
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  const label = (en: string, fr: string, zh: string) =>
    locale === "en" ? en : locale === "fr" ? fr : zh;

  const field = (en: string, fr: string, zh: string, name: keyof FormData, type = "text") => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#2d4a3e", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label(en, fr, zh)}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handle}
        required
        style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid rgba(122,92,68,0.2)", background: "#fffdf8", fontSize: "0.95rem", color: "#2a2018", outline: "none", width: "100%" }}
      />
    </div>
  );

  return (
    <section id="book" style={{ padding: isMobile ? "3rem 1.5rem" : "6rem 4rem", background: "#f5f0e8" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c4704f", marginBottom: "0.6rem" }}>
          {label("Book a Stay", "Réserver un séjour", "预约寄养")}
        </div>
        <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#2d4a3e", marginBottom: "0.85rem" }}>
          {text.title}
        </h2>
        <p style={{ color: "#7a6e62", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "3rem" }}>
          {text.subtitle}
        </p>

        {status === "success" ? (
          <div style={{ background: "#fffdf8", borderRadius: "1.5rem", padding: "3rem", textAlign: "center", border: "1px solid rgba(45,74,62,0.2)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐾</div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#2d4a3e", marginBottom: "0.5rem" }}>
              {label("Booking request sent!", "Demande envoyée!", "预约请求已发送！")}
            </h3>
            <p style={{ color: "#7a6e62" }}>
              {label("Check your email for a confirmation. We'll be in touch shortly.", "Vérifiez votre courriel. Nous vous contacterons bientôt.", "请查看您的邮件确认。我们将尽快与您联系。")}
            </p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {field("Your Name", "Votre nom", "您的姓名", "name")}
            {field("Email", "Courriel", "电子邮件", "email", "email")}
            {field("Phone", "Téléphone", "电话", "phone", "tel")}

            {status === "error" && (
              <p style={{ color: "#c0392b", fontSize: "0.875rem" }}>
                {label("Something went wrong. Please try again.", "Une erreur s'est produite. Veuillez réessayer.", "出现错误，请重试。")}
              </p>
            )}

            <button type="submit" disabled={status === "loading"}
              style={{ background: "#c4704f", color: "#fffdf8", padding: "1rem 2rem", borderRadius: "100px", fontSize: "1rem", fontWeight: 600, border: "none", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1, fontFamily: "inherit" }}>
              {status === "loading"
                ? label("Sending...", "Envoi...", "发送中...")
                : label("Get in Touch", "Nous contacter", "提交预约")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}