import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoyagePlus | Extraordinary Journeys",
  description:
    "Discover extraordinary journeys with VoyagePlus. Private transfers, curated tours, unforgettable excursions and a premium fleet. Request your next journey online.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
