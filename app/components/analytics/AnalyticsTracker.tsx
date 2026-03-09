"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking for admin pages and api routes
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/api')) return;

    const trackView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (error) {
        // Silently fail for analytics
        console.error("Analytics error", error);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}