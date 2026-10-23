import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { tours, tourWhatsAppUrl } from "../lib/tours.ts";

test("all 18 tours preserve the supplied names, categories, durations and itineraries", async () => {
  const source = await readFile(new URL("../tours.txt", import.meta.url), "utf8");
  const rows = [...source.matchAll(/^\s*(\d+)\s{2,}(.+?)\s{2,}(\d+|½)\s+j\s+(.+)$/gm)];
  assert.equal(tours.length, 18);
  assert.equal(tours.length, rows.length);
  assert.equal(new Set(tours.map((tour) => tour.slug)).size, rows.length);
  assert.deepEqual(tours.reduce((counts, tour) => {
    counts[tour.category] = (counts[tour.category] || 0) + 1;
    return counts;
  }, {}), { EXCURSIONS: 5, "CIRCUITS COURTS": 7, "GRANDS CIRCUITS": 6 });
  for (const [, id, title, days, itinerary] of rows) {
    const tour = tours.find((item) => item.id === Number(id));
    assert.ok(tour);
    assert.equal(tour.title, title.trim());
    assert.equal(tour.days, days === "½" ? 0.5 : Number(days));
    assert.equal(tour.itinerary, itinerary.trim());
    assert.equal(tour.price, undefined, "quoted tours must not invent numeric prices");
    assert.ok(tour.description.length > 60);
  }
  assert.equal(tours.find((tour) => tour.id === 4).duration, "½ journée");
  assert.equal(tours.at(-1).duration, "10 jours");
});

test("WhatsApp includes the exact selected tour, quote request and encoded traveller details", () => {
  for (const tour of [tours[3], tours.at(-1)]) {
    const url = new URL(tourWhatsAppUrl(tour, {
      fullName: "  Fatima & Ali  ", date: "2099-06-15", passengers: "4",
      description: "Riad #2 & bagages + enfants\nÉtapes sur mesure",
    }));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/212655407529");
    assert.equal(url.searchParams.size, 1);
    const message = url.searchParams.get("text");
    for (const text of [tour.title, tour.slug, tour.duration, tour.itinerary, "Tarif : sur devis", "Nom complet : Fatima & Ali", "2099-06-15", "Voyageurs : 4", "Riad #2 & bagages + enfants\nÉtapes sur mesure"]) assert.ok(message.includes(text), text);
    assert.ok(!message.includes("€"));
  }
});

test("every tour has its own generated local WebP photograph", async () => {
  assert.equal(new Set(tours.map((tour) => tour.image)).size, tours.length);
  for (const tour of tours) {
    const image = await readFile(new URL(`../public${tour.image}`, import.meta.url));
    assert.equal(image.subarray(0, 4).toString(), "RIFF");
    assert.equal(image.subarray(8, 12).toString(), "WEBP");
  }
});
