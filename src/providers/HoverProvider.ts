import * as vscode from 'vscode';
import { TokenDatabase } from '../tokens/TokenDatabase';
import { formatTokenDocumentation } from './formatters';

export class CarbonHoverProvider implements vscode.HoverProvider {
  private tokenDatabase: TokenDatabase;

  constructor(tokenDatabase: TokenDatabase) {
    this.tokenDatabase = tokenDatabase;
  }

  public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
    const wordRange = document.getWordRangeAtPosition(position, /\$?\w[\w-]*/);
    if (!wordRange) {
      return null;
    }
    const word = document.getText(wordRange).replace(/^\$/, '');

    const token = this.tokenDatabase.getTokenByName(word);
    if (!token) {
      return null;
    }

    const doc = formatTokenDocumentation(token as any, this.tokenDatabase);
    const md = new vscode.MarkdownString(doc);
    return new vscode.Hover(md, wordRange);
  }
}
