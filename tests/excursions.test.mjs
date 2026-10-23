import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { excursions, excursionWhatsAppUrl } from "../lib/excursions.ts";

test("all 10 excursions preserve source titles, prices, durations and highlights", async () => {
  const source = await readFile(new URL("../excursions.txt", import.meta.url), "utf8");
  const rows = [...source.matchAll(/^(.+?)\s+(Journée|Demi-j\.)\s+à partir de\s+€(\d+)\s+(.+)$/gm)];
  assert.equal(excursions.length, 10);
  assert.equal(excursions.length, rows.length);
  assert.equal(new Set(excursions.map((item) => item.slug)).size, rows.length);
  assert.equal(excursions.filter((item) => item.category === "JOURNÉES COMPLÈTES").length, 6);
  assert.equal(excursions.filter((item) => item.category === "DEMI-JOURNÉES").length, 4);
  for (const [, title, duration, price, highlights] of rows) {
    const excursion = excursions.find((item) => item.title === title.trim());
    assert.ok(excursion, title);
    assert.equal(excursion.price, Number(price));
    assert.equal(excursion.duration, duration === "Demi-j." ? "Demi-journée" : duration);
    assert.deepEqual(excursion.highlights, highlights.trim().split(" · "));
    assert.equal(excursion.departure, "Marrakech");
    assert.ok(excursion.description.length > 60);
  }
});

test("WhatsApp sends the selected excursion and starting price without inventing a pricing unit", () => {
  for (const excursion of [excursions[0], excursions[7], excursions.at(-1)]) {
    const url = new URL(excursionWhatsAppUrl(excursion, {
      fullName: "  Fatima & Ali  ", date: "2099-06-15", passengers: "4",
      description: "Riad #2 & bagages + enfants\nActivités souhaitées",
    }));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/212655407529");
    assert.equal(url.searchParams.size, 1);
    const message = url.searchParams.get("text");
    for (const text of [excursion.title, excursion.slug, excursion.duration, `à partir de ${excursion.price} €`, "Départ : Marrakech", "Nom complet : Fatima & Ali", "2099-06-15", "Voyageurs : 4", "Riad #2 & bagages + enfants\nActivités souhaitées", ...excursion.highlights]) assert.ok(message.includes(text), text);
    assert.ok(!message.includes("par personne"));
    assert.ok(!message.includes("par véhicule"));
  }
});

test("every excursion has a generated local WebP photograph", async () => {
  assert.equal(new Set(excursions.map((item) => item.image)).size, excursions.length);
  for (const excursion of excursions) {
    const image = await readFile(new URL(`../public${excursion.image}`, import.meta.url));
    assert.equal(image.subarray(0, 4).toString(), "RIFF");
    assert.equal(image.subarray(8, 12).toString(), "WEBP");
  }
});
