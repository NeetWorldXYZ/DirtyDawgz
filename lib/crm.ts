/**
 * Push website quote requests into the Dirty Dawgz CRM.
 *
 * Called server-side from /api/quote, alongside the existing PDF email. That
 * ordering matters: the email is the behaviour the business already relies on,
 * so nothing here is allowed to break it. Every failure is swallowed and
 * logged - a CRM outage must never cost a real enquiry.
 *
 * Server-to-server, so there is no CORS involved and the browser never sees
 * the CRM's address.
 */

import { CLICK_ID_FIELDS, UTM_FIELDS, clampField } from "@/lib/attribution";

const CRM_ENDPOINT =
  process.env.CRM_LEAD_ENDPOINT ||
  "https://app.dirtydawgzovencleaning.com/api/public/lead-form";

/**
 * The service-specific answers, folded into one readable block.
 *
 * These are the questions that decide the price - deck count, trap size, hood
 * length - so they belong on the lead itself rather than only in an email
 * attachment nobody can search.
 */
function buildDetails(data: any): string {
  const blocks: string[] = [];

  const section = (title: string, rows: [string, unknown][]) => {
    const filled = rows.filter(([, v]) => v != null && String(v).trim() !== "");
    if (filled.length === 0) return;
    blocks.push(
      `${title}\n` + filled.map(([label, v]) => `  ${label}: ${v}`).join("\n")
    );
  };

  section("Conveyor oven", [
    ["Brand", data.ovenBrand],
    ["Model", data.ovenModel],
    ["Decks", data.ovenCount],
    ["Last cleaned", data.ovenLastCleaned],
    ["Notes", data.ovenNotes],
  ]);

  section("Grease trap", [
    ["Size", data.trapSize],
    ["Location", data.trapLocation],
    ["Last cleaned", data.trapLastCleaned],
    ["Current issues", data.trapIssues],
    ["Notes", data.trapNotes],
  ]);

  section("Hood vent", [
    ["Type", data.hoodType],
    ["Approx length", data.hoodLength],
    ["Last cleaned", data.hoodLastCleaned],
    ["Filters", data.hoodFilters],
    ["Rooftop access", data.hoodRoofAccess],
    ["Notes", data.hoodNotes],
  ]);

  section("Other service requested", [["Details", data.otherDetails]]);

  section("Recurring service plan", [
    ["Interested", data.servicePlanInterest === "Yes" ? "Yes" : ""],
  ]);

  section("Scheduling preference", [
    ["Preferred date", data.preferredDate],
    ["Preferred time", data.preferredTime],
  ]);

  section("Site", [
    ["Number of locations", data.numberOfLocations],
    [
      "Photos attached",
      Array.isArray(data.photos) && data.photos.length > 0
        ? `${data.photos.length} (see the emailed PDF)`
        : "",
    ],
  ]);

  if (data.additionalNotes) blocks.push(`Additional notes\n  ${data.additionalNotes}`);

  return blocks.join("\n\n");
}

/**
 * Google Ads click IDs and campaign tags, clamped to the lengths the CRM's
 * schema accepts. Absent fields are simply left off: a direct visitor posts
 * exactly the payload they always did.
 */
function attributionFields(data: any): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of [...CLICK_ID_FIELDS, ...UTM_FIELDS]) {
    const value = clampField(key, data[key]);
    if (value) out[key] = value;
  }
  return out;
}

export async function sendLeadToCrm(
  data: any,
  context: { page?: string | null; referrer?: string | null } = {}
): Promise<{ ok: boolean; reason?: string }> {
  // The CRM needs something to name the business by. A sole trader may leave
  // the business field blank, so fall back rather than dropping the lead.
  const company =
    (data.business || "").trim() ||
    (data.name || "").trim() ||
    (data.email || "").trim() ||
    "Website enquiry";

  const payload = {
    company,
    contact_name: data.name || undefined,
    email: data.email || undefined,
    phone: data.phone || undefined,
    address: data.address || undefined,
    city: data.city || undefined,
    state: data.state || "MI",
    postal_code: data.zip || undefined,
    services: Array.isArray(data.services)
      ? data.services
      : data.services
        ? [String(data.services)]
        : undefined,
    message: buildDetails(data) || undefined,
    // The landing page the visitor was tagged on beats the referer header,
    // which only ever reports the page the form happened to sit on.
    page: clampField("page", data.page) || clampField("page", context.page) || undefined,
    referrer:
      clampField("referrer", data.referrer) || clampField("referrer", context.referrer) || undefined,
    ...attributionFields(data),
    // Deliberately no submission_id and nothing time-based in the payload:
    // the CRM falls back to hashing the body, so a retry of the same
    // submission resolves to the same lead instead of creating a second.
  };

  try {
    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`CRM lead push failed (${res.status}): ${body.slice(0, 500)}`);
      return { ok: false, reason: `CRM returned ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("CRM lead push failed:", err);
    return { ok: false, reason: err instanceof Error ? err.message : "unreachable" };
  }
}
