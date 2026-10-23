import Link from "next/link";
import { excursions } from "@/lib/excursions";
import { JourneyCard } from "./journey-card";
import { Icon } from "./travel-ui";

export function HomeExcursions() {
  const selected = [1, 2, 3, 5, 7, 8, 9, 4, 10].flatMap(id => {
    const excursion = excursions.find(item => item.id === id);
    return excursion ? [excursion] : [];
  });

  return <section className="transfer-section section-shell transfer-preview home-excursions" id="excursions" aria-labelledby="home-excursions-title">
    <div className="section-title">
      <p className="eyebrow">UNE JOURNÉE, MILLE DÉCOUVERTES</p>
      <span className="gold-line" />
      <h2 id="home-excursions-title">Nos excursions privées</h2>
      <p>Depuis Marrakech, découvrez les montagnes de l’Atlas, la côte atlantique et les paysages d’Agafay.</p>
    </div>
    <div className="transfer-grid">{selected.map(excursion => <JourneyCard
      className="transfer-card transfer-card--compact"
      key={excursion.slug}
      image={excursion.image}
      title={excursion.title}
      href={`/excursions/${excursion.slug}`}
      sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
      detail={`Départ : ${excursion.departure}`}
      meta={[{ icon: "clock", label: excursion.duration }, { icon: "tag", label: `Dès ${excursion.price} €` }]}
    />)}</div>
    <div className="transfer-view-all">
      <Link className="button primary" href="/excursions">Voir toutes les excursions<Icon name="arrow" /></Link>
      <p>{excursions.length} excursions privées au départ de Marrakech</p>
    </div>
  </section>;
}
