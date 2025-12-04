# Testing in Cursor IDE

This guide helps you test the Carbon CSS IntelliSense extension in Cursor IDE.

## Quick Start

### Method 1: Extension Development Host (Recommended)

1. **Open the extension folder in Cursor:**

   ```bash
   cd /path/to/carbon-css-intellisense
   cursor .
   ```

2. **Compile the extension:**

   ```bash
   npm run compile
   ```

3. **Launch Extension Development Host:**

   - Press `F5` (or Run → Start Debugging)
   - A new Cursor window will open with the extension loaded
   - Check the Debug Console for `[Carbon]` logs

4. **Test completion:**
   - Open `test-example.scss` in the new window
   - Type `spacing.` and verify completions appear
   - Check Developer Console (Help → Toggle Developer Tools) for logs

### Method 2: Manual Installation (For Testing)

If F5 doesn't work, you can manually install the extension:

1. **Package the extension:**

   ```bash
   npm run package
   ```

2. **Install in Cursor:**

   - Open Cursor
   - Cmd+Shift+P → "Extensions: Install from VSIX..."
   - Select `carbon-css-intellisense-0.1.0.vsix` from the project root

3. **Reload Cursor:**
   - Cmd+Shift+P → "Developer: Reload Window"

## Troubleshooting

### Extension Not Activating

**Check Developer Console:**

1. Help → Toggle Developer Tools → Console tab
2. Look for `[Carbon] Extension module loaded`
3. Look for `[Carbon] activate() function called`

**If you don't see these logs:**

- Verify `dist/extension.js` exists and is compiled
- Check that `package.json` has correct `main` field
- Try running: `node verify-extension.js`

### Completion Not Working

**Check completion logs:**

1. Open Developer Console
2. Type `spacing.` in an SCSS file
3. Look for `[Carbon] Completion requested for: ...`

**If no completion logs appear:**

- Verify the file is recognized as SCSS (check language indicator)
- Try manually triggering: Cmd+Space
- Check that `@use` imports are present at the top of the file

**If logs appear but no completions:**

- Check what the logs say - they'll show where it's failing
- Verify namespace matches import (e.g., `spacing` matches `as spacing`)
- Check that tokens exist for that namespace

### Common Issues

**Issue: "Extension not found"**

- Make sure you're in the extension's root directory
- Verify `package.json` exists
- Run `npm run compile` to build the extension

**Issue: "Cannot find module"**

- Run `npm install` to install dependencies
- Verify `node_modules` exists

**Issue: "Extension host terminated unexpectedly"**

- Check Developer Console for errors
- Verify all dependencies are installed
- Try reloading the window

## Verification

Run the verification script:

```bash
node verify-extension.js
```

This will check:

- ✅ package.json configuration
- ✅ Compiled extension file
- ✅ Source files
- ✅ Launch configuration

## Debug Commands

The extension provides these debug commands:

1. **Carbon CSS IntelliSense: Diagnostics**

   - Shows current editor state
   - Cmd+Shift+P → "Carbon CSS IntelliSense: Diagnostics"

2. **Carbon CSS IntelliSense: Invoke Provider**

   - Manually triggers completion provider
   - Useful for debugging

3. **Carbon CSS IntelliSense: Debug Parser**
   - Shows parsed imports and token database state
   - Cmd+Shift+P → "Carbon CSS IntelliSense: Debug Parser"

## Differences from VS Code

Cursor is based on VS Code, so the extension should work identically. However:

- **Launch Configuration:** Cursor uses the same `.vscode/launch.json` format
- **Extension API:** Cursor implements the VS Code Extension API
- **Debugging:** Same F5 workflow as VS Code

If something works in VS Code but not Cursor, check:

1. Extension activation logs in Developer Console
2. Any Cursor-specific error messages
3. Whether the extension is actually loading (check logs)
