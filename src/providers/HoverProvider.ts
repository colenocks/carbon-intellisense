import * as vscode from 'vscode';
import { TokenDatabase } from '../tokens/TokenDatabase';

export class CarbonHoverProvider implements vscode.HoverProvider {
  private tokenDatabase: TokenDatabase;

  constructor(tokenDatabase: TokenDatabase) {
    this.tokenDatabase = tokenDatabase;
  }

  public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
    const wordRange = document.getWordRangeAtPosition(position, /\$?\w[\w-]*/);
    if (!wordRange) {return null;}
    const word = document.getText(wordRange).replace(/^\$/, '');

    const token = this.tokenDatabase.getAllTokens().find(t => t.name === word);
    if (!token) {return null;}

    const value = this.tokenDatabase.getTokenValue(token as any);
    const md = new vscode.MarkdownString();
    md.appendMarkdown(`**${token.name}**  \n`);
    md.appendMarkdown(`Value: \`${value}\``);
    if ((token as any).computedValue) {md.appendMarkdown(`  \nComputed: \`${(token as any).computedValue}\``);}
    if (token.description) {
      md.appendMarkdown(`\n\n${token.description}`);
    }
    return new vscode.Hover(md, wordRange);
  }
}
