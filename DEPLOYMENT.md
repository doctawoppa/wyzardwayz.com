# Wizardwayz Deployment Guide

## Overview

Wizardwayz is a mysterious, interactive single-page portal where the tagline serves as hidden navigation. Each visit generates a new random assignment of pillars to the M and E letters in "The MEME is the Magic / The Magic is the MEME".

## Project Structure

```
wizardwayz/
├── client/
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx (homepage with interactive MEME navigation)
│   │   │   ├── PillarPage.tsx (generic pillar page template)
│   │   │   ├── pillars/ (26 auto-generated pillar pages)
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   └── InteractiveLetter.tsx (clickable M/E letters with tooltips)
│   │   ├── hooks/
│   │   │   └── useRandomPillars.ts (randomizes pillar assignments)
│   │   ├── App.tsx (routing configuration)
│   │   ├── index.css (dark theme with gold accents)
│   │   └── main.tsx
│   └── index.html
├── shared/
│   └── const.ts (pillar definitions and utilities)
├── netlify.toml (Netlify configuration)
└── package.json
```

## Features

### Interactive Navigation
- **Random Pillar Assignment**: Each page load generates a new random combination of 4 M-pillars and 4 E-pillars
- **Hover Tooltips**: Gold letters show pillar names on hover
- **Click Navigation**: Click any M or E letter to navigate to `/pillars/[pillar-name]`
- **Responsive Design**: Works on desktop (no scroll) and mobile (stacked layout)

### Pillars

**M-Pillars (13):**
Memetics, Mission, Media, Myth, Mentoring, Management, Maturation, Mediation, Merchandise, Mechanics, Mysticism, Momentum, Metaphysics

**E-Pillars (13):**
Educate, Entertain, Engage, Enlighten, Empower, Explore, Equip, Elevate, Evolve, Expand, Express, Energize, Emergence

### Special Cases
- **Merchandise**: Redirects to https://wyzardwayz-were-house.myshopify.com (opens in new tab)
- **Easter Egg**: Hidden message "Do you ever get the feeling like you're going in circles?" in console and HTML comments

### Design
- **Dark Theme**: Black background (#0a0a0a) with gold accents (#D4A843)
- **Typography**: Oswald and Bebas Neue fonts for bold, arcane aesthetic
- **Minimal Layout**: Logo + tagline + hint text, centered on screen
- **No Scrolling**: Desktop experience fits in single viewport

## Deployment to Netlify

### Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Netlify account (free tier available at netlify.com)
- Domain registered with IONOS (wizardwayz.com)

### Step-by-Step Deployment

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Initial Wizardwayz deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Netlify will auto-detect the build settings from `netlify.toml`
   - Click "Deploy site"

3. **Configure Domain**
   - In Netlify Site Settings → Domain management
   - Add custom domain: `wizardwayz.com`
   - Update DNS records at IONOS to point to Netlify's nameservers

4. **Enable HTTPS**
   - Netlify provides free SSL/TLS certificates
   - Automatic renewal is enabled by default

### Build Configuration

The `netlify.toml` file handles:
- **Build Command**: `pnpm build`
- **Publish Directory**: `dist/public`
- **Redirects**: All routes redirect to `/index.html` for client-side routing
- **Environment**: Production NODE_ENV

### Environment Variables

No environment variables are required for this static site. All configuration is baked into the build.

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm check

# Format code
pnpm format
```

## Testing

### Interactive Features
1. Visit homepage
2. Hover over gold letters (M and E) to see pillar names
3. Click a gold letter to navigate to pillar page
4. Refresh page to see new random pillar assignment
5. Click "Return to the Source" to go back to homepage

### Responsive Design
- Test on desktop (1920x1080, 1366x768)
- Test on tablet (768x1024)
- Test on mobile (375x667, 414x896)

### Easter Egg
- Open browser console (F12)
- Look for message: "Do you ever get the feeling like you're going in circles?"
- View page source and search for HTML comment with same message

## Performance Optimization

### Current Metrics
- **Gzip Size**: ~105 KB (HTML), ~17 KB (CSS), ~160 KB (JS)
- **Time to Interactive**: < 2 seconds on 4G
- **Lighthouse Score**: Target 90+ (no external APIs or heavy assets)

### Optimization Tips
- Logo is SVG (scalable, small file size)
- No external images (background is CSS overlay)
- Minimal dependencies (React, Wouter, Tailwind)
- No analytics or tracking scripts (unless added later)

## Troubleshooting

### Pillar Pages Not Loading
- Check that `/pillars/:slug` routes are correctly configured in `App.tsx`
- Verify all 26 pillar files exist in `client/src/pages/pillars/`
- Check browser console for routing errors

### Gold Letters Not Interactive
- Ensure `InteractiveLetter.tsx` component is properly imported
- Check that `useRandomPillars` hook is returning valid pillar names
- Verify CSS color values (#D4A843) are applied

### Build Fails
- Run `pnpm check` to identify TypeScript errors
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Check that all imports use correct paths (e.g., `@/components/...`)

## Layer-Shift Architecture (CRITICAL)

### The Mundi/Magi Reality Shift

Wizardwayz implements a sophisticated narrative device across two domains:

**Phase 1 (Current): Mundi Layer**
- **Domain**: wizardwayz.com
- **Perspective**: Mundane/business-focused interpretation
- **Visitor Entry Point**: Homepage with interactive MEME navigation
- **Pillar Pages**: Placeholder pages that link to the Magi layer

**Phase 2 (Planned): Magi Layer**
- **Domain**: wyzardwayz.com (note the different spelling)
- **Perspective**: Magical/mystical interpretation of the same content
- **Structure**: Identical layout and navigation to Mundi layer
- **Content**: Same pillars, but framed through magical lens

### How the Shift Works

1. Visitor lands on wizardwayz.com (Mundi layer)
2. Clicks an M or E letter → navigates to `/pillars/[pillar-name]`
3. Pillar page displays placeholder content
4. Clicks "Return to the Source" → redirects to wyzardwayz.com (Magi layer)
5. Visitor is now on the mirror site without realizing the domain change
6. The same navigation structure exists, but content is reframed

### Implementation Notes

- All pillar page back links use `window.location.href = "https://wyzardwayz.com"`
- No client-side routing between domains (intentional for seamless transition)
- Both domains share identical visual design and navigation structure
- The shift is subtle—only visible in URL bar if visitor checks
- Phase 2 will implement the Magi-layer content and complete the loop

## Future Enhancements

- Add actual background image (currently using dark overlay)
- Implement Phase 2: wyzardwayz.com Magi-layer mirror site
- Populate pillar content pages with actual Magi-layer interpretations
- Add analytics to track which pillars are most visited
- Create admin panel to manage pillar content across both layers
- Add social sharing features
- Implement A/B testing for different tagline variations

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all files are present in the correct directories
3. Review the `netlify.toml` configuration
4. Check Netlify deployment logs for build errors

---

**Last Updated:** February 8, 2026
**Version:** 1.0.0
