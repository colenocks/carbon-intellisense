import * as vscode from 'vscode';
import { TokenDatabase } from '../tokens/TokenDatabase';
import { ScssParser } from '../parsers/ScssParser';

export class CarbonCompletionProvider implements vscode.CompletionItemProvider {
  private tokenDatabase: TokenDatabase;
  private documentImports: Map<string, any[]> = new Map();

  constructor(tokenDatabase: TokenDatabase) {
    this.tokenDatabase = tokenDatabase;
  }

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    if (!ScssParser.isInScssContext(document, position)) return [];
    const namespace = ScssParser.getNamespaceAtPosition(document, position);
    if (!namespace) return [];

    const docUri = document.uri.toString();
    if (!this.documentImports.has(docUri)) {
      this.documentImports.set(docUri, ScssParser.parseDocument(document));
    }

    const imports = this.documentImports.get(docUri) || [];
    const isImported = imports.some((imp: any) => imp.namespace === namespace);
    if (!isImported) return [];

    const tokens = this.tokenDatabase.getTokensForNamespace(namespace);
    return tokens.map(t => {
      const item = new vscode.CompletionItem(`$${t.name}`, vscode.CompletionItemKind.Variable);
      const value = this.tokenDatabase.getTokenValue(t);
      item.detail = t.computedValue ? `${value} (${t.computedValue})` : value;
      item.documentation = new vscode.MarkdownString(this.formatDocumentation(t, value));
      item.insertText = `$${t.name}`;
      item.sortText = t.name;
      return item;
    });
  }

  private formatDocumentation(token: any, value: string): string {
    let doc = `**${token.name}**\n\n`;
    doc += `Value: \`${value}\`\n\n`;
    if (token.computedValue) doc += `Computed: \`${token.computedValue}\`\n\n`;
    if (token.description) doc += `${token.description}\n\n`;
    if (token.examples && token.examples.length) {
      doc += `**Examples:**\n\`\`\`scss\n${token.examples.join('\n')}\n\`\`\``;
    }
    return doc;
  }

  public clearCache(document: vscode.TextDocument): void {
    this.documentImports.delete(document.uri.toString());
  }
}
