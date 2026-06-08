import Head from "next/head";
import { useState } from "react";
import Nav from "@/comps/landing/Nav";
import Hero from "@/comps/landing/Hero";
import Platform from "@/comps/landing/Platform";
import Features from "@/comps/landing/Features";
import Signup from "@/comps/landing/Signup";
import AgentFinderSection from "@/comps/AgentFinderSection";
import TalentOSWaitlist from "@/comps/TalentOSWaitlist";

export default function TalentOSPage() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <>
      <Head>
        <title>Driip — World&apos;s #1 Talent OS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Nav onOpenWaitlist={() => setShowWaitlist(true)} />
      <Hero onOpenWaitlist={() => setShowWaitlist(true)} />
      <Platform />
      <Features />
      <AgentFinderSection />
      <Signup />
      {showWaitlist && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, overflowY: "auto" }}>
          <button
            onClick={() => setShowWaitlist(false)}
            style={{
              position: "fixed", top: 16, right: 20, zIndex: 1001,
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 6, color: "#fff", fontSize: 18, lineHeight: 1,
              width: 36, height: 36, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
            aria-label="Close"
          >
            ×
          </button>
          <TalentOSWaitlist />
        </div>
      )}
    </>
  );
}
