import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { transfers, transferWhatsAppUrl } from "../lib/transfers.ts";

test("the catalogue preserves every source route and its exact price", async () => {
  const source = await readFile(new URL("../transfers.txt", import.meta.url), "utf8");
  const rows = [...source.matchAll(/^(.+?)\s*→\s*(.+?)\s+€(\d+)/gm)];
  assert.equal(transfers.length, rows.length);
  assert.equal(new Set(transfers.map((route) => route.slug)).size, rows.length);
  for (const [, from, to, price] of rows) {
    const route = transfers.find((item) => item.from === from.trim() && item.to === to.trim());
    assert.ok(route, `${from} → ${to} is missing`);
    assert.equal(route.price, Number(price));
    assert.ok(route.description.length > 60);
  }
});

test("WhatsApp sends the exact selected route and safely encodes traveller details", () => {
  for (const route of [transfers[0], transfers.at(-1)]) {
    const url = new URL(transferWhatsAppUrl(route, {
      fullName: "  Fatima & Ali  ",
      date: "2027-04-15",
      passengers: "3",
      description: "Prise en charge : Riad #2 & bagages + poussette\nVol AT123",
    }));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/212655407529");
    const message = url.searchParams.get("text");
    assert.ok(message.includes(`${route.from} → ${route.to}`));
    assert.ok(message.includes(route.slug));
    assert.ok(message.includes(`${route.price} € / véhicule / aller simple`));
    assert.ok(message.includes("Nom complet : Fatima & Ali"));
    assert.ok(message.includes("Date : 2027-04-15"));
    assert.ok(message.includes("Passagers : 3"));
    assert.ok(message.includes("Riad #2 & bagages + poussette\nVol AT123"));
    assert.equal(url.searchParams.size, 1);
  }
});

test("each destination has a generated local image", async () => {
  for (const image of new Set(transfers.map((route) => route.image))) {
    const data = await readFile(new URL(`../public${image}`, import.meta.url));
    assert.equal(data.subarray(0, 4).toString(), "RIFF");
    assert.equal(data.subarray(8, 12).toString(), "WEBP");
  }
});
