import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Agent = {
  name: string;
  tasks: string[];
  saving?: string;
  fan: { x: string; y: number; rotate: number; z: number };
};

const AGENTS: Agent[] = [
  { name: "Scribe", tasks: ["Define Your Hire", "Craft Magnetic Listings", "Get Roles Seen"], saving: "2–3 hrs", fan: { x: "158%", y: 64, rotate: -11, z: 1 } },
  { name: "Scout", tasks: ["Spot Strong Matches", "Score Every Applicant", "Surface Your Shortlist"], saving: "38–40 hrs", fan: { x: "95%", y: 24, rotate: -7, z: 2 } },
  { name: "Hunt", tasks: ["Discover Untapped Talent", "Build Talent Pipelines", "Spark Candidate Conversations"], saving: "15–25 hrs", fan: { x: "32%", y: 4, rotate: -2, z: 3 } },
  { name: "Sync", tasks: ["Find Shared Availability", "Book Interviews Faster", "Send Calendar Invites"], saving: "5–10 hrs", fan: { x: "-32%", y: 4, rotate: 2, z: 3 } },
  { name: "Probe", tasks: ["Uncover Candidate Potential", "Capture Every Answer", "Identify Standout Talent"], saving: "10–15 hrs", fan: { x: "-95%", y: 24, rotate: 7, z: 2 } },
  { name: "Pulse", tasks: ["Keep Candidates Informed", "Keep Conversations Moving", "Deliver Hiring Decisions"], saving: "8–12 hrs", fan: { x: "-158%", y: 64, rotate: 11, z: 1 } },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1240px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function AgentCard({ agent, num, openness, mobile }: { agent: Agent; num: number; openness: MotionValue<number>; mobile: boolean }) {
  const x = useTransform(openness, [0, 1], [agent.fan.x, "0%"]);
  const y = useTransform(openness, [0, 1], [agent.fan.y, 0]);
  const rotate = useTransform(openness, [0, 1], [agent.fan.rotate, 0]);
  const delay = (num - 1) * 0.12;

  return (
    <motion.div className="agent-slot" style={{ x, y, rotate, zIndex: agent.fan.z }}>
      <motion.div
        key={String(mobile)}
        className="agent-card"
        data-num={String(num).padStart(2, "0")}
        initial={mobile ? { opacity: 0, y: 56, scale: 0.92, filter: "blur(10px)" } : false}
        whileInView={mobile ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {mobile && (
          <motion.div
            className="agent-bar"
            style={{ transformOrigin: "left", scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: delay + 0.35, ease: EASE }}
          />
        )}
        <div className="agent-name syne">{agent.name}</div>
        <ul className="agent-tasks">
          {agent.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
        {agent.saving && (
          <div className="agent-saving"><strong>{agent.saving}</strong> <span className="s-d">saved per hire</span><span className="s-m">saved / hire</span></div>
        )}
      </motion.div>
    </motion.div>
  );
}

const SNAP = 1;
const LOOSEN = 0.3;

export default function Platform() {
  const rowRef = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const openness = useMotionValue(0);
  const open = useRef(false);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end 85%"] });

  const sync = (p: number) => {
    if (p >= SNAP) {
      if (!open.current) {
        open.current = true;
        animate(openness, 1, { duration: 0.9, ease: EASE });
      }
    } else if (open.current) {
      open.current = false;
      animate(openness, (LOOSEN * p) / SNAP, { duration: 0.6, ease: EASE });
    } else if (!openness.isAnimating()) {
      openness.set((LOOSEN * p) / SNAP);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", sync);
  useEffect(() => sync(scrollYProgress.get()), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="platform" id="platform">
      <div className="platform-inner">
        <motion.h2
          className="platform-title syne"
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        >
          Pay <em>only for the agents</em> you deploy.
        </motion.h2>
        <motion.p
          className="platform-sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
        >
          Pick your agents and save up to 105 hours per hire.
        </motion.p>
        <div ref={rowRef} className="platform-grid">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} num={i + 1} openness={openness} mobile={mobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
