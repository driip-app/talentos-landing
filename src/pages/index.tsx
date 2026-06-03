import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import TalentOSWaitlist from "@/comps/TalentOSWaitlist";

const Threads = dynamic(() => import("@/comps/Threads"), { ssr: false });

const MagicRings = dynamic(() => import("@/comps/Global/MagicRings/MagicRings"), {
  ssr: false,
});

const STATIC_HTML = `
<section class="video-section">
  <div class="video-section-inner"></div>
</section>

<div class="offer-strip" id="offer">
  <div>
    <div class="offer-strip-text syne">Driip can recover up to 51 hours per hire.</div>
  </div>
  <a href="#" class="offer-strip-btn syne">Find Out How</a>
</div>

<section class="platform" id="platform">
  <div class="platform-inner">
    <div class="platform-eyebrow mono">MEET THE AGENTS</div>
    <h2 class="platform-title syne">3 agents. One OS.<br><em>Zero dropped tasks.</em></h2>
    <p class="platform-sub">Driip agents return 51+ hours of everything else you've been putting off</p>
    <div class="platform-grid">
      <div class="agent-card a1">
        <div class="agent-num mono">Agent Scout</div>
        <div class="agent-name syne">Talent Acquisition Specialist</div>
        <div class="agent-desc">Delivers a ranked shortlist by the next morning, built on a 4-dimensional SCS framework. No more resumes sitting unread for 2 weeks. </div>
        <div class="agent-saving"><span class="saving-icon">⏱</span><span class="saving-text mono">38–40 HRS SAVED / POSTING</span></div>
      </div>
      <div class="agent-card a2">
        <div class="agent-num mono">Agent Sync</div>
        <div class="agent-name syne">Schedule Coordinator</div>
        <div class="agent-desc">Identifies the panel, checks their calendar, resolves conflicts, confirms the interview mode, and sends the invitation.</div>
        <div class="agent-saving"><span class="saving-icon">⏱</span><span class="saving-text mono">5–10 HRS SAVED / HIRE</span></div>
      </div>
      <div class="agent-card a3">
        <div class="agent-num mono">Agent Pulse</div>
        <div class="agent-name syne">Talent Relations Manager</div>
        <div class="agent-desc">No more ghosting candidates. Every applicant receives an automatic status email at each stage within 72 hours.</div>
        <div class="agent-saving"><span class="saving-icon">⏱</span><span class="saving-text mono">8–12 HRS SAVED / HIRE</span></div>
      </div>
    </div>
  </div>
</section>

<section class="features" id="features">
  <div class="features-inner">
    <div class="section-eyebrow mono" style="color:#fff">AGENT SUPERPOWERS</div>
    <h2 class="section-title syne">Your hiring OS that reads people,<br>books calendars, and writes emails.<br>You just approve.</h2>
    <p class="section-sub">Stop managing a process and start making actual hires.</p>

    <div class="features-carousel">
      <div class="pcar-track-wrap">
        <div class="pcar-track" data-idx="0">

    <div class="feature-panel" id="p-screening">
      <div>
        <div class="fp-agent-tag a1 mono">INTELLIGENT SCREENING</div>
        <h3 class="fp-title syne">Surface 20 top talent from<br>a pile of 200.</h3>
        <p class="fp-desc">Driip uses the 4-dimensional Structured Competency Scoring (SCS) framework to evaluate every candidate against a rubric you approved before a single CV is processed.</p>
        <div class="fp-bullets">
          <div class="fp-bullet"><div class="fp-check t">✓</div><span><strong>Required Skills:</strong> Technical must-haves, scored as present or absent in context</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span><strong>Experience Band:</strong> Matched against your approved range, not an arbitrary number</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span><strong>Scope Signals:</strong> Team size, industry, problem type: evidence they've been in the room</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span><strong>Growth Markers:</strong> Trajectory, not just tenure, where year 3 of a steep curve beats year 8 of a flat one</span></div>
        </div>
      </div>
      <div>
        <div class="mc">
          <div class="mc-hdr"><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-ttl">Senior React Engineer · 258 applicants</div></div>
          <div class="mc-body">
            <div style="display:flex;gap:5px;margin-bottom:11px">
              <div style="padding:3px 8px;border-radius:3px;font-size:9px;font-family:'Roboto Mono',monospace;background:rgba(52,211,153,0.12);color:#34D399;border:1px solid rgba(52,211,153,0.3)">STRONG 3</div>
              <div style="padding:3px 8px;border-radius:3px;font-size:9px;font-family:'Roboto Mono',monospace;background:#17171b;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.07)">MAYBE 2</div>
              <div style="padding:3px 8px;border-radius:3px;font-size:9px;font-family:'Roboto Mono',monospace;background:#17171b;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.07)">PASS 2</div>
            </div>
            <div class="crow"><div class="sr s">94</div><div style="flex:1"><div class="cname">Alex Chen</div><div class="crole">Staff Engineer · 8y exp</div></div><div class="ctag s">STRONG</div></div>
            <div class="crow"><div class="sr s">88</div><div style="flex:1"><div class="cname">Marcus Webb</div><div class="crole">Lead Frontend · 6y exp</div></div><div class="ctag s">STRONG</div></div>
            <div class="crow"><div class="sr m">71</div><div style="flex:1"><div class="cname">Ayla Torres</div><div class="crole">Senior Dev · 4y exp</div></div><div class="ctag m">MAYBE</div></div>
            <div style="margin-top:10px;padding:9px 11px;background:rgba(159,115,230,0.05);border-radius:7px;border:1px solid rgba(159,115,230,0.15);">
              <div style="font-size:11px;font-family:'Geom',sans-serif;font-weight:700;color:var(--teal);margin-bottom:2px">⏱ 38 hours returned</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.5)">258 CVs scored · delivered by next morning</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-panel" id="p-bias">
      <div>
        <div class="fp-agent-tag a1 mono">BIAS-FREE</div>
        <h3 class="fp-title syne">We strip the bias fields<br>before scoring runs.</h3>
        <p class="fp-desc">Driip structurally excludes name, address, graduation year, and institution from the scoring context before the first criterion is evaluated. The score cannot see what was never given.</p>
        <div class="fp-bullets">
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Name, address, institution stripped at ingestion; not as a guardrail but a structure</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Candidates scored against your rubric independently, with no anchoring from other CVs</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Designed on validity research and bias-interruption framework</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Shortlist is legally defensible as every score is backed by criterion-level evidence</span></div>
        </div>
      </div>
      <div>
        <div class="mc">
          <div class="mc-hdr"><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-ttl">Field processing · before scoring</div></div>
          <div class="mc-body">
            <div style="font-size:9px;font-family:'Roboto Mono',monospace;color:rgba(255,255,255,0.4);letter-spacing:.06em;margin-bottom:9px">EXCLUDED FROM SCORING LAYER</div>
            <div class="bfield x"><span>🚫</span><span class="bname x">Full Name</span><span class="bst x">STRIPPED</span></div>
            <div class="bfield x"><span>🚫</span><span class="bname x">Home Address</span><span class="bst x">STRIPPED</span></div>
            <div class="bfield x"><span>🚫</span><span class="bname x">University Name</span><span class="bst x">STRIPPED</span></div>
            <div class="bfield x"><span>🚫</span><span class="bname x">Graduation Year</span><span class="bst x">STRIPPED</span></div>
            <div class="bdiv">PASSES THROUGH</div>
            <div class="bfield ok"><span>✅</span><span class="bname ok">Skills Evidence</span><span class="bst ok">SCORED</span></div>
            <div class="bfield ok"><span>✅</span><span class="bname ok">Work History</span><span class="bst ok">SCORED</span></div>
            <div class="bfield ok"><span>✅</span><span class="bname ok">Scope & Trajectory</span><span class="bst ok">SCORED</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-panel" id="p-jd">
      <div>
        <div class="fp-agent-tag a1 mono">SMART JD BUILDER</div>
        <h3 class="fp-title syne">Have a job description ready<br>in less than a minute.</h3>
        <p class="fp-desc">Driip understands the actual role and writes a JD that attracts the people you want, not the people who are good at filling in job applications.</p>
        <div class="fp-bullets">
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Guided discovery across 9 dimensions: seniority, outcomes, skills, culture signals, compensation</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Generic phrases blocked — "fast-paced environment" will be kindly declined</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Review inline, edit by section, or regenerate fully</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>One-click posting to LinkedIn, Indeed, and your careers page</span></div>
        </div>
      </div>
      <div>
        <div class="mc">
          <div class="mc-hdr"><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-ttl">Driip JD Builder</div></div>
          <div class="mc-body" style="display:flex;flex-direction:column">
            <div class="cbubble"><div class="clbl mono">DRIIP</div><div class="cmsg a">What are the top 3 outcomes you need in the first 90 days?</div></div>
            <div class="cbubble u"><div class="cmsg u">Own our component library, cut design handoff from 3 days to same-day, lead the mobile migration.</div></div>
            <div class="cbubble"><div class="clbl mono">DRIIP · JD READY</div>
              <div class="cmsg a" style="padding-bottom:0">Here's your job description →
                <div class="jdprev">
                  <div class="jdprev-lbl mono">Senior React Engineer · Draft v1</div>
                  <div class="jdline" style="width:90%"></div>
                  <div class="jdline" style="width:74%"></div>
                  <div class="jdline" style="width:82%"></div>
                  <div class="jdline" style="width:60%"></div>
                  <div style="display:flex;gap:5px;margin-top:7px">
                    <div style="padding:4px 9px;border-radius:4px;font-size:9px;font-family:'Roboto Mono',monospace;background:rgba(52,211,153,0.1);color:#34D399;cursor:pointer;border:1px solid rgba(52,211,153,0.25)">✓ APPROVE</div>
                    <div style="padding:4px 9px;border-radius:4px;font-size:9px;font-family:'Roboto Mono',monospace;background:#17171b;color:rgba(255,255,255,0.4);cursor:pointer;border:1px solid rgba(255,255,255,0.07)">EDIT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-panel" id="p-ats">
      <div>
        <div class="fp-agent-tag a1 mono">ATS INTEGRATION</div>
        <h3 class="fp-title syne">Already using Greenhouse<br>or Lever? Connect them.</h3>
        <p class="fp-desc">Driip connects to your existing ATS, pulls your applications, scores them against your locked rubric, and returns a shortlist. Your ATS stays. It just gets a brain upgrade.</p>
        <div class="fp-bullets">
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Greenhouse, Lever, Workable, Ashby, BambooHR supported</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>OAuth connection in under 2 minutes with no IT ticket required</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Incremental syncs with new applications are scored automatically as they arrive</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Manual upload also supported — PDF, .docx, or plain text</span></div>
        </div>
      </div>
      <div>
        <div class="mc">
          <div class="mc-hdr"><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-ttl">Connected ATS integrations</div></div>
          <div class="mc-body">
            <div class="ats-grid">
              <div class="ats-item"><div class="ats-ico" style="background:#24CA71;color:#fff">Gh</div><div><div class="ats-nm syne">Greenhouse</div><div class="ats-st" style="color:#34D399">● Connected</div></div></div>
              <div class="ats-item"><div class="ats-ico" style="background:#5B36AC;color:#fff">Lv</div><div><div class="ats-nm syne">Lever</div><div class="ats-st" style="color:#34D399">● Connected</div></div></div>
              <div class="ats-item"><div class="ats-ico" style="background:#0066FF;color:#fff">Wk</div><div><div class="ats-nm syne">Workable</div><div class="ats-st" style="color:var(--dim)">○ Connect</div></div></div>
              <div class="ats-item"><div class="ats-ico" style="background:#F65B37;color:#fff">As</div><div><div class="ats-nm syne">Ashby</div><div class="ats-st" style="color:var(--dim)">○ Connect</div></div></div>
              <div class="ats-full"><div class="ats-ico" style="background:#17171b;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.07);font-size:16px">📁</div><div><div class="ats-nm syne">Manual upload</div><div class="ats-st" style="color:rgba(255,255,255,0.4)">PDF · DOCX · Plain text</div></div></div>
            </div>
            <div style="margin-top:10px;padding:8px 11px;background:#17171b;border-radius:7px;font-size:10px;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.07)"><span style="font-family:'Roboto Mono',monospace;color:var(--teal)">↻</span> Synced 14 min ago · <strong style="color:rgba(255,255,255,0.85)">23 new applications</strong> scored</div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-panel" id="p-transparency">
      <div>
        <div class="fp-agent-tag a1 mono">SCORE TRANSPARENCY</div>
        <h3 class="fp-title syne">Every score explained.<br>Override anything.<br>Log everything.</h3>
        <p class="fp-desc">Every candidate's score comes with a criterion-level breakdown showing exactly what evidence was found and what was absent.</p>
        <div class="fp-bullets">
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Criterion-level evidence breakdown on every candidate card with a full evidence log</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Override any criterion in one click, add a reason, and the score recalculates</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Audit trail for every override logged with timestamp, operator, and reason</span></div>
          <div class="fp-bullet"><div class="fp-check t">✓</div><span>Legally defensible, as your shortlist comes with documentation if you ever need it</span></div>
        </div>
      </div>
      <div>
        <div class="mc">
          <div class="mc-hdr"><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-ttl">Alex Chen · Score breakdown</div></div>
          <div class="mc-body">
            <div class="srow"><div class="slbl"><span class="slbl-t">Required Skills</span><span class="slbl-v mono">4/5 met</span></div><div class="sbar"><div class="sbar-f" style="width:80%"></div></div></div>
            <div class="srow"><div class="slbl"><span class="slbl-t">Experience Band</span><span class="slbl-v mono">Within range</span></div><div class="sbar"><div class="sbar-f" style="width:100%"></div></div></div>
            <div class="srow"><div class="slbl"><span class="slbl-t">Scope Signals</span><span class="slbl-v mono">3/4 present</span></div><div class="sbar"><div class="sbar-f" style="width:75%"></div></div></div>
            <div class="srow"><div class="slbl"><span class="slbl-t">Growth Markers</span><span class="slbl-v mono">Strong</span></div><div class="sbar"><div class="sbar-f" style="width:92%"></div></div></div>
            <div class="stotal"><div><div class="stotal-lbl">Composite Score</div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:1px">Criterion-referenced</div></div><div class="stotal-val">94<span style="font-size:14px;color:rgba(255,255,255,0.4)">/100</span></div></div>
            <div style="display:flex;gap:6px;margin-top:9px">
              <div style="padding:5px 9px;border-radius:4px;font-size:9px;font-family:'Roboto Mono',monospace;background:rgba(52,211,153,0.1);color:#34D399;border:1px solid rgba(52,211,153,0.25);cursor:pointer">OVERRIDE CRITERION</div>
              <div style="padding:5px 9px;border-radius:4px;font-size:9px;font-family:'Roboto Mono',monospace;background:#17171b;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.07);cursor:pointer">VIEW AUDIT LOG</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-panel" id="p-scheduling">
      <div>
        <div class="fp-agent-tag a2 mono">SMART SCHEDULING</div>
        <h3 class="fp-title syne">11 email threads<br>to find a 45-minute slot?<br>Never again.</h3>
        <p class="fp-desc">Agent Sync identifies your panel, checks everyone's real calendar availability, surfaces any conflicts for you to resolve, confirms the interview mode, and sends the invite all before you finish your coffee.</p>
        <div class="fp-bullets">
          <div class="fp-bullet"><div class="fp-check v">✓</div><span><strong>Panel identification:</strong> Tell Driip who should join, and it checks their calendars automatically</span></div>
          <div class="fp-bullet"><div class="fp-check v">✓</div><span><strong>Real availability:</strong> Pulls from Google Calendar, no guesses, no invented slots</span></div>
          <div class="fp-bullet"><div class="fp-check v">✓</div><span><strong>Conflict surfacing:</strong> "Marcus is blocked on Thursday. Proceed without him, or wait?" You decide</span></div>
          <div class="fp-bullet"><div class="fp-check v">✓</div><span><strong>Mode confirmation:</strong> Zoom, Google Meet, Teams, in-person, or phone — link auto-generated for Meet</span></div>
          <div class="fp-bullet"><div class="fp-check v">✓</div><span><strong>Full dispatch:</strong> Calendar event for panel, confirmation email for candidate in one click</span></div>
        </div>
      </div>
      <div>
        <div class="mc">
          <div class="mc-hdr"><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-ttl mono">Interview Scheduler · Alex Chen</div></div>
          <div class="mc-body">
            <div class="wf-steps">
              <div class="wf-step done">Panel ✓</div><div class="wf-arrow">›</div>
              <div class="wf-step done">Availability ✓</div><div class="wf-arrow">›</div>
              <div class="wf-step active">Mode</div><div class="wf-arrow">›</div>
              <div class="wf-step next">Slots</div><div class="wf-arrow">›</div>
              <div class="wf-step next">Dispatch</div>
            </div>
            <div style="font-size:9px;font-family:'Roboto Mono',monospace;color:#CEB5F8;letter-spacing:.06em;margin-bottom:7px">PANEL MEMBERS</div>
            <div class="panel-member"><div class="pm-dot ok"></div><div style="flex:1"><div class="pm-name">Marcus H.</div><div class="pm-role">Hiring Manager</div></div><div class="pm-avail mono">Mon Wed Fri</div></div>
            <div class="panel-member"><div class="pm-dot ok"></div><div style="flex:1"><div class="pm-name">Alex C.</div><div class="pm-role">Technical Lead</div></div><div class="pm-avail mono">Tue Wed Thu</div></div>
            <div class="panel-member"><div class="pm-dot warn"></div><div style="flex:1"><div class="pm-name">Sam W.</div><div class="pm-role">CTO</div></div><div class="pm-conflict mono">! Blocked Thu</div></div>
            <div class="slots-section">
              <div class="slots-label mono">2 MUTUAL WINDOWS FOUND</div>
              <div class="slot-item sel"><div class="slot-day">Wed Jan 22 · 2:00pm</div><div class="slot-time mono">45 min · selected</div></div>
              <div class="slot-item"><div class="slot-day">Fri Jan 24 · 10:00am</div><div class="slot-time mono">45 min</div></div>
            </div>
            <div class="mode-row"><div class="mode-ico">🎥</div><div class="mode-txt">Google Meet</div><div class="mode-gen mono">link auto-gen ✓</div></div>
            <button class="sched-btn syne">SEND INVITE → Alex CHEN</button>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-panel" id="p-comms">
      <div>
        <div class="fp-agent-tag a3 mono">SEAMLESS COMMUNICATION</div>
        <h3 class="fp-title syne">Every candidate hears<br>from you, even when<br>you forget.</h3>
        <p class="fp-desc">Driip automatically keeps your entire candidate pipeline in the loop. Status updates, rejections, confirmations, offer letters - all personalized, all on time, none of them written by you at 11 pm.</p>
        <div class="fp-bullets">
          <div class="fp-bullet"><div class="fp-check c">✓</div><span>Thanks for applying, interview confirmation, rejection, offer, status update - all handled</span></div>
          <div class="fp-bullet"><div class="fp-check c">✓</div><span>Personalized to each candidate and not a mail merge from 2015, nor a template you can tell is a template</span></div>
          <div class="fp-bullet"><div class="fp-check c">✓</div><span>Stale candidate detector nudges you if there is no contact for 7 days - your employer brand is watching</span></div>
          <div class="fp-bullet"><div class="fp-check c">✓</div><span>Rejection SLA prompts you if 72+ hours pass after a decision with no rejection sent</span></div>
          <div class="fp-bullet"><div class="fp-check c">✓</div><span>Bulk send with confirmation, copy-per-email, full audit log, GDPR compliant</span></div>
        </div>
      </div>
      <div>
        <div class="mc">
          <div class="mc-hdr"><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-ttl mono">Comms Bot · 4 Rejection Drafts Ready</div></div>
          <div class="mc-body">
            <div class="stale-warn">
              <span style="font-size:13px">⚠️</span>
              <span class="stale-warn-txt">Jordan Kim · 8 days without a status update</span>
              <span class="stale-warn-cta">Send update →</span>
            </div>
            <div class="comms-type-bar">
              <div class="ct-chip active-rej">REJECTION · 4</div>
              <div class="ct-chip off">OFFER · 1</div>
              <div class="ct-chip off">CONFIRM · 2</div>
            </div>
            <div class="email-draft">
              <div class="email-hdr">
                <div style="flex:1"><div class="email-to">Jordan Kim</div><div class="email-subj">Re: Senior React Engineer Application</div></div>
                <div class="email-toggle">▲</div>
              </div>
              <div class="email-body">
                <div class="email-body-txt">"Hi Jordan, thank you for taking the time to share your background with us. We were genuinely impressed by your work on distributed systems…"</div>
                <button class="copy-btn mono">COPY EMAIL</button>
              </div>
            </div>
            <div class="email-draft">
              <div class="email-hdr">
                <div style="flex:1"><div class="email-to">Marcus Webb</div><div class="email-subj">Re: Your Application - Senior React Engineer</div></div>
                <div class="email-toggle">▼</div>
              </div>
            </div>
            <div class="email-draft">
              <div class="email-hdr">
                <div style="flex:1"><div class="email-to">Ayla Torres</div><div class="email-subj">Re: Application Update</div></div>
                <div class="email-toggle">▼</div>
              </div>
            </div>
            <button class="send-all-btn syne">SEND ALL 4 EMAILS</button>
          </div>
        </div>
      </div>
    </div>

        </div>
      </div>
      <div class="pcar-dots">
        <button class="pcar-dot active" data-idx="0" aria-label="Smart Screening"></button>
        <button class="pcar-dot" data-idx="1" aria-label="Bias-Free"></button>
        <button class="pcar-dot" data-idx="2" aria-label="JD Builder"></button>
        <button class="pcar-dot" data-idx="3" aria-label="ATS Connect"></button>
        <button class="pcar-dot" data-idx="4" aria-label="Transparency"></button>
        <button class="pcar-dot" data-idx="5" aria-label="Scheduling"></button>
        <button class="pcar-dot" data-idx="6" aria-label="Comms Bot"></button>
      </div>
    </div>
  </div>
</section>

<section class="personas" id="personas">
  <div class="personas-inner">
    <div class="section-eyebrow mono" style="color:var(--teal)">FIND YOUR AGENT</div>
    <h2 class="section-title syne">Driip works <em style="font-style:normal;color:#9F73E6">differently</em><br>for everyone.</h2>
    <p class="section-sub">Which means everyone stops doing the part they hate. The whole hiring cycle moves faster. And nobody goes home at 7 pm with 171 unread resumes.</p>
    <div class="personas-carousel">
      <div class="pcar-track-wrap">
<div class="pcar-track" data-idx="0">
          <div class="pc" id="pc-founders">
            <div class="pc-tag t mono">FOR FOUNDERS</div>
            <h3 class="pc-title syne">You're hiring and building and<br>fundraising and keeping the <em style="font-style:normal;color:#9F73E6">lights on</em>.</h3>
            <p class="pc-desc">You posted a role. You have 180 applications, 3 investor meetings, a product sprint, and a board update. The good news: Driip has already read all 180, scheduled interviews for the top 4, and sent rejections to the rest. The bad news: there isn't any.</p>
            <div class="pc-pts">
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Shortlist of 20 delivered within 24 hours of role creation</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Write your JD in less than a minute, guided discovery with no generic copy-paste</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Interviews auto-scheduled, candidates auto-updated - you just show up</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>100% shortlist trust rate in early testing because the output quality earns it</span></div>
            </div>
          </div>
          <div class="pc" id="pc-managers">
            <div class="pc-tag t mono">FOR HIRING MANAGERS</div>
            <h3 class="pc-title syne">Get a shortlist you can<br><em style="font-style:normal;color:#9F73E6">explain,</em> not just defend.</h3>
            <p class="pc-desc">You're not just reviewing candidates. You're going to have to justify this shortlist to your VP, your founder, and eventually yourself at 11 pm. Every Driip score comes with a criterion-level breakdown, so you're sharing evidence, not hunches.</p>
            <div class="pc-pts">
              <div class="pc-pt"><div class="pc-chk">✓</div><span>You approved the rubric before the scoring run, where the shortlist is already yours to own</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Override any criterion with one click, add a reason, audit trail stays clean</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Interviews scheduled against your real calendar with zero availability ping-pong</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Every candidate receives a professional update at every stage</span></div>
            </div>
          </div>
          <div class="pc" id="pc-ta">
            <div class="pc-tag t mono">FOR TA TEAMS</div>
            <h3 class="pc-title syne">Start spending<br>Monday <em style="font-style:normal;color:#9F73E6">recruiting</em>,<br>not screening.</h3>
            <p class="pc-desc">The best part of your job isn't reading CVs, chasing calendar slots, or writing the same rejection for the fourteenth time this week. Driip eliminates all three, so you can spend your time on the part that actually requires a human.</p>
            <div class="pc-pts">
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Pulls from your ATS: Greenhouse, Lever, Workable, Ashby - scores everything automatically</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Incremental sync: New applications scored as they arrive, no batch required</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>Interview scheduling: Handled end-to-end, you review the invite, not build it</span></div>
              <div class="pc-pt"><div class="pc-chk">✓</div><span>51+ hours per hire returned to you so that you can focus on achieving greater productivity</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pcar-dots">
        <button class="pcar-dot active" data-idx="0" aria-label="Slide 1"></button>
        <button class="pcar-dot" data-idx="1" aria-label="Slide 2"></button>
        <button class="pcar-dot" data-idx="2" aria-label="Slide 3"></button>
      </div>
    </div>
  </div>
</section>

<section class="signup" id="demo">
  <div class="signup-inner">
    <div class="signup-eyebrow mono">GET EARLY ACCESS</div>
    <h2 class="signup-title syne">Your next great hire is<br>in that pile <em>right now.</em></h2>
    <p class="signup-sub">Join our waitlist. No enterprise pricing drama.</p>
    <div class="signup-form" id="form-wrap">
      <form id="driip-form">
        <div class="form-row full">
          <div class="form-group"><label class="form-label mono">EMAIL</label><input class="form-input" type="email" name="email" placeholder="drax@youremail.com" required /></div>
        </div>
        <div class="form-row full">
          <div class="form-group"><label class="form-label mono">WHAT'S YOUR BIGGEST HIRING HEADACHE?</label>
            <select class="form-select" name="headache" required>
              <option value="" disabled selected>Be honest. We've heard it all.</option>
              <option>I have 200 CVs and no time to read them</option>
              <option>Every interview takes 11 emails to schedule</option>
              <option>Candidates are going dark — nobody's following up</option>
              <option>I don't even have a job description yet</option>
              <option>All of the above. It's a full disaster</option>
            </select>
          </div>
        </div>
        <button type="submit" class="form-submit syne" style="width:100%;margin-top:20px;padding:14px;border-radius:9px;background:#9F73E6;border:none;color:#0E0E10;font-size:14px;font-family:'Geom',sans-serif;font-weight:800;letter-spacing:.02em;cursor:pointer;">Request Early Access Pass</button>
      </form>
      <div class="form-success" id="form-success" style="display:none;text-align:center;padding:44px 20px;">
        <div class="form-success-icon">🎉</div>
        <div class="form-success-title syne">You're on the list.</div>
        <p class="form-success-sub" style="color:rgba(255,255,255,0.45)">We'll be in touch within one business day. In the meantime, that pile of CVs isn't getting any smaller — but it's about to.</p>
      </div>
    </div>
  </div>
</section>
`;

function SignupThreads({ staticRef }: { staticRef: React.RefObject<HTMLDivElement> }) {
  const threadsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const signup = staticRef.current?.querySelector<HTMLElement>(".signup");
    const el = threadsRef.current;
    if (!signup || !el) return;
    signup.insertBefore(el, signup.firstChild);
  }, [staticRef]);

  return (
    <div ref={threadsRef} style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
      <Threads color={[0.62, 0.45, 0.90]} amplitude={1.4} distance={0} enableMouseInteraction={true} />
    </div>
  );
}

export default function TalentOSPage() {
  const staticRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const root = staticRef.current;
    if (!root) return;

    const goToSlide = (container: HTMLElement, idx: number) => {
      const track = container.querySelector<HTMLElement>(".pcar-track");
      if (!track) return;
      const total = container.querySelectorAll(".pcar-dot").length;
      track.dataset.idx = String(idx);
      track.style.transform = `translateX(-${(idx * 100) / total}%)`;
      container.querySelectorAll(".pcar-dot").forEach((d, i) =>
        d.classList.toggle("active", i === idx)
      );
    };

    const setupAutoplay = (container: HTMLElement) => {
      const total = container.querySelectorAll(".pcar-dot").length;
      let timer: ReturnType<typeof setInterval>;
      const start = () => {
        timer = setInterval(() => {
          const track = container.querySelector<HTMLElement>(".pcar-track");
          if (!track) return;
          goToSlide(container, (Number(track.dataset.idx) + 1) % total);
        }, 4000);
      };
      const stop = () => clearInterval(timer);
      const wrap = container.querySelector<HTMLElement>(".pcar-track-wrap");
      wrap?.addEventListener("mouseenter", stop);
      wrap?.addEventListener("mouseleave", start);
      start();
      return () => {
        stop();
        wrap?.removeEventListener("mouseenter", stop);
        wrap?.removeEventListener("mouseleave", start);
      };
    };

    const cleanupFeatures = setupAutoplay(root.querySelector<HTMLElement>(".features-carousel")!);
    const cleanupPersonas = setupAutoplay(root.querySelector<HTMLElement>(".personas-carousel")!);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const dot = target.closest<HTMLElement>(".pcar-dot[data-idx]");
      if (dot) {
        const container = dot.closest<HTMLElement>(".features-carousel, .personas-carousel");
        if (container) goToSlide(container, Number(dot.dataset.idx));
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (form?.id !== "driip-form") return;
      e.preventDefault();
      const btn = form.querySelector<HTMLButtonElement>("button[type=submit]");
      if (btn) btn.disabled = true;
      fetch("https://formspree.io/f/xredlbnb", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(res => {
          if (res.ok) {
            setFormSubmitted(true);
          } else {
            if (btn) btn.disabled = false;
          }
        })
        .catch(() => {
          if (btn) btn.disabled = false;
        });
    };

    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit as EventListener);
    return () => {
      cleanupFeatures();
      cleanupPersonas();
      root.removeEventListener("click", onClick);
      root.removeEventListener("submit", onSubmit as EventListener);
    };
  }, []);

  useEffect(() => {
    const root = staticRef.current;
    if (!root) return;
    const btn = root.querySelector<HTMLElement>(".offer-strip-btn");
    if (!btn) return;
    const handleClick = (e: Event) => { e.preventDefault(); setShowWaitlist(true); };
    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const root = staticRef.current;
    if (!root) return;

    const grid = root.querySelector<HTMLElement>(".platform-grid");
    const mockups = root.querySelectorAll<HTMLElement>(".feature-panel > div:last-child");
    const panels = root.querySelectorAll<HTMLElement>(".feature-panel");

    const apply = () => {
      const mobile = window.innerWidth <= 960;
      if (grid) {
        grid.style.display = mobile ? "flex" : "";
        grid.style.flexDirection = mobile ? "column" : "";
      }
      mockups.forEach(el => {
        el.style.display = mobile ? "none" : "";
      });
      panels.forEach(el => {
        el.style.gridTemplateColumns = mobile ? "1fr" : "";
        el.style.gap = mobile ? "0" : "";
        el.style.padding = mobile ? "28px 20px" : "";
      });
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    const root = staticRef.current;
    if (!root) return;
    const form = root.querySelector<HTMLElement>("#driip-form");
    const success = root.querySelector<HTMLElement>("#form-success");
    if (form && success) {
      form.style.display = formSubmitted ? "none" : "";
      success.style.display = formSubmitted ? "block" : "none";
    }
  }, [formSubmitted]);

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

      <nav style={isMobile ? { justifyContent: "center", position: "relative" } : undefined}>
        <a href="#top" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-beta-v2.png" alt="Driip" />
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
          <a href="#demo" className="nav-cta syne">Join the Waitlist</a>
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
            style={{
              margin: "8px 20px 0",
              padding: "12px 20px",
              background: "#9F73E6",
              color: "#0E0E10",
              borderRadius: 7,
              fontWeight: 700,
              fontFamily: "'Geom', sans-serif",
              textAlign: "center",
              display: "block",
            }}
          >
            Join the Waitlist
          </a>
        </div>
      )}

      <section className="hero" id="top">
        <div className="hero-rings">
          <MagicRings
            color="#9F73E6"
            colorTwo="#6342AC"
            ringCount={6}
            speed={1}
            attenuation={10}
            lineThickness={2}
            baseRadius={0.35}
            radiusStep={0.1}
            scaleRate={0.1}
            opacity={1}
            noiseAmount={0.08}
            ringGap={1.5}
            fadeIn={0.7}
            fadeOut={0.5}
            followMouse
            mouseInfluence={0.15}
            hoverScale={1.15}
            parallax={0.04}
            clickBurst
          />
        </div>
        <div className="hero-inner">
          <h1 className="syne">
            Focus on building the team<br/>
            <em>that shapes your company&apos;s future.</em>
          </h1>
          <p className="hero-sub">
            Your agents handle every candidate touchpoint, so your team moves at the speed you need
          </p>
          <div className="hero-stats">
            <div>
              <div className="stat-num syne">51<span>h+</span></div>
              <div className="stat-label mono">SAVED / HIRE</div>
            </div>
            <div>
              <div className="stat-num syne">100<span>%</span></div>
              <div className="stat-label mono">SHORTLIST TRUST</div>
            </div>
            <div>
              <div className="stat-num syne">&lt;24<span>h</span></div>
              <div className="stat-label mono">TO SHORTLIST</div>
            </div>
          </div>
        </div>
      </section>

      <SignupThreads staticRef={staticRef} />
      <div ref={staticRef} dangerouslySetInnerHTML={{ __html: STATIC_HTML }} />

      <style jsx global>{`
        @font-face{font-family:'Geom';font-style:normal;font-weight:100 900;font-display:swap;src:url('/fonts/Geom-VariableFont_wght.ttf') format('truetype');}
        @font-face{font-family:'Geom';font-style:italic;font-weight:100 900;font-display:swap;src:url('/fonts/Geom-Italic-VariableFont_wght.ttf') format('truetype');}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;color-scheme:dark;overflow-x:hidden;}
        body{font-family:'Roboto',sans-serif;color:#1A1A2E;background:#fff;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
        a{text-decoration:none;color:inherit;}
        button,input,select,textarea{font-family:inherit;}
        :root{
          --driip:#9F73E6;--driip-dark:#6342AC;--driip-light:#CEB5F8;
          --lime:#9F73E6;--lime-mid:#6342AC;
          --teal:#9F73E6;--violet:#6342AC;--coral:#CEB5F8;
          --dark:#0E0E10;--dark-2:#0F0F14;--dark-3:#1A1A24;
          --text:#1A1A2E;--sub:#6B7280;--dim:#9CA3AF;
          --light:#F8F9FA;--border:#E5E7EB;--border-2:#D1D5DB;
          --r:10px;--rl:16px;--rxl:24px;
        }
        .syne{font-family:'Geom',sans-serif;}
        .mono{font-family:'Roboto Mono',monospace;}

        nav{position:sticky;top:0;z-index:100;background:rgba(8,8,11,0.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.06);padding:0 48px;display:flex;align-items:center;justify-content:space-between;height:62px;}
        .nav-links{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:28px;}
        .nav-logo{display:flex;align-items:center;gap:10px;font-family:'Geom',sans-serif;font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.02em;}
        .nav-logo img{width:90px;height:auto;display:block;}
        .nav-links a{font-size:13px;color:rgba(255,255,255,0.6);transition:color .15s;}
        .nav-links a:hover{color:var(--driip);}
        .nav-cta{background:var(--lime);color:var(--dark);padding:8px 18px;border-radius:6px;font-size:13px;font-weight:700;font-family:'Geom',sans-serif;transition:all .18s;white-space:nowrap;}
        .nav-cta:hover{background:var(--lime-mid);color:#fff;transform:translateY(-1px);}

        .hero{background:var(--dark);padding:96px 48px 88px;position:relative;overflow:hidden;min-height:100vh;display:flex;flex-direction:column;justify-content:center;}
        .hero::before{content:'';position:absolute;top:-220px;right:-160px;width:750px;height:750px;border-radius:50%;background:radial-gradient(circle,rgba(159,115,230,0.05) 0%,transparent 65%);pointer-events:none;}
        .hero::after{content:'';position:absolute;bottom:-100px;left:60px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(159,115,230,0.04) 0%,transparent 65%);pointer-events:none;}
        .hero-rings{position:absolute;inset:0;z-index:0;opacity:.85;pointer-events:auto;}
        .hero-inner{max-width:780px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;z-index:1;pointer-events:none;}
        .hero-inner > *{pointer-events:auto;}
        .hero-sub,.hero h1{text-align:center;}
        .hero-sub{margin-left:auto;margin-right:auto;}
        .hero-agents{justify-content:center;}
        .hero-stats{justify-content:center;width:100%;}
        .hero-badge{display:inline-flex;align-items:center;gap:7px;padding:4px 12px 4px 8px;background:rgba(159,115,230,0.12);border:1px solid rgba(159,115,230,0.3);border-radius:20px;margin-bottom:22px;}
        .hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:pulse 1.5s infinite;}
        .hero-badge span{font-size:11px;font-family:'Roboto Mono',monospace;color:#CEB5F8;letter-spacing:.06em;}
        .hero h1{font-family:'Geom',sans-serif;font-size:44px;font-weight:800;color:#fff;line-height:1.1;letter-spacing:-.02em;margin-bottom:18px;}
        .hero h1 em{font-style:normal;color:var(--lime);}
        .hero-sub{font-size:16px;color:rgba(255,255,255,0.78);line-height:1.7;margin-bottom:30px;max-width:600px;}
        .hero-agents{display:flex;gap:10px;margin-bottom:28px;flex-wrap:wrap;}
        .hero-agent-chip{display:flex;align-items:center;gap:6px;padding:5px 10px;border-radius:6px;font-size:10px;font-family:'Roboto Mono',monospace;letter-spacing:.05em;}
        .hero-agent-chip.a1{background:rgba(159,115,230,0.12);border:1px solid rgba(159,115,230,0.32);color:#CEB5F8;}
        .hero-agent-chip.a2{background:rgba(99,66,172,0.10);border:1px solid rgba(99,66,172,0.30);color:var(--lime-mid);}
        .hero-agent-chip.a3{background:rgba(159,115,230,0.18);border:1px solid rgba(159,115,230,0.45);color:#CEB5F8;}
        .chip-dot{width:5px;height:5px;border-radius:50%;}
        .hero-stats{display:flex;gap:28px;padding:18px 0;}
        .stat-num{font-family:'Geom',sans-serif;font-size:26px;font-weight:800;color:var(--lime);line-height:1;margin-bottom:3px;}
        .stat-num span{font-size:18px;}
        .stat-label{font-size:10px;color:rgba(255,255,255,0.38);font-family:'Roboto Mono',monospace;letter-spacing:.05em;}

        .video-section{background:var(--dark);padding:0 48px 64px;}
        .video-section-inner{max-width:1100px;margin:0 auto;padding-top:32px;}

        .offer-strip{background:var(--lime);padding:20px 48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;}
        .offer-strip-text{font-family:'Geom',sans-serif;font-size:16px;font-weight:700;color:var(--dark);}
        .offer-strip-sub{font-size:14px;color:rgba(8,8,11,0.6);}
        .offer-strip-btn{background:var(--dark);color:var(--lime);padding:10px 22px;border-radius:7px;font-size:13px;font-weight:700;font-family:'Geom',sans-serif;transition:all .18s;white-space:nowrap;}
        .offer-strip-btn:hover{background:#1a1a24;transform:translateY(-1px);}

        .platform{background:var(--dark);padding:84px 48px;}
        .platform-inner{max-width:1100px;margin:0 auto;}
        .platform-eyebrow{font-size:11px;font-family:'Roboto Mono',monospace;color:rgba(255,255,255,0.3);letter-spacing:.1em;margin-bottom:14px;text-align:center;}
        .platform-title{font-family:'Geom',sans-serif;font-size:38px;font-weight:800;color:#fff;line-height:1.1;letter-spacing:-.02em;text-align:center;margin-bottom:10px;}
        .platform-title em{font-style:normal;color:var(--lime);}
        .platform-sub{font-size:15px;color:rgba(255,255,255,0.45);line-height:1.65;text-align:center;max-width:520px;margin:0 auto 52px;}
        .platform-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .agent-card{border-radius:var(--rl);padding:28px;border:1px solid;position:relative;overflow:hidden;display:flex;flex-direction:column;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 4px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);}
        .agent-card::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;opacity:.15;pointer-events:none;}
        .agent-card.a1{background:rgba(159,115,230,0.1);border-color:rgba(159,115,230,0.3);}
        .agent-card.a1::before{background:var(--lime);}
        .agent-card.a2{background:rgba(99,66,172,0.08);border-color:rgba(99,66,172,0.28);}
        .agent-card.a2::before{background:var(--lime-mid);}
        .agent-card.a3{background:rgba(201,176,255,0.08);border-color:rgba(201,176,255,0.3);}
        .agent-card.a3::before{background:#CEB5F8;}
        .agent-num{font-size:10px;font-family:'Roboto Mono',monospace;letter-spacing:.1em;margin-bottom:14px;}
        .agent-card.a1 .agent-num{color:#CEB5F8;}
        .agent-card.a2 .agent-num{color:#CEB5F8;}
        .agent-card.a3 .agent-num{color:#CEB5F8;}
        .agent-name{font-family:'Geom',sans-serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:8px;}
        .agent-desc{font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;margin-bottom:18px;}
        .agent-saving{display:inline-flex;align-items:center;gap:6px;padding:4px 0;margin-top:auto;align-self:flex-start;}
        .saving-icon{font-size:12px;filter:brightness(0) invert(1);}
        .saving-text{font-size:10px;font-family:'Roboto Mono',monospace;letter-spacing:.05em;color:#CEB5F8;}

        .features{background:var(--driip-dark);padding:84px 48px;}
        .features-inner{max-width:1100px;margin:0 auto;}
        .section-eyebrow{font-size:11px;font-family:'Roboto Mono',monospace;letter-spacing:.1em;margin-bottom:12px;}
        .section-title{font-family:'Geom',sans-serif;font-size:36px;font-weight:800;color:var(--text);line-height:1.15;letter-spacing:-.02em;margin-bottom:10px;}
        .section-sub{font-size:15px;color:var(--sub);line-height:1.65;max-width:540px;margin-bottom:44px;}
        .features-carousel{margin-top:40px;}
        .features-carousel .pcar-track{width:700%;}
        .feature-panel{min-width:calc(100% / 7);display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start;padding:40px 48px;}
        .fp-agent-tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-family:'Roboto Mono',monospace;letter-spacing:.06em;margin-bottom:16px;color:#6342AC;}
        .fp-title{font-family:'Geom',sans-serif;font-size:24px;font-weight:700;color:var(--text);margin-bottom:11px;line-height:1.25;}
        .fp-desc{font-size:15px;color:var(--sub);line-height:1.7;margin-bottom:20px;}
        .fp-bullets{display:flex;flex-direction:column;gap:9px;}
        .fp-bullet{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--text);}
        .fp-check{width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;flex-shrink:0;margin-top:1px;font-weight:800;}
        .fp-check.t{background:var(--teal);}
        .fp-check.v{background:var(--violet);}
        .fp-check.c{background:var(--coral);}
        .features .section-title{color:#CEB5F8;}
        .features .section-sub{color:#fff;}
        .features .fp-agent-tag{color:#fff;}
        .features .fp-title{color:#CEB5F8;}
        .features .fp-desc{color:#fff;}
        .features .fp-bullet{color:rgba(255,255,255,0.7);}
        .features .fp-bullet strong{color:#fff;}

        .mc{background:#0f0f14;border:1px solid rgba(255,255,255,0.07);border-radius:var(--rl);overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.3),0 1px 4px rgba(0,0,0,0.2);}
        .mc-hdr{padding:11px 14px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:7px;background:#17171b;}
        .mc-dot{width:8px;height:8px;border-radius:50%;background:var(--border-2);}
        .mc-hdr .mc-dot:nth-child(1){background:#FF5F57;}
        .mc-hdr .mc-dot:nth-child(2){background:#FEBC2E;}
        .mc-hdr .mc-dot:nth-child(3){background:#28C840;}
        .mc-ttl{font-size:11px;font-family:'Roboto Mono',monospace;color:var(--sub);}
        .mc-body{padding:14px;}
        .sr{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-family:'Roboto Mono',monospace;font-weight:500;flex-shrink:0;}
        .sr.s{background:rgba(16,185,129,0.15);color:#34D399;box-shadow:inset 0 0 0 2px rgba(52,211,153,0.8);}
        .sr.m{background:rgba(251,191,36,0.15);color:#FCD34D;box-shadow:inset 0 0 0 2px rgba(252,211,77,0.8);}
        .sr.p{background:rgba(156,163,175,0.1);color:#9CA3AF;box-shadow:inset 0 0 0 2px rgba(156,163,175,0.55);}
        .crow{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:6px;margin-bottom:5px;border:1px solid rgba(255,255,255,0.13);transition:background .12s;cursor:default;}
        .crow:hover{background:#1e1e24;}
        .cname{font-size:11px;font-weight:600;font-family:'Geom',sans-serif;color:var(--text);}
        .crole{font-size:9px;color:var(--sub);margin-top:1px;}
        .ctag{font-size:7px;padding:1px 6px;border-radius:3px;font-family:'Roboto Mono',monospace;letter-spacing:.05em;margin-left:auto;flex-shrink:0;}
        .ctag.s{background:rgba(52,211,153,0.12);color:#34D399;border:1px solid rgba(52,211,153,0.3);}
        .ctag.m{background:rgba(252,211,77,0.12);color:#FCD34D;border:1px solid rgba(252,211,77,0.3);}
        .ctag.p{background:rgba(156,163,175,0.1);color:#9CA3AF;border:1px solid rgba(156,163,175,0.2);}
        .bfield{display:flex;align-items:center;gap:9px;padding:8px 11px;border-radius:6px;margin-bottom:5px;border:1px solid;}
        .bfield.x{background:rgba(255,92,92,0.04);border-color:rgba(255,92,92,0.2);}
        .bfield.ok{background:rgba(159,115,230,0.04);border-color:rgba(159,115,230,0.2);}
        .bname{font-size:11px;font-family:'Geom',sans-serif;font-weight:600;flex:1;}
        .bname.x{color:#F87171;}.bname.ok{color:#34D399;}
        .bst{font-size:8px;font-family:'Roboto Mono',monospace;letter-spacing:.05em;padding:2px 6px;border-radius:3px;}
        .bst.x{background:rgba(255,92,92,0.15);color:#F87171;}
        .bst.ok{background:rgba(52,211,153,0.12);color:#34D399;}
        .bdiv{display:flex;align-items:center;gap:8px;margin:6px 0;font-size:9px;font-family:'Roboto Mono',monospace;color:rgba(255,255,255,0.3);}
        .bdiv::before,.bdiv::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.08);}
        .srow{margin-bottom:9px;}
        .slbl{display:flex;justify-content:space-between;margin-bottom:3px;}
        .slbl-t{font-size:11px;color:var(--sub);}
        .slbl-v{font-size:9px;font-family:'Roboto Mono',monospace;color:var(--teal);}
        .sbar{height:4px;background:var(--border);border-radius:2px;overflow:hidden;}
        .sbar-f{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--teal),#65D9BE);}
        .stotal{margin-top:12px;padding:11px;border-radius:8px;background:rgba(159,115,230,0.06);border:1px solid rgba(159,115,230,0.15);display:flex;justify-content:space-between;align-items:center;}
        .stotal-lbl{font-size:11px;font-family:'Geom',sans-serif;font-weight:600;color:var(--text);}
        .stotal-val{font-size:22px;font-family:'Geom',sans-serif;font-weight:800;color:var(--teal);}
        .ats-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .ats-item{display:flex;align-items:center;gap:9px;padding:11px 12px;border-radius:7px;border:1px solid rgba(255,255,255,0.07);background:#17171b;}
        .ats-ico{width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;font-family:'Geom',sans-serif;flex-shrink:0;}
        .ats-nm{font-size:11px;font-weight:600;font-family:'Geom',sans-serif;color:var(--text);}
        .ats-st{font-size:9px;font-family:'Roboto Mono',monospace;}
        .ats-full{grid-column:1/-1;display:flex;align-items:center;gap:9px;padding:11px 12px;border-radius:7px;border:1px solid rgba(159,115,230,0.3);background:rgba(159,115,230,0.04);}
        .cbubble{margin-bottom:9px;max-width:90%;}
        .cbubble.u{margin-left:auto;}
        .cmsg{padding:8px 12px;border-radius:8px;font-size:11px;line-height:1.55;}
        .cmsg.a{background:#17171b;color:rgba(255,255,255,0.85);border-radius:4px 8px 8px 8px;}
        .cmsg.u{background:var(--dark);color:rgba(255,255,255,0.82);border-radius:8px 4px 8px 8px;}
        .clbl{font-size:8px;font-family:'Roboto Mono',monospace;color:rgba(255,255,255,0.35);margin-bottom:3px;letter-spacing:.05em;}
        .jdprev{margin-top:6px;padding:9px 11px;background:#17171b;border:1px solid rgba(159,115,230,0.25);border-radius:7px;}
        .jdprev-lbl{font-size:8px;font-family:'Roboto Mono',monospace;color:var(--teal);letter-spacing:.06em;margin-bottom:5px;}
        .jdline{height:5px;border-radius:3px;background:var(--border);margin-bottom:4px;}

        .wf-steps{display:flex;align-items:center;gap:4px;margin-bottom:14px;overflow-x:auto;padding-bottom:2px;}
        .wf-step{font-size:8px;font-family:'Roboto Mono',monospace;padding:3px 8px;border-radius:3px;white-space:nowrap;}
        .wf-step.done{background:rgba(99,66,172,0.1);color:var(--violet);border:1px solid rgba(99,66,172,0.2);}
        .wf-step.active{background:rgba(99,66,172,0.18);color:var(--violet);border:1px solid rgba(99,66,172,0.4);font-weight:600;}
        .wf-step.next{background:#17171b;color:rgba(255,255,255,0.3);border:1px solid rgba(255,255,255,0.07);}
        .wf-arrow{font-size:9px;color:var(--dim);}
        .panel-member{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.07);margin-bottom:5px;background:#17171b;}
        .pm-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
        .pm-dot.ok{background:#10B981;}
        .pm-dot.warn{background:#F59E0B;}
        .pm-name{font-size:11px;font-family:'Geom',sans-serif;font-weight:600;color:var(--text);flex:1;}
        .pm-role{font-size:9px;color:var(--sub);}
        .pm-avail{font-size:9px;font-family:'Roboto Mono',monospace;color:var(--sub);}
        .pm-conflict{font-size:9px;font-family:'Roboto Mono',monospace;color:#F59E0B;background:rgba(245,158,11,0.08);padding:2px 6px;border-radius:3px;}
        .slots-section{margin-top:10px;}
        .slots-label{font-size:9px;font-family:'Roboto Mono',monospace;color:var(--violet);letter-spacing:.06em;margin-bottom:6px;}
        .slot-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.07);margin-bottom:5px;cursor:pointer;transition:all .15s;background:#17171b;}
        .slot-item.sel{background:rgba(99,66,172,0.2);border-color:rgba(99,66,172,0.5);}
        .slot-item:hover:not(.sel){background:rgba(255,255,255,0.05);}
        .slot-day{font-size:11px;font-family:'Geom',sans-serif;font-weight:600;color:var(--text);flex:1;}
        .slot-time{font-size:9px;font-family:'Roboto Mono',monospace;color:var(--sub);}
        .mode-row{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;border:1px solid rgba(99,66,172,0.3);background:rgba(99,66,172,0.06);margin-top:8px;}
        .mode-ico{font-size:14px;}
        .mode-txt{font-size:11px;color:var(--text);font-family:'Geom',sans-serif;font-weight:600;flex:1;}
        .mode-gen{font-size:9px;font-family:'Roboto Mono',monospace;color:var(--violet);}
        .sched-btn{width:100%;margin-top:10px;padding:9px;border-radius:7px;background:var(--violet);border:none;color:#fff;font-size:11px;font-family:'Geom',sans-serif;font-weight:700;letter-spacing:.03em;cursor:pointer;transition:opacity .2s;}
        .sched-btn:hover{opacity:.85;}

        .stale-warn{display:flex;align-items:center;gap:7px;padding:8px 10px;border-radius:6px;background:rgba(255,179,71,0.08);border:1px solid rgba(255,179,71,0.25);margin-bottom:8px;}
        .stale-warn-txt{font-size:10px;color:#B8720A;font-family:'Roboto',sans-serif;flex:1;}
        .stale-warn-cta{font-size:9px;font-family:'Roboto Mono',monospace;color:var(--coral);background:rgba(206,181,248,0.1);border:1px solid rgba(206,181,248,0.25);padding:2px 8px;border-radius:3px;cursor:pointer;white-space:nowrap;}
        .email-draft{border:1px solid rgba(255,255,255,0.07);border-radius:7px;margin-bottom:6px;overflow:hidden;}
        .email-hdr{display:flex;align-items:center;gap:8px;padding:8px 11px;cursor:pointer;transition:background .12s;background:#0f0f14;}
        .email-hdr:hover{background:#17171b;}
        .email-to{font-size:11px;font-weight:600;font-family:'Geom',sans-serif;color:var(--text);flex:1;}
        .email-subj{font-size:10px;color:var(--sub);margin-top:1px;}
        .email-toggle{font-size:10px;color:var(--dim);font-family:'Roboto Mono',monospace;flex-shrink:0;}
        .email-body{padding:10px 11px;background:#17171b;border-top:1px solid rgba(255,255,255,0.07);}
        .email-body-txt{font-size:11px;color:var(--text);line-height:1.6;margin-bottom:7px;font-style:italic;}
        .copy-btn{font-size:9px;font-family:'Roboto Mono',monospace;color:var(--teal);background:rgba(159,115,230,0.06);border:1px solid rgba(159,115,230,0.2);padding:2px 8px;border-radius:3px;cursor:pointer;}
        .comms-type-bar{display:flex;gap:5px;margin-bottom:10px;}
        .ct-chip{font-size:8px;padding:2px 8px;border-radius:3px;font-family:'Roboto Mono',monospace;cursor:pointer;}
        .ct-chip.active-rej{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.85);border:1px solid rgba(255,255,255,0.15);}
        .ct-chip.off{background:#17171b;color:rgba(255,255,255,0.3);border:1px solid rgba(255,255,255,0.07);}
        .mc .mc-ttl{color:rgba(255,255,255,0.4);}
        .mc .cname,.mc .stotal-lbl,.mc .ats-nm,.mc .pm-name,.mc .slot-day,.mc .email-to,.mc .email-body-txt,.mc .mode-txt{color:rgba(255,255,255,0.85);}
        .mc .crole,.mc .slbl-t,.mc .pm-role,.mc .slot-time,.mc .email-subj,.mc .pm-avail,.mc .email-toggle,.mc .stale-warn-txt{color:rgba(255,255,255,0.4);}
        .mc .sbar{background:rgba(255,255,255,0.08);}
        .mc .jdline{background:rgba(255,255,255,0.08);}
        .mc .send-all-btn{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);}
        .mc .send-all-btn:hover{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.85);}
        .send-all-btn{width:100%;margin-top:8px;padding:9px;border-radius:7px;background:rgba(107,114,128,0.1);border:1px solid var(--border-2);color:var(--sub);font-size:11px;font-family:'Geom',sans-serif;font-weight:700;cursor:pointer;transition:all .18s;}
        .send-all-btn:hover{background:rgba(107,114,128,0.2);color:var(--text);}

        .personas{background:var(--dark);padding:84px 48px;border-top:none;}
        .personas-inner{max-width:1100px;margin:0 auto;}
        .personas .section-eyebrow{color:rgba(255,255,255,0.4);}
        .personas .section-title{color:#fff;}
        .personas .section-sub{color:rgba(255,255,255,0.55);}
        .personas .pcar-track-wrap{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);}
        .personas .pc-title{color:#fff;}
        .personas .pc-desc{color:rgba(255,255,255,0.55);}
        .personas .pc-pt{color:#fff;}
        .personas .pc-chk{background:#9F73E6;color:#fff;}
        .personas .pc-agent-badge{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);}
        .personas .pcar-dot{background:rgba(255,255,255,0.2);}
        .personas .pcar-dot.active{width:24px;background:#CEB5F8;}
        .personas-carousel{margin-top:48px;}
        .pcar-track-wrap{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.08);border-radius:var(--rl);background:#13131a;}
        .pcar-track{display:flex;width:300%;transition:transform .4s cubic-bezier(.4,0,.2,1);}
        .pc{min-width:33.333%;padding:40px 48px;box-sizing:border-box;}
        .pcar-dots{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:14px;}
        .pcar-dot{width:8px;height:8px;border-radius:50%;border:none;background:rgba(159,115,230,0.25);cursor:pointer;padding:0;transition:all .3s;}
        .pcar-dot.active{width:24px;border-radius:4px;background:#CEB5F8;}
        .pc-tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-family:'Roboto Mono',monospace;letter-spacing:.06em;margin-bottom:16px;color:#CEB5F8;}
        .pc-title{font-family:'Geom',sans-serif;font-size:26px;font-weight:800;color:var(--text);margin-bottom:10px;line-height:1.2;}
        .pc-title em{font-style:italic;color:var(--teal);}
        .pc-desc{font-size:14px;color:var(--sub);line-height:1.7;margin-bottom:20px;max-width:480px;}
        .pc-pts{display:flex;flex-direction:column;gap:10px;}
        .pc-pt{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--text);line-height:1.5;}
        .pc-chk{width:17px;height:17px;border-radius:50%;background:var(--lime);display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--dark);flex-shrink:0;margin-top:1px;font-weight:800;}
        .pc-agents{display:flex;gap:6px;margin-top:16px;flex-wrap:wrap;}
        .pc-agent-badge{font-size:9px;padding:3px 8px;border-radius:4px;font-family:'Roboto Mono',monospace;letter-spacing:.05em;}
        .pc-agent-badge.a1{background:rgba(159,115,230,0.14);color:#6342AC;border:1px solid rgba(159,115,230,0.35);}
        .pc-agent-badge.a2{background:rgba(99,66,172,0.14);color:#6342AC;border:1px solid rgba(99,66,172,0.4);}
        .pc-agent-badge.a3{background:rgba(159,115,230,0.22);color:#6342AC;border:1px solid rgba(159,115,230,0.5);}

        .stats-band{background:var(--dark);padding:60px 48px;}
        .stats-band-inner{max-width:1100px;margin:0 auto;}
        .stats-band h2{font-size:11px;font-family:'Roboto Mono',monospace;color:rgba(255,255,255,0.25);letter-spacing:.1em;text-align:center;margin-bottom:32px;}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(255,255,255,0.07);border-radius:var(--rl);overflow:hidden;}
        .sblock{padding:28px;border-right:1px solid rgba(255,255,255,0.07);text-align:center;}
        .sblock:last-child{border-right:none;}
        .sbig{font-family:'Geom',sans-serif;font-size:40px;font-weight:800;color:var(--lime);line-height:1;margin-bottom:7px;}
        .sbig span{font-size:24px;}
        .sdesc{font-size:12px;color:rgba(255,255,255,0.38);line-height:1.5;}
        .sdesc strong{color:rgba(255,255,255,0.65);font-weight:500;}

        .testimonials{background:var(--light);padding:84px 48px;}
        .testimonials-inner{max-width:1100px;margin:0 auto;}
        .tgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:46px;}
        .tcard{background:#fff;border:1px solid var(--border);border-radius:var(--rl);padding:28px;display:flex;flex-direction:column;transition:box-shadow .2s,transform .2s;}
        .tcard:hover{box-shadow:0 8px 28px rgba(0,0,0,0.08);transform:translateY(-2px);}
        .tcard-stars{display:flex;gap:2px;margin-bottom:12px;}
        .tcard-stars span{font-size:13px;}
        .tcard-agent{font-size:9px;font-family:'Roboto Mono',monospace;letter-spacing:.06em;padding:2px 7px;border-radius:3px;display:inline-flex;margin-bottom:10px;}
        .tcard-agent.a1{background:rgba(159,115,230,0.08);color:var(--teal);border:1px solid rgba(159,115,230,0.2);}
        .tcard-agent.a2{background:rgba(99,66,172,0.08);color:var(--violet);border:1px solid rgba(99,66,172,0.2);}
        .tcard-agent.a3{background:rgba(206,181,248,0.08);color:var(--coral);border:1px solid rgba(206,181,248,0.2);}
        .tcard-all{background:rgba(159,115,230,0.08);color:#6B870A;border:1px solid rgba(159,115,230,0.3);}
        .tquote{font-size:14px;color:var(--text);line-height:1.7;font-style:italic;flex:1;margin-bottom:20px;}
        .tquote em{font-style:normal;font-weight:600;color:var(--teal);}
        .tquote em.v{color:var(--violet);}
        .tquote em.c{color:var(--coral);}
        .tauthor{display:flex;align-items:center;gap:11px;}
        .tavatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;font-family:'Geom',sans-serif;color:#fff;flex-shrink:0;}
        .tname{font-size:13px;font-weight:600;font-family:'Geom',sans-serif;color:var(--text);}
        .ttitle{font-size:11px;color:var(--sub);margin-top:1px;}

        .signup{background:var(--dark);padding:88px 48px;position:relative;overflow:hidden;}
        .signup::before{content:'';position:absolute;top:-220px;left:50%;transform:translateX(-50%);width:900px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(159,115,230,0.05) 0%,transparent 65%);pointer-events:none;}
        .signup-inner{max-width:700px;margin:0 auto;position:relative;z-index:2;}
        .signup-eyebrow{font-size:11px;font-family:'Roboto Mono',monospace;color:var(--lime);letter-spacing:.1em;margin-bottom:12px;text-align:center;}
        .signup-title{font-family:'Geom',sans-serif;font-size:40px;font-weight:800;color:#fff;line-height:1.1;letter-spacing:-.02em;text-align:center;margin-bottom:10px;}
        .signup-title em{font-style:normal;color:var(--lime);}
        .signup-sub{font-size:14px;color:rgba(255,255,255,0.45);line-height:1.65;text-align:center;margin-bottom:40px;max-width:460px;margin-left:auto;margin-right:auto;}
        .signup-form{background:rgba(14,14,16,0.65);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(159,115,230,0.25);border-radius:var(--rxl);padding:34px;}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
        .form-row.full{grid-template-columns:1fr;}
        .form-group{display:flex;flex-direction:column;gap:5px;}
        .form-label{font-size:10px;font-family:'Roboto Mono',monospace;color:rgba(255,255,255,0.4);letter-spacing:.06em;}
        .form-input,.form-select{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:10px 13px;color:#fff;font-size:13px;transition:border-color .18s;outline:none;-webkit-appearance:none;appearance:none;color-scheme:dark;}
        .form-input::placeholder{color:rgba(255,255,255,0.2);}
        .form-input:focus,.form-select:focus{border-color:rgba(159,115,230,0.4);}
        .form-select{cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;}
        .form-select option{background:#1a1a24;color:#fff;}
        .form-select option:disabled{color:rgba(255,255,255,0.4);}
        .form-select option:checked{background:#9F73E6;color:#0E0E10;}
        .form-submit{width:100%;margin-top:20px;padding:14px;border-radius:9px;background:var(--lime);border:none;color:var(--dark);font-size:14px;font-family:'Geom',sans-serif;font-weight:800;letter-spacing:.02em;cursor:pointer;transition:all .2s;}
        .form-submit:hover{background:var(--lime-mid);color:#fff;transform:translateY(-1px);}
        .form-note{text-align:center;margin-top:12px;font-size:10px;color:rgba(255,255,255,0.2);font-family:'Roboto Mono',monospace;letter-spacing:.04em;}
        .form-success{display:none;text-align:center;padding:44px 20px;}
        .form-success-icon{font-size:46px;margin-bottom:14px;}
        .form-success-title{font-family:'Geom',sans-serif;font-size:24px;font-weight:800;color:#fff;margin-bottom:8px;}
        .form-success-sub{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.65;}

        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .nav-hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;background:none;border:none;cursor:pointer;padding:6px;width:36px;height:36px;}
        .ham-line{display:block;width:22px;height:2px;background:rgba(255,255,255,0.85);border-radius:2px;transition:all .25s;}
        .ham-line.open:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .ham-line.open:nth-child(2){opacity:0;}
        .ham-line.open:nth-child(3){transform:translateY(-7px) rotate(-45deg);}


        @media(max-width:960px){
          .hero-inner,.feature-panel,.platform-grid,.tgrid{grid-template-columns:1fr;}
          .pc{padding:28px 20px;}
          .stats-grid{grid-template-columns:1fr 1fr;}
          .form-row{grid-template-columns:1fr;}
          nav,.hero,.video-section,.platform,.features,.personas,.testimonials,.signup{padding-left:20px;padding-right:20px;}
          .hero h1{font-size:32px;}
          .platform-title{font-size:28px;}
          .signup-title{font-size:28px;}
          .platform-grid{display:flex!important;flex-direction:column;gap:16px;}
          .agent-card{width:100%;box-sizing:border-box;}
          .form-input,.form-select{font-size:16px;}
          .feature-panel > div:last-child{display:none;}
          .feature-panel{grid-template-columns:1fr;}
        }
        @media(max-width:1024px){
          .nav-links{display:none!important;}
          .nav-cta-desktop{display:none!important;}
        }
        @media(max-width:900px){
          nav{padding:0 16px;justify-content:center;}
          .nav-hamburger{position:absolute;right:16px;top:50%;transform:translateY(-50%);}
        }
        @media(max-width:768px){
          .offer-strip{flex-direction:column;align-items:center;text-align:center;padding:18px 20px;gap:12px;}
          .offer-strip-text{text-align:center;}
          .signup-form{padding:24px 16px;}
        }
      `}</style>

      {showWaitlist && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          overflowY: "auto",
        }}>
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
