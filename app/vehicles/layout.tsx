import { AgencyFooter, ContactStrip } from "../components/agency-ui";
import { SiteNavbar } from "../components/site-navbar";
import "../style.css";
import "./vehicles.css";

export default function VehiclesLayout({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#vehicle-content">Aller au contenu</a><ContactStrip /><SiteNavbar bookHref="/vehicles#vehicle-options" />{children}<AgencyFooter /></>;
}
