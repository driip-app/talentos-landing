# Driip Talentos — React Migration Plan

## Context

This is the Driip landing page (Next.js + TypeScript + Tailwind). It was originally
built as a polished static HTML file (`Driip_Landing.html`) and ported to Next.js
by dumping the HTML as raw template-literal strings injected via
`dangerouslySetInnerHTML`. The goal of this migration is to convert it into a proper
idiomatic React app — one component per section, React state for interactivity, CSS
in a real stylesheet — without changing any visual output.

**Deployed repo:** `https://github.com/driip-app/talentos-landing`

---

## Current Codebase State

```
src/
  pages/
    _app.tsx              ← imports globals.css, nothing else
    index.tsx             ← ~1200 lines, the entire app lives here
  styles/
    globals.css           ← just Tailwind imports + CSS vars (not used by the page)
  comps/
    AgentFinderSection.tsx  ← ALREADY a proper React component (personas section)
    TalentOSWaitlist.tsx    ← ALREADY a proper React component (waitlist modal)
    Threads.tsx             ← background animation, already a component
    Global/MagicRings/MagicRings.jsx  ← hero animation, already a component
  components/
    ui/cutout-card.tsx    ← shadcn-style card used by AgentFinderSection
  lib/
    utils.ts
```

### What's wrong with `index.tsx`

1. **Two giant HTML strings** injected via `dangerouslySetInnerHTML`:
   - `STATIC_HTML_1` (~300 lines) — platform agent cards + features carousel
   - `STATIC_HTML_2` (~40 lines) — signup form with custom dropdown

2. **~900 lines of CSS** inside `<style jsx global>` in the page component.
   This CSS defines every class used across the page. It belongs in a stylesheet.

3. **jQuery-style DOM manipulation** in `useEffect` hooks:
   - Carousel autoplay done with `querySelector` + `setInterval` + manual `transform`
   - Custom dropdown done with `querySelector` + `addEventListener` + direct `style.display`
   - Form submit intercepted with manual `addEventListener` on the container div
   - Smooth scroll wired via event delegation on a ref

4. **Two refs (`staticRef`, `signupRef`)** pointing at the two `dangerouslySetInnerHTML`
   divs, used to query DOM elements inside them. This caused a real bug where the form
   submit listener was attached to `staticRef` but the form lived in `signupRef`, so
   `e.preventDefault()` never fired and the page did a full reload on submit.

5. **CSS split across four places:**
   - `<style jsx global>` (the big block)
   - Inline styles inside the HTML strings
   - Inline `style={{}}` props in JSX
   - `globals.css` (unused by the page)

---

## Migration Goals

- **Zero visual changes.** Keep every CSS class name, every colour, every layout identical.
- **No new dependencies.** Use only what is already in the project.
- **One component per section.** Each part of the page becomes its own file.
- **React state for everything interactive.** No more `querySelector` or `addEventListener`.
- **One stylesheet.** All CSS moves to `src/styles/landing.css`, imported in `_app.tsx`.
- **`index.tsx` becomes an orchestrator.** Imports and renders components only.

---

## File Structure After Migration

```
src/
  pages/
    _app.tsx              ← imports globals.css AND landing.css
    index.tsx             ← ~50 lines, just imports + renders sections
  styles/
    globals.css           ← unchanged
    landing.css           ← ALL the page CSS moved here (from style jsx global)
  comps/
    landing/
      Nav.tsx             ← sticky nav + mobile hamburger + mobile menu overlay
      Hero.tsx            ← hero section with MagicRings + banner + CTA
      Platform.tsx        ← "6 Agents. One OS." section (agent cards grid)
      Features.tsx        ← features carousel with autoplay + dot nav
      Signup.tsx          ← signup form, custom dropdown, formspree submit
    AgentFinderSection.tsx  ← already done, do not touch
    TalentOSWaitlist.tsx    ← already done, do not touch
    Threads.tsx             ← already done, do not touch
    Global/MagicRings/...   ← already done, do not touch
```

---

## Phase-by-Phase Plan

### Phase 1 — Extract CSS (do this first, lowest risk)

**Goal:** move all `<style jsx global>` content out of `index.tsx` into a real file.

Steps:
1. Create `src/styles/landing.css`
2. Cut every rule from the `<style jsx global>{...}` block in `index.tsx` and paste
   it verbatim into `landing.css` (no changes to selectors or values)
3. In `_app.tsx`, add `import "../styles/landing.css"` (alongside the existing globals import)
4. Remove the now-empty `<style jsx global>` block from `index.tsx`
5. Remove the `styled-jsx` dependency from the jsx pragma if present

**Verify:** page looks identical. No class renames. No selector changes.

---

### Phase 2 — Extract Nav

**File:** `src/comps/landing/Nav.tsx`

What it needs:
- `isMobile` state (window.innerWidth <= 1024, with resize listener)
- `navOpen` state for hamburger toggle
- `showWaitlist` prop (passed down from index, triggers `TalentOSWaitlist`)
- Mobile menu with smooth-scroll links and the "Join the Waitlist" CTA button

Props interface:
```ts
interface NavProps {
  onOpenWaitlist: () => void;
}
```

**What to move:** the `<nav>`, hamburger button JSX, and mobile menu overlay JSX
that currently live in `TalentOSPage`. Move the `isMobile` and `navOpen` state
into the component itself.

**Verify:** hamburger opens/closes, links scroll smoothly, waitlist modal opens.

---

### Phase 3 — Extract Hero

**File:** `src/comps/landing/Hero.tsx`

What it needs:
- `isMobile` state (same pattern as Nav — each component owns its own)
- `onOpenWaitlist` prop for the "Let's Clock In" button and banner CTA
- Renders `<MagicRings>` and the hero banner

Props interface:
```ts
interface HeroProps {
  onOpenWaitlist: () => void;
}
```

**What to move:** the `<section className="hero">` JSX block from `TalentOSPage`.

**Verify:** rings animate, banner tilt works on hover, CTA opens waitlist.

---

### Phase 4 — Extract Platform Section

**File:** `src/comps/landing/Platform.tsx`

What it needs: nothing dynamic, this is purely static markup.

**What to move:** the `<section class="platform">` block currently inside `STATIC_HTML_1`.
Convert HTML to JSX (lowercase attributes, `className` not `class`, self-close void elements).

**Note:** The mobile layout adjustment (`grid → flex column`) that is currently done
imperatively in a `useEffect` should be replaced with a CSS media query that already
exists in `landing.css` (`@media(max-width:960px)`). Remove the JS that was doing this.

**Verify:** 6 agent cards display correctly, mobile stacks them vertically.

---

### Phase 5 — Extract Features Carousel

**File:** `src/comps/landing/Features.tsx`

This is the most complex section. Currently the carousel works by:
- Storing the active index in a `data-idx` attribute on a DOM element
- Manually computing `translateX` and applying it via `element.style.transform`
- Using `setInterval` for autoplay
- Pausing on mouse enter/leave

Replace all of this with React state:

```ts
const [activeIdx, setActiveIdx] = useState(0);
const TOTAL = 7; // number of panels

// autoplay
useEffect(() => {
  const timer = setInterval(() => setActiveIdx(i => (i + 1) % TOTAL), 4000);
  return () => clearInterval(timer);
}, []);
```

The track transform becomes an inline style derived from state:
```tsx
<div
  className="pcar-track"
  style={{ transform: `translateX(-${(activeIdx * 100) / TOTAL}%)` }}
>
```

Dot buttons call `setActiveIdx(i)` directly.
Mouse enter/leave pauses/resumes via `useRef` on the interval.

**What to move:** the entire `<section class="features">` block from `STATIC_HTML_1`,
plus the `setupAutoplay` / `goToSlide` logic from the `useEffect`.

**Verify:** carousel autoplays, dots navigate correctly, hover pauses autoplay, panels render.

---

### Phase 6 — Extract Signup / Form

**File:** `src/comps/landing/Signup.tsx`

What it needs:
- `submitted` state (show success message after formspree responds ok)
- `dropdownOpen` state for the custom headache dropdown
- `selectedHeadache` state for the selected value
- `SignupThreads` sub-component (the `<Threads>` animation injected into the section)
- Formspree endpoint: `https://formspree.io/f/xredlbnb`

Replace the custom dropdown DOM manipulation with React state:
```tsx
const [open, setOpen] = useState(false);
const [value, setValue] = useState("");

// in JSX:
<div style={{ position: "relative" }}>
  <button onClick={() => setOpen(o => !o)} className="form-select" ...>
    <span style={{ color: value ? "#fff" : "rgba(255,255,255,0.2)" }}>
      {value || "Be honest. We've heard it all."}
    </span>
  </button>
  {open && (
    <ul className="headache-menu" ...>
      {OPTIONS.map(opt => (
        <li key={opt} onClick={() => { setValue(opt); setOpen(false); }}>{opt}</li>
      ))}
    </ul>
  )}
</div>
```

Close on outside click via a `useEffect` with `document.addEventListener("mousedown", ...)`.

Form submit:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!value) { setOpen(true); return; }
  // fetch formspree...
  setSubmitted(true);
};
```

**What to move:** `STATIC_HTML_2`, the headache dropdown `useEffect`, the form submit
`useEffect`, and the `SignupThreads` component.

Add CSS for `.headache-menu` and `.headache-menu li` to `landing.css`:
```css
.headache-menu { list-style:none; margin:0; padding:0; position:absolute;
  top:calc(100% + 4px); left:0; right:0; background:#0e0e10;
  border:1px solid rgba(159,115,230,0.3); border-radius:7px; z-index:200;
  box-shadow:0 8px 24px rgba(0,0,0,0.5); }
.headache-menu li { padding:10px 14px; font-size:13px; color:#fff; cursor:pointer; }
.headache-menu li:hover { background:#9F73E6; color:#0E0E10; }
```

**Verify:** dropdown opens/closes, outside click closes it, empty selection blocks submit
and opens dropdown, successful submit shows the success screen.

---

### Phase 7 — Clean up index.tsx

After all components are extracted:

1. Delete `STATIC_HTML_1`, `STATIC_HTML_2`
2. Delete `staticRef`, `signupRef` and all `useEffect` hooks that used them
3. Delete `formSubmitted` state (now lives in `Signup`)
4. Delete `isMobile` state (now lives in `Nav` and `Hero`)
5. Delete `navOpen` state (now lives in `Nav`)
6. `index.tsx` becomes:

```tsx
import Nav from "@/comps/landing/Nav";
import Hero from "@/comps/landing/Hero";
import Platform from "@/comps/landing/Platform";
import Features from "@/comps/landing/Features";
import AgentFinderSection from "@/comps/AgentFinderSection";
import Signup from "@/comps/landing/Signup";
import TalentOSWaitlist from "@/comps/TalentOSWaitlist";
import { useState } from "react";
import Head from "next/head";

export default function TalentOSPage() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  return (
    <>
      <Head>...</Head>
      <Nav onOpenWaitlist={() => setShowWaitlist(true)} />
      <Hero onOpenWaitlist={() => setShowWaitlist(true)} />
      <Platform />
      <Features />
      <AgentFinderSection />
      <Signup />
      {showWaitlist && <TalentOSWaitlist onClose={() => setShowWaitlist(false)} />}
    </>
  );
}
```

---

## Rules for the Migration

1. **Keep all CSS class names exactly as they are.** Do not rename `.agent-card`,
   `.form-select`, `.pcar-track`, etc. The CSS in `landing.css` references them.

2. **Convert HTML attributes to JSX:** `class` → `className`, `for` → `htmlFor`,
   `stroke-width` → `strokeWidth`, self-close void elements (`<input />`, `<br />`).

3. **HTML entities in JSX strings use Unicode or JSX escapes:**
   `&amp;` → `&`, `&mdash;` → `—`, `&apos;` → `'` or `{"’"}`.

4. **Do not touch `AgentFinderSection`, `TalentOSWaitlist`, `Threads`, or `MagicRings`.**
   These are already correct components.

5. **Do not change any visual design.** Colours, spacing, fonts, animations must be
   identical before and after each phase.

6. **One phase at a time. Verify visually before moving to the next phase.**

7. **Do not introduce Tailwind classes** into the migrated sections. The page uses a
   custom CSS class system defined in `landing.css`. `AgentFinderSection` uses Tailwind
   but that's already the case — don't mix patterns in the new components.

---

## Known Bugs Already Fixed (do not re-introduce)

- Form submit `e.preventDefault()` must be called on the form itself or its ancestor
  in the DOM tree — not on a sibling container.
- `overflow-x: clip` (not `hidden`) on `html` and `body` — `hidden` breaks
  `position: sticky` on the nav.
- Custom dropdown show/hide must be controlled by React state (or direct `style.display`)
  not CSS classes toggled by JS, to avoid flash-of-unstyled-content issues.

---

## Execution Order Summary

| Phase | What | Risk |
|-------|------|------|
| 1 | Extract CSS to `landing.css` | Very low |
| 2 | Extract `Nav` component | Low |
| 3 | Extract `Hero` component | Low |
| 4 | Extract `Platform` component | Low |
| 5 | Extract `Features` carousel | Medium |
| 6 | Extract `Signup` + form logic | Medium |
| 7 | Clean up `index.tsx` | Low (just deleting dead code) |

Start a new chat session per phase if the context gets long.
Load codebase context at the start of each session with `/load-context`.
