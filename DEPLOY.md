# Deploying — run these on your own machine

Claude could not deploy from the Cowork environment: its network proxy blocks
`api.netlify.com`, `app.netlify.com` and `github.com` (403/502 on CONNECT).
Everything else is done — the code is here, it typechecks, and `next build`
produces five static routes. These are the only steps left, and they take a
couple of minutes in PowerShell.

A **preview site already exists** on your Netlify account so nothing touches
the live domain:

- Name: `arnabbuilds-preview`
- URL: https://arnabbuilds-preview.netlify.app
- Site ID: `8a917565-94e7-4853-a365-9126a95ed60c`
- Dashboard: https://app.netlify.com/projects/arnabbuilds-preview

## Deploy to the preview (do this first)

```powershell
cd C:\Users\HP\arnab-builds
npm install
npx netlify-cli login          # opens your browser, one time only
npx netlify deploy --build --site 8a917565-94e7-4853-a365-9126a95ed60c
```

`--build` runs the production build on your machine, then uploads it. The CLI
prints a **draft URL** — open it and check the site on desktop and phone.

Things worth clicking on the preview:

- Hover the closing section or press **Take off** — the plane should cross
  "automate", "build" and "scale?" then land with a light on the WhatsApp button.
- Scroll the dark route band — the plane should fly the arc as you scroll
  (Chrome/Safari only; Firefox parks it mid-route by design).
- On a portfolio card, try **Play in card** and **Full demo** — you still owe
  me a decision on which of those two to keep.
- Visit `/bd` and confirm BDT pricing appears there and **nowhere** on `/`.

## Then go live

Only after the preview looks right, and after the two blockers in
`LAUNCH-CHECKLIST.md` are cleared:

```powershell
npx netlify deploy --build --prod --site 65c6441a-ca95-4101-993f-92d05fa285c3
```

That site ID is your existing `arnabbuilds` project, so this replaces
arnabbuilds.com.

## Better: wire up git instead

A one-off CLI deploy has no history and no rollback. Once the preview looks
right, push this repo and connect it in Netlify — then every push builds
automatically, and you get deploy previews on branches for free.

```powershell
cd C:\Users\HP\arnab-builds
git add -A
git commit -m "Rebuild site: dual-market routes, responsive system, motion"
git push origin main
```

Then in Netlify: **arnabbuilds → Project configuration → Build & deploy →
Link repository**, and pick `arnabsempire/arnabbuilds`. Netlify reads
`netlify.toml`, so leave the build settings alone.

## If the build fails on Netlify

It should not — the font is now self-hosted from `src/app/fonts/`, so the
build needs no network access at all. If something else breaks, the Netlify
deploy log names the file and line.
