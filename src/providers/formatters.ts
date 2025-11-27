import { Token } from '../tokens/types';
import { TokenDatabase } from '../tokens/TokenDatabase';

export function formatTokenDocumentation(token: Token, db: TokenDatabase): string {
  const value = db.getTokenValue(token);
  let doc = `**${token.name}**\n\n`;
  doc += `Value: \`${value}\`\n\n`;
  if (token.computedValue) {
    doc += `Computed: \`${token.computedValue}\`\n\n`;
  }
  if (token.description) {
    doc += `${token.description}\n\n`;
  }
  if (token.examples && token.examples.length) {
    doc += `**Examples:**\n\`\`\`scss\n${token.examples.join('\n')}\n\`\`\``;
  }
  return doc;
}
