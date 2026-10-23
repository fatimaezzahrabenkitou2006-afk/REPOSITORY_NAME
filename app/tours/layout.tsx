import { AgencyFooter, ContactStrip } from "../components/agency-ui";
import { SiteNavbar } from "../components/site-navbar";
import "../style.css";
import "../transfers/transfers.css";
import "./tours.css";

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return <div lang="fr">
    <a className="skip-link" href="#tour-content">Aller au contenu</a>
    <ContactStrip />
    <SiteNavbar bookHref="/tours" />
    {children}
    <AgencyFooter />
  </div>;
}
