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

## Calibrated from export `usage-events-2026-09-12_1d17.csv`

All rows today: **Kind = Included** (no on-demand charges in the export).

### Atelier Cloud Agent (`bc-01a09735-…`)

| Metric | Value |
|---|---|
| Events | 19 |
| Models | `auto` ×17, `claude-4.5-sonnet` ×2 |
| Total tokens | **~10.3M** (mostly cache reads as the chat grew) |
| Est. API-equivalent $ | **~$2.80** (Composer-like rates for Auto; Sonnet at ~API list) |
| Biggest turns | ~2.0–2.4M tokens ≈ **~$0.48–$0.56** each (long-context) |
| Lean Week 01 burst (22:14–22:17) | **2 events, ~0.52M tokens, ~$0.17** |

### Rest of day (no Cloud Agent id)

Mostly `grok-bot-default` / `grok-bot-cua` — **~4.3M tokens**, roughly **~$0.3** at a cheap-bot guess (uncertain). Also Included.

### Cadence recommendation (from this sample)

Assuming Pro included headroom is roughly “tens of dollars” of Agent usage per month (exact pool isn’t printed as $ in the CSV):

| Pattern | Est. burn | Verdict |
|---|---|---|
| Mega day like today (ideate + scaffold + deploy + week1) | ~$3 / day | Fine occasionally; **~6–8 / mo** before crowding other Agent use |
| Lean exhibit-only follow-up | **~$0.15–$0.50** | Sweet spot |
| **2–4 lean exhibits / week** | **~$2–$8 / mo** | Best use of Pro for Atelier |
| Daily mega sessions | ~$60–$90 / mo equivalent | Too much for $20 Pro alone |
| Long chats with 1.5M+ token turns | Spikes fast | Start a **fresh agent** per exhibit when context gets fat |

**Practical rule:** prefer **short Cloud Agent runs** (one exhibit → one exhibit → PR/preview), Composer/`auto`, avoid Sonnet unless stuck. That supports **~2–4 Atelier drops per week** without eating the whole plan.

## Week 01 redo — composer-2.5

| Field | Value |
|---|---|
| Start (UTC) | 2026-09-12T23:11:07Z |
| End (UTC) | 2026-09-12T23:11:34Z |
| Scope | Replace plasma ribbon with **SYNTH HALO** neon orrery (model-comparison redo) |
| Files touched | `src/exhibits/synthHalo.js`, `src/main.js`, `src/exhibits.js`, `exhibits/NOTES.md`, `exhibits/WEEK-01-SYNTH-HALO.md`, `MODELS.md`, `COST_LOG.md` (removed `exhibits/WEEK-01-PLASMA-RIBBON.md`) |
