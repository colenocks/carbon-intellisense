import * as vscode from 'vscode';
import { Token, CarbonTheme } from './types';
import { spacingTokens } from './spacingTokens';
import { colorTokens } from './colorTokens';
import { layoutTokens } from './layoutTokens';
import { typographyTokens } from './typographyTokens';
import { motionTokens } from './motionTokens';

export class TokenDatabase {
  private tokens: Map<string, Token[]> = new Map();
  private tokenLookup: Map<string, Token> = new Map();
  private currentTheme: CarbonTheme = 'white';
  // vscode.FileSystemWatcher works in other VS Code-compatible editors
  private watcher: vscode.FileSystemWatcher | null = null;

  constructor() {
    this.initializeTokens();
  }

  private initializeTokens(): void {
    this.addTokens('spacing', spacingTokens);
    this.addTokens('theme', colorTokens);
    this.addTokens('layout', layoutTokens);
    this.addTokens('type', typographyTokens);
    this.addTokens('motion', motionTokens);
  }

  private addTokens(namespace: string, tokens: Token[]): void {
    this.tokens.set(namespace, tokens);
    tokens.forEach(token => {
      this.tokenLookup.set(token.name, token);
    });
  }

  public getTokensForNamespace(namespace: string): Token[] {
    return this.tokens.get(namespace) || [];
  }

  public getAllTokens(): Token[] {
    const all: Token[] = [];
    this.tokens.forEach(arr => all.push(...arr));
    return all;
  }

  public getTokenByName(name: string): Token | undefined {
    return this.tokenLookup.get(name);
  }

  public searchTokens(query: string): Token[] {
    const lower = query.toLowerCase();
    return this.getAllTokens().filter(t => t.name.toLowerCase().includes(lower) || (t.description || '').toLowerCase().includes(lower));
  }

  public getTokenValue(token: Token): string {
    if (token.themes && token.themes[this.currentTheme]) {
      return token.themes[this.currentTheme];
    }
    return token.value;
  }

  public setTheme(theme: CarbonTheme) {
    this.currentTheme = theme;
  }

  public getTheme(): CarbonTheme {
    return this.currentTheme;
  }

  /**
   * Start watching workspace SCSS files to invalidate caches when imports change.
   * Returns the watcher so it can be added to extension context subscriptions.
   */
  public startWatchingWorkspace(): vscode.FileSystemWatcher | null {
    if (this.watcher) {
      return this.watcher;
    }
    try {
      this.watcher = vscode.workspace.createFileSystemWatcher('**/*.scss');
      const onChange = () => this.handleWorkspaceChange();
      this.watcher.onDidChange(onChange);
      this.watcher.onDidCreate(onChange);
      this.watcher.onDidDelete(onChange);
      return this.watcher;
    } catch (e) {
      // ignore in environments without workspace access
      return null;
    }
  }

  private handleWorkspaceChange(): void {
    // No-op for now: tokens are static in memory, but providers may clear caches externally.
    // Keep method for future dynamic token loading.
    // Emit an event via workspace state if needed in the future.
  }

  public dispose(): void {
    if (this.watcher) {
      this.watcher.dispose();
      this.watcher = null;
    }
  }
}
