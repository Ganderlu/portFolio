"use client";

import { useCallback } from "react";

export const useAnalytics = () => {
  const trackEvent = useCallback(
    async (eventName: string, metadata?: any) => {
      try {
        const visitorId = localStorage.getItem("portfolio_visitor_id");
        const sessionId = sessionStorage.getItem("portfolio_session_id");

        await fetch("/api/analytics/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventName,
            visitorId,
            sessionId,
            metadata: metadata || {},
          }),
        });
      } catch (error) {
        // Silently fail for analytics
        console.error("Event tracking error", error);
      }
    },
    []
  );

  return { trackEvent };
};
