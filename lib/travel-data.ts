export const categories = [
  {
    id: "transfers",
    label: "Transferts",
    icon: "car",
    title: "Transferts privés",
    description:
      "Rejoignez votre aéroport, votre hôtel ou votre prochaine destination au Maroc.",
    action: "Choisir un trajet",
    image: "/images/transfers/aeroport-marrakech-menara.webp",
    photo: 0,
  },
  {
    id: "tours",
    label: "Circuits",
    icon: "map",
    title: "Tours & circuits",
    description: "Du patrimoine des villes impériales aux dunes du Sahara, composez votre parcours.",
    action: "Explorer les circuits",
    image: "/images/tours/ait-ben-haddou-ouarzazate.webp",
    photo: 1,
  },
  {
    id: "excursions",
    label: "Excursions",
    icon: "mountain",
    title: "Excursions",
    description: "L’Atlas, l’océan ou le désert : changez d’horizon le temps d’une journée.",
    action: "Découvrir les excursions",
    image: "/images/excursions/imlil-parc-national-du-toubkal.webp",
    photo: 2,
  },
  {
    id: "fleet",
    label: "Véhicules",
    icon: "van",
    title: "Nos véhicules",
    description: "Découvrez les options de véhicules et précisez les besoins de votre groupe.",
    action: "Voir les véhicules",
    image: "/images/voyage-fleet.webp",
    photo: 3,
  },
] as const;
export type Category = (typeof categories)[number]["id"];
export const experiences = [
  {
    id: "island",
    title: "Island Escape",
    type: "tours",
    photo: 4,
    price: 80,
    destination: "Mediterranean islands",
    detail:
      "Trade the everyday for crystal-clear water, secluded beaches and breathtaking coastal scenery. Explore a beautiful island at a relaxed pace with your local guide.",
    includes: ["Local guide", "Return transport", "Free time on the beach"],
  },
  {
    id: "city",
    title: "City Tour",
    type: "tours",
    photo: 5,
    price: 60,
    destination: "Historic old town",
    detail:
      "Wander atmospheric old-town streets, discover architectural treasures and hear the stories behind the landmarks. A thoughtful introduction to the heart of the city.",
    includes: [
      "Guided walking tour",
      "Comfortable transport",
      "Local recommendations",
    ],
  },
  {
    id: "boat",
    title: "Boat Excursion",
    type: "excursions",
    photo: 6,
    price: 90,
    destination: "Mediterranean coast",
    detail:
      "Set out across turquoise water to beautiful coves and hidden swimming spots. Enjoy a relaxed day on the water with a professional skipper.",
    includes: ["Professional skipper", "Boat trip", "Swimming stops"],
  },
  {
    id: "desert",
    title: "Desert Adventure",
    type: "excursions",
    photo: 7,
    price: 70,
    destination: "Desert dunes",
    detail:
      "Leave the city behind for sweeping dunes and open skies. Experience the quiet beauty of the desert and a remarkable golden-hour landscape.",
    includes: ["Return transport", "Local guide", "Sunset experience"],
  },
  {
    id: "coast",
    title: "Coastal Discovery",
    type: "tours",
    photo: 1,
    price: 85,
    destination: "Coastal villages",
    detail:
      "Discover charming coastal villages, panoramic viewpoints and local culture on a leisurely small-group day trip.",
    includes: ["Local guide", "Return transport", "Photo stops"],
  },
  {
    id: "cove",
    title: "Hidden Coves",
    type: "excursions",
    photo: 2,
    price: 95,
    destination: "Secluded bays",
    detail:
      "Find a quieter side of the coast with a day dedicated to dramatic sea caves, hidden bays and clear blue water.",
    includes: ["Coastal transport", "Local guide", "Scenic stops"],
  },
];
export type Experience = (typeof experiences)[number];
export const vehicles = [
  {
    name: "Berline confort",
    people: 3,
    bags: 3,
    description: "Un trajet privé pour les voyageurs en solo ou en duo.",
    photo: 8,
  },
  {
    name: "Van privé",
    people: 7,
    bags: 7,
    description: "Une option pour les familles et les petits groupes.",
    photo: 9,
  },
  {
    name: "Minibus groupe",
    people: 16,
    bags: 16,
    description: "Préparez un déplacement commun pour votre groupe.",
    photo: 10,
  },
];
