import { AgencyFooter, ContactStrip } from "../components/agency-ui";
import { SiteNavbar } from "../components/site-navbar";
import "../style.css";
import "./transfers.css";

export default function TransfersLayout({ children }: { children: React.ReactNode }) {
  return <div lang="fr">
    <a className="skip-link" href="#transfer-content">Aller au contenu</a>
    <ContactStrip />
    <SiteNavbar bookHref="/transfers" />
    {children}
    <AgencyFooter />
  </div>;
}
