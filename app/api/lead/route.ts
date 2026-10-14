import { NextResponse } from "next/server";
import { Resend } from "resend";
import { leadApiSchema, type LeadApiValues } from "@/lib/leadSchema";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function buildHtml(data: LeadApiValues): string {
  const rows: Array<[string, string]> = [
    ["Source", data.source],
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["City", data.city || "—"],
    ["Service", data.service || "—"],
    ["Preferred date", data.preferredDate || "—"],
    ["Preferred time", data.preferredTime || "—"],
    ["Message", data.message || "—"],
  ];
  if (data.answers) {
    rows.push(["Quiz answers", data.answers]);
  }

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#8a6d1f;white-space:nowrap;vertical-align:top">${escapeHtml(
          label
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#222">${escapeHtml(
          value
        ).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#0a0a0a;padding:24px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">
      <div style="background:#0a0a0a;padding:20px 24px;border-bottom:3px solid #d4af37">
        <p style="margin:0;color:#d4af37;font-size:18px;letter-spacing:2px">${escapeHtml(
          siteConfig.name.toUpperCase()
        )}</p>
        <p style="margin:4px 0 0;color:#a39e93;font-size:12px">New ${escapeHtml(
          data.source
        )} enquiry</p>
      </div>
      <table style="width:100%;border-collapse:collapse">${body}</table>
      <div style="padding:16px 24px;color:#888;font-size:11px">${escapeHtml(
        siteConfig.disclaimer
      )}</div>
    </div>
  </body></html>`;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid submission" },
      { status: 400 }
    );
  }

  const consentValue = String(form.get("consent") ?? "").toLowerCase();
  const raw = {
    name: String(form.get("name") ?? ""),
    phone: String(form.get("phone") ?? ""),
    email: String(form.get("email") ?? ""),
    city: String(form.get("city") ?? ""),
    service: String(form.get("service") ?? ""),
    preferredDate: String(form.get("preferredDate") ?? ""),
    preferredTime: String(form.get("preferredTime") ?? ""),
    message: String(form.get("message") ?? ""),
    consent: ["true", "on", "1", "yes"].includes(consentValue),
    source: String(form.get("source") ?? "booking"),
    answers: String(form.get("answers") ?? ""),
  };

  const parsed = leadApiSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const attachments: { filename: string; content: Buffer }[] = [];
  const photo = form.get("photo");
  if (photo && typeof photo !== "string" && photo.size > 0) {
    if (photo.size <= MAX_ATTACHMENT_BYTES) {
      const buffer = Buffer.from(await photo.arrayBuffer());
      attachments.push({
        filename: photo.name || "photo.jpg",
        content: buffer,
      });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "Dermolyxa <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      reason: "email_not_configured",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New ${data.source} enquiry — ${data.name}`,
      html: buildHtml(data),
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, delivered: false, error: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        error: error instanceof Error ? error.message : "Send failed",
      },
      { status: 500 }
    );
  }
}
