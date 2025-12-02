# Carbon IntelliSense - Debugging & Testing Guide

## What Was Fixed

1. ✅ **Module Detection** — Now detects all `@carbon/*/scss/*` imports (including motion)
2. ✅ **Trigger Characters** — Added `$` as trigger in addition to `.`
3. ✅ **Debug Logging** — Console logs show what namespaces are detected and available
4. ✅ **Workspace Watcher** — Extension now watches for file changes

## How to Test Locally

### Step 1: Compile the Extension

```bash
npm run compile
```

### Step 2: Launch in Development Mode

Press **F5** (or Run → Start Debugging)

- A new VS Code window opens with the extension loaded
- Check the Debug Console (View → Debug Console) for logs

### Step 3: Open Test File

- In the new window, open `test-example.scss`
- Or create a new `.scss` file with imports:

```scss
@use '@carbon/styles/scss/spacing' as spacing;
@use '@carbon/styles/scss/theme' as theme;
```

### Step 4: Trigger Completion

In test-example.scss, position cursor after `spacing.` (line 13):

```scss
.container {
  margin: spacing.$spacing-03;  // <- cursor here after the dot
```

Then:
- Type `Ctrl+Space` to manually trigger completion
- Or wait a moment (auto-trigger should fire)

**Expected:** List of tokens appears:
- `$spacing-01`
- `$spacing-02`
- `$spacing-03`
- etc.

### Step 5: Check Debug Output

Look at **Debug Console** output. You should see:

```
[Carbon] Parsed imports for file://...: [
  { namespace: 'spacing', path: '@carbon/styles/scss/spacing' },
  { namespace: 'theme', path: '@carbon/styles/scss/theme' }
]
[Carbon] Completion triggered for namespace "spacing", imported: true, available: spacing, theme
```

## Troubleshooting

### Issue: No Completion Appears

**Check Debug Console for:**

1. **"Parsed imports" log not showing?**
   - File may not be recognized as SCSS
   - Status bar should show "SCSS" on the right
   - Verify file extension is `.scss` (not `.sass`)

2. **"Completion triggered" shows `imported: false`?**
   - The parser didn't recognize the `@use` import
   - Check import syntax: must be exact `@use '...' as namespace;`
   - Must be `@carbon/styles/scss/*` or `@carbon/react/scss/*`

3. **Parser shows imports but completion still empty?**
   - Namespace may not match (e.g., `@use '...' as my_spacing;` won't trigger on `spacing.`)
   - Token database may not have that namespace
   - Check TokenDatabase.ts — verify namespace is initialized

### Issue: Hover Doesn't Work

- Hover provider may have issues with token lookup
- Verify you're hovering over a valid token name like `$spacing-03`
- Check that the token exists in the database

### Issue: Theme Change Not Reflected

- Settings may not have applied
- Try: Command Palette → Developer: Reload Window

## Extension Architecture

- **src/parsers/ScssParser.ts** — Detects `@use` imports and extracts namespace
- **src/providers/CompletionProvider.ts** — Provides completion items when namespace + dot
- **src/providers/HoverProvider.ts** — Shows token details on hover
- **src/tokens/TokenDatabase.ts** — Stores all token definitions
- **test-example.scss** — Example file for testing

## Next Steps

After testing locally:

1. If completion works → ready to import real Figma tokens
2. If issues persist → check logs and verify imports in test file
3. Create additional token files for all Carbon token categories
