# Handoff — amber palette + demo bridge bars

## What's in here

- `demos/postpilot.html`, `demos/postpilot-genz.html`, `demos/launchdesk.html`
  — your three walkthrough demo pages, unchanged except for a new sticky dark
  bar at the top (Cockpit night background, amber accent, a "Concept demo ·
  <name>" tag, and a link back to arnabbuilds.com/#demos). This is the "dark
  shell" fix from the open-questions list — it stops the jump from a Cockpit
  dark band into each demo's own distinct look from reading as pasted-in,
  without touching each demo's own bespoke design.
- `globals-css-patch.md` — the exact CSS diff for the amber-lead accent swap,
  to apply by hand against your real `globals.css` (I don't have that file in
  this session, so I couldn't edit it directly — this is the same as pasting
  it in myself).

## Where these go

- `demos/*.html` → replace the matching files under `public/demos/` (or
  wherever the three demo pages currently live in the repo).
- `globals-css-patch.md` → apply the four snippets against `globals.css`.

## Deploy sequence (matches your existing pipeline)

1. Extract this zip over `C:\\Users\\HP\\arnab-builds`.
2. Commit and push to a branch (not `main`) if you want a gated preview-only
   check first — Netlify creates a deploy preview for any branch/PR
   automatically. Or push straight to `main`, since `arnabbuilds-preview` is
   linked to the same repo and builds on every push regardless.
3. Check `arnabbuilds-preview.netlify.app` (or the deploy-preview URL) on
   phone and desktop — the demo bridge bars and the amber accent everywhere
   the old violet showed up.
4. Merge/push to `main` for production. Since both Netlify projects build from
   `main`, this is also what pushes it live — there isn't a separate manual
   "promote" step in the current setup unless you've since added branch
   deploys or re-locked production's auto-publish.

## Still open, not touched by this handoff

- Contact form has never been submitted for real.
- Bengali weight on dark bands (`/bd`).
- Hero stat label wrap on phones ("Aviation-trained").
- "seven years" → "a decade" copy correction.
- Social Media Automation sharing a price with AI Agents.
