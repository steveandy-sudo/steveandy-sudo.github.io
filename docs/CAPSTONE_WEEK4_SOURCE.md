# Capstone week-4 update

Source: `설프_1조_4주차발표.pptx`, 12 slides, supplied by the participant on September 22, 2026. The source deck is retained locally; the public site includes only the two selected slide exports.

| Slides | Content reflected on the site |
| --- | --- |
| 1–2, 5 | 1/5 HENES platform; L1 user needs/ODD defined, L2 system requirements/high-level design in progress; preliminary design being outlined |
| 3 | School-zone pedestrian occlusion; daytime, clear weather, dry surface, low-speed straight driving; night, adverse weather, intersections and mixed traffic excluded |
| 4 | Perception lead, end-to-end latency, deceleration lead, minimum TTC and collision occurrence |
| 6–7 | Edge-to-vehicle object state, visual/object-state encoders and lightweight fusion; matched platform, ODD, speed, training conditions and controller |
| 8 | Bounding-box bottom center, road-plane homography; x, y, confidence, timestamp |
| 9–10 | d_req = v · T_system + D_brake(v) + M; per-stage timestamps, t6 − t0, P50/P95/maximum latency |
| 11 | Camera/receiver/AI/control interfaces; E-stop, command timeout, default zero output, watchdog; hardware, power and mounting deferred to detailed design |

## Public assets

- `public/media/projects/camera-v2i/01-week4-occlusion-odd.png`: direct export of slide 3. Its street-view photograph is an illustrative environment, not a test record.
- `public/media/projects/camera-v2i/02-week4-e2e-comparison.png`: direct export of slide 7. Used in the homepage and comparison section.

Both exports are 1600×900 PNGs. The original slide content has not been retouched. Adjacent English text conveys the content for readers who do not read Korean.

## Scope of claims

The update replaces the older generic concept and proposed velocity fields with the presentation's current interface. It does not claim implemented fusion, trained E2E models, calibrated geometry, measured latency, or successful HENES driving. Numerical speed/latency limits, trial counts, model choices and detailed hardware are not supplied in the deck. The V-model here is the capstone's design method; it does not change the status of the separate, earlier Dream Semester project.
