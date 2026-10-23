# Visit Morocco

A responsive Next.js travel agency website inspired by the supplied luxury travel reference. The homepage includes private transfers, tours, excursions, fleet selection and reservation enquiries. The palette uses ivory, forest green and champagne gold; travel photographs and licensed fonts are served locally.

## Development

Requires Node.js 24 and npm 11 (the versions validated in the cloud environment).

```sh
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --hostname 0.0.0.0
```

```sh
npm run lint
npm test
npm run build
npm run start -- --hostname 0.0.0.0
```

The default port is 3000. No external font or image network access is needed.

## Moroccan transfer catalogue

`transfers.txt` is the supplied pricing source. Its footer says 38 routes, but it contains 41 route entries; all 41 are preserved in `lib/transfers-data.json`. Prices are in euros, per vehicle, one way, for a SUV 4×4 (Škoda Kodiaq). Van 7 seats and Luxury Van are available on request.

The homepage features nine transfers on desktop and six at viewport widths up to 850px. `/transfers` lists all routes with destination search and category filters. `/transfers/[slug]` provides each route's details, price and dedicated booking form. The form prepares a WhatsApp message with the selected route, price, full name, date, passenger count and description. The recipient is **+212655407529**, as requested, overriding the different number printed in the source file. The traveller must send the prepared message in WhatsApp; the site does not send it automatically or save this form to the reservation API.

Destination photographs in `public/images/transfers` are AI-generated illustrations. Routes to the same destination share its image. Availability, vehicle suitability, final pickup details and any van pricing must be confirmed by the agency.

## Private tours and circuits

`tours.txt` supplies 18 tours: five excursions, seven short circuits and six grand circuits, from half a day to ten days. `lib/tours-data.json` preserves their names, durations and exact itineraries. All prices are **on request**; no numeric tour prices or guaranteed inclusions are invented.

The homepage shows nine tours on desktop and six at widths up to 850px, replacing the original demonstration experiences. `/tours` provides search and category filters; `/tours/[slug]` contains the tour description, itinerary stops and a dedicated Book Now form. Stops are not represented as a day-by-day schedule because the supplied file does not specify one. The form prepares a WhatsApp quote request to **+212655407529**, retaining the number requested for transfers rather than the different source-file number. It includes the exact tour, duration, itinerary, full name, departure date, group size and description. The traveller sends the prepared message in WhatsApp.

Every tour has a generated destination photograph in `public/images/tours`. Programme details, accommodation, meals, guides, activities, availability and final pricing are confirmed with the agency.

## Private excursions

`excursions.txt` supplies ten private excursions departing from Marrakech: six full-day and four half-day activities. `lib/excursions-data.json` preserves their titles, durations, starting prices and highlights. The source does not specify whether starting prices are per person or per vehicle, so the UI and WhatsApp message do not invent a pricing unit. The final price and included services are confirmed with the agency.

The homepage shows nine selected excursions on desktop and six up to 850px. `/excursions` lists all ten with search and duration filters. `/excursions/[slug]` displays details, highlights and a Book Now form containing full name, date, group size and description. WhatsApp receives the selected excursion, its starting price and the traveller's details at **+212655407529**, retaining the user's requested number. The traveller must send the prepared message in WhatsApp. Generated photographs are stored in `public/images/excursions`.

## General reservation requests

The booking bar and general/fleet enquiry dialogs submit to `POST /api/reservations`. The server validates journey details, contact information, date, passenger count and consent, then saves a pending request with a unique reference. Requests are **not confirmed bookings**. There is no payment processing, live inventory or automatic email delivery.

Requests are stored in private newline-delimited JSON at `.data/reservations.ndjson`, outside the public directory and excluded from Git. Set `BOOKING_DATA_DIR` to a private persistent directory to change the storage location. The agency can read this file through authorized server access; there is deliberately no public endpoint exposing customer information.

For a public production launch, configure a persistent volume (the default local store is unsuitable for ephemeral/serverless deployments), agency notification/management, retention policies, and abuse protection appropriate to the host. Confirm the agency’s real destinations, fleet capacities, starting prices and inclusions: the supplied template's catalogue and prices are demonstration content. No payments should be accepted or availability promised without the corresponding integrations.

## Assets

`public/images/voyage-hero.webp`, `voyage-experiences.webp` and `voyage-fleet.webp` are generated local artwork inspired by the reference, not photographs of a verified agency fleet or destinations. The eight service/destination photographs are composed as a local image sheet. Fonts are distributed with their SIL Open Font License files in `public/fonts`.
