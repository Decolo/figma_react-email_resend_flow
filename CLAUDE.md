# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Email starter project for creating and previewing email templates. The project uses:
- **React Email** (`react-email`) for email component development with live preview
- **@react-email/components** library for pre-built email components (Html, Body, Container, Button, Link, etc.)
- **TypeScript** with strict mode enabled
- **pnpm** as the package manager

## Commands

- **Development**: `npm run dev` or `pnpm dev` - Starts preview server at http://localhost:3000 with live reload
- **Build**: `npm run build` or `pnpm build` - Compiles email templates
- **Export**: `npm run export` or `pnpm export` - Exports email templates to static HTML files

## Architecture

### Email Templates
All email templates are located in the `emails/` directory as `.tsx` files. Each template:
- Exports a React component using `@react-email/components`
- Defines a `PreviewProps` static property for preview data (used in dev mode)
- Includes inline styles as objects (CSS-in-JS pattern)
- May reference static assets from `emails/static/` directory using `baseUrl` environment variable

### Static Assets
The `emails/static/` directory contains images used in email templates (logos, icons, etc.). Reference these in templates using:
```typescript
const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
// Then in component:
<Img src={`${baseUrl}/static/image-name.png`} />
```

### TypeScript Configuration
- Strict mode enabled with `strictNullChecks`
- JSX mode: `react-jsx`
- Email build output in `.react-email/` (excluded from version control)

## Email Template Patterns

1. **Interface Props**: Define TypeScript interface for template props with optional properties defaulted via `PreviewProps`
2. **Inline Styles**: Define style objects at bottom of file for consistency
3. **Preview Component**: Export default component and set `.PreviewProps` for development preview
4. **Environment URLs**: Use `process.env.VERCEL_URL` pattern for asset URLs
