# Models used — Atelier (Week 00)

Log of AI models / agent roles involved in creating this project, for comparing strengths and weaknesses.
Parent Cloud Agent run: [bc-01a09735-5333-70cd-b9b2-62dd42f01f56](https://cursor.com/agents/bc-01a09735-5333-70cd-b9b2-62dd42f01f56)  
Reported `originalModelName`: **`default`** (Cursor Auto / Composer routing)

| Model / agent | Where it ran | Responsible for | Notes / observed strengths |
|---|---|---|---|
| **Cursor Auto → Composer** (`default`) | Parent Cloud Agent | Product framing (Atelier concept), Week 00 neon loft scaffold (Vite + Three.js), lobby/pedestal/bloom/flythrough, Pro-budget workflow docs, mobile/desktop hardening, Cloudflare temporary preview deploy, this models log | Strong at end-to-end product + code + ops in one thread. Good at turning vague “fun Cloud Agent ideas” into a concrete weekly system. |
| **cursor-guide** (inherited parent model) | Subagent | Cursor Cloud Agents capabilities; Pro (~$20) usage/automation constraints | Useful for grounding ideas in real product limits (weekly cadence, avoid parallel/duel burns). |
| **computerUse** (specialized computer/browser agent) | Subagent | Visual QA of local lobby; mobile + desktop QA of Cloudflare preview URL; Cloudflare challenge click-through | Best for “does it actually look right?” evidence. Underlying chat-model slug not exposed in run metadata. |
| **generalPurpose** (inherited parent model) | Subagent | GitHub file pushes via Github MCP when local `gh`/`git push` auth was unavailable | Reliable for getting the public repo in sync; weaker when payloads (e.g. lockfiles) are too large for MCP. |
| **Cursor Auto → Composer** (`default`) | Parent Cloud Agent (same run) | **Week 01 — Plasma Ribbon** exhibit + living-lobby title pulse + `COST_LOG.md` cost probe | Lean follow-up exhibit inside a warm session; good for measuring incremental vs cold-start cost. |
| **composer-2.5** (Task subagent) | Subagent | Week 01 exhibit redo (model comparison): **SYNTH HALO** neon orrery | Strong at swapping in a distinct procedural concept while reusing lobby/pedestal wiring; lean ~140-line exhibit module. |

## Not used (intentionally)

| Option | Why skipped |
|---|---|
| Parallel “scene duel” agents | Pro budget — reserved as rare special events |
| Daily/nightly automations | Too spendy on $20/mo; weekly cadence instead |
| Named third-party models (Opus/Sonnet/GPT/etc.) as primary | Run was on Cursor `default` / Composer routing |

## How to extend this log

After each weekly exhibit PR, append a row:

```md
| <model or agent> | Cloud Agent / subagent | Week NN exhibit: <what> | <1–2 observed strengths/weaknesses> |
```

Prefer recording the **reported model name** from the run (or the model you selected in Cursor) rather than guessing.
