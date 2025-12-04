import { Token, TokenCategory } from './types';

export const layoutTokens: Token[] = [
  {
    name: 'base-font-size',
    value: '16px',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'container-01',
    value: '1.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'container-02',
    value: '2rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'container-03',
    value: '2.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'container-04',
    value: '3rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'container-05',
    value: '4rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'container',
    value: `(
  container-01: $container-01,
  container-02: $container-02,
  container-03: $container-03,
  container-04: $container-04,
  container-05: $container-05,
)`,
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'fluid-spacing-01',
    value: '0',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'fluid-spacing-02',
    value: '2vw',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'fluid-spacing-03',
    value: '5vw',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'fluid-spacing-04',
    value: '10vw',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'fluid-spacing',
    value: `(
  fluid-spacing-01: $fluid-spacing-01,
  fluid-spacing-02: $fluid-spacing-02,
  fluid-spacing-03: $fluid-spacing-03,
  fluid-spacing-04: $fluid-spacing-04,
)`,
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'icon-size-01',
    value: '1rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'icon-size-02',
    value: '1.25rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'icon-size',
    value: `(
  icon-size-01: $icon-size-01,
  icon-size-02: $icon-size-02,
)`,
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout-01',
    value: '1rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout-02',
    value: '1.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout-03',
    value: '2rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout-04',
    value: '3rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout-05',
    value: '4rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout-06',
    value: '6rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout-07',
    value: '10rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'layout',
    value: `(
  layout-01: $layout-01,
  layout-02: $layout-02,
  layout-03: $layout-03,
  layout-04: $layout-04,
  layout-05: $layout-05,
  layout-06: $layout-06,
  layout-07: $layout-07,
)`,
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'size-xs',
    value: '1.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'size-sm',
    value: '2rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'size-md',
    value: '2.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'size-lg',
    value: '3rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'size-xl',
    value: '4rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'size-2xl',
    value: '5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-01',
    value: '0.125rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-02',
    value: '0.25rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-03',
    value: '0.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-04',
    value: '0.75rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-05',
    value: '1rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-06',
    value: '1.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-07',
    value: '2rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-08',
    value: '2.5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-09',
    value: '3rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-10',
    value: '4rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-11',
    value: '5rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-12',
    value: '6rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing-13',
    value: '10rem',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'spacing',
    value: `(
  spacing-01: $spacing-01,
  spacing-02: $spacing-02,
  spacing-03: $spacing-03,
  spacing-04: $spacing-04,
  spacing-05: $spacing-05,
  spacing-06: $spacing-06,
  spacing-07: $spacing-07,
  spacing-08: $spacing-08,
  spacing-09: $spacing-09,
  spacing-10: $spacing-10,
  spacing-11: $spacing-11,
  spacing-12: $spacing-12,
  spacing-13: $spacing-13,
)`,
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  },
  {
    name: 'base-font-size',
    value: '16px',
    category: TokenCategory.LAYOUT,
    namespace: 'layout'
  }
];
