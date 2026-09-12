# Atelier

One evolving Three.js gallery. **One repo forever** — weekly Cloud Agent PRs hang new exhibits. No per-week repositories.

## Week 00 brief (this scaffold)

- **Mode:** Living lobby
- **Vibe:** Neon arcade loft — chrome, bloom, reflective floor, night-city bleed
- **Constraint:** Procedural only — no external textures
- **Extra:** Pedestal + floating title ready for merges

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run deploy   # Cloudflare Workers static assets → public URL
```

Mobile and desktop are both first-class: safe-area UI, touch orbit controls, and lighter GPU settings on phones.

## Repo layout

```
src/
  main.js          # renderer, bloom, flythrough
  lobby.js         # Week 00 neon loft foundations
  cameraPath.js    # ~12s demo camera path
  exhibits.js      # registry — append each week
exhibits/
  NOTES.md         # poetic + practical weekly notes
  WEEK-00-LOBBY.md
.github/pull_request_template.md
AGENT_BRIEF.md     # paste/adapt for Cloud Agent runs
```

## Weekly workflow (Pro-friendly)

1. Roll or write a short surprise brief (see `AGENT_BRIEF.md`).
2. Launch **one** Cloud Agent on this repo (Composer / Cursor models).
3. Agent adds one exhibit, updates `exhibits.js` + `exhibits/NOTES.md`, opens a PR with a flythrough clip.
4. On merge, lobby pedestal title / registry reflects the new piece.

**Cadence:** weekly, not daily. Rare duels (2 agents) only as special events.

## Why one repo?

The point is a world that accumulates history. Split repos would break the living lobby, shared pedestal, and changelog ritual.

## Models log

See [`MODELS.md`](./MODELS.md) for which AI models/agents built each week.  
See [`COST_LOG.md`](./COST_LOG.md) for Cloud Agent cost probes and cadence notes.
