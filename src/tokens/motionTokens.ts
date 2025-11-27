import { Token, TokenCategory } from './types';

export const motionTokens: Token[] = [
  { name: 'motion-duration-01', value: '150ms', description: 'Short motion duration', category: TokenCategory.MOTION, namespace: 'motion' },
  { name: 'motion-duration-02', value: '300ms', description: 'Medium motion duration', category: TokenCategory.MOTION, namespace: 'motion' }
];
