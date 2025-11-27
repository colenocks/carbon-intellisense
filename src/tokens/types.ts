export enum TokenCategory {
  SPACING = 'spacing',
  LAYOUT = 'layout',
  COLOR = 'color',
  TYPOGRAPHY = 'typography',
  MOTION = 'motion',
  ICON = 'icon'
}

export interface Token {
  name: string;
  value: string;
  computedValue?: string;
  description?: string;
  category: TokenCategory;
  namespace: string;
  themes?: Record<string, string>;
  deprecated?: boolean;
  examples?: string[];
}

export interface ParsedImport {
  namespace: string;
  modulePath: string;
  line: number;
}

export type CarbonTheme = 'white' | 'g10' | 'g90' | 'g100';
