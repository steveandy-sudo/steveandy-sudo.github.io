# Website validation

## Current scope

The website is English-only: one homepage, five existing case-study routes, and the 404 page. Korean website routes and language-switch links are removed. English and Korean CV PDFs remain separate downloadable artifacts at their existing direct URLs.

The homepage presents each public project's GitHub link once. Kookmin, UAV, and Dream Semester have public links; AI·SW shows its private status and competition-related reason; the capstone has no repository link. Each project title and preview image links to its case study. There is no separate “Read case study” link.

## Checks for each release

- `npm run check`: validate TypeScript, Astro components, and MDX metadata.
- `npm run build`: generate the seven HTML pages and referenced assets.
- `npm run verify`: check local links, assets, anchors, metadata, contribution sections, and CV files. Check that no Korean website route or language-switch link is generated.
- Browser checks: inspect the six content routes at 1440, 768, 390, and 320 pixels; confirm no horizontal overflow, keyboard skip navigation, section highlighting, mobile TOC behavior, and 200% text enlargement.
- Homepage navigation: confirm exactly one GitHub link for each public project, a non-link private notice for AI·SW, and no repository link for the capstone. Confirm each project title and preview image links to the correct case study, with no separate “Read case study” action.
- Media: inspect posters, GIF playback and pause controls, aspect ratios, and captions against the source recordings. Confirm no empty development request boxes appear in production.
- After deployment: check the live homepage, retained case-study URLs, linked media, and both V2 CV PDFs.

`tests/site.spec.ts` records the browser assertions. Browser tests and visual inspection must be reported from an actual run; editing the assertions does not establish that they pass.

## Content checks

- The Kookmin case study has one GitHub link in its header, pointing to `steveandy-sudo/kookmin-autonomous-portfolio`. Obsolete links to the original team repository are rejected.
- AI·SW records 10 m/s waypoint driving on both courses during venue practice and a 50 km/h AEB stop command. Detailed trial descriptions retain the brake fault and stopping-zone overrun.
- Capstone material describes a design-stage project; slide diagrams do not establish completed implementation or vehicle validation.
- UAV footage shows simulated waypoint flight. Dream Semester footage separates CARLA simulation from supported-wheel testing with separate control commands.
- V2 English/Korean CVs are included. V1 files are not included while the GPA remains unconfirmed.

## Tooling note

Astro/MDX can emit Vite `MODULE_LEVEL_DIRECTIVE` warnings concerning its generated `use astro:head-inject` directive. These warnings are not suppressed. They are separate from type-checker diagnostics; any build or browser failure still needs investigation.

Checks do not establish new experimental results or certify accessibility. New media and factual changes require content review alongside the technical checks.
