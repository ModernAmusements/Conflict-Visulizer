# Israel-Hamas Conflict Timeline

Interactive timeline visualization of the Israel-Hamas conflict (1900-2025).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repo with these settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**

Or via CLI:
```bash
npm i -g vercel
vercel --prod
```

## Tech Stack

- Vite
- Leaflet
- SCSS
- Vanilla JavaScript