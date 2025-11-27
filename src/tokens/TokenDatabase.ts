import { Token, CarbonTheme } from './types';
import { spacingTokens } from './spacingTokens';
import { colorTokens } from './colorTokens';

export class TokenDatabase {
  private tokens: Map<string, Token[]> = new Map();
  private currentTheme: CarbonTheme = 'white';

  constructor() {
    this.initializeTokens();
  }

  private initializeTokens(): void {
    this.addTokens('spacing', spacingTokens);
    this.addTokens('theme', colorTokens);
  }

  private addTokens(namespace: string, tokens: Token[]): void {
    this.tokens.set(namespace, tokens);
  }

  public getTokensForNamespace(namespace: string): Token[] {
    return this.tokens.get(namespace) || [];
  }

  public getAllTokens(): Token[] {
    const all: Token[] = [];
    this.tokens.forEach(arr => all.push(...arr));
    return all;
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
}
