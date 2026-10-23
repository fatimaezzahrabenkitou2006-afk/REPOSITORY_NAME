import type { Metadata } from "next";
import { CatalogIntro } from "../components/catalog-intro";
import { BookingSteps } from "../components/agency-ui";
import { Icon, TravelPhoto } from "../components/travel-ui";
import { vehicles } from "@/lib/travel-data";

export const metadata: Metadata = {
  title: "Véhicules privés au Maroc | Visit Morocco",
  description: "Berline, van ou minibus : découvrez les options pour votre groupe et préparez votre demande de véhicule privé au Maroc.",
};

export default function VehiclesPage() {
  return <main id="vehicle-content"><CatalogIntro
    eyebrow="Nos véhicules" title="Le bon véhicule pour votre voyage."
    description="À deux, en famille ou en groupe, préparez vos déplacements au Maroc avec une option adaptée à votre trajet."
    imageAlt="Van privé pour les déplacements au Maroc" anchor="vehicle-options" action="Découvrir les véhicules"
    facts={["Berline, van & minibus", "Pour les petits et grands groupes", "Disponibilité à confirmer"]}
    heading="Voyagez ensemble, selon vos besoins."
    text="Le nombre de voyageurs, les bagages et le parcours orientent le choix du véhicule. Présentez votre projet à l’agence pour confirmer une option adaptée et son tarif."
    features={[
      { icon: "user", title: "Votre groupe", text: "Précisez le nombre d’adultes et d’enfants pour préparer un véhicule adapté à votre déplacement." },
      { icon: "bag", title: "Vos bagages", text: "Indiquez les valises, poussettes et équipements particuliers. La capacité sera confirmée avec l’agence." },
      { icon: "map", title: "Votre parcours", text: "Un transfert, une excursion ou plusieurs étapes : partagez votre trajet et vos horaires souhaités." },
    ]}
  /><section className="vehicle-catalog section-shell" id="vehicle-options"><div className="section-title"><p className="eyebrow">À CHAQUE GROUPE, SON OPTION</p><h2>Découvrez nos véhicules.</h2><p>Choisissez une catégorie pour échanger avec l’agence sur votre projet.</p></div>
    <div className="vehicle-card-grid">{vehicles.map(vehicle => <article className="vehicle-card" key={vehicle.name}><TravelPhoto index={vehicle.photo} label={vehicle.name} /><div className="vehicle-card-copy"><h3>{vehicle.name}</h3><p>{vehicle.description}</p><div className="vehicle-capacity"><span><Icon name="user" />Jusqu’à {vehicle.people} voyageurs</span><span><Icon name="bag" />Jusqu’à {vehicle.bags} bagages</span></div><a className="button primary" target="_blank" rel="noopener noreferrer" href={`https://wa.me/212655407529?text=${encodeURIComponent(`Bonjour, je souhaite des informations pour un véhicule : ${vehicle.name}. Mon trajet : … Date : … Nombre de voyageurs : … Bagages : …`)}`}>Demander un devis<Icon name="arrow" /></a></div></article>)}</div>
    <p className="vehicle-note">Photos d’illustration. Modèle, disponibilité et capacité bagages à confirmer avec l’agence selon votre groupe et votre itinéraire. Les transferts du catalogue affichent leurs propres tarifs en SUV 4×4.</p>
    </section><BookingSteps /></main>;
}
