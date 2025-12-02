import * as assert from 'assert';
import { formatTokenDocumentation } from '../src/providers/formatters.js';
import { TokenDatabase } from '../src/tokens/TokenDatabase.js';

describe('formatters', () => {
  it('formats a token documentation string', () => {
    const db = new TokenDatabase();
    const tokens = db.getTokensForNamespace('spacing');
    const tok = tokens[0];
    const doc = formatTokenDocumentation(tok as any, db as any);
    assert.strictEqual(typeof doc, 'string');
    assert.ok(doc.includes(tok.name));
    assert.ok(doc.includes('Value:'));
  });
});
