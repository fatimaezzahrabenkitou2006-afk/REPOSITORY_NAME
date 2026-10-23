import type { Metadata } from "next";
import { ExcursionCatalog } from "../components/excursion-catalog";
import { CatalogIntro } from "../components/catalog-intro";
import { BookingSteps } from "../components/agency-ui";
import { excursions } from "@/lib/excursions";

export const metadata: Metadata = {
  title: "Excursions privées depuis Marrakech | Visit Morocco",
  description: "10 excursions privées depuis Marrakech : Atlas, Ourika, Ouzoud, Agafay, Essaouira, montgolfière et palmeraie. Durées, prix de départ et réservation WhatsApp.",
};

export default function ExcursionsPage() {
  return <main id="excursion-content" className="excursion-page"><CatalogIntro
    eyebrow="Excursions" title="Une journée ailleurs, des souvenirs pour longtemps."
    description="Depuis Marrakech, partez vers les cascades, les villages de l’Atlas, l’Atlantique ou les étendues d’Agafay."
    image="/images/excursions/cascades-d-ouzoud.webp" imageAlt="Cascades d’Ouzoud entourées de végétation au Maroc"
    anchor="excursions" action="Trouver mon excursion"
    facts={[`${excursions.length} excursions`, "Départ de Marrakech", `À partir de ${Math.min(...excursions.map(item => item.price))} €`]}
    heading="Une escapade pour chaque envie."
    text="Nature, océan ou découverte des villages : choisissez votre ambiance, consultez la durée et les points forts, puis préparez votre demande depuis la fiche de l’excursion."
    features={[
      { icon: "mountain", title: "Nature & grand air", text: "Ourika, Imlil et Ouzoud offrent un autre regard sur les paysages et les vallées proches de Marrakech." },
      { icon: "pin", title: "Océan & découvertes", text: "Partez découvrir Essaouira, ses remparts et son atmosphère maritime, le temps d’une journée." },
      { icon: "clock", title: "Selon votre temps", text: "Demi-journée ou journée complète : comparez les durées et choisissez ce qui convient à votre séjour." },
    ]}
  /><ExcursionCatalog /><BookingSteps /></main>;
}
