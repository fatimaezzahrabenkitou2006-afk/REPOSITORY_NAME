import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { transfers } from "@/lib/transfers";
import { Icon } from "@/app/components/travel-ui";
import { TransferBooking } from "@/app/components/transfer-booking";
import { TransferCard } from "@/app/components/transfer-catalog";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return transfers.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const transfer = transfers.find((route) => route.slug === slug);
  if (!transfer) return { title: "Transfert introuvable | Visit Morocco" };
  return { title: `${transfer.from} → ${transfer.to} · ${transfer.price} € | Visit Morocco`, description: transfer.description };
}

export default async function TransferDetail({ params }: Props) {
  const { slug } = await params;
  const transfer = transfers.find((route) => route.slug === slug);
  if (!transfer) notFound();
  const related = transfers.filter((route) => route.slug !== slug && route.category === transfer.category).slice(0, 3);
  return <main id="transfer-content" className="transfer-detail section-shell">
    <nav className="transfer-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>/</span><Link href="/transfers">Transferts</Link><span>/</span><span aria-current="page">{transfer.to}</span></nav>
    <p className="eyebrow">{transfer.category} · TRANSFERT PRIVÉ</p>
    <h1>{transfer.from}<span className="transfer-title-arrow"> → </span><em>{transfer.to}</em></h1>
    <div className="transfer-detail-grid">
      <div>
        <div className="transfer-detail-photo"><Image src={transfer.image} alt={`Destination : ${transfer.to}`} fill sizes="(max-width: 850px) 100vw, 65vw" priority /></div>
        <section className="transfer-description"><h2>Votre transfert en détail</h2><p>{transfer.description}</p><p>Un trajet privé de <strong>{transfer.from}</strong> vers <strong>{transfer.to}</strong>, en SUV 4×4 (Škoda Kodiaq). Le prix de <strong>{transfer.price} €</strong> correspond à un aller simple pour le véhicule, et non à un tarif par personne.</p>
          <div className="transfer-route"><div><Icon name="pin" /><span>Départ<strong>{transfer.from}</strong></span></div><Icon name="arrow" /><div><Icon name="pin" /><span>Arrivée<strong>{transfer.to}</strong></span></div></div>
          <h3>À préciser lors de votre réservation</h3><ul><li>Votre adresse exacte de prise en charge et de dépose.</li><li>La date, l’heure souhaitée, le nombre de voyageurs et les bagages.</li><li>Votre numéro de vol si le transfert concerne un aéroport.</li><li>Vos besoins particuliers ou une demande de Van 7 places / Luxury Van.</li></ul>
          <p className="small-note">Les horaires, la capacité adaptée à votre groupe, les arrêts éventuels et les modalités du trajet seront confirmés par l’agence. Ce transfert ne comprend pas une visite guidée ou des activités touristiques.</p>
        </section>
      </div>
      <aside className="transfer-price-panel" aria-label="Tarif et réservation"><p className="eyebrow">VOTRE TRANSFERT PRIVÉ</p><p className="transfer-detail-price">{transfer.price} <span>€</span></p><p className="transfer-price-unit">par véhicule · aller simple</p><hr /><p><Icon name="car" /> SUV 4×4 · Škoda Kodiaq</p><p><Icon name="pin" /> {transfer.from} → {transfer.to}</p><p><Icon name="check" /> Van 7 places / Luxury Van sur demande</p><TransferBooking transfer={transfer} /></aside>
    </div>
    <section className="transfer-related"><div className="section-title"><p className="eyebrow">CONTINUEZ À EXPLORER</p><h2>D’autres trajets à découvrir</h2></div><div className="transfer-grid">{related.map((route) => <TransferCard transfer={route} key={route.slug} />)}</div><div className="transfer-view-all"><Link className="button outline" href="/transfers">Voir tous les transferts <Icon name="arrow" /></Link></div></section>
  </main>;
}
