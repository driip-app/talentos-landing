import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const ACCENT: Record<"a1" | "a2" | "a3", string> = {
  a1: "#9F73E6",
  a2: "#6342AC",
  a3: "#CEB5F8",
};

const AGENTS: { variant: "a1" | "a2" | "a3"; num: string; name: string; desc: string; saving?: string }[] = [
  { variant: "a1", num: "1", name: "Scribe", desc: "Unlike generic AI writers, Scribe adapts its writing style to match your brand, so your job posts remain consistent across all roles.", saving: "2–3 HRS SAVED / HIRE" },
  { variant: "a2", num: "2", name: "Scout", desc: "The Structured Competency Scoring (SCS) framework evaluates skills, scope, and growth; then generates a ranked shortlist.", saving: "38–40 HRS SAVED / HIRE" },
  { variant: "a3", num: "3", name: "Hunt", desc: "Boolean search across LinkedIn and GitHub. Builds outreach lists and generates personalized first contact messages.", saving: "15–25 HRS SAVED / HIRE" },
  { variant: "a1", num: "4", name: "Sync", desc: "Checks each interview panelist’s calendar, finds mutual time slots, resolves conflicts, and sends the invite.", saving: "5–10 HRS SAVED / HIRE" },
  { variant: "a2", num: "5", name: "Probe", desc: "5-7 standardized questions, transcribed and scored. Only top candidates advance to a human conversation.", saving: "10–15 HRS SAVED / HIRE" },
  { variant: "a3", num: "6", name: "Pulse", desc: "Every candidate hears from you at every stage. Stale detector nudges you at 7 days. Rejection SLA at 72 hrs.", saving: "8–12 HRS SAVED / HIRE" },
];

export default function Platform() {
  return (
    <section className="platform" id="platform">
      <div className="platform-inner">
        <motion.div
          className="platform-eyebrow mono"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          MEET THE AGENTS
        </motion.div>
        <motion.h2
          className="platform-title syne"
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        >
          6 Agents. One OS.<br className="mobile-br" /> <em>Zero dropped tasks.</em>
        </motion.h2>
        <motion.p
          className="platform-sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
        >
          Driip agents give back up to 105 hours per hire — time you&apos;ve been burning on everything else
        </motion.p>
        <div className="platform-grid">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.name}
              className={`agent-card ${agent.variant}`}
              data-num={agent.num.padStart(2, "0")}
              initial={{ opacity: 0, y: 56, scale: 0.92, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            >
              <motion.div
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: ACCENT[agent.variant], transformOrigin: "left", scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12 + 0.35, ease: EASE }}
              />
              <div className="agent-name syne">{agent.name}</div>
              <div className="agent-desc">{agent.desc}</div>
              {agent.saving && (
                <div className="agent-saving"><span className="saving-icon">⏱</span><span className="saving-text mono">{agent.saving}</span></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
