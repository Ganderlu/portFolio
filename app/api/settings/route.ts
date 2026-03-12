import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

export async function GET() {
  try {
    const docRef = doc(db, "settings", "site");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json({
        siteName: "",
        email: "",
        github: "",
        linkedin: "",
        twitter: "",
        facebook: "",
        whatsapp: "",
        letsconnet: "",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch settings", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const docRef = doc(db, "settings", "site");
    await setDoc(docRef, data, { merge: true });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update settings", details: error.message },
      { status: 500 },
    );
  }
}
