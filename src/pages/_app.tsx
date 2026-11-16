import "../styles/globals.css";
import "../styles/landing.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import { startAnalytics } from "@/lib/analytics";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    startAnalytics();
  }, []);

  return <Component {...pageProps} />;
}
