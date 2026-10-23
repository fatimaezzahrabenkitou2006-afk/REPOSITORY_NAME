import Link from "next/link";
import { Icon, Logo } from "./travel-ui";

export function ContactStrip() {
  return <div className="contact-strip"><div><span>Le Maroc, en voyage privé</span><a href="https://wa.me/212655407529" target="_blank" rel="noopener noreferrer">Parlons de votre voyage <span>+212 655 407 529</span><Icon name="arrow" /></a></div></div>;
}

export function BookingSteps() {
  return <section className="booking-steps section-shell" lang="fr">
    <div className="section-title"><p className="eyebrow">SIMPLE, DU PREMIER CONTACT AU DÉPART</p><span className="gold-line" /><h2>Votre voyage commence ici.</h2><p>Une destination en tête ? Construisons la suite ensemble.</p></div>
    <div className="booking-steps-grid">
      <article><span>01</span><h3>Trouvez votre prochaine découverte</h3><p>Choisissez un transfert, une excursion ou un circuit. Consultez le parcours, la durée et le tarif affiché.</p></article>
      <article><span>02</span><h3>Parlez-nous de votre projet</h3><p>Depuis la fiche de votre choix, préparez votre demande WhatsApp avec vos dates, votre groupe et vos envies.</p></article>
      <article><span>03</span><h3>Précisez les derniers détails</h3><p>Convenez du programme, de la prise en charge et du prix avec l’agence avant de confirmer votre réservation.</p></article>
    </div>
  </section>;
}

export function AgencyFooter() {
  return <footer className="agency-footer" lang="fr"><div className="agency-footer-main section-shell">
    <div><Logo /><p>Des villes impériales aux dunes du Sahara, choisissez votre façon de découvrir le Maroc.</p></div>
    <div><h3>Votre voyage</h3><Link href="/transfers">Transferts privés</Link><Link href="/tours">Tours & circuits</Link><Link href="/excursions">Excursions à la journée</Link><Link href="/vehicles">Nos véhicules</Link></div>
    <div><h3>Préparons votre départ</h3><a href="https://wa.me/212655407529" target="_blank" rel="noopener noreferrer">WhatsApp : +212 655 407 529</a><p>Partagez votre trajet, vos dates et le nombre de voyageurs pour préparer votre demande.</p></div>
  </div><div className="agency-footer-bottom section-shell"><span>© 2026 Visit Morocco. Le Maroc, à votre rythme.</span><span>Transferts · Circuits · Excursions</span></div></footer>;
}
