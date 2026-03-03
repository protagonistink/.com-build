# Build Fix Design — 2026-03-03

## Problem

`npm run build` fails with 16 `Module not found: Can't resolve 'styled-components'` errors from Sanity internal packages. Root cause: `styled-components` is a required peer of several Sanity packages but is missing from the project.

A secondary peer dependency conflict exists: `sanity-plugin-asset-source-pexels@3.0.2` declares a peer dep on React 18, but the project uses React 19. This causes `npm install` (strict) to fail.

## Decision

Remove `sanity-plugin-asset-source-pexels` (not yet used in production, editorial tooling only) and install `styled-components`. This resolves both issues cleanly without peer dep flags or overrides.

## Changes

### `sanity.config.ts`
- Remove `import { pexelsImageAsset } from 'sanity-plugin-asset-source-pexels'`
- Remove `const pexelsApiKey = ...` line
- Remove the `pexelsImageAsset(...)` entry from the `plugins` array

### `package.json`
- Remove `sanity-plugin-asset-source-pexels` from `dependencies`
- Add `styled-components@^6` to `dependencies`

### Install + verify
- Run `npm install` (no flags)
- Run `npm run build` — should pass

## Scope

No customer-facing changes. Sanity Studio retains: Unsplash, media manager, YouTube input, Assist, Vision, Structure.
