import * as assert from 'assert';
import { ScssParser } from '../src/parsers/ScssParser.js';

describe('ScssParser', () => {
  it('parses @use imports with namespace', () => {
    const text = "@use '@carbon/styles/scss/spacing' as spacing;\n@use '@carbon/styles/scss/theme' as theme;";
    const imports = ScssParser.parseText(text);
    assert.ok(Array.isArray(imports));
    assert.strictEqual(imports.length, 2);
    assert.strictEqual(imports[0].namespace, 'spacing');
    assert.strictEqual(imports[1].namespace, 'theme');
  });

  it('returns null for namespace when none at index', () => {
    const text = 'spacing.';
    const ns = ScssParser.getNamespaceFromTextAtIndex(text, text.length);
    assert.strictEqual(ns, 'spacing');
  });
});
