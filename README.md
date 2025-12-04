# Carbon CSS IntelliSense

Intelligent code completion and hover documentation for [Carbon Design System](https://www.carbondesignsystem.com/) design tokens in SCSS and CSS files.

**Compatible with:** VS Code, Cursor, and other VS Code-compatible editors

## IDE Compatibility

This extension uses the VS Code Extension API (`vscode` namespace), which is implemented by:

- **VS Code** (Microsoft)
- **Cursor** (Cursor AI) - built on VS Code, uses the same extension API
- **Other VS Code-compatible editors** (GitHub Codespaces, etc.)

The `vscode` types work across all these IDEs because they all implement the same API. This extension will work seamlessly in any editor that supports VS Code extensions.

## Features

- 🎨 **Auto-completion** for Carbon design tokens (spacing, colors, typography, layout, motion)
- 💡 **Hover information** with token values, computed values, and descriptions
- 🎯 **Smart namespace detection** — automatically suggests tokens from imported Carbon modules
- 🌓 **Theme-aware values** — shows token values for the configured Carbon theme (white, g10, g90, g100)
- 📦 **Zero configuration** — works out of the box with standard Carbon Design System imports

## Installation

### From Marketplace

Install directly from the VS Code Extension Marketplace. The extension works in VS Code, Cursor, and other VS Code-compatible editors.

### From Source

```bash
# Clone the repository
git clone https://github.com/colenocks/carbon-css-intellisense.git
cd carbon-css-intellisense

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
npm run package

# Install locally (optional)
code --install-extension carbon-css-intellisense-0.1.0.vsix
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
margin: spacing.$spacing-03; // 8px
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
  "carbonCssIntellisense.theme": "white",
  "carbonCssIntellisense.showComputedValues": true
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

## Development

For developers who want to contribute or build from source:

```bash
# Install dependencies
npm install

# Compile TypeScript and bundle extension
npm run compile

# Watch for changes during development
npm run watch

# Lint source code
npm run lint

# Run tests
npm run compile-tests
npm run watch-tests

# Package for distribution
npm run package
```

## Extension Architecture

- `src/tokens/` — Token definitions and database
- `src/parsers/` — SCSS import parser for namespace detection
- `src/providers/` — VS Code completion and hover providers
- `src/extension.ts` — Extension activation and provider registration

For details on performance optimizations and publishing instructions, see the [docs](docs/) directory.

## Known Limitations

- Requires explicit `@use` imports; namespace-less token references are not supported
- Token values are statically defined; dynamic/computed token loading from files is not yet implemented

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and release notes.

## Contributing

Contributions welcome! Please ensure code follows the ESLint style guide and includes tests.

## License

[Apache License 2.0](LICENSE)
