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

## Documentation

See [ARCHITECTURE_DIAGRAMS.md](./ARCHITECTURE_DIAGRAMS.md) for comprehensive architecture diagrams including:

- Project structure
- Component hierarchy
- Script loading order
- Data flow
- Event lifecycle
- State management
- Key functions reference
- Layer management
- Deployment flow
- Development timeline
- Event data structure
- User interaction flow
- SCSS architecture