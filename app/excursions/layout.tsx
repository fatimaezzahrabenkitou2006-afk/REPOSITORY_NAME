import { AgencyFooter, ContactStrip } from "../components/agency-ui";
import { SiteNavbar } from "../components/site-navbar";
import "../style.css";
import "../transfers/transfers.css";
import "../tours/tours.css";
import "./excursions.css";
import "./listing.css";

export default function ExcursionsLayout({ children }: { children: React.ReactNode }) {
  return <div lang="fr">
    <a className="skip-link" href="#excursion-content">Aller au contenu</a>
    <ContactStrip />
    <SiteNavbar bookHref="/excursions" />
    {children}
    <AgencyFooter />
  </div>;
}
