import { Token, TokenCategory } from './types';

export const typographyTokens: Token[] = [
  { name: 'font-size-01', value: '0.75rem', computedValue: '12px', description: 'Small font size', category: TokenCategory.TYPOGRAPHY, namespace: 'type' },
  { name: 'font-size-02', value: '0.875rem', computedValue: '14px', description: 'Base font size', category: TokenCategory.TYPOGRAPHY, namespace: 'type' },
  { name: 'font-size-03', value: '1rem', computedValue: '16px', description: 'Large font size', category: TokenCategory.TYPOGRAPHY, namespace: 'type' }
];
