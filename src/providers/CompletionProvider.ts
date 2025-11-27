import * as vscode from 'vscode';
import { TokenDatabase } from '../tokens/TokenDatabase';
import { ScssParser } from '../parsers/ScssParser';
import { formatTokenDocumentation } from './formatters';

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
      // Use shared formatter for documentation
      const doc = formatTokenDocumentation(t as any, this.tokenDatabase);
      item.documentation = new vscode.MarkdownString(doc);
      item.insertText = `$${t.name}`;
      item.sortText = t.name;
      return item;
    });
  }


  public clearCache(document: vscode.TextDocument): void {
    this.documentImports.delete(document.uri.toString());
  }
}
