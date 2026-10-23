import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { excursions } from "@/lib/excursions";
import { Icon } from "@/app/components/travel-ui";
import { ExcursionBooking } from "@/app/components/excursion-booking";
import { ExcursionCard } from "@/app/components/excursion-catalog";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return excursions.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const excursion = excursions.find((item) => item.slug === slug);
  if (!excursion) return { title: "Excursion introuvable | Visit Morocco" };
  return { title: `${excursion.title} · À partir de ${excursion.price} € | Visit Morocco`, description: excursion.description };
}

export default async function ExcursionDetail({ params }: Props) {
  const { slug } = await params;
  const excursion = excursions.find((item) => item.slug === slug);
  if (!excursion) notFound();
  const related = excursions.filter((item) => item.slug !== slug && item.category === excursion.category).slice(0, 3);

  return <main id="excursion-content" className="transfer-detail section-shell">
    <nav className="transfer-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>/</span><Link href="/excursions">Excursions</Link><span>/</span><span aria-current="page">{excursion.title}</span></nav>
    <p className="eyebrow">{excursion.category} · EXCURSION PRIVÉE</p>
    <h1>{excursion.title}</h1>
    <div className="transfer-detail-grid">
      <div>
        <div className="transfer-detail-photo"><Image src={excursion.image} alt={excursion.title} fill sizes="(max-width: 850px) 100vw, 65vw" priority /></div>
        <section className="transfer-description"><h2>Votre excursion en détail</h2><p>{excursion.description}</p>
          <div className="tour-facts"><span><Icon name="clock" />{excursion.duration}</span><span><Icon name="pin" />Départ {excursion.departure}</span><span><Icon name="user" />Excursion privée</span></div>
          <h3>Les points forts du programme</h3><ul className="excursion-highlights">{excursion.highlights.map((highlight) => <li key={highlight}><Icon name="check" /><span>{highlight}</span></li>)}</ul>
          <h3>Préparez votre journée</h3><p>Le départ de cette excursion s’organise depuis Marrakech. Précisez votre adresse de prise en charge, votre date et le nombre de voyageurs pour convenir du programme avec l’agence.</p><p>Le montant de <strong>{excursion.price} €</strong> est un prix de départ. La base tarifaire et les prestations retenues seront confirmées pour votre groupe avant la réservation.</p>
          <h3>À préciser dans votre demande</h3><ul><li>Votre date souhaitée et le nombre de voyageurs, adultes et enfants.</li><li>Votre hôtel, riad ou adresse de prise en charge à Marrakech.</li><li>Vos préférences d’activités et vos besoins particuliers.</li><li>Les prestations que vous souhaitez faire préciser : repas, visites, activités, transport et éventuels suppléments.</li></ul>
          <p className="small-note">Les points forts présentent l’excursion. Les horaires, les inclusions, les conditions des activités et le prix final seront confirmés par l’agence selon le programme choisi et la disponibilité.</p>
        </section>
      </div>
      <aside className="transfer-price-panel excursion-price-panel" aria-label="Tarif et réservation"><p className="eyebrow">À PARTIR DE</p><p className="transfer-detail-price">{excursion.price} <span>€</span></p><p className="transfer-price-unit">prix de départ · tarif final à confirmer</p><hr /><p><Icon name="clock" />{excursion.duration}</p><p><Icon name="pin" />Départ : {excursion.departure}</p><p><Icon name="user" />Excursion privée</p><ExcursionBooking excursion={excursion} /></aside>
    </div>
    <section className="transfer-related"><div className="section-title"><p className="eyebrow">ENCORE ENVIE D’EXPLORER</p><h2>D’autres excursions à découvrir</h2></div><div className="transfer-grid">{related.map((item) => <ExcursionCard excursion={item} key={item.slug} />)}</div><div className="transfer-view-all"><Link href="/excursions" className="button outline">Voir toutes les excursions <Icon name="arrow" /></Link></div></section>
  </main>;
}
