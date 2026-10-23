"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, Logo, TravelPhoto } from "./travel-ui";
import { vehicles } from "@/lib/travel-data";

type NavbarProps = {
  bookHref?: string;
  onBook?: () => void;
  onAbout?: () => void;
  onContact?: () => void;
};

function NavbarLayout({ pathname, bookHref = "/#booking", onBook, onAbout, onContact }: NavbarProps & { pathname: string | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"fleet" | "about" | "contact" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!panel) return;
    const current = dialog.current;
    const overflow = document.body.style.overflow;
    current?.showModal();
    document.body.style.overflow = "hidden";
    return () => { current?.close(); document.body.style.overflow = overflow; };
  }, [panel]);

  function showPanel(value: "fleet" | "about" | "contact", handler?: () => void) {
    setMenuOpen(false);
    if (handler) handler();
    else setPanel(value);
  }

  return <>
    <header className="site-header site-navbar" onKeyDown={(event) => { if (event.key === "Escape") { setMenuOpen(false); toggle.current?.focus(); } }}>
      <div className="site-nav-inner">
        <Logo />
        <nav className={`site-nav-links ${menuOpen ? "is-open" : ""}`} id={menuId} aria-label="Navigation principale">
          {[["/", "Accueil"], ["/transfers", "Transferts"], ["/tours", "Circuits"], ["/excursions", "Excursions"], ["/vehicles", "Véhicules"]].map(([href, label]) => {
            const active = href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(`${href}/`);
            return <Link key={href} href={href} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>;
          })}
          <button onClick={() => showPanel("about", onAbout)}>À propos</button>
          <button onClick={() => showPanel("contact", onContact)}>Contact</button>
        </nav>
        <div className="site-nav-actions">
          {onBook
            ? <button className="button primary site-nav-book" onClick={() => { setMenuOpen(false); onBook(); }}>Réserver <Icon name="calendar-check" /></button>
            : <Link className="button primary site-nav-book" href={bookHref} onClick={() => setMenuOpen(false)}>Réserver <Icon name="calendar-check" /></Link>}
          <button ref={toggle} className="site-nav-toggle" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-controls={menuId} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
    <dialog ref={dialog} className={`travel-dialog ${panel === "fleet" ? "wide-dialog" : ""}`} aria-label={panel === "fleet" ? "Nos véhicules" : panel === "contact" ? "Contact" : "À propos de Visit Morocco"} onCancel={() => setPanel(null)} onClick={(event) => { if (event.target === event.currentTarget) setPanel(null); }}>
      <button className="dialog-close" aria-label="Fermer la fenêtre" onClick={() => setPanel(null)}><Icon name="close" /></button>
      <div className="dialog-content info-content">
        <p className="eyebrow">VISIT MOROCCO · LE MAROC À VOTRE RYTHME</p>
        <h2>{panel === "fleet" ? "Nos véhicules" : panel === "contact" ? "Parlons de votre voyage" : "Le Maroc, selon vos envies"}</h2>
        {panel === "fleet" ? <><p>Indiquez votre groupe et vos bagages. L’agence confirmera le véhicule adapté à votre trajet.</p><div className="fleet-grid">{vehicles.map((vehicle) => <article className="fleet-card" key={vehicle.name}><TravelPhoto index={vehicle.photo} label={vehicle.name} /><h3>{vehicle.name}</h3><p>{vehicle.description}</p></article>)}</div></>
          : <p>{panel === "contact" ? "Partagez votre trajet, vos dates et le nombre de voyageurs pour préparer votre demande avec l’agence." : "Des transferts privés, des excursions depuis Marrakech et des circuits sur mesure pour découvrir le Maroc selon vos envies."}</p>}
        <a className="button primary full-button" href="https://wa.me/212655407529" target="_blank" rel="noopener noreferrer">Parlons-en sur WhatsApp <Icon name="arrow" /></a>
      </div>
    </dialog>
  </>;
}

function RoutedNavbar(props: NavbarProps) {
  return <NavbarLayout {...props} pathname={usePathname()} />;
}

export function SiteNavbar(props: NavbarProps) {
  return <Suspense fallback={<NavbarLayout {...props} pathname={null} />}><RoutedNavbar {...props} /></Suspense>;
}
