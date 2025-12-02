import * as vscode from 'vscode';
import { TokenDatabase } from '../tokens/TokenDatabase';
import { ScssParser } from '../parsers/ScssParser';
import { formatTokenDocumentation } from './formatters';

export class CarbonCompletionProvider implements vscode.CompletionItemProvider {
  private tokenDatabase: TokenDatabase;
  private documentImports: Map<string, any[]> = new Map();

  constructor(tokenDatabase: TokenDatabase) {
    this.tokenDatabase = tokenDatabase;
    try {
      console.log('[Carbon] CarbonCompletionProvider constructed');
    } catch (e) {
      // ignore
    }
  }

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    // Quick invocation trace to help debug when the provider is called
    try {
      console.log(`[Carbon] provideCompletionItems invoked for ${document.uri.toString()} at ${position.line}:${position.character}`);
    } catch (e) {
      // ignore logging errors in odd environments
      console.log("cole:", e);
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
      console.log(`[Carbon] Parsed imports for ${docUri}:`, parsed.map(p => ({ namespace: p.namespace, path: p.modulePath })));
    }

    const imports = this.documentImports.get(docUri) || [];
    const isImported = imports.some((imp: any) => imp.namespace === namespace);
    console.log(`[Carbon] Completion triggered for namespace "${namespace}", imported: ${isImported}, available: ${imports.map((i: any) => i.namespace).join(', ')}`);
    
    if (!isImported) {
      return [];
    }

    const tokens = this.tokenDatabase.getTokensForNamespace(namespace);
    console.log(`[Carbon] Found ${tokens.length} tokens for namespace "${namespace}":`, tokens.map(t => t.name).slice(0, 5));
    
    if (tokens.length === 0) {
      console.log(`[Carbon] WARNING: Token database has 0 tokens for namespace "${namespace}". Checking all namespaces...`);
      const allTokens = this.tokenDatabase.getAllTokens();
      console.log(`[Carbon] Total tokens in database: ${allTokens.length}`);
      return [];
    }

    // Get the line text to determine what range to use for completion
    const line = document.lineAt(position.line).text;
    const before = line.substring(0, position.character);
    
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
    
    console.log(`[Carbon] Returning ${completionItems.length} completion items`);
    return completionItems;
  }


  public clearCache(document: vscode.TextDocument): void {
    this.documentImports.delete(document.uri.toString());
  }
}
