#!/usr/bin/env node
/**
 * Diagnostic script to check if extension is properly set up for Cursor
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Extension Setup for Cursor...\n');

const issues = [];

// Check 1: Extension file exists
const extensionFile = path.join(__dirname, 'dist', 'extension.js');
if (!fs.existsSync(extensionFile)) {
  issues.push('❌ dist/extension.js does not exist - run: npm run compile');
} else {
  console.log('✅ dist/extension.js exists');
  const stats = fs.statSync(extensionFile);
  console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`   Modified: ${stats.mtime.toLocaleString()}`);
}

// Check 2: Package.json main field
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
if (pkg.main !== './dist/extension.js') {
  issues.push(`❌ package.json main is "${pkg.main}" but should be "./dist/extension.js"`);
} else {
  console.log('✅ package.json main field is correct');
}

// Check 3: Activation events
if (!pkg.activationEvents || pkg.activationEvents.length === 0) {
  issues.push('❌ No activation events defined');
} else {
  console.log(`✅ Activation events: ${pkg.activationEvents.join(', ')}`);
  if (pkg.activationEvents.includes('*')) {
    console.log('   ⚠️  Using "*" activation - extension should activate immediately');
  }
}

// Check 4: Extension exports
try {
  const extContent = fs.readFileSync(extensionFile, 'utf8');
  // Check for activate function - webpack bundles it, so look for various patterns
  const hasActivate = extContent.includes('activate') && (
    extContent.includes('activate=function') ||
    extContent.includes('activate:function') ||
    extContent.includes('o.activate=') ||
    extContent.includes('exports.activate') ||
    extContent.includes('module.exports')
  );
  
  if (!hasActivate) {
    issues.push('❌ Extension file does not appear to export activate function');
  } else {
    console.log('✅ Extension exports activate function');
  }
  
  if (!extContent.includes('Extension module loaded')) {
    issues.push('⚠️  Extension file does not contain module load log');
  } else {
    console.log('✅ Extension contains module load log');
  }
} catch (e) {
  issues.push(`❌ Error reading extension file: ${e.message}`);
}

// Check 5: VS Code API version
if (!pkg.engines || !pkg.engines.vscode) {
  issues.push('❌ Missing engines.vscode field');
} else {
  console.log(`✅ VS Code API version: ${pkg.engines.vscode}`);
}

console.log('\n' + '='.repeat(60));

if (issues.length === 0) {
  console.log('✅ All checks passed!\n');
  console.log('📝 Next steps:');
  console.log('   1. In Cursor, press F5 to launch Extension Development Host');
  console.log('   2. In the NEW window that opens, check Developer Console');
  console.log('   3. Look for: [Carbon] Extension module loaded');
  console.log('   4. Open an SCSS file to trigger activation');
  console.log('\n⚠️  IMPORTANT: Make sure you press F5, not just reload!');
  console.log('   F5 launches a NEW window with your extension loaded.');
} else {
  console.log('❌ Issues found:\n');
  issues.forEach(issue => console.log(`   ${issue}`));
}

process.exit(issues.length > 0 ? 1 : 0);

