# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

trap-collection-launcher is an Electron-based desktop application for launching traP games. It functions as a game launcher/collection manager for the traP community.

## Development Commands

**Development:**

```bash
npm run start
```

**Linting:**

```bash
npm run lint
```

**Type checking:**

```bash
npm run typecheck
```

**Build production:**

```bash
npm run make
```

**Publishing to GitHub:**

```bash
npm run publish
```

**API code generation (from OpenAPI spec):**

```bash
npm run api:build
```

**Storybook:**

```bash
npm run storybook
```

## Architecture

### Electron Multi-Process Architecture

- **Main Process**: Entry point at `src/lib/main.ts`, handles window creation, IPC setup, and system-level operations
- **Renderer Process**: React app at `src/renderer/`, handles UI and user interactions
- **Preload Script**: Located in `src/preload/`, provides secure IPC bridge between main and renderer

### Key Directories

- `src/renderer/views/`: Main application pages (Title, GameSelect, ProductKeySelect, SplashScreen)
- `src/renderer/components/`: Reusable React components
- `src/lib/`: Core business logic, API clients, and utilities
- `src/lib/ipc/`: IPC communication handlers
- `src/lib/typescript-axios/`: Auto-generated API client from OpenAPI spec
- `src/common/`: Shared types and utilities between main and renderer processes

### State Management

- Uses React Context for navigation and error state
- Electron Store for persistent configuration
- IPC communication for main-renderer data exchange

### Styling

- styled-components for component styling
- Theme system in `src/renderer/styles/theme.ts`
- Global styles in `src/renderer/styles/GlobalStyle.tsx`

### Path Aliases

- `@/`: Points to `src/`
- `@api/`: Points to `api/`

## Important Configuration

### Environment Variables

- `KOUDAISAI`: Boolean flag for special Koudaisai mode functionality

### Build Configuration

- Uses Electron Forge v7.9.0 for packaging and distribution
- Webpack configuration split across multiple files
- TypeScript with strict mode enabled
- ESLint with TypeScript, React, and import ordering rules

**Important Note**: In Electron Forge v7, plugins must be configured as objects with `name` and `config` properties, not as arrays. The forge.config.js has been updated accordingly.

### API Integration

- OpenAPI spec at `docs/openapi.yml` defines the traP Collection API
- Auto-generated TypeScript client in `src/lib/typescript-axios/`
- Custom axios wrapper in `src/lib/axios.ts`

## Key Types

- `TraPCollection` namespace in `src/index.d.ts` defines IPC communication types
- Game info, launcher versions, and progress tracking types
- Platform-specific types for Windows/macOS support
