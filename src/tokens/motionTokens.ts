import { Token, TokenCategory } from './types';

export const motionTokens: Token[] = [
  {
    name: 'easings',
    value: `(
  standard: (
    productive: cubic-bezier(0.2, 0, 0.38, 0.9),
    expressive: cubic-bezier(0.4, 0.14, 0.3, 1),
  ),
  entrance: (
    productive: cubic-bezier(0, 0, 0.38, 0.9),
    expressive: cubic-bezier(0, 0, 0.3, 1),
  ),
  exit: (
    productive: cubic-bezier(0.2, 0, 1, 0.9),
    expressive: cubic-bezier(0.4, 0.14, 1, 1),
  ),
)`,
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'duration-fast-01',
    value: '70ms',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'duration-fast-02',
    value: '110ms',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'duration-moderate-01',
    value: '150ms',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'duration-moderate-02',
    value: '240ms',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'duration-slow-01',
    value: '400ms',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'duration-slow-02',
    value: '700ms',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'ease-in',
    value: 'cubic-bezier(0.25, 0, 1, 1)',
    description: 'Deprecated in Carbon v11, kept for backward compatibility with v10 and earlier',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'ease-out',
    value: 'cubic-bezier(0, 0, 0.25, 1)',
    description: 'Deprecated in Carbon v11, kept for backward compatibility with v10 and earlier',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'standard-easing',
    value: 'cubic-bezier(0.5, 0, 0.1, 1)',
    description: 'Deprecated in Carbon v11, kept for backward compatibility with v10 and earlier',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'transition-base',
    value: '250ms',
    description: 'Deprecated in Carbon v11, kept for backward compatibility with v10 and earlier',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  },
  {
    name: 'transition-expansion',
    value: '300ms',
    description: 'Deprecated in Carbon v11, kept for backward compatibility with v10 and earlier',
    category: TokenCategory.MOTION,
    namespace: 'motion'
  }
];
