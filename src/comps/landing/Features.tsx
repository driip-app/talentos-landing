import { useState, useEffect, useRef } from "react";

const TOTAL = 7;

export default function Features() {
  const [activeIdx, setActiveIdx] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIdx(i => (i + 1) % TOTAL);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="features" id="features">
      <div className="features-inner">
        <div className="section-eyebrow mono" style={{ color: "#fff" }}>AGENT SUPERPOWERS</div>
        <h2 className="section-title syne">Your hiring OS that reads people,<br />{" "}books calendars, and writes emails.<br />{" "}You just approve.</h2>
        <p className="section-sub">Stop managing a process and start making actual hires.</p>
        <div className="features-carousel">
          <div
            className="pcar-track-wrap"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <div
              className="pcar-track"
              style={{ transform: `translateX(-${(activeIdx * 100) / TOTAL}%)` }}
            >
              <div className="feature-panel" id="p-screening">
                <div>
                  <div className="fp-agent-tag a1 mono">INTELLIGENT SCREENING</div>
                  <h3 className="fp-title syne">Surface your top 20 candidates from<br />{" "}a pile of 200.</h3>
                  <div className="fp-bullets">
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Required skills are considered technical must-haves, scored as present or absent in context</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Experience band is matched against your approved range, not an arbitrary number</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Scope signals — team size, industry, and problem type — surface candidates who&apos;ve operated at comparable scale</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Growth markers identify trajectory, not just tenure — year 3 of a steep curve outweighs year 8 of a flat one</span></div>
                  </div>
                </div>
                <div>
                  <div className="mc">
                    <div className="mc-hdr"><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-ttl">Senior React Engineer · 258 applicants</div></div>
                    <div className="mc-body">
                      <div style={{ display: "flex", gap: 5, marginBottom: 11 }}>
                        <div style={{ padding: "3px 8px", borderRadius: 3, fontSize: 9, fontFamily: "'Roboto Mono',monospace", background: "rgba(52,211,153,0.12)", color: "#34D399", border: "1px solid rgba(52,211,153,0.3)" }}>STRONG 3</div>
                        <div style={{ padding: "3px 8px", borderRadius: 3, fontSize: 9, fontFamily: "'Roboto Mono',monospace", background: "#17171b", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }}>MAYBE 2</div>
                        <div style={{ padding: "3px 8px", borderRadius: 3, fontSize: 9, fontFamily: "'Roboto Mono',monospace", background: "#17171b", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }}>PASS 2</div>
                      </div>
                      <div className="crow"><div className="sr s">94</div><div style={{ flex: 1 }}><div className="cname">Alex Chen</div><div className="crole">Staff Engineer · 8y exp</div></div><div className="ctag s">STRONG</div></div>
                      <div className="crow"><div className="sr s">88</div><div style={{ flex: 1 }}><div className="cname">Marcus Webb</div><div className="crole">Lead Frontend · 6y exp</div></div><div className="ctag s">STRONG</div></div>
                      <div className="crow"><div className="sr m">71</div><div style={{ flex: 1 }}><div className="cname">Ayla Torres</div><div className="crole">Senior Dev · 4y exp</div></div><div className="ctag m">MAYBE</div></div>
                      <div style={{ marginTop: 10, padding: "9px 11px", background: "rgba(159,115,230,0.05)", borderRadius: 7, border: "1px solid rgba(159,115,230,0.15)" }}>
                        <div style={{ fontSize: 11, fontFamily: "'Geom',sans-serif", fontWeight: 700, color: "var(--teal)", marginBottom: 2 }}>⏱ 38 hours returned</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>258 CVs scored · delivered by next morning</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-panel" id="p-bias">
                <div>
                  <div className="fp-agent-tag a1 mono">BIAS-FREE</div>
                  <h3 className="fp-title syne">We strip the bias fields<br />{" "}before scoring runs.</h3>
                  <div className="fp-bullets">
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Name, address, institution stripped at ingestion — not as an afterthought, but as architecture</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Candidates scored against your rubric independently, with no anchoring from other CVs</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Grounded in validity research and bias-interruption frameworks</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Your shortlist is legally defensible because every score is backed by criterion-level evidence</span></div>
                  </div>
                </div>
                <div>
                  <div className="mc">
                    <div className="mc-hdr"><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-ttl">Field processing · before scoring</div></div>
                    <div className="mc-body">
                      <div style={{ fontSize: 9, fontFamily: "'Roboto Mono',monospace", color: "rgba(255,255,255,0.4)", letterSpacing: ".06em", marginBottom: 9 }}>EXCLUDED FROM SCORING LAYER</div>
                      <div className="bfield x"><span>🚫</span><span className="bname x">Full Name</span><span className="bst x">STRIPPED</span></div>
                      <div className="bfield x"><span>🚫</span><span className="bname x">Home Address</span><span className="bst x">STRIPPED</span></div>
                      <div className="bfield x"><span>🚫</span><span className="bname x">University Name</span><span className="bst x">STRIPPED</span></div>
                      <div className="bfield x"><span>🚫</span><span className="bname x">Graduation Year</span><span className="bst x">STRIPPED</span></div>
                      <div className="bdiv">PASSES THROUGH</div>
                      <div className="bfield ok"><span>✅</span><span className="bname ok">Skills Evidence</span><span className="bst ok">SCORED</span></div>
                      <div className="bfield ok"><span>✅</span><span className="bname ok">Work History</span><span className="bst ok">SCORED</span></div>
                      <div className="bfield ok"><span>✅</span><span className="bname ok">Scope &amp; Trajectory</span><span className="bst ok">SCORED</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-panel" id="p-jd">
                <div>
                  <div className="fp-agent-tag a1 mono">SMART JD BUILDER</div>
                  <h3 className="fp-title syne">Have a job description ready<br />{" "}in less than a minute.</h3>
                  <div className="fp-bullets">
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Guided discovery across 9 dimensions: seniority, outcomes, skills, culture signals, compensation, and 4 more</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Generic phrases blocked — &quot;fast-paced environment&quot; will be kindly declined</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Review inline, edit by section, or regenerate fully</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>One-click posting to LinkedIn, Indeed, and your careers page</span></div>
                  </div>
                </div>
                <div>
                  <div className="mc">
                    <div className="mc-hdr"><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-ttl">Driip JD Builder</div></div>
                    <div className="mc-body" style={{ display: "flex", flexDirection: "column" }}>
                      <div className="cbubble"><div className="clbl mono">DRIIP</div><div className="cmsg a">What are the top 3 outcomes you need in the first 90 days?</div></div>
                      <div className="cbubble u"><div className="cmsg u">Own our component library, cut design handoff from 3 days to same-day, lead the mobile migration.</div></div>
                      <div className="cbubble"><div className="clbl mono">DRIIP · JD READY</div>
                        <div className="cmsg a" style={{ paddingBottom: 0 }}>Here&apos;s your job description →
                          <div className="jdprev">
                            <div className="jdprev-lbl mono">Senior React Engineer · Draft v1</div>
                            <div className="jdline" style={{ width: "90%" }}></div>
                            <div className="jdline" style={{ width: "74%" }}></div>
                            <div className="jdline" style={{ width: "82%" }}></div>
                            <div className="jdline" style={{ width: "60%" }}></div>
                            <div style={{ display: "flex", gap: 5, marginTop: 7 }}>
                              <div style={{ padding: "4px 9px", borderRadius: 4, fontSize: 9, fontFamily: "'Roboto Mono',monospace", background: "rgba(52,211,153,0.1)", color: "#34D399", cursor: "pointer", border: "1px solid rgba(52,211,153,0.25)" }}>✓ APPROVE</div>
                              <div style={{ padding: "4px 9px", borderRadius: 4, fontSize: 9, fontFamily: "'Roboto Mono',monospace", background: "#17171b", color: "rgba(255,255,255,0.4)", cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)" }}>EDIT</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-panel" id="p-ats">
                <div>
                  <div className="fp-agent-tag a1 mono">ATS INTEGRATION</div>
                  <h3 className="fp-title syne">Already on Greenhouse or Lever?<br />{" "}Connect in under 2 minutes.</h3>
                  <div className="fp-bullets">
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Greenhouse, Lever, Workable, Ashby, BambooHR, and others supported</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>OAuth connection in under 2 minutes with no IT ticket required</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>New applications sync automatically and are scored as they arrive</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Manual upload supported: PDF, DOCX, or plain text</span></div>
                  </div>
                </div>
                <div>
                  <div className="mc">
                    <div className="mc-hdr"><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-ttl">Connected ATS integrations</div></div>
                    <div className="mc-body">
                      <div className="ats-grid">
                        <div className="ats-item"><div className="ats-ico" style={{ background: "#24CA71", color: "#fff" }}>Gh</div><div><div className="ats-nm syne">Greenhouse</div><div className="ats-st" style={{ color: "#34D399" }}>● Connected</div></div></div>
                        <div className="ats-item"><div className="ats-ico" style={{ background: "#5B36AC", color: "#fff" }}>Lv</div><div><div className="ats-nm syne">Lever</div><div className="ats-st" style={{ color: "#34D399" }}>● Connected</div></div></div>
                        <div className="ats-item"><div className="ats-ico" style={{ background: "#0066FF", color: "#fff" }}>Wk</div><div><div className="ats-nm syne">Workable</div><div className="ats-st" style={{ color: "var(--dim)" }}>○ Connect</div></div></div>
                        <div className="ats-item"><div className="ats-ico" style={{ background: "#F65B37", color: "#fff" }}>As</div><div><div className="ats-nm syne">Ashby</div><div className="ats-st" style={{ color: "var(--dim)" }}>○ Connect</div></div></div>
                        <div className="ats-full"><div className="ats-ico" style={{ background: "#17171b", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)", fontSize: 16 }}>📁</div><div><div className="ats-nm syne">Manual upload</div><div className="ats-st" style={{ color: "rgba(255,255,255,0.4)" }}>PDF · DOCX · Plain text</div></div></div>
                      </div>
                      <div style={{ marginTop: 10, padding: "8px 11px", background: "#17171b", borderRadius: 7, fontSize: 10, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }}><span style={{ fontFamily: "'Roboto Mono',monospace", color: "var(--teal)" }}>↻</span> Synced 14 min ago · <strong style={{ color: "rgba(255,255,255,0.85)" }}>23 new applications</strong> scored</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-panel" id="p-transparency">
                <div>
                  <div className="fp-agent-tag a1 mono">SCORE TRANSPARENCY</div>
                  <h3 className="fp-title syne">Every score explained.<br />{" "}Override anything.<br />{" "}Log everything.</h3>
                  <div className="fp-bullets">
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Criterion-level evidence breakdown on every candidate card with a full evidence log</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Override any criterion in one click, add a reason, and the score recalculates</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Every override is logged with a timestamp, operator, and reason — full audit trail included</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Your shortlist is legally defensible — every decision is documented</span></div>
                  </div>
                </div>
                <div>
                  <div className="mc">
                    <div className="mc-hdr"><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-ttl">Alex Chen · Score breakdown</div></div>
                    <div className="mc-body">
                      <div className="srow"><div className="slbl"><span className="slbl-t">Required Skills</span><span className="slbl-v mono">4/5 met</span></div><div className="sbar"><div className="sbar-f" style={{ width: "80%" }}></div></div></div>
                      <div className="srow"><div className="slbl"><span className="slbl-t">Experience Band</span><span className="slbl-v mono">Within range</span></div><div className="sbar"><div className="sbar-f" style={{ width: "100%" }}></div></div></div>
                      <div className="srow"><div className="slbl"><span className="slbl-t">Scope Signals</span><span className="slbl-v mono">3/4 present</span></div><div className="sbar"><div className="sbar-f" style={{ width: "75%" }}></div></div></div>
                      <div className="srow"><div className="slbl"><span className="slbl-t">Growth Markers</span><span className="slbl-v mono">Strong</span></div><div className="sbar"><div className="sbar-f" style={{ width: "92%" }}></div></div></div>
                      <div className="stotal"><div><div className="stotal-lbl">Composite Score</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>Criterion-referenced</div></div><div className="stotal-val">94<span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/100</span></div></div>
                      <div style={{ display: "flex", gap: 6, marginTop: 9 }}>
                        <div style={{ padding: "5px 9px", borderRadius: 4, fontSize: 9, fontFamily: "'Roboto Mono',monospace", background: "rgba(52,211,153,0.1)", color: "#34D399", border: "1px solid rgba(52,211,153,0.25)", cursor: "pointer" }}>OVERRIDE CRITERION</div>
                        <div style={{ padding: "5px 9px", borderRadius: 4, fontSize: 9, fontFamily: "'Roboto Mono',monospace", background: "#17171b", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }}>VIEW AUDIT LOG</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-panel" id="p-scheduling">
                <div>
                  <div className="fp-agent-tag a2 mono">SMART SCHEDULING</div>
                  <h3 className="fp-title syne">11 email threads<br />{" "}to find a 45-minute slot?<br />{" "}Never again.</h3>
                  <div className="fp-bullets">
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Tell Driip who should join the interview panel, and it checks their calendars automatically</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Pulls availability from Google Calendar — no guesses, no invented slots</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Spots conflicts and puts the decision back on you — &quot;Marcus is blocked Thursday. Proceed without him, or wait?&quot; Your call</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Interview mode selection available for Zoom, Google Meet, Microsoft Teams, in-person, or phone. Meeting link auto-generated for Google Meet</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Full dispatch</span></div>
                  </div>
                </div>
                <div>
                  <div className="mc">
                    <div className="mc-hdr"><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-ttl mono">Interview Scheduler · Alex Chen</div></div>
                    <div className="mc-body">
                      <div className="wf-steps">
                        <div className="wf-step done">Panel ✓</div><div className="wf-arrow">›</div>
                        <div className="wf-step done">Availability ✓</div><div className="wf-arrow">›</div>
                        <div className="wf-step active">Mode</div><div className="wf-arrow">›</div>
                        <div className="wf-step next">Slots</div><div className="wf-arrow">›</div>
                        <div className="wf-step next">Dispatch</div>
                      </div>
                      <div style={{ fontSize: 9, fontFamily: "'Roboto Mono',monospace", color: "#CEB5F8", letterSpacing: ".06em", marginBottom: 7 }}>PANEL MEMBERS</div>
                      <div className="panel-member"><div className="pm-dot ok"></div><div style={{ flex: 1 }}><div className="pm-name">Marcus H.</div><div className="pm-role">Hiring Manager</div></div><div className="pm-avail mono">Mon Wed Fri</div></div>
                      <div className="panel-member"><div className="pm-dot ok"></div><div style={{ flex: 1 }}><div className="pm-name">Alex C.</div><div className="pm-role">Technical Lead</div></div><div className="pm-avail mono">Tue Wed Thu</div></div>
                      <div className="panel-member"><div className="pm-dot warn"></div><div style={{ flex: 1 }}><div className="pm-name">Sam W.</div><div className="pm-role">CTO</div></div><div className="pm-conflict mono">! Blocked Thu</div></div>
                      <div className="slots-section">
                        <div className="slots-label mono">2 MUTUAL WINDOWS FOUND</div>
                        <div className="slot-item sel"><div className="slot-day">Wed Jan 22 · 2:00pm</div><div className="slot-time mono">45 min · selected</div></div>
                        <div className="slot-item"><div className="slot-day">Fri Jan 24 · 10:00am</div><div className="slot-time mono">45 min</div></div>
                      </div>
                      <div className="mode-row"><div className="mode-ico">🎥</div><div className="mode-txt">Google Meet</div><div className="mode-gen mono">link auto-gen ✓</div></div>
                      <button className="sched-btn syne">SEND INVITE → Alex CHEN</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-panel" id="p-comms">
                <div>
                  <div className="fp-agent-tag a3 mono">SEAMLESS COMMUNICATION</div>
                  <h3 className="fp-title syne">Every candidate hears<br />{" "}from you, even when<br />{" "}you forget.</h3>
                  <div className="fp-bullets">
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Application receipts, interview confirmations, rejections, offers, status updates — all handled</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Personalized to each candidate — not a 2015 mail merge, not a template that reads like one</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Stale candidate detector nudges you if there&apos;s no contact for 7 days — your employer brand depends on it</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Rejection SLA: prompts you when a hiring decision sits for 72+ hours with no rejection sent to the candidate</span></div>
                    <div className="fp-bullet"><div className="fp-check t">✓</div><span>Bulk send with per-email copy, full audit log, and GDPR compliance built in</span></div>
                  </div>
                </div>
                <div>
                  <div className="mc">
                    <div className="mc-hdr"><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-dot"></div><div className="mc-ttl mono">Comms Bot · 4 Rejection Drafts Ready</div></div>
                    <div className="mc-body">
                      <div className="stale-warn">
                        <span style={{ fontSize: 13 }}>⚠️</span>
                        <span className="stale-warn-txt">Jordan Kim · 8 days without a status update</span>
                        <span className="stale-warn-cta">Send update →</span>
                      </div>
                      <div className="comms-type-bar">
                        <div className="ct-chip active-rej">REJECTION · 4</div>
                        <div className="ct-chip off">OFFER · 1</div>
                        <div className="ct-chip off">CONFIRM · 2</div>
                      </div>
                      <div className="email-draft">
                        <div className="email-hdr">
                          <div style={{ flex: 1 }}><div className="email-to">Jordan Kim</div><div className="email-subj">Re: Senior React Engineer Application</div></div>
                          <div className="email-toggle">▲</div>
                        </div>
                        <div className="email-body">
                          <div className="email-body-txt">&quot;Hi Jordan, thank you for taking the time to share your background with us. We were genuinely impressed by your work on distributed systems…&quot;</div>
                          <button className="copy-btn mono">COPY EMAIL</button>
                        </div>
                      </div>
                      <div className="email-draft">
                        <div className="email-hdr">
                          <div style={{ flex: 1 }}><div className="email-to">Marcus Webb</div><div className="email-subj">Re: Your Application - Senior React Engineer</div></div>
                          <div className="email-toggle">▼</div>
                        </div>
                      </div>
                      <div className="email-draft">
                        <div className="email-hdr">
                          <div style={{ flex: 1 }}><div className="email-to">Ayla Torres</div><div className="email-subj">Re: Application Update</div></div>
                          <div className="email-toggle">▼</div>
                        </div>
                      </div>
                      <button className="send-all-btn syne">SEND ALL 4 EMAILS</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pcar-dots">
            {["Smart Screening", "Bias-Free", "JD Builder", "ATS Connect", "Transparency", "Scheduling", "Comms Bot"].map((label, i) => (
              <button
                key={i}
                className={`pcar-dot${activeIdx === i ? " active" : ""}`}
                aria-label={label}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
