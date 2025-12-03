#!/bin/bash
# Repackage extension with correct VS Code version for Cursor

echo "Compiling extension..."
npm run compile

echo ""
echo "Packaging VSIX..."
vsce package --skip-license

echo ""
echo "✅ Done! Install carbon-intellisense-0.1.0.vsix in Cursor"

