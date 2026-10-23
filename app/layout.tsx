import type { Metadata } from "next";
import { MotionEffects } from "./components/motion-effects";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
import "./motion.css";
import "./refinement.css";
import "./navigation.css";
import "./palette.css";
import "./catalog-pages.css";
import "./responsive.css";
import "./catalog-listings.css";
import "./redesign.css";
import "./hero-slideshow.css";
import "./booking-filter.css";
import "./home-dynamic.css";
import "./brand.css";

export const metadata: Metadata = {
  title: "Visit Morocco | Transferts, circuits et excursions au Maroc",
  description:
    "Découvrez le Maroc à votre rythme : transferts privés, circuits sur mesure et excursions depuis Marrakech. Consultez nos parcours et préparez votre demande en ligne.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="voyage-redesign"><AppRouterCacheProvider options={{ enableCssLayer: true }}>{children}<MotionEffects /></AppRouterCacheProvider></body>
    </html>
  );
}
