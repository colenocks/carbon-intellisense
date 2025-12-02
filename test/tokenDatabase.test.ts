import * as assert from 'assert';
import { TokenDatabase } from '../src/tokens/TokenDatabase.js';

describe('TokenDatabase', () => {
  it('returns tokens for namespaces', () => {
    const db = new TokenDatabase();
    const spacing = db.getTokensForNamespace('spacing');
    assert.ok(Array.isArray(spacing) && spacing.length > 0);
    const theme = db.getTokensForNamespace('theme');
    assert.ok(Array.isArray(theme) && theme.length > 0);
  });

  it('returns themed token values', () => {
    const db = new TokenDatabase();
    db.setTheme('g90');
    const themeTokens = db.getTokensForNamespace('theme');
    const t = themeTokens.find((t: any) => t.name === 'background');
    if (t && t.themes) {
      assert.strictEqual(db.getTokenValue(t), t.themes['g90']);
    }
  });
});
