import { motion } from "motion/react"
import {
  CutoutCard,
  CutoutCardContent,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCorner,
} from "@/components/ui/cutout-card"

const EASE = [0.16, 1, 0.3, 1] as const

const cardClassName =
  "relative overflow-hidden rounded-[28px] bg-card text-card-foreground border border-border/80 shadow-[0px_1px_2px_-1px_color-mix(in_oklab,var(--foreground)_8%,transparent),0px_4px_8px_-2px_color-mix(in_oklab,var(--foreground)_6%,transparent),0px_8px_16px_-4px_color-mix(in_oklab,var(--foreground)_5%,transparent)]"

const PERSONAS = [
  {
    label: "FOUNDERS",
    image: "/images/persona-founders-new.png",
    objectPosition: "center top",
    transformOrigin: "center 50%",
    scale: 1.7,
    title: "Focus on building, fundraising and keeping the lights on.",
    desc: "You posted a role. You have 180 applications, 3 investor meetings, a product sprint, and a board update. The good news: Driip has already read all 180, scheduled interviews for the top 4, and sent rejections to the rest. The bad news: there isn't any.",
  },
  {
    label: "HIRING MANAGERS",
    image: "/images/persona-hiring-managers-2.png",
    objectPosition: "center center",
    scale: 1.6,
    title: "Get a shortlist you can explain, not just defend.",
    desc: "You're not just reviewing candidates. You're going to have to justify this shortlist to your VP, your founder, and yourself at 11 pm. Every Driip score comes with a criterion-level breakdown, so you're sharing evidence, not hunches.",
  },
  {
    label: "TA TEAMS",
    image: "/images/persona-ta-teams-3.png",
    objectPosition: "center bottom",
    scale: 1.3,
    title: "Start spending Mondays recruiting, not screening.",
    desc: "The best part of your job isn't reading CVs, chasing calendar slots, or writing the same rejection for the fourteenth time this week. Driip eliminates all three, so you can spend your time on the part that actually requires a human.",
  },
]


export default function AgentFinderSection() {
  return (
    <section
      id="personas"
      className="personas"
      style={{
        background: "var(--dark)",
        padding: "84px 48px",
        borderTop: "none",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          className="mono"
          style={{ fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 16 }}
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.12em" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          FIND YOUR AGENT
        </motion.div>
        <motion.h2
          className="syne section-title"
          style={{ marginBottom: 12 }}
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        >
          Driip works <em style={{ fontStyle: "normal", color: "#9F73E6" }}>differently</em><br />{" "}for everyone.
        </motion.h2>
        <motion.p
          className="section-sub"
          style={{ marginBottom: 48 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
        >
          That means everyone stops doing the part they hate. The whole hiring cycle moves faster. And nobody goes home at 7 pm with 258 unread CVs.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="agent-finder-grid"
        >
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 70, rotateY: (i - 1) * 10, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.16, ease: EASE }}
              style={{ transformPerspective: 1200 }}
            >
              <CutoutCard trackPointerHover={false} className={cardClassName} style={{ display: "flex", flexDirection: "column" }}>
                <CutoutCardMedia style={{ height: 220 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={p.image}
                    alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: p.objectPosition ?? "center top", transform: p.scale ? `scale(${p.scale})` : undefined, transformOrigin: p.transformOrigin ?? (p.objectPosition?.includes("top") ? "center top" : "center center") }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.1, delay: i * 0.16 + 0.25, ease: EASE }}
                  />
                  <CutoutCardOverlay />
                  <CutoutCardInsetLabel
                    style={{ bottom: 0, left: 0, background: "#13131a", borderTopRightRadius: 20, padding: "6px 14px" }}
                  >
                    <span className="mono" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9F73E6" }}>
                      {p.label}
                    </span>
                    <CutoutCorner size={26} style={{ position: "absolute", right: -25, bottom: -1, transform: "rotate(90deg)", color: "#13131a" }} />
                    <CutoutCorner size={26} style={{ position: "absolute", top: -25, left: -1, transform: "rotate(90deg)", color: "#13131a" }} />
                  </CutoutCardInsetLabel>
                </CutoutCardMedia>

                <CutoutCardContent style={{ padding: "20px 22px 0", flex: 1 }}>
                  <h3 className="syne" style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 18, lineHeight: 1.3 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.48)", lineHeight: 1.65, marginBottom: 16 }}>
                    {p.desc}
                  </p>
                </CutoutCardContent>
              </CutoutCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .agent-finder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
