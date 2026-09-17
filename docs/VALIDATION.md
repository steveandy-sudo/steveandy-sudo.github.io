# Implementation validation — 2026-09-17

- Installed the locked npm dependencies; installation audit reported zero vulnerabilities.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: successful static generation of 8 HTML pages (two homepages, five case studies, and the 404 page).
- `npm run verify`: 228 local links, assets, and anchors passed. Canonical/OG metadata, single headings, project contribution sections, responsive TOC markup, CV files, and hidden empty media slots were checked.
- `npm run test:ui`: all 6 Playwright tests passed using Microsoft Edge. All seven content routes were checked at 1440, 768, 390, and 320 pixels; keyboard skip navigation, language links, CV availability, section highlighting, mobile navigation, and 200% text enlargement were checked.
- Desktop and mobile screenshots were visually inspected, including home, project, technical-body, CV, and footer layouts.
- Development pages rendered exactly 8 media requests (3 Kookmin, 2 Mobility, 1 each V2I/UAV/V-Model). Production pages rendered none of the empty request boxes.
- No generated project photography, experimental imagery, architecture diagrams, or invented performance measurements are included.
- Public GitHub code links were checked anonymously. The Kookmin repository was confirmed private; its link is stored in source metadata and omitted from the public page.
- V2 English/Korean CVs are included. V1 files are not included while the GPA remains unconfirmed.

## Tooling note

Astro/MDX emits Vite `MODULE_LEVEL_DIRECTIVE` warnings concerning its generated `use astro:head-inject` directive. The warnings are not suppressed. Static generation, rendered styles, metadata, and browser interactions passed the checks above. This is distinct from the type checker, which reports no diagnostics.

These checks do not establish new experimental results, validate every future media file, or certify accessibility. Actual images, videos, and translated project documents still require content review when added.
