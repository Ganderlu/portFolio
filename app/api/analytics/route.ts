import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseClient";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export async function GET() {
  try {
    // 1. Fetch Global Stats
    const globalRef = doc(db, "analytics", "global");
    const globalSnap = await getDoc(globalRef);
    const globalData = globalSnap.exists()
      ? globalSnap.data()
      : {
          totalViews: 0,
          uniqueVisitors: 0,
          returningVisitors: 0,
          pageViews: 0,
        };

    // 2. Fetch Daily Stats (last 30 days)
    const dailyQuery = query(
      collection(db, "analytics"),
      where("type", "==", "daily"),
      orderBy("date", "desc"),
    );
    const dailySnap = await getDocs(dailyQuery);
    const viewsOverTime = dailySnap.docs.map((doc) => {
      const data = doc.data();
      const sessions = data.sessions || 1;
      const bounces = data.bounces || 0;
      const bounceRate = Math.round((bounces / sessions) * 100);
      const totalDuration = data.duration || 0;
      const avgSeconds = Math.round(totalDuration / sessions);

      return {
        ...data,
        bounceRate,
        avgSessionDurationSeconds: avgSeconds,
      };
    }).reverse();

    // 3. Fetch Page Stats
    const pageQuery = query(
      collection(db, "analytics"),
      where("type", "==", "page"),
      orderBy("views", "desc"),
    );
    const pageSnap = await getDocs(pageQuery);
    const topPages = pageSnap.docs.map((doc) => doc.data());

    // 4. Fetch Source Stats
    const sourceQuery = query(
      collection(db, "analytics"),
      where("type", "==", "source"),
      orderBy("visitors", "desc"),
    );
    const sourceSnap = await getDocs(sourceQuery);
    const sources = sourceSnap.docs.map((doc) => doc.data());

    // 5. Fetch Event Stats
    const eventQuery = query(
      collection(db, "analytics"),
      where("type", "==", "event_global"),
      orderBy("totalCount", "desc"),
    );
    const eventSnap = await getDocs(eventQuery);
    const topEvents = eventSnap.docs.map((doc) => doc.data());

    // 6. Fetch Project Stats
    const projectQuery = query(
      collection(db, "analytics"),
      where("type", "==", "project_stats"),
      orderBy("views", "desc"),
    );
    const projectSnap = await getDocs(projectQuery);
    const projectStats = projectSnap.docs.map((doc) => {
      const data = doc.data();
      // Calculate avg time spent per project
      const totalTimeMs = data.totalTimeSpentMs || 0;
      const count = data.timeSpentCount || 1;
      const avgSeconds = Math.round(totalTimeMs / count / 1000);
      return {
        ...data,
        avgTimeSpent: `${Math.floor(avgSeconds / 60)}m ${avgSeconds % 60}s`,
      };
    });

    // 7. Fetch Geographic Stats
    const geoQuery = query(
      collection(db, "analytics"),
      where("type", "==", "geo"),
      orderBy("visitors", "desc"),
    );
    const geoSnap = await getDocs(geoQuery);
    const totalVisitors = globalData.uniqueVisitors || 1;
    const locations = geoSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        country: data.name,
        code: data.code,
        visitors: data.visitors,
        percentage: Math.round((data.visitors / totalVisitors) * 100),
      };
    });

    // 8. Fetch Device Stats
    const deviceQuery = query(
      collection(db, "analytics"),
      where("type", "==", "device"),
      orderBy("visitors", "desc"),
    );
    const deviceSnap = await getDocs(deviceQuery);
    const devices = deviceSnap.docs.map((doc) => doc.data());

    // 9. Fetch Browser Stats
    const browserQuery = query(
      collection(db, "analytics"),
      where("type", "==", "browser"),
      orderBy("visitors", "desc"),
    );
    const browserSnap = await getDocs(browserQuery);
    const browsers = browserSnap.docs.map((doc) => doc.data());

    // Calculate real metrics
    const totalSessions = globalData.totalSessions || 1;
    const bounces = globalData.bounces || 0;
    const bounceRate = Math.round((bounces / totalSessions) * 100);

    const totalDuration = globalData.totalSessionDuration || 0;
    const avgSeconds = Math.round(totalDuration / totalSessions);
    const minutes = Math.floor(avgSeconds / 60);
    const seconds = avgSeconds % 60;
    const avgSessionDuration = `${minutes}m ${seconds}s`;

    return NextResponse.json({
      ...globalData,
      viewsOverTime,
      topPages,
      sources,
      topEvents,
      projectStats,
      bounceRate,
      avgSessionDuration,
      devices,
      browsers,
      locations: locations.length > 0 ? locations : [
        { country: "Unknown", visitors: 0, percentage: 0 }
      ]
    });
  } catch (error: any) {
    console.error("Firestore fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 },
    );
  }
}
