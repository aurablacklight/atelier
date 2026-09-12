# Cloud Agent brief — Atelier

Use **this same repository** every week. Do not create a new repo.

## This week (Week 00 — already scaffolded)

> Extend the Atelier Three.js gallery toward a **neon arcade loft**. This week is **not** a big new sculpture — make the **lobby feel alive**: reflective floor, soft bloom, one procedural neon accent, and a pedestal that will hold future exhibits. When done, open a PR and update the lobby so a **title pedestal** appears for this week’s merge. No image textures. Keep scope small for a single Cloud Agent run.

Week 00 is the starter commit. Future weeks start from `main` after merge.

## Future week template

Copy, fill, paste into a Cloud Agent:

```text
Repo: aurablacklight/atelier (single evolving world — do not create a new repo)

Goal: Add ONE new exhibit for Week NN in the existing neon arcade loft lobby.

Constraints:
- Procedural only (no external image textures) unless the brief says otherwise
- Prefer Composer / Cursor models; keep the change small
- Preserve existing lobby foundations in src/lobby.js unless a tiny tweak is required
- Camera demo path should stay ~12 seconds (src/cameraPath.js)
- Update src/exhibits.js with the new entry
- Add exhibits/WEEK-NN-<slug>.md and 3 poetic lines in exhibits/NOTES.md
- Open a PR using .github/pull_request_template.md
- Include a short browser flythrough recording as PR evidence

Acceptance:
- npm run build succeeds
- New exhibit is visible near the pedestal
- Registry + notes updated
```

## Budget tips ($20 Pro)

- One agent per week
- Avoid parallel agents except rare “scene duel” events
- Prefer Cursor/Composer models over expensive third-party defaults
- Set a spend limit; skip daily automations
