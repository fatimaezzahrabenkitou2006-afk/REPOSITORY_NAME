import type { Metadata } from "next";
import { TourCatalog } from "../components/tour-catalog";
import { CatalogIntro } from "../components/catalog-intro";
import { BookingSteps } from "../components/agency-ui";
import { tours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Tours & circuits privés au Maroc | Visit Morocco",
  description: "18 excursions et circuits privés au Maroc, d’une demi-journée à 10 jours. Découvrez les itinéraires et demandez votre devis sur WhatsApp.",
};

export default function ToursPage() {
  return <main id="tour-content" className="catalog-listing-page"><CatalogIntro
    eyebrow="Circuits privés" title="Des villes impériales aux dunes du Sahara."
    description="Traversez les paysages, prenez le temps des rencontres et imaginez un itinéraire qui vous ressemble."
    image="/images/tours/marrakech-merzouga-sahara.webp" imageAlt="Dunes du Sahara et voyage dans le désert marocain"
    anchor="tours" action="Explorer les circuits"
    facts={[`${tours.length} itinéraires`, "Véhicule privé", "Tarifs sur devis"]}
    heading="Plus qu’un itinéraire, votre façon de découvrir le Maroc."
    text="D’une découverte de quelques heures à un voyage de plusieurs jours, explorez les étapes proposées et échangez avec l’agence pour adapter votre programme."
    features={[
      { icon: "mountain", title: "Atlas & désert", text: "Cols de montagne, kasbahs, vallées et dunes : découvrez les grands paysages du sud marocain." },
      { icon: "map", title: "Culture & patrimoine", text: "Explorez les villes, les médinas et les étapes historiques qui donnent à chaque parcours son caractère." },
      { icon: "calendar", title: "Un programme à adapter", text: "Précisez vos dates, la taille de votre groupe et vos envies. L’agence prépare un devis pour votre circuit." },
    ]}
  /><TourCatalog /><BookingSteps /></main>;
}
