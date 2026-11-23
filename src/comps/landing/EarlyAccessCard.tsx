import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface EarlyAccessCardProps {
  open: boolean;
  onClose: () => void;
}

/** Glass card shown when a visitor presses "Register / Login". Login is partner-only for now,
 *  so the card points them at the early access form in the sign-up section (#demo). */
export default function EarlyAccessCard({ open, onClose }: EarlyAccessCardProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const afterClose = useRef<(() => void) | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setClosing(true);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
      afterClose.current?.();
      afterClose.current = null;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!closing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => { setClosing(false); onClose(); }, reduce ? 0 : 200);
    return () => clearTimeout(t);
  }, [closing, onClose]);

  if (!open) return null;

  const requestAccess = () => {
    afterClose.current = () => {
      const section = document.getElementById("demo");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      section?.querySelector<HTMLInputElement>("input[type=email]")?.focus({ preventScroll: true });
    };
    setClosing(true);
  };

  return (
    <div className={`ea-overlay${closing ? " is-closing" : ""}`} onMouseDown={e => { if (e.target === e.currentTarget) setClosing(true); }}>
      <div className="ea-card" role="dialog" aria-modal="true" aria-labelledby="ea-title" aria-describedby="ea-body">
        <button ref={closeRef} type="button" className="ea-close" onClick={() => setClosing(true)} aria-label="Close">
          <X size={16} strokeWidth={2} />
        </button>
        <span className="ea-eyebrow mono">EARLY ACCESS</span>
        <h2 id="ea-title" className="ea-title syne">Be the first to try Driip</h2>
        <div id="ea-body" className="ea-body">
          <p>Login is currently available to a limited number of Driip partners.</p>
          <p>Request an early access pass and get your hands on exciting AI agents we&apos;re experimenting with before they are made public.</p>
        </div>
        <button type="button" className="ea-cta" onClick={requestAccess}>Request Early Access</button>
      </div>
    </div>
  );
}
