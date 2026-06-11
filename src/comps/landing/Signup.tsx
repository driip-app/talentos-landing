import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Threads = dynamic(() => import("@/comps/Threads"), { ssr: false });

const OPTIONS = [
  "I have 200 CVs and no time to read them",
  "Every interview takes 11 emails to schedule",
  "Candidates are going dark — nobody's following up",
  "I don't even have a job description yet",
  "All of the above. It's a full disaster",
];

export default function Signup() {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) { setOpen(true); return; }
    const form = e.currentTarget;
    const btn = form.querySelector<HTMLButtonElement>("button[type=submit]");
    if (btn) btn.disabled = true;
    try {
      const res = await fetch("https://formspree.io/f/xredlbnb", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        if (btn) btn.disabled = false;
      }
    } catch {
      if (btn) btn.disabled = false;
    }
  };

  return (
    <section className="signup" id="demo">
      <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
        <Threads color={[0.62, 0.45, 0.90]} amplitude={1.4} distance={0} enableMouseInteraction={true} />
      </div>
      <div className="signup-inner">
        <div className="signup-eyebrow mono">GET EARLY ACCESS</div>
        <h2 className="signup-title syne">Your next great hire is<br className="mobile-br" /> in<br />{" "}that pile <em>right now.</em></h2>
        <p className="signup-sub">Join our waitlist. No enterprise pricing drama.</p>
        <div className="signup-form">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="form-row full">
                <div className="form-group">
                  <label className="form-label mono">EMAIL</label>
                  <input className="form-input" type="email" name="email" placeholder="drax@youremail.com" required />
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label className="form-label mono">WHAT&apos;S YOUR BIGGEST HIRING HEADACHE?</label>
                  <input type="hidden" name="headache" value={value} />
                  <div ref={dropdownRef} style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="form-select"
                      style={{
                        width: "100%", textAlign: "left", display: "flex",
                        alignItems: "center", justifyContent: "space-between",
                        borderColor: open ? "rgba(159,115,230,0.4)" : undefined,
                      }}
                      onClick={() => setOpen(o => !o)}
                    >
                      <span style={{ color: value ? "#fff" : "rgba(255,255,255,0.2)" }}>
                        {value || "Be honest. We’ve heard it all."}
                      </span>
                    </button>
                    {open && (
                      <ul className="headache-menu" role="listbox">
                        {OPTIONS.map(opt => (
                          <li key={opt} role="option" onClick={() => { setValue(opt); setOpen(false); }}>{opt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="form-submit mono" style={{ width: "100%", marginTop: 20, padding: 14, borderRadius: 9, background: "#9F73E6", border: "none", color: "#0E0E10", fontSize: 14, fontFamily: "'Roboto Mono',monospace", fontWeight: 400, letterSpacing: ".04em", textTransform: "uppercase", cursor: "pointer" }}>
                Request Early Access Pass
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: "44px 20px" }}>
              <div className="form-success-icon">🎉</div>
              <div className="form-success-title syne">You&apos;re on the list.</div>
              <p className="form-success-sub" style={{ color: "rgba(255,255,255,0.45)" }}>We&apos;ll be in touch within one business day. In the meantime, that pile of CVs isn&apos;t getting any smaller — but it&apos;s about to.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
