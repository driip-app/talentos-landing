import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const GradientWaves = dynamic(() => import("@/comps/Global/GradientWaves/GradientWaves"), { ssr: false });

interface HeroProps {
  onOpenWaitlist: () => void;
}

export default function Hero({ onOpenWaitlist }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 960);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-rings">
        <GradientWaves horizonColor="#6342AC" waveColor="#9F73E6" crestColor="#CEB5F8" />
      </div>
      <div className="hero-inner">
        <h1 className="syne">
          <span className="hero-title-word">Deploy agents and</span>{" "}
          <span className="hero-title-word">hire the team</span>
          <br />
          <em>that shapes your<br className="mobile-br" /> company&apos;s future</em>
        </h1>
        <p className="hero-sub" style={{ fontFamily: "'Inter', sans-serif" }}>
          Agents designed to complement, not replace, human decision-making
        </p>
        <div
          className={`hero-banner${isMobile ? " hero-banner-mobile" : ""}`}
          onMouseMove={e => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            e.currentTarget.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.015)`;
          }}
          onMouseLeave={e => { e.currentTarget.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)"; }}
        >
          <span className="hero-banner-text syne">Show us your week before we fix it&nbsp;</span>
          <button onClick={onOpenWaitlist} className="hero-cta" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>Let&apos;s clock in</button>
        </div>
      </div>
    </section>
  );
}
