import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { POST } from "../app/api/reservations/route.ts";

let directory;
const originalDirectory = process.env.BOOKING_DATA_DIR;
before(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), "voyageplus-test-"));
  process.env.BOOKING_DATA_DIR = directory;
});
after(async () => {
  if (originalDirectory === undefined) delete process.env.BOOKING_DATA_DIR;
  else process.env.BOOKING_DATA_DIR = originalDirectory;
  await rm(directory, { recursive: true, force: true });
});
const details = () => ({
  category: "transfers",
  experience: "Private transfer",
  pickup: "Airport",
  destination: "Hotel",
  date: "2099-06-15",
  passengers: "2",
  name: "Test Traveller",
  email: "traveller@example.com",
  phone: "+1 555 010 1234",
  notes: "Test enquiry",
  consent: "yes",
});
const request = (body, headers = {}) =>
  new Request("http://localhost:3000/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("persists a pending request and returns only its unique reference", async () => {
  const response = await POST(request(details()));
  assert.equal(response.status, 201);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const result = await response.json();
  assert.match(result.reference, /^VP-[A-F0-9]{12}$/);
  assert.equal(result.status, "pending");
  assert.equal(result.email, undefined);
  const records = (
    await readFile(path.join(directory, "reservations.ndjson"), "utf8")
  )
    .trim()
    .split("\n")
    .map(JSON.parse);
  const record = records.find((item) => item.reference === result.reference);
  assert.equal(record.email, details().email);
  assert.equal(record.passengers, 2);
  assert.equal(record.status, "pending");
});
test("rejects invalid email and out-of-range passenger counts", async () => {
  for (const change of [
    { email: "invalid" },
    { passengers: "0" },
    { passengers: "17" },
    { passengers: "1.5" },
  ]) {
    assert.equal(
      (await POST(request({ ...details(), ...change }))).status,
      400,
    );
  }
});
test("rejects past or impossible dates", async () => {
  for (const date of ["2020-01-01", "2099-02-31", "not-a-date"]) {
    assert.equal((await POST(request({ ...details(), date }))).status, 400);
  }
});
test("requires consent and recognized service category", async () => {
  assert.equal(
    (await POST(request({ ...details(), consent: "no" }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ ...details(), category: "unknown" }))).status,
    400,
  );
});
test("rejects missing locations, invalid phone and oversized notes", async () => {
  for (const change of [
    { pickup: " " },
    { destination: "" },
    { phone: "abcdef" },
    { notes: "x".repeat(2001) },
  ]) {
    assert.equal(
      (await POST(request({ ...details(), ...change }))).status,
      400,
    );
  }
});
test("rejects malformed JSON and non-object payloads", async () => {
  for (const payload of ["{", "null", "[]", '"text"'])
    assert.equal((await POST(request(payload))).status, 400);
});
test("rejects cross-origin submissions and unsupported content types", async () => {
  assert.equal(
    (await POST(request(details(), { Origin: "https://unrelated.example" })))
      .status,
    403,
  );
  assert.equal(
    (await POST(request(details(), { "Content-Type": "text/plain" }))).status,
    415,
  );
});
test("enforces the payload limit even without a content-length header", async () => {
  assert.equal(
    (await POST(request({ ...details(), notes: "x".repeat(17000) }))).status,
    413,
  );
});
test("concurrent requests receive distinct references and intact records", async () => {
  const results = await Promise.all(
    Array.from({ length: 5 }, async () => {
      const response = await POST(request(details()));
      assert.equal(response.status, 201);
      return response.json();
    }),
  );
  assert.equal(new Set(results.map((item) => item.reference)).size, 5);
  const records = (
    await readFile(path.join(directory, "reservations.ndjson"), "utf8")
  )
    .trim()
    .split("\n")
    .map(JSON.parse);
  for (const result of results)
    assert.equal(
      records.filter((item) => item.reference === result.reference).length,
      1,
    );
});

test("accepts the incoming host when Next normalizes the internal URL", async () => {
  assert.equal(
    (
      await POST(
        request(details(), {
          Host: "127.0.0.1:3000",
          Origin: "http://127.0.0.1:3000",
        }),
      )
    ).status,
    201,
  );
  assert.equal(
    (await POST(request(details(), { Origin: "invalid-origin" }))).status,
    403,
  );
});
