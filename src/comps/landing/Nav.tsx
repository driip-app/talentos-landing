import { useState, useEffect } from "react";
import StaggeredMenu from "./StaggeredMenu";

interface NavProps {
  onOpenWaitlist: () => void;
}

const mobileMenuItems = [
  { label: "Meet the Agents", ariaLabel: "See the agent lineup", link: "#platform" },
  { label: "Agent Superpowers", ariaLabel: "See what the agents can do", link: "#features" },
  { label: "Find Your Agent", ariaLabel: "Find the right agent for you", link: "#personas" },
  { label: "Early Access Pass", ariaLabel: "Join the waitlist", link: "#demo" },
];

export default function Nav({ onOpenWaitlist }: NavProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen
        colors={["#9F73E6", "#6342AC"]}
        accentColor="#9F73E6"
        logoUrl="/images/driip-logo.png"
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
      <a href="#demo" className="nav-cta" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>Join the waitlist</a>
    </nav>
  );
}
