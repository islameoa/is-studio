import * as fs from 'fs';
import * as path from 'path';
import { COLORS } from '../src/constants/colors';

// Convert camelCase to kebab-case for CSS variables
const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

// Generate CSS variables from the COLORS object
const generateCSSVariables = () => {
  const cssVariables = Object.entries(COLORS)
    .map(([key, value]) => `  --color-${camelToKebab(key)}: ${value};`)
    .join('\n');

  return `:root {\n${cssVariables}\n}`;
};

// Generate the CSS content
const cssContent = generateCSSVariables();

// Define output path
const outputPath = path.join(__dirname, '../src/styles/generated-colors.scss');

// Ensure the directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the CSS file
fs.writeFileSync(outputPath, cssContent, 'utf8');

console.log('✅ CSS colors generated successfully!');
console.log(`📁 Output: ${outputPath}`);
console.log('\n📋 Generated content:');
console.log(cssContent);

// Optional: Also generate a TypeScript file with the CSS variable names
const cssVariableNames = Object.keys(COLORS).reduce((acc, key) => {
  acc[key] = `var(--color-${camelToKebab(key)})`;
  return acc;
}, {} as Record<string, string>);

const tsContent = `// Auto-generated CSS variable references
// Run 'npm run generate-colors' to regenerate this file

export const CSS_COLORS = ${JSON.stringify(cssVariableNames, null, 2)} as const;
`;

const tsOutputPath = path.join(__dirname, '../src/constants/css-colors.ts');
fs.writeFileSync(tsOutputPath, tsContent, 'utf8');

console.log(`\n📁 TypeScript helper: ${tsOutputPath}`);
console.log('🎯 You can now use CSS_COLORS in your components for type-safe CSS variable references!');