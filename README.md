# Biota Metrics

Marketing-site for **Biota Metrics** — standardiseret monitorering af biodiversitet i naturgenopretningsprojekter.

Statisk side bygget med React 19, Vite 6 og Tailwind CSS v4. Live: https://biotametrics.com

## Udvikling

**Forudsætning:** Node.js 20+

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produktionsbuild → dist/
npm run preview  # forhåndsvis produktionsbuildet
npm run lint     # type-check (tsc)
```

## Deploy

Push til `main` bygger og udgiver automatisk til GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Intet manuelt trin.
