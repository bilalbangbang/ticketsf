# ticketSF.

An independent data science dashboard exploring San Francisco's 2025 parking citation records. Built by Bilal J. with Python, pandas, Jupyter, Next.js, React, and TypeScript.

The project started with a conversation after a philosophy class at USF and a question: when are citations issued most often, and which violations appear most frequently?

## Explore

- **Overview:** hourly counts, weekday daily averages, and common categories.
- **Violations:** search, sort, select, and export the displayed categories as CSV.
- **Methodology:** source, measurement choices, validation, and limitations.
- **About:** the personal story behind the project.

Dark minimalist styling, the original blue-gray accents, mobile navigation, keyboard chart selectors, and the small bunny credit are preserved. Views support hash links such as `/#about` and browser Back/Forward.

## Run locally

Use Node.js 24 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Production preview:

```bash
npm run build
npm start
```

The development server uses `.next-dev`; production builds use `.next` so the two do not overwrite each other. If the development server is already using port 3000, run `npm start -- -p 3001`.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev
npm run verify:data
```

`npm test` compares every shipped aggregate to saved API responses, reconciles daily/hourly totals, and recomputes weekday averages across all 365 dates. `verify:data` makes read-only requests to DataSF and fails if the source differs from the saved snapshot. It never silently replaces data. CI uses the saved snapshot so upstream changes do not make builds nondeterministic.

## Data and results

Source: [SFMTA Parking Citations & Fines, DataSF](https://data.sf.gov/d/ab4h-6ztd), dataset `ab4h-6ztd`. Queries cover recorded issuance timestamps from 2025-01-01 inclusive through 2026-01-01 exclusive. The aggregate API responses were retrieved on **14 October 2026 UTC** and are retained with the exact query URLs in `data/provenance/`.

| Measure | Result |
| --- | ---: |
| Citation records | 1,358,015 |
| Street cleaning | 531,375 (39.1%) |
| Most common recorded hour | 12 pm, 207,051 |
| Highest average weekday | Tuesday, 4,929 per day |
| Top ten categories | 1,086,034 (80.0%) |

The `MTR OUT DT` count is **159,391**. An earlier dashboard transcription used 153,391 and incorrectly described the notebook's top-ten total as an error. Both the original notebook and new API query confirm 159,391.

Counts describe historical citation activity, not an individual driver's risk. There is no denominator for parked vehicles, parking duration, or enforcement opportunity. Hour and weekday charts are separate summaries; they do not establish a Tuesday-afternoon pattern. Records may include non-parking violations and can be corrected by the source. No raw citations, vehicle plates, or individual locations are included in this repository.

See [data provenance](docs/DATA.md), [dependency review](docs/SECURITY-REVIEW.md), and the [analysis notebook](notebooks/ticketSF.ipynb).

## Deploy

This project uses the standard Next.js preset on Vercel, Node.js 24, the repository root directory, `npm ci`, and `npm run build`. No environment variables, database, or API credentials are needed at runtime. Data is bundled from the checked-in CSVs during the build.

Repository: [bilalbangbang/ticketsf](https://github.com/bilalbangbang/ticketsf). Vercel deployment is approved and in preparation. See [release steps](docs/RELEASE.md).

## Credits and reuse

Independent student project, not affiliated with SFMTA or the City and County of San Francisco. Bunny artwork was supplied by the project creator. A code license has not yet been selected; no open-source license is implied. Source data remains subject to its publisher's terms.
