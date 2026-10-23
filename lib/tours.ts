import circuits from "./tours-data.json" with { type: "json" };

const descriptions: Record<number, string> = {
  1: "Une journée privée au départ de Marrakech pour retrouver les remparts, le port et l’atmosphère maritime d’Essaouira. Le circuit revient à Marrakech après cette parenthèse sur la côte atlantique.",
  2: "Partez de Marrakech vers les paysages du Haut Atlas par le Tizi n’Tichka, puis découvrez l’axe Aït Ben Haddou–Ouarzazate. Une excursion d’une journée, avec retour à Marrakech.",
  3: "Consacrez une journée à Chefchaouen, la ville bleue des montagnes du Rif. Le départ s’organise depuis Tanger ou Fès, avec un retour dont les modalités seront précisées avec l’agence.",
  4: "Une demi-journée pour découvrir Casablanca autour de Hassan II, de la Corniche, de la Médina et des Habous. Le programme privé s’adapte à votre rythme et aux visites convenues avec l’agence.",
  5: "Reliez Casablanca à Marrakech lors d’une journée privée, avec la possibilité d’organiser des arrêts sur votre parcours. Les étapes optionnelles et votre point d’arrivée à Marrakech sont à convenir lors du devis.",
  6: "Un circuit privé de deux jours reliant Fès à Chefchaouen. Passez des ambiances de la ville impériale aux ruelles bleues du Rif, avec un programme à personnaliser selon votre groupe.",
  7: "Trois jours au départ et au retour de Marrakech, en passant par Aït Ben Haddou, le Dadès, le Todra et Merzouga. Un itinéraire qui associe architecture de terre, vallées et paysages du Sahara.",
  8: "Rejoignez Fès depuis Marrakech en trois jours, avec un itinéraire par Aït Ben Haddou, Merzouga et Ifrane. Une traversée privée pour relier les paysages du Sud à ceux du Moyen Atlas.",
  9: "Un circuit de trois jours de Fès à Marrakech, via le Ziz, Merzouga, le Dadès, le Todra et Aït Ben Haddou. Le parcours rassemble oasis, reliefs et patrimoine du Sud marocain.",
  10: "Quatre jours en circuit privé depuis Marrakech et retour à Marrakech, par Aït Ben Haddou, Ouarzazate, le Dadès et Merzouga. Organisez les étapes de votre découverte du Sahara selon les besoins de votre groupe.",
  11: "De Tanger à Marrakech en cinq jours, reliez Chefchaouen, Fès, Merzouga, le Dadès et Aït Ben Haddou. Un itinéraire privé du nord vers le sud, entre villes, montagnes et paysages sahariens.",
  12: "Un circuit de six jours de Marrakech à Chefchaouen, via Aït Ben Haddou, Merzouga et Fès. Associez les paysages du Sahara, le patrimoine de Fès et les ruelles bleues du Rif.",
  13: "Une boucle de sept jours au départ de Marrakech, par Aït Ben Haddou, Merzouga, le Todra et Ouarzazate avant le retour. Le rythme et l’organisation des étapes se construisent avec l’agence.",
  14: "Huit jours pour une boucle privée depuis Marrakech, avec Aït Ben Haddou, Merzouga, le Todra, Fès et Ifrane. Un circuit qui relie les paysages du Sahara et le patrimoine d’une ville impériale.",
  15: "Reliez Casablanca à Marrakech en huit jours via Rabat, Meknès, Volubilis, Fès, Merzouga et le Dadès. Un parcours entre patrimoine des villes, vestiges antiques et horizons du Sud.",
  16: "Neuf jours de Marrakech à Casablanca, via Aït Ben Haddou, Merzouga, Fès, Chefchaouen et Rabat. Personnalisez ce circuit qui associe Sahara, villes historiques et montagnes du Rif.",
  17: "Un circuit de neuf jours de Casablanca à Marrakech, par Rabat, Meknès, Fès, Ifrane, Merzouga et le Dadès. Découvrez les contrastes du Maroc, des villes impériales aux reliefs et au désert.",
  18: "Dix jours de Casablanca à Marrakech en passant par Rabat, Meknès, Fès, Merzouga, le Dadès et Aït Ben Haddou. Un grand circuit privé réunissant villes impériales et paysages du Sahara.",
};

export const tours = circuits.map((tour) => ({
  ...tour,
  duration: tour.days === 0.5 ? "½ journée" : `${tour.days} jour${tour.days > 1 ? "s" : ""}`,
  departure: tour.id === 4 ? "Casablanca" : tour.itinerary.split("→")[0].trim(),
  description: descriptions[tour.id],
}));

export type Tour = (typeof tours)[number];
export const tourCategories = [...new Set(tours.map((tour) => tour.category))];

export function tourWhatsAppUrl(
  tour: Tour,
  details: { fullName: string; description: string; date: string; passengers: string },
) {
  const message = [
    "Bonjour, je souhaite réserver ce tour privé et recevoir un devis :",
    tour.title,
    `Référence du circuit : ${tour.slug}`,
    `Durée : ${tour.duration}`,
    `Itinéraire : ${tour.itinerary}`,
    "Tarif : sur devis · Véhicule privé · Sur mesure selon le groupe",
    `Nom complet : ${details.fullName.trim()}`,
    `Date de départ souhaitée : ${details.date}`,
    `Voyageurs : ${details.passengers}`,
    `Description : ${details.description.trim() || "Aucune précision supplémentaire"}`,
    "Merci de confirmer le programme, les prestations, le prix et la disponibilité.",
  ].join("\n");
  return `https://wa.me/212655407529?text=${encodeURIComponent(message)}`;
}
