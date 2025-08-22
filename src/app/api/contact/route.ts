import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

export const runtime = "nodejs"; // Ensure Node.js runtime for Resend SDK

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  return Response.json({
    ok: true,
    hint: "POST name, email, message to this endpoint",
  });
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { ok: false, error: "RESEND_API_KEY is not set. Add it to .env.local" },
        { status: 500 }
      );
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }
    const from = "Portfolio Contact <onboarding@resend.dev>";
    const { data, error } = await resend.emails.send({
      from,
      to: ["samy.alliche.22@gmail.com"], // Your inbox
      subject: `New message from ${name}(${email})`,
      replyTo: email,
      // text: `From: ${name} <${email}>\n\n${message}`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ ok: false, error }, { status: 502 });
    }

    return Response.json({ ok: true, data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("/api/contact POST error:", err);
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}
