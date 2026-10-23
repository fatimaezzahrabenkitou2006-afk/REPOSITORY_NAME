"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { transfers, transferCategories, type Transfer } from "@/lib/transfers";
import { Icon } from "./travel-ui";
import { JourneyCard } from "./journey-card";
import "../transfers/transfers.css";

export function TransferCard({ transfer, compact = false }: { transfer: Transfer; compact?: boolean }) {
  if (compact) return <JourneyCard className="transfer-card transfer-card--compact" image={transfer.image} title={transfer.to} href={`/transfers/${transfer.slug}`} detail={`Depuis ${transfer.from}`} meta={[{ icon: "car", label: "Aller simple" }, { icon: "tag", label: `${transfer.price} € / véhicule` }]} sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw" />;
  return (
    <article className="transfer-card transfer-card--destination">
      <Link href={`/transfers/${transfer.slug}`} className="transfer-card-photo" aria-label={`Voir le transfert ${transfer.from} vers ${transfer.to}`}>
        <Image src={transfer.image} alt={transfer.to} fill sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 33vw" />
        <span className="transfer-price-badge"><strong>{transfer.price} €</strong><span>par véhicule</span></span>
        <div className="transfer-photo-caption">
          <span className="transfer-photo-category">{transfer.category}</span>
          <h3>{transfer.to}</h3>
          <p><Icon name="pin" /> Depuis {transfer.from}</p>
          <div className="transfer-photo-meta"><span><Icon name="car" /> SUV 4×4 · Aller simple</span><span className="transfer-photo-arrow"><Icon name="arrow" /></span></div>
          <span className="transfer-photo-details">Voir le trajet et réserver</span>
        </div>
      </Link>
    </article>
  );
}

export function TransferCatalog({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
  const featuredDestinations = ["Aéroport Marrakech Menara", "Essaouira", "Agadir", "Agafay", "Vallée de l'Ourika", "Imlil", "Aït Ben Haddou", "Merzouga", "Chefchaouen"];
  const featured = featuredDestinations.flatMap((destination) => {
    const route = transfers.find((item) => item.from === "Marrakech" && item.to === destination);
    return route ? [route] : [];
  });
  const filtered = preview ? featured : transfers.filter((route) =>
    (category === "Tous" || route.category === category) &&
    normalize(`${route.from} ${route.to}`).includes(normalize(query.trim())),
  );

  return (
    <section className={`transfer-section section-shell ${preview ? "transfer-preview" : ""}`} id="transfers">
      <div className="section-title">
        <p className="eyebrow">VOTRE ROUTE, NOTRE PRIORITÉ</p>
        <span className="gold-line" />
        <h2>{preview ? "Nos transferts privés" : "Tous nos transferts"}</h2>
        <p>Des aéroports aux dunes du Sahara, voyagez à votre rythme au Maroc.</p>
      </div>
      {!preview && (
        <div className="transfer-tools">
          <label className="transfer-search">Rechercher un trajet
            <input type="search" placeholder="Départ ou destination…" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <div className="transfer-filters" aria-label="Catégories de transferts">
            {["Tous", ...transferCategories].map((value) => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}
          </div>
          <p className="transfer-results" role="status">{filtered.length} transfert{filtered.length !== 1 ? "s" : ""}</p>
        </div>
      )}
      <div className="transfer-grid">
        {filtered.map((transfer) => <TransferCard transfer={transfer} compact={preview} key={transfer.slug} />)}
      </div>
      {!filtered.length && <div className="transfer-empty"><p>Aucun transfert ne correspond à votre recherche.</p><button className="button outline" onClick={() => { setCategory("Tous"); setQuery(""); }}>Afficher tous les transferts</button></div>}
      {preview && <div className="transfer-view-all"><Link className="button primary" href="/transfers">Voir tous les transferts <Icon name="arrow" /></Link><p>{transfers.length} trajets à découvrir à travers le Maroc</p></div>}
    </section>
  );
}
