import { Token, TokenCategory } from './types';

export const spacingTokens: Token[] = [
  { name: 'spacing-01', value: '0.125rem', computedValue: '2px', description: 'Extra small spacing', category: TokenCategory.SPACING, namespace: 'spacing' },
  { name: 'spacing-02', value: '0.25rem', computedValue: '4px', description: 'Small spacing', category: TokenCategory.SPACING, namespace: 'spacing' },
  { name: 'spacing-03', value: '0.5rem', computedValue: '8px', description: 'Medium spacing', category: TokenCategory.SPACING, namespace: 'spacing' },
  { name: 'spacing-04', value: '0.75rem', computedValue: '12px', description: 'Default spacing', category: TokenCategory.SPACING, namespace: 'spacing' },
  { name: 'spacing-05', value: '1rem', computedValue: '16px', description: 'Large spacing', category: TokenCategory.SPACING, namespace: 'spacing' }
];
