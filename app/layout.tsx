import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fatima Ezzahra — L’atelier de beauté",
  description:
    "Un lieu à part, une beauté qui vous ressemble. Découvrez les coupes, colorations et rituels de soin du salon Fatima Ezzahra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
