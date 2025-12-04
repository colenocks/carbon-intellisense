# Local Testing Guide

## Quick Start

1. **Compile the extension:**

   ```bash
   npm run compile
   ```

2. **Launch Extension Development Host:**
   - Press `F5` in VS Code (or use Run → Start Debugging)
   - A new VS Code window will open with the extension loaded

3. **Open test file:**
   - In the new window, open `test-example.scss` file
   - It demonstrates all supported token types with imports

## What to Test

### Completion (Auto-complete)

1. **Spacing tokens:**
   - Type `spacing.` → should show spacing-01 through spacing-05
   - Select a token and press Enter
   - Verify it inserts as `$spacing-03` etc.

2. **Theme colors:**
   - Type `theme.` → should show color tokens (background, interactive, text-primary, etc.)
   - Hover over suggestions to see theme color values

3. **Typography:**
   - Type `type.` → should show font-size-01, font-size-02, font-size-03

4. **Motion:**
   - Type `motion.` → should show motion-duration-01, motion-duration-02

### Hover Information

1. **Spacing tokens:**
   - Hover over `spacing.$spacing-03`
   - Should show: name, value (0.5rem), computed (8px), and description

2. **Theme colors:**
   - Hover over `theme.$interactive` (value: #0f62fe)
   - Should display token details

3. **Multi-theme colors:**
   - Hover over `theme.$background`
   - Should show value for current theme (default: white → #ffffff)
   - Change theme in settings to g90 and hover again
   - Value should update to #262626

## Configuration (Optional)

Open Settings (Cmd+, on macOS) and search for "Carbon CSS IntelliSense":

- **Theme:** Change from white to g10, g90, or g100
- **Show Computed Values:** Toggle to hide/show pixel equivalents

Changes take effect immediately.

## Expected Behavior

✓ Completion triggers on namespace + dot (e.g., `spacing.`)  
✓ Only shows tokens from imported namespaces  
✓ Hover displays rich Markdown documentation  
✓ Multi-theme tokens reflect current theme setting  
✓ Comment and string contexts are ignored (no completion in `// spacing.`)

## Troubleshooting

- If extension doesn't activate: check that test file is `.scss` format
- If no completions appear: verify `@use` imports are present
- If hover doesn't work: ensure language is set to SCSS (shown in bottom-right status bar)
