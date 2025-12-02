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

    const completionItems = tokens.map(t => {
      // Create a completion item with the token name as the label (without $)
      const item = new vscode.CompletionItem(t.name, vscode.CompletionItemKind.Variable);
      const value = this.tokenDatabase.getTokenValue(t);
      
      // Set detail to show the computed value
      item.detail = t.computedValue ? `${value} (${t.computedValue})` : value;
      
      // Set documentation from the token
      const doc = formatTokenDocumentation(t as any, this.tokenDatabase);
      item.documentation = new vscode.MarkdownString(doc);
      
      // Insert the token with $ prefix
      item.insertText = `$${t.name}`;
      
      // Use token name for sorting so items appear alphabetically
      item.sortText = t.name;
      
      // Set kind to help VS Code understand this is a variable
      item.kind = vscode.CompletionItemKind.Variable;
      
      // Boost relevance so our items appear at the top
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
