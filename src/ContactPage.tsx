import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { legacyI18nEn } from "./data/legacy/i18n-en";
import "./ContactPage.css";

const t = legacyI18nEn;
const MAILTO = "abhishektec88@gmail.com";

export default function ContactPage() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="contact-shell">
      <div className="contact-shell-inner">
        <Link className="contact-shell-back" to="/">
          {t["back-to-home"]}
        </Link>
        <h1 className="contact-shell-title">{t["contact-page-heading"]}</h1>
        <p className="contact-shell-lead">{t["contact-page-lead"]}</p>
        <form className="contact-shell-form" onSubmit={onSubmit}>
          <div className="contact-shell-row">
            <div className="contact-shell-field contact-shell-field--light">
              <label className="contact-shell-label contact-shell-label--dark" htmlFor="cf-name">
                {t["contact-form-name"]}
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                className="contact-shell-input"
                placeholder={t["contact-form-name-ph"]}
                autoComplete="name"
                required
              />
            </div>
            <div className="contact-shell-field contact-shell-field--dark">
              <label className="contact-shell-label" htmlFor="cf-email">
                {t["contact-form-email"]}
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                className="contact-shell-input"
                placeholder={t["contact-form-email-ph"]}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="contact-shell-field contact-shell-field--dark contact-shell-field--full">
            <label className="contact-shell-label" htmlFor="cf-subject">
              {t["contact-form-subject"]}
            </label>
            <input
              id="cf-subject"
              name="subject"
              type="text"
              className="contact-shell-input"
              placeholder={t["contact-form-subject-ph"]}
              required
            />
          </div>
          <div className="contact-shell-field contact-shell-field--dark contact-shell-field--full">
            <label className="contact-shell-label" htmlFor="cf-message">
              {t["contact-form-message"]}
            </label>
            <textarea
              id="cf-message"
              name="message"
              className="contact-shell-textarea"
              placeholder={t["contact-form-message-ph"]}
              rows={6}
              required
            />
          </div>
          <button className="contact-shell-submit" type="submit">
            {t["contact-form-send"]}
          </button>
        </form>
      </div>
    </div>
  );
}
