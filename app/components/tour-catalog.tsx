"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { tours, tourCategories, type Tour } from "@/lib/tours";
import { Icon } from "./travel-ui";
import "../transfers/transfers.css";
import "../tours/tours.css";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="transfer-card tour-card">
      <Link href={`/tours/${tour.slug}`} className="transfer-card-photo" aria-label={`Découvrir ${tour.title}`}>
        <Image src={tour.image} alt={tour.title} fill sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 33vw" />
        <span className="transfer-category">{tour.category}</span>
        <span className="tour-duration"><Icon name="clock" />{tour.duration}</span>
      </Link>
      <div className="transfer-card-copy">
        <p className="transfer-origin"><Icon name="pin" />Départ : {tour.departure}</p>
        <h3><Link href={`/tours/${tour.slug}`}>{tour.title}</Link></h3>
        <p className="transfer-card-description">{tour.description}</p>
        <p className="tour-card-itinerary">{tour.itinerary}</p>
        <p className="transfer-vehicle"><Icon name="car" />Véhicule privé · Sur mesure</p>
        <div className="transfer-card-bottom">
          <p><strong className="tour-quote">Sur devis</strong><span>selon votre groupe</span></p>
          <Link href={`/tours/${tour.slug}`} className="button outline">Voir les détails <Icon name="arrow" /></Link>
        </div>
      </div>
    </article>
  );
}

export function TourCatalog({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
  const filtered = preview ? tours.slice(0, 9) : tours.filter((tour) =>
    (category === "Tous" || tour.category === category) &&
    normalize(`${tour.title} ${tour.itinerary}`).includes(normalize(query.trim())),
  );

  return (
    <section className={`transfer-section section-shell tour-section ${preview ? "transfer-preview" : ""}`} id="tours" lang="fr">
      <div className="section-title">
        <p className="eyebrow">LE MAROC, À VOTRE RYTHME</p>
        <span className="gold-line" />
        <h2>{preview ? "Nos tours & circuits privés" : "Tous nos tours & circuits"}</h2>
        <p>De la côte aux dunes, choisissez votre itinéraire. De la demi-journée au voyage de 10 jours.</p>
      </div>
      {!preview && <div className="transfer-tools">
        <label className="transfer-search">Rechercher un tour<input type="search" placeholder="Circuit, ville ou étape…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="transfer-filters" aria-label="Catégories de tours">
          {["Tous", ...tourCategories].map((value) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}
        </div>
        <p className="transfer-results" role="status">{filtered.length} circuit{filtered.length !== 1 ? "s" : ""}</p>
      </div>}
      <div className="transfer-grid">{filtered.map((tour) => <TourCard tour={tour} key={tour.slug} />)}</div>
      {!filtered.length && <div className="transfer-empty"><p>Aucun tour ne correspond à votre recherche.</p><button className="button outline" onClick={() => { setCategory("Tous"); setQuery(""); }}>Afficher tous les tours</button></div>}
      {preview && <div className="transfer-view-all"><Link href="/tours" className="button primary">Voir tous les tours <Icon name="arrow" /></Link><p>{tours.length} circuits privés · Tarifs sur devis</p></div>}
    </section>
  );
}
