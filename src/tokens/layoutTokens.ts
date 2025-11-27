import { Token, TokenCategory } from './types';

export const layoutTokens: Token[] = [
  { name: 'container-width', value: '1200px', description: 'Max container width', category: TokenCategory.LAYOUT, namespace: 'layout' },
  { name: 'gutter-width', value: '24px', description: 'Horizontal gutters', category: TokenCategory.LAYOUT, namespace: 'layout' }
];
