# Change Log

All notable changes to the "carbon-css-intellisense" extension will be documented in this file.

## [0.1.0] - 2025-11-27

### Added

- Initial release of Carbon CSS IntelliSense
- Auto-completion for Carbon design tokens (spacing, color, typography, layout, motion)
- Hover provider with token values, computed values, and descriptions
- SCSS parser for `@use` import detection and namespace resolution
- Token database with theme-aware values (white, g10, g90, g100)
- Configuration options for theme selection and computed value display
- File system watcher for workspace changes
- CompletionProvider with namespace-based token filtering and caching
- HoverProvider for detailed token information display
- Shared formatters for consistent documentation rendering

### Features

- Supports Carbon Design System spacing tokens (spacing-01 through spacing-13)
- Supports theme colors with multi-theme variants (white, g10, g90, g100)
- Supports typography, layout, and motion tokens
- Configuration via `carbonCssIntellisense.theme` and `carbonCssIntellisense.showComputedValues`
- Works with SCSS and CSS files
- Zero-configuration setup with standard Carbon imports
- Caches parsed imports per document for performance
- Invalidates caches on document change

### Architecture

- Modular token definition system (`src/tokens/`)
- Pluggable provider architecture
- SCSS-aware parser for accurate namespace detection
