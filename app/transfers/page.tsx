import type { Metadata } from "next";
import { TransferCatalog } from "../components/transfer-catalog";
import { CatalogIntro } from "../components/catalog-intro";
import { BookingSteps } from "../components/agency-ui";
import { transfers } from "@/lib/transfers";

export const metadata: Metadata = {
  title: "Transferts privés au Maroc | Visit Morocco",
  description: "Découvrez tous nos transferts au Maroc, leurs tarifs SUV 4×4 et les détails de chaque trajet. Réservez votre transfert par WhatsApp.",
};

export default function TransfersPage() {
  return <main id="transfer-content" className="catalog-listing-page"><CatalogIntro
    eyebrow="Transferts privés" title="Votre prochaine destination commence ici."
    description="De l’aéroport à votre riad, de Marrakech à l’océan ou au Sahara : trouvez le trajet qui relie vos envies."
    image="/images/home-ait-ben-haddou.webp" imageAlt="Kasbah et palmeraie d’Aït Ben Haddou au pied de l’Atlas"
    anchor="transfers" action="Choisir mon transfert"
    facts={[`${transfers.length} trajets au Maroc`, "Prix par véhicule", "Transferts en aller simple"]}
    heading="Un trajet privé, une arrivée à votre rythme."
    text="Comparez les destinations et leurs tarifs, puis consultez la fiche de votre trajet pour préciser votre prise en charge et préparer votre réservation."
    features={[
      { icon: "car", title: "Aéroports & hébergements", text: "Préparez votre arrivée ou votre départ et indiquez votre vol, votre hôtel ou votre riad dans la demande." },
      { icon: "map", title: "De ville en ville", text: "Essaouira, Agadir, Fès ou les vallées de l’Atlas : rejoignez la prochaine étape de votre voyage." },
      { icon: "tag", title: "Un tarif pour le véhicule", text: "Les prix affichés correspondent à un aller simple en SUV 4×4. Les détails sont précisés sur chaque fiche." },
    ]}
  /><TransferCatalog /><BookingSteps /></main>;
}
