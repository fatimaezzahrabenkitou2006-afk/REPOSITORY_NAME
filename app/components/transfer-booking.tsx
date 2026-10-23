"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { type Transfer, transferWhatsAppUrl } from "@/lib/transfers";
import { Icon } from "./travel-ui";

export function TransferBooking({ transfer }: { transfer: Transfer }) {
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
    window.location.assign(transferWhatsAppUrl(transfer, {
      fullName,
      date: String(data.get("date") || ""),
      passengers: String(data.get("passengers") || "1"),
      description: String(data.get("description") || ""),
    }));
  }

  return (
    <>
      <button className="button primary full-button" onClick={() => setOpen(true)}>Réserver <Icon name="arrow" /></button>
      <p className="transfer-booking-note">Réservation par WhatsApp · Disponibilité à confirmer</p>
      <dialog ref={dialog} className="travel-dialog" aria-labelledby="transfer-booking-title" onCancel={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <button className="dialog-close" aria-label="Fermer" onClick={() => setOpen(false)}><Icon name="close" /></button>
        <div className="dialog-content booking-dialog-content" lang="fr">
          <p className="eyebrow">VOTRE PROCHAIN VOYAGE</p>
          <h2 id="transfer-booking-title">Réserver ce transfert</h2>
          <div className="transfer-booking-summary"><strong>{transfer.from} → {transfer.to}</strong><span>{transfer.price} € · SUV 4×4 · Aller simple · Par véhicule</span></div>
          <form className="reservation-form" onSubmit={submit}>
            <label>Nom complet<input name="fullName" autoComplete="name" required maxLength={100} placeholder="Votre nom et prénom" onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
            <div className="form-row">
              <label>Date du transfert<input name="date" type="date" required onFocus={(event) => { const now = new Date(); event.currentTarget.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; }} /></label>
              <label>Passagers<input name="passengers" type="number" required min={1} max={16} defaultValue={1} /></label>
            </div>
            <label>Description<textarea name="description" rows={4} maxLength={2000} placeholder="Adresse de prise en charge, hôtel, heure souhaitée, numéro de vol, bagages ou demande de van…" /></label>
            <p className="small-note">Le tarif indiqué concerne le SUV 4×4 (Škoda Kodiaq). Van 7 places et Luxury Van sur demande. L’agence confirmera le véhicule, le prix et la disponibilité dans WhatsApp.</p>
            <button className="button primary full-button" type="submit">Réserver sur WhatsApp <Icon name="arrow" /></button>
            <p className="small-note">Votre message sera préparé dans WhatsApp. Envoyez-le pour transmettre votre demande au +212 655 407 529.</p>
          </form>
        </div>
      </dialog>
    </>
  );
}
