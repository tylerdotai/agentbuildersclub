import { NextResponse } from "next/server";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const FALLBACK_ACCESS_KEY = "951a1825-4a6d-446b-a043-d2d633e03415";

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.includes("@");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ??
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
      FALLBACK_ACCESS_KEY;

    const upstreamResponse = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        email,
        subject: "New ClawPlex Newsletter Signup",
      }),
    });

    const data = (await upstreamResponse.json()) as { success?: boolean; message?: string };

    if (!upstreamResponse.ok || !data.success) {
      return NextResponse.json(
        { error: data.message ?? "Subscription failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "web3forms" });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
