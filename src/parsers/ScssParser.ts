import * as vscode from 'vscode';
import { ParsedImport } from '../tokens/types';

export class ScssParser {
  private static readonly USE_PATTERN = /@use\s+['"]([^'"]+)['"]\s+as\s+(\w+)/g;
  private static readonly CARBON_MODULES = [
    '@carbon/react/scss/spacing',
    '@carbon/react/scss/theme',
    '@carbon/styles/scss/spacing',
    '@carbon/styles/scss/theme',
    '@carbon/styles/scss/type',
  ];

  public static parseDocument(document: vscode.TextDocument): ParsedImport[] {
    const imports: ParsedImport[] = [];
    const text = document.getText();
    let match: RegExpExecArray | null;
    while ((match = this.USE_PATTERN.exec(text)) !== null) {
      const modulePath = match[1];
      const namespace = match[2];
      if (this.isCarbonModule(modulePath)) {
        const line = document.positionAt(match.index).line;
        imports.push({ namespace, modulePath, line });
      }
    }
    return imports;
  }

  /**
   * Optionally parse a text string (useful for unit tests)
   */
  public static parseText(text: string): ParsedImport[] {
    const imports: ParsedImport[] = [];
    let match: RegExpExecArray | null;
    while ((match = this.USE_PATTERN.exec(text)) !== null) {
      const modulePath = match[1];
      const namespace = match[2];
      if (this.isCarbonModule(modulePath)) {
        imports.push({ namespace, modulePath, line: 0 });
      }
    }
    return imports;
  }

  private static isCarbonModule(modulePath: string): boolean {
    return this.CARBON_MODULES.some(m => modulePath.includes(m));
  }

  public static getNamespaceAtPosition(document: vscode.TextDocument, position: vscode.Position): string | null {
    const line = document.lineAt(position.line).text;
    const before = line.substring(0, position.character);
    const match = before.match(/(\w+)\.$/);
    return match ? match[1] : null;
  }

  public static isInScssContext(document: vscode.TextDocument, position: vscode.Position): boolean {
    const line = document.lineAt(position.line).text;
    const before = line.substring(0, position.character);
    if (before.includes('//') || before.includes('/*')) return false;
    const s = (before.match(/'/g) || []).length;
    const d = (before.match(/"/g) || []).length;
    return s % 2 === 0 && d % 2 === 0;
  }

  /**
   * Basic helper for tests: get namespace from a string at index
   */
  public static getNamespaceFromTextAtIndex(text: string, index: number): string | null {
    const before = text.substring(0, index);
    const match = before.match(/(\w+)\.$/);
    return match ? match[1] : null;
  }
}
