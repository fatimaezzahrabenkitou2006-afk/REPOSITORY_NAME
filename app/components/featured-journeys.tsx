import Link from "next/link";
import { excursions } from "@/lib/excursions";
import { tours } from "@/lib/tours";
import { Icon } from "./travel-ui";
import { JourneyCard } from "./journey-card";

export function FeaturedJourneys() {
  const items = [
    ...tours.filter(item => ["ait-ben-haddou-ouarzazate", "marrakech-merzouga-sahara"].includes(item.slug)).map(item => ({ ...item, href: `/tours/${item.slug}`, priceLabel: "Sur devis" })),
    ...excursions.filter(item => ["vallee-de-l-ourika-atlas", "excursion-marrakech-essaouira", "cascades-d-ouzoud"].includes(item.slug)).map(item => ({ ...item, href: `/excursions/${item.slug}`, priceLabel: `Dès ${item.price} €` })),
  ];
  return <section className="featured-journeys section-shell" id="experiences">
    <div className="section-title"><p className="eyebrow">DES DESTINATIONS QUI INSPIRENT</p><span className="gold-line" /><h2>Des expériences inoubliables</h2><p>Une sélection de circuits et d’excursions pour découvrir le Maroc autrement.</p></div>
    <div className="home-experience-grid">{items.map(item => <JourneyCard className="featured-journey-card" key={item.href} image={item.image} title={item.title} href={item.href} detail={`Départ : ${item.departure}`} meta={[{ icon: "clock", label: item.duration }, { icon: "tag", label: item.priceLabel }]} />)}</div>
    <div className="home-experience-view-all"><Link className="button outline" href="/tours" aria-label="Voir tous les circuits">Voir tout<Icon name="arrow" /></Link></div>
  </section>;
}
