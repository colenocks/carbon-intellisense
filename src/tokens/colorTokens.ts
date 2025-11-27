import { Token, TokenCategory } from './types';

export const colorTokens: Token[] = [
  { name: 'background', value: '#ffffff', description: 'Default background color', category: TokenCategory.COLOR, namespace: 'theme', themes: { white: '#ffffff', g10: '#f4f4f4', g90: '#262626', g100: '#161616' } },
  { name: 'background-hover', value: '#e5e5e5', description: 'Background hover state', category: TokenCategory.COLOR, namespace: 'theme', themes: { white: '#e5e5e5', g10: '#e5e5e5', g90: '#353535', g100: '#262626' } },
  { name: 'interactive', value: '#0f62fe', description: 'Interactive element color', category: TokenCategory.COLOR, namespace: 'theme' },
  { name: 'text-primary', value: '#161616', description: 'Primary text color', category: TokenCategory.COLOR, namespace: 'theme', themes: { white: '#161616', g10: '#161616', g90: '#f4f4f4', g100: '#f4f4f4' } }
];
