import posthog from "posthog-js";

/** PostHog for the landing page. Same project as the app, so a visitor who later signs up in the
 *  app is the same person in PostHog. Requests go through our own `/ingest` proxy
 *  (see next.config.js) so ad blockers don't drop them. No token → everything no-ops. */
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let started = false;

export function startAnalytics(): void {
  if (started || !token || typeof window === "undefined") return;
  posthog.init(token, {
    defaults: "2026-08-30",
    api_host: "/ingest",
    person_profiles: "identified_only",
    session_recording: { maskAllInputs: true },
    ui_host: host.replace(".i.posthog.com", ".posthog.com"),
  });
  started = true;
}

/** A waitlist signup. Attaches the email to this visitor (without `identify`, so the app's
 *  later `identify(user.id)` still merges this visitor into the real account). */
export function trackWaitlistJoined(email: string, properties: Record<string, string>): void {
  if (!started) return;
  posthog.setPersonProperties({ email });
  posthog.capture("waitlist_joined", properties);
}
