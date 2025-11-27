# Carbon Design System IntelliSense

Intelligent code completion and hover documentation for [Carbon Design System](https://www.carbondesignsystem.com/) design tokens in SCSS and CSS files.

## Features

- 🎨 **Auto-completion** for Carbon design tokens (spacing, colors, typography, layout, motion)
- 💡 **Hover information** with token values, computed values, and descriptions
- 🎯 **Smart namespace detection** — automatically suggests tokens from imported Carbon modules
- 🌓 **Theme-aware values** — shows token values for the configured Carbon theme (white, g10, g90, g100)
- 📦 **Zero configuration** — works out of the box with standard Carbon Design System imports

## Installation

Install from the VS Code Extension Marketplace or build from source:

```bash
npm install
npm run compile
vsce package
```

## Usage

### Import Carbon Tokens

Add `@use` imports for Carbon design tokens in your SCSS files:

```scss
@use '@carbon/styles/scss/spacing' as spacing;
@use '@carbon/styles/scss/theme' as theme;
@use '@carbon/styles/scss/type' as type;
@use '@carbon/styles/scss/motion' as motion;
```

### Access Tokens with IntelliSense

Type the namespace followed by a dot to trigger auto-completion:

```scss
// Spacing tokens
margin: spacing.$spacing-03;  // 8px
padding: spacing.$spacing-05; // 16px

// Theme colors
background-color: theme.$background;
color: theme.$text-primary;

// Typography
font-size: type.$font-size-02;

// Motion
transition: all motion.$motion-duration-01;
```

Hover over any token to see:

- Token name and value
- Computed pixel equivalent (e.g., `0.5rem (8px)`)
- Description
- Examples

## Configuration

Configure token display via VS Code settings:

```json
{
  "carbonIntellisense.theme": "white",
  "carbonIntellisense.showComputedValues": true
}
```

### Available Themes

- `white` — Light theme (default)
- `g10` — Gray 10
- `g90` — Gray 90
- `g100` — Gray 100

## Supported Token Categories

- **Spacing** — 13 tokens (spacing-01 through spacing-13)
- **Color** — 15+ theme tokens (background, text, interactive, border, etc.)
- **Typography** — Font sizes (font-size-01 through font-size-03)
- **Layout** — Container and gutter dimensions
- **Motion** — Duration and easing tokens

## Build & Development

```bash
# Compile TypeScript and bundle extension
npm run compile

# Watch for changes during development
npm run watch

# Lint source code
npm run lint

# Run tests
npm run compile-tests
npm run watch-tests

# Package for publishing
npm run package
```

## Extension Architecture

- `src/tokens/` — Token definitions and database
- `src/parsers/` — SCSS import parser for namespace detection
- `src/providers/` — VS Code completion and hover providers
- `src/extension.ts` — Extension activation and provider registration

## Known Limitations

- Requires explicit `@use` imports; namespace-less token references are not supported
- Token values are statically defined; dynamic/computed token loading from files is not yet implemented

## Contributing

Contributions welcome! Please ensure code follows the ESLint style guide and includes tests.

## License

[Apache License 2.0](LICENSE)

