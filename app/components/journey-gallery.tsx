"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "./travel-ui";

type Photo = { src: string; label: string };

export function JourneyGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!selected) return;
    const current = dialog.current;
    const overflow = document.body.style.overflow;
    current?.showModal();
    document.body.style.overflow = "hidden";
    return () => { current?.close(); document.body.style.overflow = overflow; };
  }, [selected]);

  if (!photos.length) return null;
  return <section className="journey-gallery" aria-label="Quelques étapes en images">
    <p>Quelques étapes en images <span>Cliquez pour agrandir</span></p>
    <div>{photos.map((photo) => <button className="journey-gallery-photo" key={photo.src} onClick={() => setSelected(photo)} aria-label={`Agrandir la photo : ${photo.label}`}><Image src={photo.src} alt={photo.label} fill sizes="(max-width: 560px) 50vw, 25vw" /><span>{photo.label}<Icon name="arrow" /></span></button>)}</div>
    <dialog ref={dialog} className="travel-dialog photo-dialog" aria-label={selected?.label || "Photo du parcours"} onCancel={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <button className="dialog-close" aria-label="Fermer la photo" onClick={() => setSelected(null)}><Icon name="close" /></button>
      {selected && <><div className="photo-dialog-image"><Image src={selected.src} alt={selected.label} fill sizes="90vw" /></div><p>{selected.label}</p></>}
    </dialog>
  </section>;
}
