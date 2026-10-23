"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { type Tour, tourWhatsAppUrl } from "@/lib/tours";
import { Icon } from "./travel-ui";

export function TourBooking({ tour }: { tour: Tour }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const current = dialog.current;
    const previousOverflow = document.body.style.overflow;
    current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      current?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") || "").trim();
    const nameInput = event.currentTarget.elements.namedItem("fullName") as HTMLInputElement;
    nameInput.setCustomValidity(fullName ? "" : "Veuillez renseigner votre nom complet.");
    if (!event.currentTarget.reportValidity()) return;
    window.location.assign(tourWhatsAppUrl(tour, {
      fullName,
      date: String(data.get("date") || ""),
      passengers: String(data.get("passengers") || "1"),
      description: String(data.get("description") || ""),
    }));
  }

  return <>
    <button className="button primary full-button" onClick={() => setOpen(true)}>Réserver <Icon name="arrow" /></button>
    <p className="transfer-booking-note">Devis personnalisé et réservation par WhatsApp</p>
    <dialog ref={dialog} className="travel-dialog" aria-labelledby="tour-booking-title" onCancel={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <button className="dialog-close" aria-label="Fermer" onClick={() => setOpen(false)}><Icon name="close" /></button>
      <div className="dialog-content booking-dialog-content" lang="fr">
        <p className="eyebrow">VOTRE VOYAGE SUR MESURE</p>
        <h2 id="tour-booking-title">Réserver ce tour</h2>
        <div className="transfer-booking-summary"><strong>{tour.title}</strong><span>{tour.duration} · Véhicule privé · Sur devis</span><p className="tour-summary-itinerary">{tour.itinerary}</p></div>
        <form className="reservation-form" onSubmit={submit}>
          <label>Nom complet<input name="fullName" autoComplete="name" required maxLength={100} placeholder="Votre nom et prénom" onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
          <div className="form-row">
            <label>Date de départ<input name="date" type="date" required onFocus={(event) => { const now = new Date(); event.currentTarget.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; }} /></label>
            <label>Voyageurs<input name="passengers" type="number" required min={1} step={1} defaultValue={2} /></label>
          </div>
          <label>Description<textarea name="description" rows={4} maxLength={2000} placeholder="Lieu de départ, hébergements souhaités, composition du groupe, étapes à personnaliser ou demandes particulières…" /></label>
          <p className="small-note">Le prix est sur devis selon votre groupe et le programme retenu. Les hébergements, repas, visites, activités et autres prestations seront précisés dans la proposition de l’agence.</p>
          <button className="button primary full-button" type="submit">Réserver sur WhatsApp <Icon name="arrow" /></button>
          <p className="small-note">Votre message sera préparé dans WhatsApp. Envoyez-le au +212 655 407 529 pour demander votre devis et la disponibilité.</p>
        </form>
      </div>
    </dialog>
  </>;
}
