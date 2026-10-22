export const categories = [
  {
    id: "transfers",
    label: "Transfers",
    icon: "car",
    title: "Transfers",
    description:
      "Comfortable and reliable transfers to and from airports, hotels and any destination.",
    action: "Book a Transfer",
    photo: 0,
  },
  {
    id: "tours",
    label: "Tours",
    icon: "map",
    title: "Tours",
    description: "Explore the best places with our carefully designed tours.",
    action: "Explore Tours",
    photo: 1,
  },
  {
    id: "excursions",
    label: "Excursions",
    icon: "mountain",
    title: "Excursions",
    description: "Unique experiences and unforgettable adventures.",
    action: "Discover Excursions",
    photo: 2,
  },
  {
    id: "fleet",
    label: "Fleet",
    icon: "van",
    title: "Our Fleet",
    description: "A modern fleet for your comfort, safety and style.",
    action: "View Fleet",
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
    name: "Executive Sedan",
    people: 3,
    bags: 3,
    description: "A private, comfortable ride for solo travellers and couples.",
    photo: 8,
  },
  {
    name: "Premium Van",
    people: 7,
    bags: 7,
    description: "Room to relax for families and small groups.",
    photo: 9,
  },
  {
    name: "Group Minibus",
    people: 16,
    bags: 16,
    description: "Keep your group together, with space for everyone.",
    photo: 10,
  },
];
