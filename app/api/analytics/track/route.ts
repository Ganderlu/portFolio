import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/firebase/firebaseClient";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const {
      path,
      visitorId,
      isNewVisitor,
      sessionId,
      sessionDuration,
      device,
      browser,
      referrer,
    } = await request.json();
    const headerList = await headers();

    // Detect country from headers (Vercel, Cloudflare, etc.) or fallback
    const countryCode = headerList.get("x-vercel-ip-country") || "Unknown";
    // For local dev or if header is missing, we could use an IP lookup service
    // but for now we'll stick to headers or "Unknown"

    const today = new Date().toISOString().split("T")[0];
    const month = today.substring(0, 7); // YYYY-MM

    // 1. Update Global Stats
    const globalRef = doc(db, "analytics", "global");
    const globalSnap = await getDoc(globalRef);

    if (!globalSnap.exists()) {
      await setDoc(globalRef, {
        totalViews: 1,
        uniqueVisitors: isNewVisitor ? 1 : 0,
        returningVisitors: isNewVisitor ? 0 : 1,
        pageViews: 1,
        totalSessions: 1,
        totalSessionDuration: 0,
        bounces: 1,
      });
    } else {
      const isNewSession = sessionDuration === 0;

      await updateDoc(globalRef, {
        totalViews: increment(1),
        pageViews: increment(1),
        uniqueVisitors: isNewVisitor ? increment(1) : increment(0),
        returningVisitors: isNewVisitor ? increment(0) : increment(1),
        totalSessions: isNewSession ? increment(1) : increment(0),
        totalSessionDuration: increment(sessionDuration / 1000),
        bounces: isNewSession ? increment(1) : increment(-1),
      });
    }

    // 2. Update Daily Stats
    const dailyRef = doc(db, "analytics", `daily_${today}`);
    const dailySnap = await getDoc(dailyRef);
    if (!dailySnap.exists()) {
      await setDoc(dailyRef, {
        date: today,
        views: 1,
        visitors: 1,
        type: "daily",
      });
    } else {
      await updateDoc(dailyRef, {
        views: increment(1),
        visitors: isNewVisitor ? increment(1) : increment(0),
      });
    }

    // 3. Update Page Stats
    const pageId = path.replace(/\//g, "_") || "home";
    const pageRef = doc(db, "analytics", `page_${pageId}`);
    const pageSnap = await getDoc(pageRef);
    if (!pageSnap.exists()) {
      await setDoc(pageRef, {
        path,
        views: 1,
        type: "page",
      });
    } else {
      await updateDoc(pageRef, {
        views: increment(1),
      });
    }

    // 4. Update Traffic Source
    const source = "Direct";
    const sourceRef = doc(db, "analytics", `source_${source.toLowerCase()}`);
    const sourceSnap = await getDoc(sourceRef);
    if (!sourceSnap.exists()) {
      await setDoc(sourceRef, {
        name: source,
        visitors: 1,
        type: "source",
      });
    } else {
      await updateDoc(sourceRef, {
        visitors: increment(1),
      });
    }

    // 5. Update Geographic Stats
    if (countryCode !== "Unknown") {
      const geoRef = doc(db, "analytics", `geo_${countryCode}`);
      const geoSnap = await getDoc(geoRef);
      if (!geoSnap.exists()) {
        await setDoc(geoRef, {
          code: countryCode,
          // We can't easily get country name from code without a map
          // We'll use the code as name for now or a small lookup
          name: countryCode,
          visitors: 1,
          type: "geo",
        });
      } else {
        await updateDoc(geoRef, {
          visitors: increment(1),
        });
      }
    }

    // 7. Update Browser Stats
    if (browser) {
      const browserRef = doc(
        db,
        "analytics",
        `browser_${browser.toLowerCase().replace(/\s+/g, "_")}`,
      );
      const browserSnap = await getDoc(browserRef);
      if (!browserSnap.exists()) {
        await setDoc(browserRef, {
          name: browser,
          visitors: 1,
          type: "browser",
        });
      } else {
        await updateDoc(browserRef, {
          visitors: increment(1),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Firestore tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track view", details: error.message },
      { status: 500 },
    );
  }
}

function getWeekNumber(d: Date) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${weekNo}`;
}
