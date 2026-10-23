"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { excursions, excursionCategories, type Excursion } from "@/lib/excursions";
import { Icon } from "./travel-ui";
import "../transfers/transfers.css";
import "../tours/tours.css";
import "../excursions/excursions.css";

export function ExcursionCard({ excursion }: { excursion: Excursion }) {
  return (
    <article className="transfer-card excursion-card">
      <Link href={`/excursions/${excursion.slug}`} className="transfer-card-photo" aria-label={`Découvrir ${excursion.title}`}>
        <Image src={excursion.image} alt={excursion.title} fill sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 33vw" />
        <span className="transfer-category">EXCURSION PRIVÉE</span>
        <span className="tour-duration"><Icon name="clock" />{excursion.duration}</span>
      </Link>
      <div className="transfer-card-copy">
        <p className="transfer-origin"><Icon name="pin" />Départ : {excursion.departure}</p>
        <h3><Link href={`/excursions/${excursion.slug}`}>{excursion.title}</Link></h3>
        <p className="transfer-card-description">{excursion.description}</p>
        <p className="excursion-card-highlights">{excursion.highlights.join(" · ")}</p>
        <div className="transfer-card-bottom">
          <p><span>À partir de</span><strong>{excursion.price} €</strong></p>
          <Link href={`/excursions/${excursion.slug}`} className="button outline">Voir les détails <Icon name="arrow" /></Link>
        </div>
      </div>
    </article>
  );
}

export function ExcursionCatalog({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState("Toutes");
  const [query, setQuery] = useState("");
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
  const featured = [1, 2, 3, 7, 8, 9, 4, 5, 10].flatMap((id) => {
    const excursion = excursions.find((item) => item.id === id);
    return excursion ? [excursion] : [];
  });
  const filtered = preview ? featured : excursions.filter((excursion) =>
    (category === "Toutes" || excursion.category === category) &&
    normalize(`${excursion.title} ${excursion.highlights.join(" ")}`).includes(normalize(query.trim())),
  );

  return (
    <section className={`transfer-section section-shell excursion-section ${preview ? "transfer-preview" : ""}`} id="excursions" lang="fr">
      <div className="section-title">
        <p className="eyebrow">UNE JOURNÉE, MILLE DÉCOUVERTES</p><span className="gold-line" />
        <h2>{preview ? "Nos excursions privées" : "Toutes nos excursions"}</h2>
        <p>Atlas, océan, désert et rencontres locales : partez explorer depuis Marrakech.</p>
      </div>
      {!preview && <div className="transfer-tools">
        <label className="transfer-search">Rechercher une excursion<input type="search" placeholder="Destination, activité ou point fort…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="transfer-filters" aria-label="Durées des excursions">
          {["Toutes", ...excursionCategories].map((value) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}
        </div>
        <p className="transfer-results" role="status">{filtered.length} excursion{filtered.length !== 1 ? "s" : ""}</p>
      </div>}
      <div className="transfer-grid">{filtered.map((excursion) => <ExcursionCard excursion={excursion} key={excursion.slug} />)}</div>
      {!filtered.length && <div className="transfer-empty"><p>Aucune excursion ne correspond à votre recherche.</p><button className="button outline" onClick={() => { setCategory("Toutes"); setQuery(""); }}>Afficher toutes les excursions</button></div>}
      {preview && <div className="transfer-view-all"><Link href="/excursions" className="button primary">Voir toutes les excursions <Icon name="arrow" /></Link><p>{excursions.length} excursions privées · Au départ de Marrakech</p></div>}
    </section>
  );
}
