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
        // Simple visitor identification
        let visitorId = localStorage.getItem('portfolio_visitor_id');
        let isNewVisitor = false;
        
        if (!visitorId) {
          visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          localStorage.setItem('portfolio_visitor_id', visitorId);
          isNewVisitor = true;
        }

        // Session tracking
        let sessionId = sessionStorage.getItem('portfolio_session_id');
        let sessionStart = sessionStorage.getItem('portfolio_session_start');
        
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15);
          sessionStart = Date.now().toString();
          sessionStorage.setItem('portfolio_session_id', sessionId);
          sessionStorage.setItem('portfolio_session_start', sessionStart!);
        }

        // Device detection
        const userAgent = navigator.userAgent;
        let deviceType = "Desktop";
        if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
          deviceType = "Tablet";
        } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
          deviceType = "Mobile";
        }

        // Browser detection
        let browserName = "Other";
        if (userAgent.indexOf("Firefox") > -1) browserName = "Firefox";
        else if (userAgent.indexOf("SamsungBrowser") > -1) browserName = "Samsung Browser";
        else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) browserName = "Opera";
        else if (userAgent.indexOf("Trident") > -1) browserName = "Internet Explorer";
        else if (userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Edg") > -1) browserName = "Edge";
        else if (userAgent.indexOf("Chrome") > -1) browserName = "Chrome";
        else if (userAgent.indexOf("Safari") > -1) browserName = "Safari";

        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            path: pathname,
            visitorId,
            isNewVisitor,
            sessionId,
            sessionDuration: Date.now() - parseInt(sessionStart!),
            device: deviceType,
            browser: browserName
          }),
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