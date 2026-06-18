/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import TiltedCard from "./TiltedCard";

type PainKey = "screening" | "scheduling" | "comms";
type Phase = "opening" | "scene" | "result";

interface WorldChoice {
  text: string;
  world: string;
  cost: string;
  pain: PainKey;
  w: number;
}

interface World {
  id: number;
  location: string;
  ambient: string;
  env: string[];
  tension: string;
  question: string;
  choices: WorldChoice[];
}

// ─── Fonts ────────────────────────────────────────────────────────────────────
const FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Roboto+Mono:wght@400;500&display=swap";
const CG = "'Geom', sans-serif";
const DM = "'Inter', sans-serif";
const MO = "'Roboto Mono', monospace";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:      "#080608",
  surface: "#0D0A0D",
  card:    "#120F12",
  border:  "#241E24",
  border2: "#2E2630",
  text:    "#EDE5E0",
  sub:     "#7A7070",
  dim:     "#2E2630",
  gold:    "#9F73E6",
  goldA:   "rgba(159,115,230,0.09)",
  goldB:   "rgba(159,115,230,0.05)",
  cream:   "#F2EAE0",
  lime:    "#9F73E6",
  limeA:   "rgba(159,115,230,0.07)",
  teal:    "#9F73E6",
  violet:  "#6342AC",
  coral:   "#CEB5F8",
  mist:    "rgba(159,115,230,0.12)",
};

// ─── Pain archetypes ──────────────────────────────────────────────────────────
const PAIN: Record<PainKey, { label: string; agent: string; color: string; hours: string; stat: string; icon: string }> = {
  screening:  { label:"The Buried Screener",  agent:"Agent 01", color:C.teal,   hours:"38h", stat:"returned per hire", icon:"/images/driip-pain-screening.png" },
  scheduling: { label:"The Calendar Hostage", agent:"Agent 02", color:C.violet, hours:"9h",  stat:"returned per hire", icon:"/images/driip-pain-scheduling.png" },
  comms:      { label:"The Ghost Whisperer",  agent:"Agent 03", color:C.coral,  hours:"12h", stat:"returned per hire", icon:"/images/driip-pain-comms.png" },
};

// ─── Ryan's storyworld — each scene is a PLACE, not an event ─────────────────
// Each location has: a spatial anchor, environmental details, a modal conflict
// (alethic = what is possible, deontic = what is obligatory, epistemic = what is known)
const WORLDS: World[] = [
  {
    id: 1,
    // Spatial anchor — Ryan: narrative begins when reader enters a place
    location: "YOUR DESK · MONDAY · 08:47 AM",
    ambient: "The building is almost empty. The light hasn't warmed up yet.",
    // Environmental details build the textual actual world (TAW)
    env: [
      // "Your laptop fan is running at full speed.",
      // "Your phone shows 14 missed notifications.",
      // "Your coffee is cold. You haven't touched it.",
    ],
    // The narrative tension — what Ryan calls the "narrative gap"
    tension: "248 emails are waiting.\n180 of them are from candidates.",
    // \n\nSomewhere in that pile is your best hire of the year.\nYou have no way of knowing which one.
    question: "You open the laptop. Where do you go first?",
    choices: [
      {
        text:  "The inbox. Top to bottom. Systematically.",
        world: "You have a system. You built it yourself. It has never been fast enough.",
        // What this world-branch forecloses — Ryan's possible worlds
        cost:  "By 11am you've read fourteen resumes. There are two hundred and thirty-three left.",
        pain: "screening",  w: 3,
      },
      {
        text:  "The calendar. Something about Tuesday feels wrong.",
        world: "Three interview slots confirmed. One ghosted you. One replied at midnight saying they need to reschedule.",
        cost:  "You spend forty minutes finding a new time. The candidate goes cold by Thursday.",
        pain: "scheduling", w: 2,
      },
      {
        text:  "The drafts folder. I owe someone a rejection.",
        world: "Seventeen drafts. The oldest one is from three weeks ago. That candidate has probably moved on.",
        cost:  "You write the email. Then you write seven more. Two hours gone. The inbox hasn't moved.",
        pain: "comms",      w: 2,
      },
    ],
  },
  {
    id: 2,
    location: "THE HIRING MANAGER'S CALENDAR · TUESDAY",
    ambient: "Every slot is blocked. It has been like this for two weeks.",
    env: [
      "The role has been open for 47 days.",
      "The hiring manager leaves for a conference on Friday.",
      "Your best candidate replied this morning. They want to meet this week.",
    ],
    tension: "There is one opening in the hiring manager's calendar.\nIt is at 4:30pm on Thursday.\n\nThe candidate is interviewing somewhere else on Wednesday.",
    question: "You need to move in the next hour. What's the move?",
    choices: [
      {
        text:  "Email the hiring manager and wait for confirmation.",
        world: "You send the email at 9:03am. She reads it at 2:17pm. She replies at 4:45pm. Yes, Thursday works.",
        cost:  "The candidate accepted an offer at 3pm. You find out on LinkedIn on Friday.",
        pain: "scheduling", w: 3,
      },
      {
        text:  "Go back to the resume pile while I wait.",
        world: "You screen eleven more applicants. Two are promising. You add them to a spreadsheet that now has forty-one rows.",
        cost:  "The candidate you needed this week is gone. The spreadsheet will take another week to action.",
        pain: "screening",  w: 2,
      },
      {
        text:  "Send the candidate a warm holding note. Buy myself some time.",
        world: "You write the perfect email. Warm, specific, honest about the timeline.",
        cost:  "It takes forty-five minutes. You have nineteen more candidates who need the same honesty.",
        pain: "comms",      w: 2,
      },
    ],
  },
  {
    id: 3,
    location: "LINKEDIN · WEDNESDAY AFTERNOON",
    ambient: "You opened this tab to check one thing. That was forty minutes ago.",
    env: [
      "A candidate has viewed your profile twice today.",
      "Three people you interviewed last month are now listed as 'Open to Work'.",
      "Someone just posted: 'Thrilled to start my new role'",
    ],
    tension: "You recognize the name in the post.\n\nYou interviewed her six weeks ago.\nShe was your second choice. \n\nYou never followed up.",
    question: "What do you feel in this moment?",
    choices: [
      {
        text:  "Frustration. I didn't have time to read all the CVs properly.",
        world: "If you'd gotten to her profile sooner, you'd have known she was exceptional.",
        cost:  "The next exceptional candidate is in your inbox right now. You haven't gotten to them yet either.",
        pain: "screening",  w: 2,
      },
      {
        text:  "Regret. The scheduling fell apart and the window closed.",
        world: "There was a slot. There was a conversation. Then there was three days of back-and-forth that didn't go anywhere.",
        cost:  "You can see exactly where it broke down. You have no way to fix it before it breaks down again.",
        pain: "scheduling", w: 2,
      },
      {
        text:  "Guilt. One follow-up email would have kept her warm.",
        world: "You knew this at the time. You added it to your to-do list. The to-do list has ninety-four items.",
        cost:  "Right now there are eleven candidates in your pipeline who haven't heard from you in over a week.",
        pain: "comms",      w: 3,
      },
    ],
  },
  {
    id: 4,
    location: "YOUR DESK AGAIN · FRIDAY · 6:08PM",
    ambient: "The building is empty now. The light has gone orange.",
    env: [
      "You've been here since 9:00am.",
      "You processed 107 applications today. There are 281 left.",
      "You have 3 interviews scheduled for next week that you haven't prepped for.",
    ],
    tension: "The role has been open for 54 days.\nYour hiring manager asks about it every Monday.\nYou don't have a good answer.",
    question: "If you're honest with yourself — what's actually broken?",
    choices: [
      {
        text:  "I just need to get through the pile. Once it's clear, everything unblocks.",
        world: "The pile has never been clear. On your best week it grows slower than usual.",
        cost:  "Next Monday there will be a new pile. There will be the week after that.",
        pain: "screening",  w: 3,
      },
      {
        text:  "If scheduling wasn't this painful, I'd have closed two roles by now.",
        world: "You've sent 94 emails this week trying to align three people's calendars.",
        cost:  "That's before you factor in the rescheduling. There's always rescheduling.",
        pain: "scheduling", w: 3,
      },
      {
        text:  "I'm letting candidates down. They deserve better communication than this.",
        world: "You know the experience you want to give people. You know how far short you're falling.",
        cost:  "Your employer brand is being written in inboxes you can't see, by people you couldn't get back to.",
        pain: "comms",      w: 3,
      },
    ],
  },
];

// ─── Typewriter — Ryan: text unfolding in time creates temporal immersion ─────
function useTypewriter(text: string, speed = 16) {
  const [out, setOut]   = useState("");
  const [done, setDone] = useState(false);
  const i = useRef(0);
  const t = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    i.current = 0;
    if (t.current !== null) clearInterval(t.current);
    t.current = setInterval(() => {
      i.current += 1;
      setOut(text.slice(0, i.current));
      if (i.current >= text.length) {
        if (t.current !== null) clearInterval(t.current);
        t.current = null;
        setDone(true);
      }
    }, speed);
    return () => {
      if (t.current !== null) clearInterval(t.current);
      t.current = null;
    };
  }, [text, speed]);

  const skip = () => {
    if (t.current !== null) clearInterval(t.current);
    t.current = null;
    setOut(text);
    setDone(true);
  };
  return { out, done, skip };
}

// ─── Grain ────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9999, opacity:0.04,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize:"120px 120px" }}/>
  );
}

// ─── Radial atmosphere ────────────────────────────────────────────────────────
function Atmosphere({ color, x = "50%", y = "40%", r = "600px", o = 0.06 }: {
  color: string;
  x?: string;
  y?: string;
  r?: string;
  o?: number;
}) {
  return (
    <div style={{ position:"fixed", left:x, top:y, width:r, height:r, transform:"translate(-50%,-50%)", borderRadius:"50%",
      background:`radial-gradient(circle, ${color} 0%, transparent 68%)`,
      opacity:o, pointerEvents:"none", zIndex:0, transition:"all 1.4s ease" }}/>
  );
}

// ─── World nodes — spatial navigation metaphor ────────────────────────────────
// Ryan: readers navigate storyworlds as spatial structures
function WorldMap({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:0 }}>
      {Array.from({length:total}).map((_,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center" }}>
          <div style={{
            width: i < current ? 8 : i === current ? 10 : 8,
            height: i < current ? 8 : i === current ? 10 : 8,
            borderRadius:"50%",
            background: i < current ? C.gold : i === current ? C.gold : "transparent",
            border: `1px solid ${i <= current ? C.gold : C.border2}`,
            transition:"all 0.4s ease",
            boxShadow: i === current ? `0 0 10px ${C.gold}60` : "none",
          }}/>
          {i < total-1 && <div style={{ width:22, height:1, background: i < current ? `${C.gold}50` : C.border, transition:"background 0.4s ease" }}/>}
        </div>
      ))}
    </div>
  );
}

// ─── Opening ──────────────────────────────────────────────────────────────────
function Opening({ onEnter }: { onEnter: () => void }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 120); }, []);

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:500, width:"100%", textAlign:"center",
        opacity: v?1:0, transform: v?"none":"translateY(22px)", transition:"all 0.9s ease" }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:56 }}>
          <img src="/images/driip-logo.png" alt="Driip" style={{ width:80, height:"auto", mixBlendMode:"screen" }} />
        </div>

        {/* Ryan: the threshold — invitation to enter the storyworld */}
        {/* <div style={{ fontSize:11, fontFamily:MO, color:C.gold, letterSpacing:"0.14em", marginBottom:20 }}>
          BEFORE WE LAUNCH
        </div> */}

        <h1 style={{ fontSize:46, fontFamily:CG, fontWeight:700, color:C.cream, lineHeight:1.1, marginBottom:24 }}>
          We want to show<br/>you <em style={{ fontStyle:"italic", color:C.gold }}>your Monday</em><br/>before we fix it.
        </h1>

        {/* Ryan: threshold marker — the moment of world-entry */}
        <div style={{ width:1, height:40, background:`linear-gradient(${C.gold}60, transparent)`, margin:"24px auto" }}/>

        <button type="button" onClick={onEnter} style={{
          padding:"14px 38px", borderRadius:2, cursor:"pointer",
          background:"transparent", border:`1px solid ${C.gold}`,
          color:C.gold, fontSize:12, fontFamily:MO, letterSpacing:"0.1em",
          transition:"all 0.25s", boxShadow:`inset 0 0 0 0 ${C.gold}`,
        }}
          onMouseEnter={e => { e.currentTarget.style.background=C.goldA; e.currentTarget.style.boxShadow=`0 0 30px ${C.gold}25`; }}
          onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.boxShadow="none"; }}>
          LET'S CLOCK IN →
        </button>
      </div>
    </div>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ world, idx, total, onChoose }: {
  world: World;
  idx: number;
  total: number;
  onChoose: (choice: WorldChoice) => void;
}) {
  const [chosen,  setChosen]  = useState<number | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [in_,     setIn]      = useState(false);

  // Ryan: the environment paragraph establishes the TAW before the narrative tension
  const fullTension = world.tension;
  const { out, done, skip } = useTypewriter(fullTension, 14);

  useEffect(() => {
    const tid = setTimeout(() => setIn(true), 80);
    return () => clearTimeout(tid);
  }, []);

  const choose = (c: WorldChoice, i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    setTimeout(() => { setLeaving(true); }, 180);
    setTimeout(() => onChoose(c), 820);
  };

  return (
    <div className={idx===0||idx===1||idx===2||idx===3 ? "scene-split" : undefined} style={{ minHeight:"100vh", display:"flex", position:"relative", zIndex:1 }}>
      {idx===0 && (
        <div className="scene-split-image" style={{ width:"50%", minHeight:"100vh", flexShrink:0, position:"relative", overflow:"hidden",
          opacity: leaving?0 : in_?1:0, transition:"opacity 1.2s ease" }}>
          <div style={{ position:"absolute", inset:0,
            backgroundImage:`url("/images/drrip-game-scene-1.jpg")`, backgroundSize:"cover", backgroundPosition:"center",
            animation:"kenburns 16s ease-in-out infinite alternate" }}/>
          {/* faint drift over the window light, echoing the morning beam */}
          <div style={{ position:"absolute", inset:0, mixBlendMode:"screen",
            background:`radial-gradient(ellipse at 50% 30%, ${C.gold}, transparent 55%)`,
            opacity:0.2, animation:"lightDrift 9s ease-in-out infinite" }}/>
          {/* soft edge so the photo dissolves into the panel rather than cutting */}
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg, transparent 58%, ${C.bg} 100%)` }}/>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg, ${C.bg}55 0%, transparent 22%, transparent 78%, ${C.bg}66 100%)` }}/>
        </div>
      )}
      {idx===1 && (
        <div className="scene-split-image" style={{ width:"50%", minHeight:"100vh", flexShrink:0, position:"relative", overflow:"hidden",
          opacity: leaving?0 : in_?1:0, transition:"opacity 1.2s ease" }}>
          <video autoPlay loop muted playsInline
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}>
            <source src="/images/drrip-game-scene-2.mp4" type="video/mp4"/>
          </video>
          {/* soft edge so the clip dissolves into the panel rather than cutting */}
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg, transparent 58%, ${C.bg} 100%)` }}/>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg, ${C.bg}55 0%, transparent 22%, transparent 78%, ${C.bg}66 100%)` }}/>
        </div>
      )}
      {idx===2 && (
        <div className="scene-split-image" style={{ width:"50%", minHeight:"100vh", flexShrink:0, position:"relative", overflow:"hidden",
          opacity: leaving?0 : in_?1:0, transition:"opacity 1.2s ease" }}>
          <div style={{ position:"absolute", inset:0,
            backgroundImage:`url("/images/drrip-game-scene-3.jpg")`, backgroundSize:"cover", backgroundPosition:"center",
            animation:"kenburns 16s ease-in-out infinite alternate" }}/>
          {/* soft edge so the photo dissolves into the panel rather than cutting */}
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg, transparent 58%, ${C.bg} 100%)` }}/>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg, ${C.bg}55 0%, transparent 22%, transparent 78%, ${C.bg}66 100%)` }}/>
        </div>
      )}
      {idx===3 && (
        <div className="scene-split-image" style={{ width:"50%", minHeight:"100vh", flexShrink:0, position:"relative", overflow:"hidden",
          opacity: leaving?0 : in_?1:0, transition:"opacity 1.2s ease" }}>
          <div style={{ position:"absolute", inset:0,
            backgroundImage:`url("/images/drrip-game-scene-4.jpg")`, backgroundSize:"cover", backgroundPosition:"center",
            animation:"kenburns 16s ease-in-out infinite alternate" }}/>
          {/* soft edge so the photo dissolves into the panel rather than cutting */}
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg, transparent 58%, ${C.bg} 100%)` }}/>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg, ${C.bg}55 0%, transparent 22%, transparent 78%, ${C.bg}66 100%)` }}/>
        </div>
      )}
      <div className="scene-content" style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px 24px" }}>
      <div className="scene-inner" style={{ maxWidth:580, width:"100%", margin:"0 auto",
        opacity: leaving?0 : in_?1:0,
        transform: leaving?"translateY(-14px)" : in_?"none":"translateY(18px)",
        transition:"all 0.55s ease" }}>

        {/* Navigation header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:44 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <img src="/images/driip-logo.png" alt="Driip" style={{ width:52, height:"auto", mixBlendMode:"screen" }} />
          </div>
          <WorldMap total={total} current={idx}/>
          <button type="button" onClick={skip} style={{ background:"transparent", border:"none", color:C.dim, fontSize:9, fontFamily:MO, cursor:"pointer", letterSpacing:"0.06em", transition:"color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color=C.sub}
            onMouseLeave={e => e.currentTarget.style.color=C.dim}>
            {done?"":"SKIP →"}
          </button>
        </div>

        {/* Location marker — Ryan's spatial anchor */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
          <div style={{ height:1, width:20, background:`${C.gold}50` }}/>
          <span style={{ fontSize:9, fontFamily:MO, color:C.gold, letterSpacing:"0.13em" }}>{world.location}</span>
        </div>

        {/* Ambient — sets the sensory scene */}
        <div style={{ fontSize:13, fontFamily:DM, color:C.sub, fontStyle:"italic", marginBottom:18, lineHeight:1.6 }}>
          {world.ambient}
        </div>

        {/* Environmental details — Ryan: encyclopedic world-building details create believability */}
        <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:28, paddingLeft:14, borderLeft:`1px solid ${C.border2}` }}>
          {world.env.map((e,i) => (
            <div key={i} style={{ fontSize:12, fontFamily:DM, color:C.sub, lineHeight:1.55 }}>
              <span style={{ color:C.dim, marginRight:8, fontFamily:MO, fontSize:9 }}>◆</span>{e}
            </div>
          ))}
        </div>

        {/* Narrative tension — typewritten, second person, present tense */}
        {/* Ryan: second person eliminates distance between reader and protagonist */}
        <div style={{ fontSize:20, fontFamily:CG, color:C.text, lineHeight:1.8, marginBottom:8, whiteSpace:"pre-line", minHeight:120 }}>
          {out}
          {!done && <span style={{ animation:"blink 0.9s infinite", color:C.gold, fontStyle:"normal" }}>_</span>}
        </div>

        {/* Question + choices — only rendered when text is done */}
        <div style={{ opacity:done?1:0, transform:done?"none":"translateY(6px)", transition:"opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s" }}>
          <div style={{ width:"100%", height:1, background:`linear-gradient(to right, ${C.border2}, transparent)`, marginBottom:32 }}/>

          <div style={{ fontSize:10, fontFamily:MO, color:C.gold, letterSpacing:"0.1em", marginBottom:18 }}>
            {world.question.toUpperCase()}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {world.choices.map((c, i) => {
              const isChosen  = chosen === i;
              const isDimmed  = chosen !== null && chosen !== i;

              return (
                <button type="button" key={i} onClick={() => choose(c, i)}
                  style={{
                    padding:"0", borderRadius:3, cursor:chosen!==null?"default":"pointer",
                    textAlign:"left", transition:"all 0.3s",
                    background:"transparent", border:"none",
                    opacity: isDimmed ? 0.22 : 1,
                  }}>
                  <div style={{
                    padding:"14px 16px", borderRadius:3, transition:"all 0.25s",
                    background: isChosen ? C.goldA : C.card,
                    border:`1px solid ${isChosen ? C.gold : isDimmed ? C.border : C.border2}`,
                    transform: isChosen ? "translateX(5px)" : "none",
                  }}
                    onMouseEnter={e => { if(chosen!==null)return; e.currentTarget.style.borderColor=`${C.gold}55`; e.currentTarget.style.background=C.goldB; }}
                    onMouseLeave={e => { if(chosen!==null)return; e.currentTarget.style.borderColor=C.border2; e.currentTarget.style.background=C.card; }}>

                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <span style={{ fontSize:10, fontFamily:MO, color:isChosen?C.gold:C.dim, marginTop:3, flexShrink:0, transition:"color 0.2s", letterSpacing:"0.04em" }}>
                        {String.fromCharCode(65+i)}.
                      </span>
                      <div style={{ flex:1 }}>
                        {/* The choice itself */}
                        <div style={{ fontSize:14, fontFamily:DM, color:isChosen?C.cream:C.text, fontWeight:500, lineHeight:1.55 }}>
                          {c.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────
const RESULT_NARRATIVE: Record<PainKey, { reflection: string; future: string; reveal: string }> = {
  screening: {
    // Ryan: the result re-narrates the storyworld from outside — the reader now sees the pattern
    reflection: "Every morning you entered the same room and faced the same pile. The pile was never the problem. The problem was that the pile required *you* — every hour, every decision, every pair of eyes.",
    future:     "A world where Driip reads everything before you arrive. Where you walk in to a shortlist, not a stack. Where the pile doesn't exist because it was never yours to carry.",
    reveal:     "Agent Scout of Driip screens every application the moment it arrives. It surfaces your top candidates by the time you finish your coffee.",
  },
  scheduling: {
    reflection: "The calendar wasn't a tool. It became a negotiation — slow, fragile, dependent on other people's attention at the right moment. Good candidates don't wait for three people to agree on a Thursday.",
    future:     "A world where a slot appears before you ask for one. Where the invite is already sent. Where Thursday has been on the calendar since Monday morning.",
    reveal:     "Agent Sync of Driip pulls availability from every interviewer simultaneously, finds the window, sends the invite, and chases the confirmations. You find out when it's done.",
  },
  comms: {
    reflection: "Every draft you didn't send was a small breach of the standard you hold yourself to. You knew what good looked like. You knew where the gap was. The gap was time — and time was already elsewhere.",
    future:     "A world where every candidate hears from you, specifically, within hours. Where rejection feels human. Where the people you couldn't hire still leave thinking well of you.",
    reveal:     "Agent Pulse of Driip keeps every candidate in the loop with personalised, thoughtful messages — while you spend your time only on the conversations that actually matter.",
  },
};

function Result({ dominant, scores, onReplay }: {
  dominant: PainKey;
  scores: Record<PainKey, number>;
  onReplay: () => void;
}) {
  const pain    = PAIN[dominant];
  const narr    = RESULT_NARRATIVE[dominant];
  const [v, setV]           = useState(false);
  const [email, setE]       = useState("");
  const [sent,  setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setTimeout(() => setV(true), 120); }, []);

  const sorted = (Object.entries(scores) as [PainKey, number][]).sort((a, b) => b[1] - a[1]);
  const total  = sorted.reduce((s,[,v])=>s+v,0);

  const submit = () => {
    if (!email.includes("@") || loading) return;
    setLoading(true);
    fetch("https://formspree.io/f/xredlbnb", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email, pain_profile: pain.label }),
    })
      .then(res => { if (res.ok) setSent(true); })
      .finally(() => setLoading(false));
  };

  return (
    <div className="scene-split" style={{ height:"100vh", overflow:"hidden", display:"flex", position:"relative", zIndex:1 }}>
      <div className="scene-content" style={{ flex:1, height:"100vh", overflowY:"auto", display:"flex", flexDirection:"column", justifyContent:"flex-start", padding:"48px 24px 60px" }}>
      <div className="scene-inner" style={{ maxWidth:560, width:"100%", margin:"0 auto",
        opacity:v?1:0, transform:v?"none":"translateY(18px)", transition:"all 0.75s ease" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:56 }}>
          <img src="/images/driip-logo.png" alt="Driip" style={{ width:52, height:"auto", mixBlendMode:"screen" }} />
        </div>

        {/* Ryan: the re-narration — the reader sees their world clearly for the first time */}
        <h2 style={{ fontSize:36, fontFamily:CG, fontWeight:700, color:C.cream, lineHeight:1.2, marginBottom:24 }}>
          You've been living<br/>in the same story<br/><em style={{ fontStyle:"italic", color:C.gold }}>every week.</em>
        </h2>

        <div style={{ fontSize:15, fontFamily:CG, color:C.sub, lineHeight:1.9, marginBottom:28, fontStyle:"italic" }}>
          "{narr.reflection}"
        </div>

        {/* Pain profile — Ryan: revealing the structure of the world the reader has been inhabiting */}
        <div style={{ padding:"16px", background:C.card, border:`1px solid ${C.border2}`, borderRadius:3, marginBottom:28 }}>
          <div style={{ fontSize:9, fontFamily:MO, color:C.sub, letterSpacing:"0.1em", marginBottom:14 }}>THE SHAPE OF YOUR WEEK</div>
          {sorted.map(([key, val]) => {
            const p = PAIN[key];
            const pct = total>0 ? Math.round((val/total)*100) : 0;
            const isD = key === dominant;
            return (
              <div key={key} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                  <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:11, fontFamily:DM, color:isD?p.color:C.sub }}>{p.label}</span>
                  </span>
                  <span style={{ fontSize:10, fontFamily:MO, color:isD?p.color:C.dim }}>{pct}%</span>
                </div>
                <div style={{ height:2, background:C.border2, borderRadius:1, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:isD?p.color:C.dim, borderRadius:1, transition:"width 1.1s ease 0.6s" }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* The possible future — Ryan: narrative resolution opens a new possible world */}
        <div style={{ padding:"20px", background:`${pain.color}08`, border:`1px solid ${pain.color}20`, borderRadius:3, marginBottom:28 }}>
          <div style={{ fontSize:9, fontFamily:MO, color:pain.color, letterSpacing:"0.1em", marginBottom:14 }}>A DIFFERENT POSSIBLE WORLD</div>
          <div style={{ fontSize:14, fontFamily:CG, fontStyle:"italic", color:C.text, lineHeight:1.85, marginBottom:16 }}>
            "{narr.future}"
          </div>
          <div style={{ height:1, background:`${pain.color}20`, marginBottom:16 }}/>
          <div style={{ fontSize:13, fontFamily:DM, color:C.sub, lineHeight:1.7, marginBottom:14 }}>
            {narr.reveal}
          </div>
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <span style={{ fontSize:32, fontFamily:CG, fontWeight:700, color:pain.color }}>{pain.hours}</span>
            <span style={{ fontSize:12, fontFamily:DM, color:C.sub }}>{pain.stat}</span>
          </div>
        </div>

        {/* Email capture */}
        {!sent ? (
          <div>
            <div style={{ height:1, background:`linear-gradient(to right, ${C.border2}, transparent)`, marginBottom:24 }}/>
            <div style={{ fontSize:22, fontFamily:CG, fontWeight:700, color:C.cream, marginBottom:8 }}>
              We're building this now.
            </div>
            <div style={{ fontSize:13, color:C.sub, fontFamily:DM, lineHeight:1.7, marginBottom:20 }}>
              Leave your email and we'll reach out the moment TalentOS launches — with an onboarding path built around your <span style={{ color:pain.color }}>{pain.label}</span> profile.
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input value={email} onChange={e=>setE(e.target.value)}
                onKeyDown={e=>{ if (e.key==="Enter") submit(); }}
                placeholder="your@company.com"
                style={{ flex:1, padding:"12px 16px", background:C.card, border:`1px solid ${C.border2}`, borderRadius:2, color:C.text, fontSize:13, fontFamily:DM, outline:"none", caretColor:C.gold, transition:"border-color 0.15s" }}
                onFocus={e=>e.target.style.borderColor=`${C.gold}60`}
                onBlur={e=>e.target.style.borderColor=C.border2}
              />
              <button type="button" onClick={submit} disabled={loading} style={{
                padding:"12px 20px", borderRadius:2, cursor: loading ? "default" : "pointer",
                background:C.gold, border:"none", color:C.bg,
                fontSize:10, fontFamily:MO, fontWeight:500, letterSpacing:"0.09em",
                whiteSpace:"nowrap", transition:"all 0.2s",
                opacity: loading ? 0.6 : 1,
                boxShadow:`0 0 0 0 ${C.gold}`,
              }}
                onMouseEnter={e=>{ if(!loading) e.currentTarget.style.boxShadow=`0 0 28px ${C.gold}40`; }}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                {loading ? "SENDING..." : "NOTIFY ME"}
              </button>
            </div>
            <div style={{ marginTop:10, fontSize:9, color:C.dim, fontFamily:MO, letterSpacing:"0.06em" }}>
              LAUNCH UPDATE ONLY. NO SPAM.
            </div>
          </div>
        ) : (
          <div style={{ padding:"24px", background:C.limeA, border:`1px solid ${C.lime}30`, borderRadius:3, animation:"fadeSlide 0.5s ease" }}>
            <div style={{ fontSize:22, fontFamily:CG, fontWeight:700, color:C.lime, marginBottom:8 }}>You're in.</div>
            <div style={{ fontSize:13, color:C.sub, fontFamily:DM, lineHeight:1.7 }}>
              We'll reach out with early access — and we'll remember you're a <span style={{ color:pain.color }}>{pain.label}</span>.
            </div>
          </div>
        )}

        {/* Replay */}
        <div style={{ marginTop:28, textAlign:"center" }}>
          <button type="button" onClick={onReplay} style={{ background:"transparent", border:"none", color:C.dim, fontSize:10, fontFamily:MO, cursor:"pointer", letterSpacing:"0.07em", transition:"color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.color=C.sub}
            onMouseLeave={e=>e.currentTarget.style.color=C.dim}>
            ← ENTER A DIFFERENT WORLD
          </button>
        </div>
      </div>
      </div>
      {/* Right panel — the dominant pain made visible, picked from the reader's own answers */}
      <div className="scene-split-image" style={{ width:"30%", minHeight:"100vh", flexShrink:0, position:"relative", overflow:"hidden",
        display:"flex", alignItems:"center", justifyContent:"center",
        opacity:v?1:0, transition:"opacity 1.2s ease" }}>
        <TiltedCard
          imageSrc={pain.icon}
          altText={pain.label}
          captionText={pain.label}
          containerHeight="560px"
          containerWidth="340px"
          imageHeight="440px"
          imageWidth="340px"
          rotateAmplitude={12}
          scaleOnHover={1.08}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div style={{ position:"absolute", top:18, left:0, width:"340px", textAlign:"center",
              fontSize:13, fontFamily:CG, fontWeight:700, color:"#fff", letterSpacing:"0.01em",
              textShadow:"0 1px 6px rgba(0,0,0,0.6)" }}>
              {pain.label}
            </div>
          }
        />
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
const INITIAL_SCORES: Record<PainKey, number> = { screening: 0, scheduling: 0, comms: 0 };

export default function TalentOSWaitlist() {
  const [phase,  setPhase]  = useState<Phase>("scene");
  const [wIdx,   setWIdx]   = useState(0);
  const [scores, setScores] = useState<Record<PainKey, number>>(INITIAL_SCORES);

  // Atmosphere colour tracks leading pain — world shifts around the reader
  const leading = (Object.entries(scores) as [PainKey, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const atmColor: Record<PainKey, string> = { screening: C.teal, scheduling: C.violet, comms: C.coral };
  const atmosphereTint = atmColor[leading];

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_URL;
    document.head.appendChild(l);
    return () => {
      document.head.removeChild(l);
    };
  }, []);

  useEffect(() => {
    const prevBody = document.body.style.cssText;
    const prevHtml = document.documentElement.style.cssText;
    document.body.style.cssText            = `background:${C.bg};margin:0;padding:0;`;
    document.documentElement.style.cssText = `background:${C.bg};margin:0;padding:0;`;
    return () => {
      document.body.style.cssText = prevBody;
      document.documentElement.style.cssText = prevHtml;
    };
  }, []);

  const onChoose = (choice: WorldChoice) => {
    const next = { ...scores, [choice.pain]: scores[choice.pain] + choice.w };
    setScores(next);
    if (wIdx + 1 < WORLDS.length) setWIdx(wIdx + 1);
    else setPhase("result");
  };

  const reset = () => {
    setPhase("scene");
    setWIdx(0);
    setScores({ ...INITIAL_SCORES });
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:DM, position:"relative", overflow:"hidden" }}>
      <style>{`
        @keyframes blink    { 0%,100%{opacity:1} 45%,55%{opacity:0} }
        @keyframes fadeSlide{ from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes glow     { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes kenburns { 0%{transform:scale(1.04) translate(0,0);} 100%{transform:scale(1.14) translate(-1.5%,-1%);} }
        @keyframes lightDrift{ 0%,100%{opacity:.16;} 50%{opacity:.32;} }
        *{box-sizing:border-box;margin:0;padding:0;}
        ::placeholder{color:${C.dim};}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${C.border2};border-radius:2px;}
        button:focus,input:focus{outline:none;}
        .scene-split-image{ display:block; }
        @media (max-width: 760px) {
          .scene-split{ flex-direction:column; }
          .scene-split-image{
            position:absolute !important;
            inset:0 !important;
            width:100% !important;
            height:100% !important;
            min-height:0 !important;
            z-index:0;
          }
          .scene-split-image::after{
            content:"";
            position:absolute;
            inset:0;
            background:rgba(8,6,8,0.78);
          }
          .scene-content{
            position:relative !important;
            z-index:1;
          }
          .scene-inner{
            background:rgba(8,6,8,0.6);
            backdrop-filter:blur(8px);
            -webkit-backdrop-filter:blur(8px);
            border-radius:10px;
            padding:20px 18px;
            border:1px solid rgba(255,255,255,0.06);
          }
        }
      `}</style>

      <Grain/>
      {/* Atmosphere shifts as reader moves through the world */}
      <Atmosphere color={phase==="opening"?C.gold:atmosphereTint} x="55%" y="38%" r="700px" o={0.055}/>
      <Atmosphere color={C.gold} x="15%" y="82%" r="380px" o={0.022}/>

      {phase==="opening" && <Opening onEnter={()=>setPhase("scene")}/>}
      {phase==="scene"   && <Scene key={WORLDS[wIdx].id} world={WORLDS[wIdx]} idx={wIdx} total={WORLDS.length} onChoose={onChoose}/>}
      {phase==="result"  && <Result dominant={leading} scores={scores} onReplay={reset}/>}
    </div>
  );
}
