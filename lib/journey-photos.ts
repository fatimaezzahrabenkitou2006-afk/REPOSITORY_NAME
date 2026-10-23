import routes from "./transfers-data.json" with { type: "json" };

const destinationImages = new Map(routes.map((route) => [route.to, route.image]));
destinationImages.set("Marrakech", "/images/tours/casablanca-marrakech-journee-privee.webp");
const aliases: Record<string, string> = { "Dadès": "Vallée du Dadès", "Todra": "Gorges du Todra" };

export function journeyPhotos(itinerary: string) {
  const used = new Set<string>();
  return itinerary.split("→").flatMap((stop) => {
    const label = stop.trim();
    const src = destinationImages.get(aliases[label] || label);
    if (!src || used.has(src)) return [];
    used.add(src);
    return [{ src, label }];
  }).slice(0, 3);
}
