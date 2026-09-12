# Cost log — Atelier Cloud Agent experiments

Agents **cannot** read dollar spend mid-run. Calibration = do a lean task, then check [Cursor Dashboard → Spending](https://cursor.com/dashboard).

## Test A — This conversation (parent run)

| Field | Value |
|---|---|
| Run | [bc-01a09735-5333-70cd-b9b2-62dd42f01f56](https://cursor.com/agents/bc-01a09735-5333-70cd-b9b2-62dd42f01f56) |
| Model | `default` (Auto → Composer routing) |
| Started (UTC) | ~2026-09-12 (session start) |
| Cost-test mark (UTC) | 2026-09-12T22:16:12Z |
| Scope so far | Ideation → Week 00 scaffold → CF temp preview → mobile pass → MODELS.md → **Week 01 Plasma Ribbon** |
| Agent-visible $ | **Unavailable** (no in-VM meter; no personal usage API key in this environment) |

### What you should record (human)

After this reply, open Spending and note:

1. **Included usage %** (before vs after if you snapped a before)
2. Any **request-level** lines for this agent id
3. Whether spend came from **Cursor Models** pool (Composer) vs **Other Models**

Paste those numbers back into chat — we’ll refine cadence from *your* real burn rate.

## Test B — Lean Week 01 exhibit (same run)

| Field | Value |
|---|---|
| Brief | Living lobby + plasma ribbon, procedural only |
| Code | `src/exhibits/plasmaRibbon.js` + registry/notes/HUD |
| Build | `npm run build` OK (~0.3s transform) |
| Preview | https://atelier.omniscient-boar.workers.dev |
| Claim (60m) | https://dash.cloudflare.com/claim-preview?claimToken=BsGE30-OcttUYnhGfvqmKCUjmo2a6kDc0y6coPYW76E |
| Wall clock (code→deploy) | ~2026-09-12T22:16:12Z → 22:17:37Z (~85s tooling; agent turns extra) |
| Intent | Measure incremental cost of a *typical weekly* exhibit *inside* an already-warm agent vs a fresh agent |

**Hypothesis:** Fresh Cloud Agent runs cost more (boot + context). Follow-ups in an open run are cheaper per exhibit. Best Pro strategy may be **2–4 small exhibits per week in fewer longer sessions**, not 7 separate cold starts.

## Cadence guidance (until Spending data arrives)

| Cadence | Fit on Pro (~$20) | Notes |
|---|---|---|
| 1× / week | Very safe | Original plan |
| 2–3× / week | Likely fine on Composer/`default` if desktop Agent is quiet | Best “use the budget” target |
| Daily | Risky | Docs suggest heavy daily Agent often exceeds Pro alone |
| Parallel duels | Expensive | Keep rare |

Prefer **Composer / Auto default** for Atelier; save Sonnet/Opus for hard bugs.

## API note (optional later)

With a Cloud Agents API key: `GET /v1/agents/{id}/usage` returns **token counts** (not $). Teams Admin API can return `chargedCents`. Personal Pro dashboards remain the source of truth for dollars/%.
