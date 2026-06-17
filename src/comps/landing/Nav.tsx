import { useState, useEffect } from "react";

interface NavProps {
  onOpenWaitlist: () => void;
}

export default function Nav({ onOpenWaitlist }: NavProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = (href: string) => {
    setNavOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav style={isMobile ? { justifyContent: "center" } : undefined}>
        <a href="#top" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/driip-logo.png" alt="Driip" style={{ mixBlendMode: "screen" }} />
        </a>
        {!isMobile && (
          <div className="nav-links">
            <a href="#platform">Meet the Agents</a>
            <a href="#features">Agent Superpowers</a>
            <a href="#personas">Find Your Agent</a>
            <a href="#demo">Early Access Pass</a>
          </div>
        )}
        {!isMobile && (
          <a href="#demo" className="nav-cta" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>Join the waitlist</a>
        )}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(o => !o)}
          style={{
            display: isMobile ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            width: 36,
            height: 36,
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <span style={{
            display: "block", width: 22, height: 2,
            background: "rgba(255,255,255,0.85)", borderRadius: 2,
            transition: "all .25s",
            transform: navOpen ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: 22, height: 2,
            background: "rgba(255,255,255,0.85)", borderRadius: 2,
            transition: "all .25s",
            opacity: navOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: 22, height: 2,
            background: "rgba(255,255,255,0.85)", borderRadius: 2,
            transition: "all .25s",
            transform: navOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          style={{
            position: "fixed",
            top: 62,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(8,8,11,0.98)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            padding: "8px 0 16px",
          }}
        >
          {(["#platform", "#features", "#personas", "#demo"] as const).map((href, i) => (
            <a
              key={href}
              href={href}
              onClick={e => { e.preventDefault(); scrollTo(href); }}
              style={{
                padding: "14px 20px",
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                display: "block",
              }}
            >
              {["Meet the Agents", "Agent Superpowers", "Find Your Agent", "Early Access Pass"][i]}
            </a>
          ))}
          <a
            href="#demo"
            onClick={e => { e.preventDefault(); scrollTo("#demo"); }}
            style={{
              margin: "8px 20px 0",
              padding: "12px 20px",
              background: "#9F73E6",
              color: "#0E0E10",
              borderRadius: 7,
              fontWeight: 400,
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "none",
              textAlign: "center",
              display: "block",
            }}
          >
            Join the waitlist
          </a>
        </div>
      )}
    </>
  );
}
