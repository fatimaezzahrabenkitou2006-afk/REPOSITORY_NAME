# VoyagePlus

A responsive Next.js travel agency website recreated from the supplied VoyagePlus reference. The homepage includes private transfers, tours, excursions, fleet selection and reservation enquiries. Deep green, sand and ivory match the reference; generated travel photographs and licensed fonts are served locally.

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

## Reservation requests

The booking bar and experience/fleet dialogs submit to `POST /api/reservations`. The server validates journey details, contact information, date, passenger count and consent, then saves a pending request with a unique reference. Requests are **not confirmed bookings**. There is no payment processing, live inventory or automatic email delivery.

Requests are stored in private newline-delimited JSON at `.data/reservations.ndjson`, outside the public directory and excluded from Git. Set `BOOKING_DATA_DIR` to a private persistent directory to change the storage location. The agency can read this file through authorized server access; there is deliberately no public endpoint exposing customer information.

For a public production launch, configure a persistent volume (the default local store is unsuitable for ephemeral/serverless deployments), agency notification/management, retention policies, and abuse protection appropriate to the host. Confirm the agency’s real destinations, fleet capacities, starting prices and inclusions: the supplied template's catalogue and prices are demonstration content. No payments should be accepted or availability promised without the corresponding integrations.

## Assets

`public/images/voyage-hero.webp`, `voyage-experiences.webp` and `voyage-fleet.webp` are generated local artwork inspired by the reference, not photographs of a verified agency fleet or destinations. The eight service/destination photographs are composed as a local image sheet. Fonts are distributed with their SIL Open Font License files in `public/fonts`.
