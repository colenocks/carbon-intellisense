import { Token, TokenCategory } from './types';

export const typographyTokens: Token[] = [
  {
    name: 'font-weights',
    value: `(
  'light': 300,
  'regular': 400,
  'semibold': 600,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'prefix',
    value: '\'cds\'',
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'custom-property-prefix',
    value: '\'cds\'',
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'caption-01',
    value: `(
  font-size: scale.type-scale(1),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.33333,
  letter-spacing: 0.32px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'caption-02',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.28572,
  letter-spacing: 0.32px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'label-01',
    value: `(
  font-size: scale.type-scale(1),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.33333,
  letter-spacing: 0.32px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'label-02',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.28572,
  letter-spacing: 0.16px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'legal-01',
    value: `(
  font-size: scale.type-scale(1),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.33333,
  letter-spacing: 0.32px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'legal-02',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.28572,
  letter-spacing: 0.16px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'helper-text-01',
    value: `(
  font-size: scale.type-scale(1),
  line-height: 1.33333,
  letter-spacing: 0.32px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'helper-text-02',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.28572,
  letter-spacing: 0.16px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'body-short-01',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.28572,
  letter-spacing: 0.16px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'body-long-01',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.42857,
  letter-spacing: 0.16px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'body-short-02',
    value: `(
  font-size: scale.type-scale(3),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.375,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'body-long-02',
    value: `(
  font-size: scale.type-scale(3),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.5,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'code-01',
    value: `(
  font-family: font-family.font-family('mono'),
  font-size: scale.type-scale(1),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.33333,
  letter-spacing: 0.32px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'code-02',
    value: `(
  font-family: font-family.font-family('mono'),
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.42857,
  letter-spacing: 0.32px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'heading-01',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('semibold'),
  line-height: 1.42857,
  letter-spacing: 0.16px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'productive-heading-01',
    value: `(
  font-size: scale.type-scale(2),
  font-weight: font-family.font-weight('semibold'),
  line-height: 1.28572,
  letter-spacing: 0.16px,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'heading-02',
    value: `(
  font-size: scale.type-scale(3),
  font-weight: font-family.font-weight('semibold'),
  line-height: 1.5,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'productive-heading-02',
    value: `(
  font-size: scale.type-scale(3),
  font-weight: font-family.font-weight('semibold'),
  line-height: 1.375,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'productive-heading-03',
    value: `(
  font-size: scale.type-scale(5),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.4,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'productive-heading-04',
    value: `(
  font-size: scale.type-scale(7),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.28572,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'productive-heading-05',
    value: `(
  font-size: scale.type-scale(8),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.25,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'productive-heading-06',
    value: `(
  font-size: scale.type-scale(10),
  font-weight: font-family.font-weight('light'),
  // Extra digit needed for precision in Chrome
  line-height: 1.199,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'productive-heading-07',
    value: `(
  font-size: scale.type-scale(12),
  font-weight: font-family.font-weight('light'),
  line-height: 1.19,
  letter-spacing: 0,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'expressive-heading-03',
    value: `(
  font-size: scale.type-scale(5),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.4,
  letter-spacing: 0,
  breakpoints: (
    xlg: (
      font-size: scale.type-scale(5),
      line-height: 1.4,
    ),
    max: (
      font-size: scale.type-scale(6),
      line-height: 1.334,
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'expressive-heading-04',
    value: `(
  font-size: scale.type-scale(7),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.28572,
  letter-spacing: 0,
  breakpoints: (
    xlg: (
      font-size: scale.type-scale(8),
      line-height: 1.25,
      font-weight: font-family.font-weight('regular'),
    ),
    max: (
      font-size: scale.type-scale(8),
      font-weight: font-family.font-weight('regular'),
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'expressive-heading-05',
    value: `(
  font-size: scale.type-scale(8),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.25,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(9),
      font-weight: font-family.font-weight('light'),
      line-height: 1.22,
    ),
    lg: (
      font-size: scale.type-scale(10),
      line-height: 1.19,
    ),
    xlg: (
      font-size: scale.type-scale(11),
      line-height: 1.17,
    ),
    max: (
      font-size: scale.type-scale(13),
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'expressive-heading-06',
    value: `(
  font-size: scale.type-scale(8),
  font-weight: font-family.font-weight('semibold'),
  line-height: 1.25,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(9),
      line-height: 1.22,
    ),
    lg: (
      font-size: scale.type-scale(10),
      line-height: 1.19,
    ),
    xlg: (
      font-size: scale.type-scale(11),
      line-height: 1.17,
    ),
    max: (
      font-size: scale.type-scale(13),
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'expressive-paragraph-01',
    value: `(
  font-size: scale.type-scale(6),
  font-weight: font-family.font-weight('light'),
  line-height: 1.334,
  letter-spacing: 0,
  breakpoints: (
    lg: (
      font-size: scale.type-scale(7),
      line-height: 1.28572,
    ),
    max: (
      font-size: scale.type-scale(8),
      line-height: 1.25,
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'quotation-01',
    value: `(
  font-family: font-family.font-family('serif'),
  font-size: scale.type-scale(5),
  font-weight: font-family.font-weight('regular'),
  line-height: 1.3,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(5),
    ),
    lg: (
      font-size: scale.type-scale(6),
      line-height: 1.334,
    ),
    xlg: (
      font-size: scale.type-scale(7),
      line-height: 1.28572,
    ),
    max: (
      font-size: scale.type-scale(8),
      line-height: 1.25,
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'quotation-02',
    value: `(
  font-family: font-family.font-family('serif'),
  font-size: scale.type-scale(8),
  font-weight: font-family.font-weight('light'),
  line-height: 1.25,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(9),
      line-height: 1.22,
    ),
    lg: (
      font-size: scale.type-scale(10),
      line-height: 1.19,
    ),
    xlg: (
      font-size: scale.type-scale(11),
      line-height: 1.17,
    ),
    max: (
      font-size: scale.type-scale(13),
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'display-01',
    value: `(
  font-size: scale.type-scale(10),
  font-weight: font-family.font-weight('light'),
  line-height: 1.19,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(10),
    ),
    lg: (
      font-size: scale.type-scale(12),
    ),
    xlg: (
      font-size: scale.type-scale(13),
      line-height: 1.17,
    ),
    max: (
      font-size: scale.type-scale(15),
      line-height: 1.13,
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'display-02',
    value: `(
  font-size: scale.type-scale(10),
  font-weight: font-family.font-weight('semibold'),
  line-height: 1.19,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(10),
    ),
    lg: (
      font-size: scale.type-scale(12),
    ),
    xlg: (
      font-size: scale.type-scale(13),
      line-height: 1.16,
    ),
    max: (
      font-size: scale.type-scale(15),
      line-height: 1.13,
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'display-03',
    value: `(
  font-size: scale.type-scale(10),
  font-weight: font-family.font-weight('light'),
  line-height: 1.19,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(12),
      line-height: 1.18,
    ),
    lg: (
      font-size: scale.type-scale(13),
      line-height: 1.16,
      letter-spacing: -0.64px,
    ),
    xlg: (
      font-size: scale.type-scale(15),
      line-height: 1.13,
      letter-spacing: -0.64px,
    ),
    max: (
      font-size: scale.type-scale(16),
      line-height: 1.11,
      letter-spacing: -0.96px,
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'display-04',
    value: `(
  font-size: scale.type-scale(10),
  font-weight: font-family.font-weight('light'),
  line-height: 1.19,
  letter-spacing: 0,
  breakpoints: (
    md: (
      font-size: scale.type-scale(14),
      line-height: 1.15,
    ),
    lg: (
      font-size: scale.type-scale(17),
      line-height: 1.11,
      letter-spacing: -0.64px,
    ),
    xlg: (
      font-size: scale.type-scale(20),
      line-height: 1.07,
      letter-spacing: -0.64px,
    ),
    max: (
      font-size: scale.type-scale(23),
      line-height: 1.05,
      letter-spacing: -0.96px,
    ),
  ),
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'tokens',
    value: `(
  caption-01: $caption-01,
  caption-02: $caption-02,
  label-01: $label-01,
  label-02: $label-02,
  helper-text-01: $helper-text-01,
  helper-text-02: $helper-text-02,
  body-short-01: $body-short-01,
  body-short-02: $body-short-02,
  body-long-01: $body-long-01,
  body-long-02: $body-long-02,
  code-01: $code-01,
  code-02: $code-02,
  heading-01: $heading-01,
  heading-02: $heading-02,
  productive-heading-01: $productive-heading-01,
  productive-heading-02: $productive-heading-02,
  productive-heading-03: $productive-heading-03,
  productive-heading-04: $productive-heading-04,
  productive-heading-05: $productive-heading-05,
  productive-heading-06: $productive-heading-06,
  productive-heading-07: $productive-heading-07,
  expressive-paragraph-01: $expressive-paragraph-01,
  expressive-heading-01: $expressive-heading-01,
  expressive-heading-02: $expressive-heading-02,
  expressive-heading-03: $expressive-heading-03,
  expressive-heading-04: $expressive-heading-04,
  expressive-heading-05: $expressive-heading-05,
  expressive-heading-06: $expressive-heading-06,
  quotation-01: $quotation-01,
  quotation-02: $quotation-02,
  display-01: $display-01,
  display-02: $display-02,
  display-03: $display-03,
  display-04: $display-04,
  // V11 Tokens
  legal-01: $legal-01,
  legal-02: $legal-02,
  body-compact-01: $body-compact-01,
  body-compact-02: $body-compact-02,
  heading-compact-01: $heading-compact-01,
  heading-compact-02: $heading-compact-02,
  body-01: $body-01,
  body-02: $body-02,
  heading-03: $heading-03,
  heading-04: $heading-04,
  heading-05: $heading-05,
  heading-06: $heading-06,
  heading-07: $heading-07,
  fluid-heading-03: $fluid-heading-03,
  fluid-heading-04: $fluid-heading-04,
  fluid-heading-05: $fluid-heading-05,
  fluid-heading-06: $fluid-heading-06,
  fluid-paragraph-01: $fluid-paragraph-01,
  fluid-quotation-01: $fluid-quotation-01,
  fluid-quotation-02: $fluid-quotation-02,
  fluid-display-01: $fluid-display-01,
  fluid-display-02: $fluid-display-02,
  fluid-display-03: $fluid-display-03,
  fluid-display-04: $fluid-display-04,
)`,
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'next-fluid-breakpoint-name',
    value: 'null',
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  },
  {
    name: 'next-breakpoint-available',
    value: 'null',
    category: TokenCategory.TYPOGRAPHY,
    namespace: 'type'
  }
];
