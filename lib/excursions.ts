import activities from "./excursions-data.json" with { type: "json" };

const descriptions: Record<number, string> = {
  1: "Évadez-vous de Marrakech le temps d’une journée dans la vallée de l’Ourika. Retrouvez les villages berbères, une coopérative d’argan et les cascades de Setti Fatma, dans les paysages de l’Atlas.",
  2: "Consacrez une journée aux cascades d’Ouzoud et à leur cadre d’oliveraies. La découverte associe les chutes, la barque et l’observation des singes magots présents dans la région, selon le programme convenu.",
  3: "Partez à la découverte d’Imlil et du parc national du Toubkal. Cette journée réunit randonnée guidée, village d’Aroumd, déjeuner berbère et panoramas sur l’Atlas. Le parcours de marche sera adapté avec l’agence.",
  4: "Depuis Marrakech, traversez les paysages du Haut Atlas par le col Tizi n’Tichka pour découvrir Aït Ben Haddou et Ouarzazate. Les points forts du programme associent le ksar et l’univers des studios de cinéma.",
  5: "Une journée privée vers Essaouira pour découvrir sa médina, son port de pêche et ses souks. Profitez de l’atmosphère de la côte atlantique lors d’une excursion au départ de Marrakech.",
  6: "Rejoignez Oukaimeden pour une journée au grand air dans l’Atlas. Le programme s’oriente vers le ski en hiver ou la randonnée en été, selon la saison et les conditions sur place.",
  7: "Découvrez les paysages pierreux d’Agafay dans la lumière du soir. Cette demi-journée met à l’honneur le coucher de soleil, une promenade à dromadaire et un dîner sous les étoiles, selon le programme retenu.",
  8: "Prenez de la hauteur au lever du soleil avec un vol en montgolfière au-dessus de la palmeraie et des paysages de l’Atlas. Le programme prévoit un décollage avant l’aube et un petit-déjeuner berbère.",
  9: "Retrouvez la palmeraie de Marrakech pour une demi-journée entre pistes de quad et promenade à dromadaire parmi les palmiers. Une pause autour d’un thé berbère complète les points forts du programme.",
  10: "Une demi-journée autour de trois douars berbères pour découvrir les savoir-faire locaux. Tissage, poterie, déjeuner chez l’habitant et artisanat en direct des producteurs composent les points forts de cette rencontre.",
};

export const excursions = activities.map((excursion) => ({
  ...excursion,
  description: descriptions[excursion.id],
}));

export type Excursion = (typeof excursions)[number];
export const excursionCategories = [...new Set(excursions.map((excursion) => excursion.category))];

export function excursionWhatsAppUrl(
  excursion: Excursion,
  details: { fullName: string; description: string; date: string; passengers: string },
) {
  const message = [
    "Bonjour, je souhaite réserver cette excursion privée :",
    excursion.title,
    `Référence de l’excursion : ${excursion.slug}`,
    `Durée : ${excursion.duration}`,
    `Départ : ${excursion.departure}`,
    `Tarif : à partir de ${excursion.price} € (base tarifaire à confirmer)`,
    `Points forts : ${excursion.highlights.join(" · ")}`,
    `Nom complet : ${details.fullName.trim()}`,
    `Date souhaitée : ${details.date}`,
    `Voyageurs : ${details.passengers}`,
    `Description : ${details.description.trim() || "Aucune précision supplémentaire"}`,
    "Merci de confirmer la disponibilité, les prestations et le prix pour notre groupe.",
  ].join("\n");
  return `https://wa.me/212655407529?text=${encodeURIComponent(message)}`;
}
