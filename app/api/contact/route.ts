import { NextResponse } from "next/server";
import { identity } from "@/data/content";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, _hp } = body;

    // Honeypot check for bots
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const targetEndpoint =
      process.env.FORM_ENDPOINT ||
      process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
      `https://formsubmit.co/ajax/${identity.email}`;

    const host = req.headers.get("host") || "localhost:3000";
    const origin = req.headers.get("origin") || `http://${host}`;

    const res = await fetch(targetEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/#contact`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `New Portfolio Message from ${name} (${email})`,
        _captcha: "false",
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || (data && data.success === "false")) {
      const msg = data?.message || "Failed to deliver message via form endpoint.";
      return NextResponse.json(
        {
          success: false,
          needsActivation: msg.toLowerCase().includes("activation"),
          message: msg,
        },
        { status: 200 } // return 200 with success: false so client can display custom guidance
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message delivered successfully to inbox.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { success: false, message: errorMsg },
      { status: 500 }
    );
  }
}
