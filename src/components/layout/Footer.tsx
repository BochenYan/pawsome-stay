"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { useIsMobile } from "@/lib/useIsMobile";

const privacyContent = {
  en: {
    title: "Privacy Policy",
    body: `Last updated: 2026

PawsomeStay ("we", "our", or "us") is committed to protecting your personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).

Information We Collect
We collect your name, email address, and phone number when you submit a booking inquiry through our website.

How We Use Your Information
Your information is used solely to respond to your booking inquiry and to send you a confirmation email. We do not sell, share, or distribute your personal information to third parties.

Data Storage
Booking inquiries are stored securely in a private Google Sheets document accessible only to PawsomeStay staff.

Email Communications
By submitting a booking inquiry, you consent to receiving a confirmation email from PawsomeStay. We will not send unsolicited marketing emails.

Your Rights
You have the right to request access to, correction of, or deletion of your personal information at any time by contacting us directly.

Contact
For privacy-related inquiries, please contact us through the booking form on our website.`,
  },
  zh: {
    title: "隐私政策",
    body: `最后更新：2025年

PawsomeStay（"我们"）致力于依照加拿大《个人信息保护和电子文件法》（PIPEDA）保护您的个人信息。

我们收集的信息
当您通过我们的网站提交预约申请时，我们会收集您的姓名、电子邮件地址和电话号码。

信息使用方式
您的信息仅用于回复您的预约申请和发送确认邮件。我们不会向第三方出售、共享或分发您的个人信息。

数据存储
预约申请安全存储在仅PawsomeStay工作人员可访问的私人Google表格中。

电子邮件通讯
提交预约申请即表示您同意接收来自PawsomeStay的确认邮件。我们不会发送未经请求的营销邮件。

您的权利
您有权随时请求访问、更正或删除您的个人信息，请直接通过网站预约表单联系我们。

联系方式
如有隐私相关问题，请通过网站上的预约表单联系我们。`,
  },
  fr: {
    title: "Politique de confidentialité",
    body: `Dernière mise à jour: 2025

PawsomeStay ("nous") s'engage à protéger vos informations personnelles conformément à la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada.

Informations collectées
Nous collectons votre nom, adresse e-mail et numéro de téléphone lorsque vous soumettez une demande de réservation.

Utilisation de vos informations
Vos informations sont utilisées uniquement pour répondre à votre demande de réservation et vous envoyer un e-mail de confirmation. Nous ne vendons pas vos informations personnelles.

Stockage des données
Les demandes de réservation sont stockées en toute sécurité dans un document Google Sheets privé accessible uniquement au personnel de PawsomeStay.

Vos droits
Vous avez le droit de demander l'accès, la correction ou la suppression de vos informations personnelles à tout moment.

Contact
Pour toute question relative à la confidentialité, veuillez nous contacter via le formulaire de réservation sur notre site Web.`,
  },
};

export default function Footer() {
  const { locale } = useLanguage();
  const text = t[locale].footer;
  const isMobile = useIsMobile();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const privacy = privacyContent[locale as keyof typeof privacyContent] || privacyContent.en;

  return (
    <>
      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div
          onClick={() => setShowPrivacy(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "#fffdf8", borderRadius: "1.5rem", padding: "2.5rem", maxWidth: "640px", width: "100%", maxHeight: "80vh", overflowY: "auto", position: "relative" }}
          >
            <button
              onClick={() => setShowPrivacy(false)}
              style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "#7a6e62" }}
            >
              ✕
            </button>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#2d4a3e", marginBottom: "1.5rem" }}>{privacy.title}</h2>
            <div style={{ fontSize: "0.88rem", color: "#7a6e62", lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {privacy.body}
            </div>
          </div>
        </div>
      )}

      <footer style={{
        background: "#2a2018",
        padding: isMobile ? "2rem 1.5rem" : "2.5rem 4rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        textAlign: isMobile ? "center" : "left"
      }}>
        <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f5f0e8" }}>
          Pawsome<span style={{ color: "#c4704f" }}>Stay</span>
        </div>
        <p style={{ fontSize: "0.82rem", color: "rgba(255,253,248,0.5)" }}>
          {text.copy}
        </p>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <a href="https://www.rover.com/ambas-refer-a-friend/NvP5wdOQ?sit=lisaj78575" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,253,248,0.45)", fontSize: "0.82rem", textDecoration: "none" }}>
              {locale === "en" ? "Rover" : "Rover"}
            </a>
          </li>
          <li>
            <a href="#book" style={{ color: "rgba(255,253,248,0.45)", fontSize: "0.82rem", textDecoration: "none" }}>
              {locale === "en" ? "Contact" : locale === "fr" ? "Contact" : "联系我们"}
            </a>
          </li>
          <li>
            <button
              onClick={() => setShowPrivacy(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,253,248,0.45)", fontSize: "0.82rem", padding: 0, fontFamily: "inherit" }}
            >
              {locale === "en" ? "Privacy" : locale === "fr" ? "Confidentialité" : "隐私政策"}
            </button>
          </li>
        </ul>
      </footer>
    </>
  );
}