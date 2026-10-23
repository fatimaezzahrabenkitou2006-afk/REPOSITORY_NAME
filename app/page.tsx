"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Icon, Logo, TravelPhoto } from "./components/travel-ui";
import { useRouter } from "next/navigation";
import { AgencyFooter } from "./components/agency-ui";
import { SiteNavbar } from "./components/site-navbar";
import { FeaturedJourneys } from "./components/featured-journeys";
import { HomeExcursions } from "./components/home-excursions";
import { TransferCatalog } from "./components/transfer-catalog";
import { HeroSlideshow } from "./components/hero-slideshow";
import { BookingFilter, type Journey } from "./components/booking-filter";
import {
  categories,
  vehicles,
  type Category,
} from "@/lib/travel-data";
import "./style.css";

const initialJourney: Journey = {
  category: "transfers",
  pickup: "",
  destination: "",
  date: "",
  passengers: "1",
  experience: "Transfert privé",
};
type Modal =
  | { type: "booking"; journey: Journey }
  | { type: "fleet" }
  | { type: "about" }
  | { type: "contact" }
  | null;
function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useState<Category>("transfers");
  const [journey, setJourney] = useState(initialJourney);
  const [modal, setModal] = useState<Modal>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const current = dialog.current;
    if (modal) {
      current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  function openModal(value: Modal) {
    setError("");
    setReference("");
    setModal(value);
  }
  function selectCategory(value: Category) {
    setCategory(value);
    setJourney((previous) => ({ ...previous, category: value }));
  }
  function browse(type: Category) {
    router.push(type === "fleet" ? "/vehicles" : `/${type}`);
  }
  function book(experience = "Transfert privé", type: Category = "transfers") {
    openModal({
      type: "booking",
      journey: { ...journey, category: type, experience },
    });
  }
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selected = categories.find((item) => item.id === category)!;
    openModal({
      type: "booking",
      journey: {
        ...journey,
        category,
        experience:
          category === "transfers"
            ? "Transfert privé"
            : `Demande : ${selected.label}`,
      },
    });
  }
  async function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || modal?.type !== "booking") return;
    const data = new FormData(event.currentTarget);
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...modal.journey,
          ...Object.fromEntries(data.entries()),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Votre demande n’a pas pu être enregistrée. Veuillez réessayer.",
        );
      setReference(result.reference);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Vérifiez votre connexion puis réessayez.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <main className="home-page">
      <a className="skip-link" href="#services">
        Aller au contenu
      </a>
      <SiteNavbar onBook={() => book()} onAbout={() => openModal({ type: "about" })} onContact={() => openModal({ type: "contact" })} />
      <HeroSlideshow />
      <BookingFilter category={category} journey={journey} onCategoryChange={selectCategory} onJourneyChange={setJourney} onSubmit={search} formRef={form} />
      <section className="services section-shell" id="services">
        <div className="section-title">
          <p className="eyebrow">NOS PRESTATIONS</p>
          <span className="gold-line" />
          <h2>Voyagez à votre façon</h2>
          <p>
            Des services pensés pour rendre votre voyage simple, confortable et inoubliable.
          </p>
        </div>
        <div className="service-grid">
          {categories.map((item) => (
            <article className="service-card" key={item.id}>
              <button
                className="service-image-button"
                onClick={() => browse(item.id)}
                aria-label={item.action}
              >
                <TravelPhoto index={item.photo} label={item.title} />
              </button>
              <div className="service-copy">
                <span className="service-icon">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="text-link" onClick={() => browse(item.id)}>
                  {item.action}
                  <Icon name="arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <TransferCatalog preview />
      <FeaturedJourneys />
      <HomeExcursions />
      <section className="trip-cta">
        <div className="palm-decoration palm-left" aria-hidden="true" />
        <div className="palm-decoration palm-right" aria-hidden="true" />
        <div className="cta-inner">
          <div>
            <p className="eyebrow light">ET SI ON PRÉPARAIT VOTRE DÉPART ?</p>
            <h2>Votre prochaine escale commence ici.</h2>
            <p>
              Choisissez votre parcours et partagez vos envies.
              <br />
              Nous préparerons les détails de votre demande ensemble.
            </p>
          </div>
          <button className="button secondary" onClick={() => book()}>
            Réserver <Icon name="arrow" />
          </button>
        </div>
      </section>
      <AgencyFooter />
      <dialog
        className={`travel-dialog ${modal?.type === "fleet" ? "wide-dialog" : ""}`}
        ref={dialog}
        onCancel={(event) => {
          if (sending) event.preventDefault();
          else setModal(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget && !sending) setModal(null);
        }}
        aria-label={
          modal?.type === "booking"
            ? "Demander une réservation"
              : modal?.type === "fleet"
                ? "Nos véhicules"
                : "À propos de Visit Morocco"
        }
      >
        <button
          className="dialog-close"
          disabled={sending}
          onClick={() => setModal(null)}
          aria-label="Fermer la fenêtre"
        >
          <Icon name="close" />
        </button>
        {modal?.type === "fleet" && (
          <div className="dialog-content">
            <p className="eyebrow">LE BON VÉHICULE POUR VOTRE GROUPE</p>
            <h2>Nos véhicules</h2>
            <p>
              Indiquez le nombre de voyageurs et vos bagages. L’agence confirmera le véhicule adapté et sa disponibilité.
            </p>
            <div className="fleet-grid">
              {vehicles.map((vehicle) => (
                <article className="fleet-card" key={vehicle.name}>
                  <TravelPhoto index={vehicle.photo} label={vehicle.name} />
                  <h3>{vehicle.name}</h3>
                  <p>{vehicle.description}</p>
                  <div className="detail-meta">
                    <span>
                      <Icon name="user" />
                      Jusqu’à {vehicle.people} voyageurs
                    </span>
                    <span>
                      <Icon name="bag" />
                      {vehicle.bags} bagages
                    </span>
                  </div>
                  <button
                    className="button outline"
                    onClick={() => book(vehicle.name, "fleet")}
                  >
                    Choisir ce véhicule <Icon name="arrow" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
        {(modal?.type === "about" || modal?.type === "contact") && (
          <div className="dialog-content info-content">
            <Logo />
            <p className="eyebrow">DÉCOUVRIR · EXPLORER · VOYAGER</p>
            <h2>
              {modal.type === "about"
                ? "Le Maroc, selon vos envies"
                : "Parlons de votre voyage"}
            </h2>
            <p>
              {modal.type === "about"
                ? "Un transfert depuis l’aéroport, une escapade dans l’Atlas ou un circuit à travers le Sahara : Visit Morocco réunit plusieurs façons de découvrir le Maroc. Choisissez votre parcours et préparons les détails de votre voyage."
                : "Une destination précise, un voyage en groupe ou une envie particulière ? Partagez vos dates, votre parcours et vos coordonnées pour préparer une proposition adaptée."}
            </p>
            <div className="info-points">
              <span>
                <Icon name="car" />
                Transferts privés
              </span>
              <span>
                <Icon name="map" />
                Circuits & excursions
              </span>
              <span>
                <Icon name="van" />
                Véhicules selon votre groupe
              </span>
            </div>
            <button
              className="button primary"
              onClick={() => book("Voyage sur mesure")}
            >
              Préparer ma demande <Icon name="arrow" />
            </button>
          </div>
        )}
        {modal?.type === "booking" && (
          <div className="dialog-content booking-dialog-content">
            {reference ? (
              <div className="reservation-success" role="status">
                <span className="success-icon">
                  <Icon name="check" />
                </span>
                <p className="eyebrow">VOTRE VOYAGE PREND FORME</p>
                <h2>Demande reçue</h2>
                <p>
                  Votre demande a été enregistrée. Conservez votre référence ci-dessous.
                </p>
                <strong>{reference}</strong>
                <p className="small-note">
                  L’agence doit encore confirmer la disponibilité et le prix final. Aucun paiement n’a été effectué.
                </p>
                <button className="button primary" onClick={() => setModal(null)}>
                  Continuer la découverte <Icon name="arrow" />
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow">PRÉPARONS VOTRE DÉPART</p>
                <h2>Parlons de votre voyage</h2>
                <p className="booking-summary">{modal.journey.experience}</p>
                <form className="reservation-form" onSubmit={submitReservation}>
                  <div className="form-row">
                    <label>
                      Prise en charge / départ
                      <input
                        name="pickup"
                        autoComplete="off"
                        required
                        maxLength={150}
                        defaultValue={modal.journey.pickup}
                        placeholder="Aéroport, hôtel ou ville"
                      />
                    </label>
                    <label>
                      Destination
                      <input
                        name="destination"
                        required
                        maxLength={150}
                        defaultValue={modal.journey.destination}
                        placeholder="Quelle est votre destination ?"
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Date de départ
                      <input
                        name="date"
                        type="date"
                        onFocus={(event) => {
                          event.currentTarget.min = localDate();
                        }}
                        required
                        defaultValue={modal.journey.date}
                      />
                    </label>
                    <label>
                      Voyageurs
                      <select
                        name="passengers"
                        defaultValue={modal.journey.passengers}
                      >
                        {Array.from({ length: 16 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} voyageur{i ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    Nom complet
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="Votre nom et prénom"
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Adresse e-mail
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        placeholder="vous@exemple.com"
                      />
                    </label>
                    <label>
                      Téléphone
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        minLength={6}
                        maxLength={30}
                        placeholder="Avec l’indicatif du pays"
                      />
                    </label>
                  </div>
                  <label>
                    Votre message <span className="optional">(facultatif)</span>
                    <textarea
                      name="notes"
                      maxLength={2000}
                      rows={3}
                      placeholder="Numéro de vol, heure souhaitée, bagages ou demande particulière…"
                    />
                  </label>
                  <label className="consent">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      value="yes"
                    />
                    <span>
                      J’accepte que Visit Morocco utilise ces informations pour traiter ma demande de voyage.
                    </span>
                  </label>
                  <p className="small-note">
                    Votre demande sera enregistrée pour l’agence. La disponibilité et le tarif restent à confirmer ; aucun paiement n’est demandé ici.
                  </p>
                  {error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    className="button primary full-button"
                    disabled={sending}
                    type="submit"
                  >
                    {sending
                      ? "Envoi de votre demande…"
                      : "Envoyer ma demande"}
                    <Icon name="arrow" />
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </dialog>
    </main>
  );
}
