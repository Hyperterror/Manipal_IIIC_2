import { NextRequest, NextResponse } from "next/server";

// Make sure your backend URL is correct
const BACKEND_URL = "http://127.0.0.1:8000/ask";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, role } = body;

    if (!question || !role) {
      return NextResponse.json({ error: "Missing question or role" }, { status: 400 });
    }

    // Forward the request to Python FastAPI backend
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, role }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Backend error" }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({ answer: data.answer });
  } catch (err) {
    console.error("Error in route.ts:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
