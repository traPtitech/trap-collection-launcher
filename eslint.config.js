import eslintJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
  {
    files: ['*.js', '.storybook/**/*.js', 'webpack.*.js', 'forge.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.webpack/**',
      '**/.vite/**',
      'src/lib/typescript-axios/**',
    ],
  },
];
