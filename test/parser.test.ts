import { expect } from 'chai';
import { ScssParser } from '../src/parsers/ScssParser.js';

describe('ScssParser', () => {
  it('parses @use imports with namespace', () => {
    const text = "@use '@carbon/styles/scss/spacing' as spacing;\n@use '@carbon/styles/scss/theme' as theme;";
    const imports = ScssParser.parseText(text);
    expect(imports).to.be.an('array').with.lengthOf(2);
    expect(imports[0].namespace).to.equal('spacing');
    expect(imports[1].namespace).to.equal('theme');
  });

  it('returns null for namespace when none at index', () => {
    const text = 'spacing.';
    const ns = ScssParser.getNamespaceFromTextAtIndex(text, text.length);
    expect(ns).to.equal('spacing');
  });
});
