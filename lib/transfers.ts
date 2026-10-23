import routes from "./transfers-data.json" with { type: "json" };

const destinationDescriptions: Record<string, string> = {
  "Aéroport Marrakech Menara": "Rejoignez l’aéroport Marrakech Menara depuis votre adresse à Marrakech. Précisez votre heure de vol et votre lieu de départ pour organiser votre prise en charge.",
  "Aéroport Mohammed V (Casablanca)": "Organisez votre trajet vers l’aéroport Mohammed V, aux portes de Casablanca. Indiquez votre terminal et l’heure de votre vol afin de préparer votre départ.",
  "Aéroport Agadir Al Massira": "Rejoignez l’aéroport Agadir Al Massira en transfert privé. Communiquez votre numéro de vol et vos horaires lors de votre demande.",
  "Aéroport Ibn Battouta (Tanger)": "Voyagez vers l’aéroport Ibn Battouta de Tanger. Ce transfert longue distance se prépare selon votre adresse de départ et les horaires de votre vol.",
  Casablanca: "Retrouvez l’énergie de Casablanca, entre architecture urbaine, quartiers animés et façade atlantique. Votre transfert vous conduit à l’adresse indiquée dans votre demande.",
  Rabat: "Rejoignez Rabat, capitale du Maroc, connue pour sa kasbah des Oudayas et son patrimoine au bord de l’Atlantique. Précisez votre hôtel ou votre adresse d’arrivée.",
  Essaouira: "Prenez la direction d’Essaouira, de ses remparts et de son port de pêche. Une arrivée sur la côte atlantique pour profiter de l’atmosphère de la médina et de l’océan.",
  "Béni Mellal": "Rejoignez Béni Mellal, au pied du Moyen Atlas, entre plaines et reliefs montagneux. Indiquez votre adresse d’arrivée pour préparer le trajet.",
  "El Jadida": "Découvrez El Jadida, son patrimoine portugais et son littoral atlantique. Organisez votre arrivée à votre hébergement ou à l’adresse de votre choix.",
  Azrou: "Prenez la route d’Azrou, dans le Moyen Atlas, au cœur d’une région de montagnes et de forêts de cèdres. Le trajet est organisé selon vos points de départ et d’arrivée.",
  Ifrane: "Rejoignez Ifrane, ses paysages de montagne et ses avenues arborées. Préparez votre arrivée dans cette ville du Moyen Atlas avec un transfert dédié.",
  "Meknès": "Voyagez vers Meknès, ville impériale aux portes monumentales et aux ruelles historiques. Précisez votre hébergement et les modalités d’accès à votre arrivée.",
  Tanger: "Rejoignez Tanger, entre Méditerranée et Atlantique, avec sa médina et ses panoramas sur le détroit. Votre destination exacte est précisée lors de la réservation.",
  "Tétouan": "Prenez la direction de Tétouan et de sa médina aux influences andalouses, au pied du Rif. Organisez votre arrivée à votre hôtel ou à votre adresse.",
  "Fès": "Rejoignez Fès, ville impériale célèbre pour sa médina et son artisanat. Pour un riad dans la médina, précisez le point d’accès carrossable à convenir avec l’agence.",
  Chefchaouen: "Voyagez vers Chefchaouen, la ville bleue nichée dans les montagnes du Rif. Préparez votre arrivée et convenez du point de dépose adapté à votre hébergement.",
  Safi: "Rejoignez Safi, ville de potiers tournée vers l’Atlantique. Indiquez votre lieu d’arrivée pour organiser votre transfert vers cette destination côtière.",
  Agadir: "Rejoignez Agadir et sa grande baie atlantique. Votre trajet privé se prépare selon votre hôtel, votre résidence ou votre adresse de destination.",
  Oualidia: "Prenez la direction d’Oualidia, réputée pour sa lagune et son cadre océanique. Organisez votre arrivée pour un séjour au rythme de la côte.",
  Taghazout: "Rejoignez Taghazout, village côtier connu pour ses spots de surf et son ambiance détendue. Précisez votre hébergement et vos besoins en bagages, notamment si vous voyagez avec une planche.",
  Taroudant: "Voyagez vers Taroudant, ville fortifiée de la vallée du Souss. Retrouvez ses remparts et ses souks en préparant votre arrivée à l’adresse de votre choix.",
  Agafay: "Rejoignez les paysages minéraux du désert d’Agafay. Précisez le nom et l’emplacement de votre camp ou de votre hébergement pour convenir d’un point de dépose adapté.",
  "Vallée de l'Ourika": "Prenez la route de la vallée de l’Ourika, entre villages et paysages de l’Atlas. Indiquez le village ou l’établissement exact souhaité pour préparer votre transfert.",
  Imlil: "Rejoignez Imlil, village de montagne au pied du massif du Toubkal. Convenez du point d’arrivée accessible par la route avec votre hébergement.",
  "Aït Ben Haddou": "Voyagez vers Aït Ben Haddou, son ksar de terre et ses paysages du Sud marocain. Ce transfert permet d’organiser votre arrivée dans le village ou à proximité de votre hébergement.",
  Ouarzazate: "Rejoignez Ouarzazate, porte du Sud marocain, entre kasbahs et horizons désertiques. Préparez votre trajet vers votre hôtel ou votre adresse d’arrivée.",
  "Cascades d'Ouzoud": "Prenez la direction des cascades d’Ouzoud et de leurs paysages verdoyants. Le transfert vous conduit au point d’arrivée accessible par la route ; les activités sur place sont à organiser séparément.",
  "Vallée du Dadès": "Voyagez vers la vallée du Dadès, ses villages et ses formations rocheuses. Précisez votre hébergement et votre point d’arrivée dans la vallée.",
  "Gorges du Todra": "Rejoignez les gorges du Todra et leurs hautes parois rocheuses. Organisez votre arrivée dans la région de Tinghir ou à votre hébergement, selon l’adresse convenue.",
  Erfoud: "Prenez la route d’Erfoud, aux portes des paysages sahariens. Précisez votre lieu d’arrivée et vos besoins pour ce transfert longue distance.",
  Zagora: "Voyagez vers Zagora, entre palmeraies et paysages du Sud. Pour un camp dans le désert, les modalités d’accès et les éventuelles correspondances sont à confirmer avec l’agence.",
  Merzouga: "Rejoignez Merzouga, au pied des dunes de l’Erg Chebbi. Indiquez votre hôtel ou votre camp ; l’accès final aux camps et les éventuels transferts dans les dunes sont à confirmer séparément.",
};

export const transfers = routes.map((route) => ({
  ...route,
  description: destinationDescriptions[route.to] || `Organisez votre transfert privé de ${route.from} vers ${route.to}.`,
}));

export type Transfer = (typeof transfers)[number];
export const transferCategories = [...new Set(transfers.map((route) => route.category))];
export const whatsappNumber = "212655407529";

export function transferWhatsAppUrl(
  transfer: Transfer,
  details: { fullName: string; description: string; date: string; passengers: string },
) {
  const message = [
    "Bonjour, je souhaite réserver ce transfert :",
    `${transfer.from} → ${transfer.to}`,
    `Référence du trajet : ${transfer.slug}`,
    `Tarif : ${transfer.price} € / véhicule / aller simple`,
    "Véhicule : SUV 4×4 (Škoda Kodiaq)",
    `Nom complet : ${details.fullName.trim()}`,
    `Date : ${details.date}`,
    `Passagers : ${details.passengers}`,
    `Description : ${details.description.trim() || "Aucune précision supplémentaire"}`,
    "Merci de confirmer la disponibilité et les modalités de prise en charge.",
  ].join("\n");
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
