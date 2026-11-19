import { useState, useEffect } from "react";
import StaggeredMenu from "./StaggeredMenu";

interface NavProps {
  onOpenEarlyAccess: () => void;
}

const mobileMenuItems = [
  { label: "Meet the Agents", ariaLabel: "See the agent lineup", link: "#platform" },
  { label: "Agent Superpowers", ariaLabel: "See what the agents can do", link: "#features" },
  { label: "Find Your Agent", ariaLabel: "Find the right agent for you", link: "#personas" },
  { label: "Early Access Pass", ariaLabel: "Request an early access pass", link: "#demo" },
];

export default function Nav({ onOpenEarlyAccess }: NavProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpenColor, setMenuOpenColor] = useState("");

  useEffect(() => {
    setMenuOpenColor(getComputedStyle(document.documentElement).getPropertyValue("--dark").trim());
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <StaggeredMenu
        isFixed
        position="right"
        items={mobileMenuItems}
        displaySocials={false}
        displayItemNumbering
        menuButtonColor="#fff"
        openMenuButtonColor={menuOpenColor || undefined}
        changeMenuColorOnOpen
        colors={["#9F73E6", "#6342AC"]}
        accentColor="#9F73E6"
        logoUrl="/images/driip-logo.png"
        ctaLabel="Register / Login"
        onCtaClick={onOpenEarlyAccess}
      />
    );
  }

  return (
    <nav>
      <a href="#top" className="nav-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/driip-logo.png" alt="Driip" style={{ mixBlendMode: "screen" }} />
      </a>
      <div className="nav-links">
        <a href="#platform">Meet the Agents</a>
        <a href="#features">Agent Superpowers</a>
        <a href="#personas">Find Your Agent</a>
        <a href="#demo">Early Access Pass</a>
      </div>
      <button type="button" onClick={onOpenEarlyAccess} className="nav-cta" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", border: "none", cursor: "pointer" }}>Register / Login</button>
    </nav>
  );
}
