/**
 * Tailwind CSS Configuration
 * 
 * This file customizes Tailwind CSS for the Trip Ready application.
 * Tailwind scans your files for class names and generates only the CSS you use.
 * 
 * Key Concepts:
 * - content: Tells Tailwind which files to scan for class names (tree-shaking)
 * - theme.extend: Adds custom values without overriding Tailwind defaults
 * - plugins: Array for Tailwind plugins (e.g., forms, typography)
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  /**
   * Content Array: File Paths to Scan
   * 
   * Tailwind scans these file paths for class names to include in the final CSS.
   * Only classes found in these files will be included (purge/tree-shaking).
   * 
   * Patterns included:
   * - All files in app directory (js, ts, jsx, tsx, mdx)
   * - All files in components directory (js, ts, jsx, tsx, mdx)
   */
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    /**
     * Theme Extend: Custom Design Tokens
     * 
     * extend adds to Tailwind's default theme without overriding it.
     * This means you can still use default colors (red-500, blue-600, etc.)
     * while also having custom colors (navy, royal, etc.).
     */
    extend: {
      /**
       * Custom Color Palette
       * 
       * These colors define the Trip Ready design system.
       * Usage: bg-navy, text-royal, border-silver, etc.
       * 
       * Color Meanings:
       * - navy (#1E3A5F): Primary dark color for headings, important text
       * - royal (#2563EB): Primary blue for buttons, links, accents
       * - sky (#DBEAFE): Light blue background/tint (very light)
       * - slate (#334155): Dark gray for secondary text
       * - steel (#64748B): Medium gray for muted text, borders
       * - ivory (#FAFBFC): Off-white background color
       * - silver (#E2E8F0): Light gray for borders, dividers
       * - gold (#D97706): Accent color for highlights, warnings
       */
      colors: {
        navy: '#1E3A5F',
        royal: '#2563EB',
        sky: '#DBEAFE',
        slate: '#334155',
        steel: '#64748B',
        ivory: '#FAFBFC',
        silver: '#E2E8F0',
        gold: '#D97706'
      },
      /**
       * Custom Font Families
       * 
       * Currently empty - add custom fonts here if needed.
       * Example: fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
       */
      fontFamily: {},
      /**
       * Custom Spacing Scale
       * 
       * Adds extra-large spacing values beyond Tailwind's default max (7xl = 80rem).
       * Usage: p-8xl, m-9xl, gap-8xl, etc.
       * 
       * Values:
       * - 8xl: 96rem (1536px) - Extra large spacing
       * - 9xl: 128rem (2048px) - Ultra large spacing
       */
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      /**
       * Custom Border Radius
       * 
       * Adds extra-large border radius beyond Tailwind's default max (3xl = 1.5rem).
       * Usage: rounded-4xl
       * 
       * Value:
       * - 4xl: 2rem (32px) - Very rounded corners
       */
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  /**
   * Plugins Array
   * 
   * Add Tailwind plugins here to extend functionality.
   * Common plugins: @tailwindcss/forms, @tailwindcss/typography
   * 
   * Example: plugins: [require('@tailwindcss/forms')]
   */
  plugins: []
};

export default config;
