import { expect } from 'chai';
import { formatTokenDocumentation } from '../src/providers/formatters.js';
import { TokenDatabase } from '../src/tokens/TokenDatabase.js';

describe('formatters', () => {
  it('formats a token documentation string', () => {
    const db = new TokenDatabase();
    const tokens = db.getTokensForNamespace('spacing');
    const tok = tokens[0];
    const doc = formatTokenDocumentation(tok as any, db as any);
    expect(doc).to.be.a('string');
    expect(doc).to.include(tok.name);
    expect(doc).to.include('Value:');
  });
});
