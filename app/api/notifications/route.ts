import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseClient";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const notifLimit = limitParam ? parseInt(limitParam) : 20;

    const q = query(
      collection(db, "notifications"),
      orderBy("timestamp", "desc"),
      limit(notifLimit),
    );

    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(notifications);
  } catch (error: any) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications", details: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid notification IDs provided" },
        { status: 400 },
      );
    }

    const batch = ids.map((id) => {
      const notifRef = doc(db, "notifications", id);
      return updateDoc(notifRef, { read: true });
    });

    await Promise.all(batch);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to update notifications:", error);
    return NextResponse.json(
      { error: "Failed to update notifications", details: error.message },
      { status: 500 },
    );
  }
}
