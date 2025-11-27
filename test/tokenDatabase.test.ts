import { expect } from 'chai';
import { TokenDatabase } from '../src/tokens/TokenDatabase.js';

describe('TokenDatabase', () => {
  it('returns tokens for namespaces', () => {
    const db = new TokenDatabase();
    const spacing = db.getTokensForNamespace('spacing');
    expect(spacing).to.be.an('array').that.is.not.empty;
    const theme = db.getTokensForNamespace('theme');
    expect(theme).to.be.an('array').that.is.not.empty;
  });

  it('returns themed token values', () => {
    const db = new TokenDatabase();
    db.setTheme('g90');
    const themeTokens = db.getTokensForNamespace('theme');
    const t = themeTokens.find((t: any) => t.name === 'background');
    if (t && t.themes) {
      expect(db.getTokenValue(t)).to.equal(t.themes['g90']);
    }
  });
});
