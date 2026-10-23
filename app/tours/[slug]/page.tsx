import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tours } from "@/lib/tours";
import { Icon } from "@/app/components/travel-ui";
import { TourBooking } from "@/app/components/tour-booking";
import { TourCard } from "@/app/components/tour-catalog";
import { JourneyGallery } from "@/app/components/journey-gallery";
import { journeyPhotos } from "@/lib/journey-photos";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return tours.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) return { title: "Tour introuvable | Visit Morocco" };
  return { title: `${tour.title} · ${tour.duration} | Visit Morocco`, description: tour.description };
}

export default async function TourDetail({ params }: Props) {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) notFound();
  const related = tours.filter((item) => item.slug !== slug && item.category === tour.category).slice(0, 3);
  const stops = tour.id === 4
    ? tour.itinerary.slice(tour.itinerary.indexOf("(") + 1, -1).split(" · ")
    : tour.itinerary.split("→").map((stop) => stop.trim());

  return <main id="tour-content" className="transfer-detail section-shell">
    <nav className="transfer-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>/</span><Link href="/tours">Tours & circuits</Link><span>/</span><span aria-current="page">{tour.title}</span></nav>
    <p className="eyebrow">{tour.category} · {tour.duration} · VÉHICULE PRIVÉ</p>
    <h1>{tour.title}</h1>
    <div className="transfer-detail-grid">
      <div>
        <div className="transfer-detail-photo"><Image src={tour.image} alt={tour.title} fill sizes="(max-width: 850px) 100vw, 65vw" priority /></div>
        <JourneyGallery photos={journeyPhotos(tour.itinerary)} />
        <section className="transfer-description"><h2>Votre circuit en détail</h2><p>{tour.description}</p>
          <div className="tour-facts"><span><Icon name="clock" />{tour.duration}</span><span><Icon name="car" />Véhicule privé</span><span><Icon name="user" />Sur mesure selon le groupe</span></div>
          <h3>Itinéraire du circuit</h3><p className="tour-route-overview">{tour.itinerary}</p>
          <ol className="tour-itinerary">{stops.map((stop, index) => <li key={`${index}-${stop}`}><span className="tour-stop-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><span className="tour-stop-label">{tour.id === 4 ? "Lieu de découverte" : "Étape du parcours"}</span><strong>{stop}</strong></div></li>)}</ol>
          <p className="small-note">Ces étapes reprennent le parcours du circuit. La répartition par jour, les horaires et le temps consacré aux visites seront définis dans votre programme personnalisé.</p>
          <h3>Un voyage pensé pour votre groupe</h3><p>Tous les circuits sont proposés en véhicule privé, avec un programme sur mesure. Le tarif est établi sur devis selon votre groupe et les prestations choisies.</p>
          <h3>À préciser dans votre demande</h3><ul><li>Votre date de départ et le nombre de voyageurs.</li><li>Votre lieu de prise en charge et votre adresse d’arrivée.</li><li>Vos préférences d’hébergement et les étapes à personnaliser.</li><li>Les visites, activités ou besoins particuliers que vous souhaitez inclure dans le devis.</li></ul>
          <p className="small-note">Les hébergements, repas, guides, droits d’entrée et activités ne sont pas détaillés dans le circuit de référence. Leur inclusion et leur prix seront précisés par l’agence avant votre réservation.</p>
        </section>
      </div>
      <aside className="transfer-price-panel tour-price-panel" aria-label="Devis et réservation"><p className="eyebrow">VOTRE CIRCUIT PRIVÉ</p><p className="tour-quote-price">Sur devis</p><p className="transfer-price-unit">un programme personnalisé selon votre groupe</p><hr /><p><Icon name="clock" />{tour.duration}</p><p><Icon name="pin" />Départ : {tour.departure}</p><p><Icon name="car" />Véhicule privé</p><p><Icon name="check" />Itinéraire sur mesure</p><TourBooking tour={tour} /></aside>
    </div>
    <section className="transfer-related"><div className="section-title"><p className="eyebrow">L’ENVIE DE DÉCOUVRIR</p><h2>D’autres circuits à explorer</h2></div><div className="transfer-grid">{related.map((item) => <TourCard tour={item} key={item.slug} />)}</div><div className="transfer-view-all"><Link href="/tours" className="button outline">Voir tous les tours <Icon name="arrow" /></Link></div></section>
  </main>;
}
