import * as vscode from 'vscode';
import { ParsedImport } from '../tokens/types';

export class ScssParser {
  private static readonly USE_PATTERN = /@use\s+['"]([^'"]+)['"]\s+as\s+(\w+)/g;
  private static readonly CARBON_MODULES = [
    '@carbon/react/scss/spacing',
    '@carbon/react/scss/theme',
    '@carbon/react/scss/type',
    '@carbon/react/scss/motion',
    '@carbon/styles/scss/spacing',
    '@carbon/styles/scss/theme',
    '@carbon/styles/scss/type',
    '@carbon/styles/scss/motion',
    '@carbon/styles/scss/colors',
    '@carbon/layout/scss/spacing',
    '@carbon/layout/scss/layout',
  ];

  public static parseDocument(document: vscode.TextDocument): ParsedImport[] {
    const imports: ParsedImport[] = [];
    const text = document.getText();
    // Reset regex lastIndex to avoid issues with global flag
    this.USE_PATTERN.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = this.USE_PATTERN.exec(text)) !== null) {
      const modulePath = match[1];
      const namespace = match[2];
      if (this.isCarbonModule(modulePath)) {
        const line = document.positionAt(match.index).line;
        imports.push({ namespace, modulePath, line });
      }
    }
    // Reset again after use
    this.USE_PATTERN.lastIndex = 0;
    return imports;
  }

  /**
   * Optionally parse a text string (useful for unit tests)
   */
  public static parseText(text: string): ParsedImport[] {
    const imports: ParsedImport[] = [];
    // Reset regex lastIndex to avoid issues with global flag
    this.USE_PATTERN.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = this.USE_PATTERN.exec(text)) !== null) {
      const modulePath = match[1];
      const namespace = match[2];
      if (this.isCarbonModule(modulePath)) {
        imports.push({ namespace, modulePath, line: 0 });
      }
    }
    // Reset again after use
    this.USE_PATTERN.lastIndex = 0;
    return imports;
  }

  private static isCarbonModule(modulePath: string): boolean {
    // More flexible: match any @carbon module with /scss/ path
    return modulePath.includes('@carbon/') &&
      (modulePath.includes('/scss/') || modulePath.includes('/styles'));
  }

  public static getNamespaceAtPosition(document: vscode.TextDocument, position: vscode.Position): string | null {
    const line = document.lineAt(position.line).text;
    const before = line.substring(0, position.character);
    // Match either `namespace.` (cursor after the dot) or `namespace.$` (cursor after the dollar)
    let match = before.match(/(\w+)\.$/);
    if (match)  { 
      return match[1];
    };
    match = before.match(/(\w+)\.\$\w*$/);
    if (match)  { 
      return match[1];
    };
    return null;
  }

  public static isInScssContext(document: vscode.TextDocument, position: vscode.Position): boolean {
    const line = document.lineAt(position.line).text;
    const before = line.substring(0, position.character);
    if (before.includes('//') || before.includes('/*')) {
      return false;
    }
    const s = (before.match(/'/g) || []).length;
    const d = (before.match(/"/g) || []).length;
    return s % 2 === 0 && d % 2 === 0;
  }

  /**
   * Basic helper for tests: get namespace from a string at index
   */
  public static getNamespaceFromTextAtIndex(text: string, index: number): string | null {
    const before = text.substring(0, index);
    let match = before.match(/(\w+)\.$/);
    if (match) { 
      return match[1];
    };
    match = before.match(/(\w+)\.\$\w*$/);
    if (match) { 
      return match[1];
    };
    return null;
  }
}
