import * as vscode from 'vscode';
import { TokenDatabase } from '../tokens/TokenDatabase';
import { ScssParser } from '../parsers/ScssParser';
import { formatTokenDocumentation } from './formatters';
import { logger } from '../utils/logger';

export class CarbonCompletionProvider implements vscode.CompletionItemProvider {
  private tokenDatabase: TokenDatabase;
  private documentImports: Map<string, any[]> = new Map();

  constructor(tokenDatabase: TokenDatabase) {
    this.tokenDatabase = tokenDatabase;
  }

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    try {
      if (token?.isCancellationRequested) {
        return [];
      }

      if (!document || !position) {
        return [];
      }

      if (!ScssParser.isInScssContext(document, position)) {
        return [];
      }

      const namespace = ScssParser.getNamespaceAtPosition(document, position);
      if (!namespace) {
        return [];
      }

      const docUri = document.uri.toString();
      if (!this.documentImports.has(docUri)) {
        const parsed = ScssParser.parseDocument(document);
        this.documentImports.set(docUri, parsed);
        logger.debug(`Parsed imports for ${docUri}:`, parsed.map(p => ({ namespace: p.namespace, path: p.modulePath })));
      }

      const imports = this.documentImports.get(docUri) || [];
      if (!imports.some((imp: any) => imp.namespace === namespace)) {
        return [];
      }

      const tokens = this.tokenDatabase.getTokensForNamespace(namespace);
      if (tokens.length === 0) {
        logger.warn(`No tokens found for namespace "${namespace}"`);
        return [];
      }

      // Get the line text to determine what range to use for completion
      const line = document.lineAt(position.line).text;

      // Find where the namespace/dot started so we can replace correctly
      let rangeStart = position.character;
      for (let i = position.character - 1; i >= 0; i--) {
        if (/[a-zA-Z0-9_$-]/.test(line[i])) {
          rangeStart = i;
        } else {
          break;
        }
      }

      const range = new vscode.Range(
        new vscode.Position(position.line, rangeStart),
        position
      );

      const completionItems = tokens.map(t => {
        const item = new vscode.CompletionItem(t.name, vscode.CompletionItemKind.Variable);
        const value = this.tokenDatabase.getTokenValue(t);

        item.detail = t.computedValue ? `${value} (${t.computedValue})` : value;
        const doc = formatTokenDocumentation(t as any, this.tokenDatabase);
        item.documentation = new vscode.MarkdownString(doc);

        // Insert with $ prefix
        item.insertText = `$${t.name}`;

        // Explicitly set the range to replace
        item.range = range;

        // Don't set sortText to let VS Code sort naturally
        item.preselect = false;

        return item;
      });

      return completionItems;
    } catch (error) {
      // Silently handle errors to prevent interfering with other extensions
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('[Carbon] Error in provideCompletionItems:', errorMsg);
      // Don't log to logger.error as it might create output channels that cause issues
      // Just return empty array to fail gracefully
      return [];
    }
  }


  public clearCache(document: vscode.TextDocument): void {
    this.documentImports.delete(document.uri.toString());
  }
}
