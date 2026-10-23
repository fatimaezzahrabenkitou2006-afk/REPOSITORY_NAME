import { appendFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next.js may normalize request.url to localhost. Check the actual incoming
  // Host header so valid same-host submissions also work behind a reverse proxy.
  const host = request.headers.get("host") || new URL(request.url).host;
  let sameHost = !origin;
  try {
    if (origin) {
      const source = new URL(origin);
      sameHost =
        ["https:", "http:"].includes(source.protocol) && source.host === host;
    }
  } catch {
    sameHost = false;
  }
  if (!sameHost) {
    return Response.json(
      { error: "Please submit your request from the Visit Morocco website." },
      { status: 403 },
    );
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json(
      { error: "A JSON request is required." },
      { status: 415 },
    );
  }
  // Bound streamed input as well as declared lengths; never persist arbitrary payloads.
  const reader = request.body?.getReader();
  if (!reader)
    return Response.json(
      { error: "Your travel details are missing." },
      { status: 400 },
    );
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16_384) {
      await reader.cancel();
      return Response.json(
        { error: "Your request is too large." },
        { status: 413 },
      );
    }
    chunks.push(value);
  }
  let input: Record<string, unknown>;
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error("Invalid request");
    input = parsed;
  } catch {
    return Response.json(
      { error: "Please check your travel details and try again." },
      { status: 400 },
    );
  }
  const text = (key: string, max: number) =>
    typeof input[key] === "string" && input[key].trim().length <= max
      ? input[key].trim()
      : "";
  const name = text("name", 100),
    email = text("email", 254),
    phone = text("phone", 30);
  const pickup = text("pickup", 150),
    destination = text("destination", 150),
    date = text("date", 10);
  const category = text("category", 20),
    experience = text("experience", 100),
    notes = text("notes", 2000);
  const passengers = Number(input.passengers);
  const selectedDate = new Date(`${date}T00:00:00Z`);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[+\d\s().-]{6,30}$/.test(phone) ||
    !pickup ||
    !destination ||
    !experience ||
    !["transfers", "tours", "excursions", "fleet"].includes(category) ||
    !Number.isInteger(passengers) ||
    passengers < 1 ||
    passengers > 16 ||
    input.consent !== "yes" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(selectedDate.getTime()) ||
    selectedDate.toISOString().slice(0, 10) !== date ||
    selectedDate < today ||
    (typeof input.notes === "string" && input.notes.length > 2000)
  ) {
    return Response.json(
      {
        error:
          "Please provide valid contact details, locations, a current or future date, 1–16 passengers and your consent.",
      },
      { status: 400 },
    );
  }
  const reference = `VP-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
  const reservation = {
    reference,
    status: "pending",
    createdAt: new Date().toISOString(),
    category,
    experience,
    pickup,
    destination,
    date,
    passengers,
    name,
    email,
    phone,
    notes,
    consent: true,
  };
  try {
    const directory =
      process.env.BOOKING_DATA_DIR || path.join(process.cwd(), ".data");
    await mkdir(directory, { recursive: true, mode: 0o700 });
    await appendFile(
      path.join(directory, "reservations.ndjson"),
      `${JSON.stringify(reservation)}\n`,
      { mode: 0o600 },
    );
    return Response.json(
      { reference, status: "pending" },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      {
        error:
          "We couldn’t save your request right now. Please try again shortly.",
      },
      { status: 503 },
    );
  }
}
