import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseClient";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { eventName, visitorId, sessionId, metadata } = await request.json();

    if (!eventName) {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 },
      );
    }

    const today = new Date().toISOString().split("T")[0];

    // 1. Log the individual event for detailed activity
    await addDoc(collection(db, "analytics_events"), {
      eventName,
      visitorId,
      sessionId,
      metadata: metadata || {},
      timestamp: serverTimestamp(),
      date: today,
    });

    // 2. Update Event Aggregates (Daily)
    const eventDailyRef = doc(
      db,
      "analytics",
      `event_daily_${eventName}_${today}`,
    );
    const eventDailySnap = await getDoc(eventDailyRef);
    if (!eventDailySnap.exists()) {
      await setDoc(eventDailyRef, {
        eventName,
        date: today,
        count: 1,
        type: "event_daily",
      });
    } else {
      await updateDoc(eventDailyRef, {
        count: increment(1),
      });
    }

    // 3. Update Global Event Totals
    const eventGlobalRef = doc(db, "analytics", `event_global_${eventName}`);
    const eventGlobalSnap = await getDoc(eventGlobalRef);
    if (!eventGlobalSnap.exists()) {
      await setDoc(eventGlobalRef, {
        eventName,
        totalCount: 1,
        type: "event_global",
      });
    } else {
      await updateDoc(eventGlobalRef, {
        totalCount: increment(1),
      });
    }

    // 4. Update Project Specific Stats if project metadata is present
    if (metadata?.project) {
      const projectName = metadata.project;
      const projectRef = doc(db, "analytics", `project_${projectName}`);
      const projectSnap = await getDoc(projectRef);

      const updateData: any = {
        name: projectName,
        type: "project_stats",
      };

      if (eventName === "Project Viewed") {
        updateData.views = increment(1);
      } else if (eventName === "View Live Demo") {
        updateData.demoClicks = increment(1);
      } else if (eventName === "GitHub Repo Click") {
        updateData.githubClicks = increment(1);
      } else if (eventName === "Project Time Spent" && metadata.durationMs) {
        updateData.totalTimeSpentMs = increment(metadata.durationMs);
        updateData.timeSpentCount = increment(1);
      }

      if (!projectSnap.exists()) {
        // Initialize with default values for safety
        await setDoc(projectRef, {
          name: projectName,
          type: "project_stats",
          views: eventName === "Project Viewed" ? 1 : 0,
          demoClicks: eventName === "View Live Demo" ? 1 : 0,
          githubClicks: eventName === "GitHub Repo Click" ? 1 : 0,
          totalTimeSpentMs:
            eventName === "Project Time Spent" ? metadata.durationMs || 0 : 0,
          timeSpentCount: eventName === "Project Time Spent" ? 1 : 0,
        });
      } else {
        await updateDoc(projectRef, updateData);
      }
    }

    // 5. Generate Notifications based on specific events
    let notificationMessage = "";
    let notificationType = "";

    if (eventName === "Resume Download") {
      notificationMessage = "🔔 Resume downloaded!";
      notificationType = "resume_download";
    } else if (eventName === "Contact Form Submission") {
      notificationMessage = "🔔 New message received!";
      notificationType = "new_message";
    } else if (eventName === "Social Link Click" && metadata?.platform === "LinkedIn") {
      notificationMessage = "🔔 New visitor from LinkedIn!";
      notificationType = "linkedin_visit";
    }

    if (notificationMessage && notificationType) {
      await addDoc(collection(db, "notifications"), {
        message: notificationMessage,
        type: notificationType,
        timestamp: serverTimestamp(),
        read: false,
        metadata: {
          eventName,
          visitorId,
          sessionId,
          ...metadata,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Firestore event tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track event", details: error.message },
      { status: 500 },
    );
  }
}
