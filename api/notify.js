// Vercel Serverless Function — texts the owner when a new quote lead arrives.
//
// SECURITY: this file contains NO secrets. The Twilio credentials are read from
// Vercel Environment Variables at runtime. Set these in the Vercel dashboard
// (Project → Settings → Environment Variables), NEVER in the repo:
//   TWILIO_ACCOUNT_SID   your Account SID (starts with AC…)
//   TWILIO_AUTH_TOKEN    your Auth Token   (SECRET — rotate if ever exposed)
//   TWILIO_FROM          your Twilio phone number, e.g. +15551234567
//   NOTIFY_TO            the mobile that should get the alert, e.g. +13157754078
//
// The quote form calls this best-effort: if the env vars aren't set yet, it
// no-ops gracefully so the email lead-capture (Web3Forms) still works on its own.

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, NOTIFY_TO } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM || !NOTIFY_TO) {
    // Not configured yet — don't error the user's submission.
    res.status(200).json({ ok: false, skipped: true, reason: "Twilio env vars not set" });
    return;
  }

  try {
    const b = (req.body && typeof req.body === "object") ? req.body : {};
    const line = (label, v) => (v ? `${label}: ${v}\n` : "");
    const body =
      "🧽 New McSqueaky lead!\n" +
      line("Name", b.name) +
      line("Service", b.service) +
      line("Phone", b.phone) +
      line("Email", b.email) +
      line("City", b.city) +
      line("Plan", b.cadence) +
      line("Timing", b.timing);

    const params = new URLSearchParams({ To: NOTIFY_TO, From: TWILIO_FROM, Body: body.trim() });
    const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");

    const tw = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );
    const data = await tw.json();
    if (!tw.ok) {
      res.status(200).json({ ok: false, error: data.message || "Twilio error" });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e) });
  }
};
