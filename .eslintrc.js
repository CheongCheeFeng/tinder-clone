module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'arrow-body-style': 0,
    'no-use-before-define': [2, { variables: false }],
    'no-console': 0,
    'react/style-prop-object': 0,
    'max-len': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/jsx-no-constructed-context-values': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'global-require': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['src', 'node_modules'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.web.js',
          '.web.jsx',
          '.web.ts',
          '.web.tsx',
          '.json',
        ],
      },
      components: './src/components',
      screens: './src/screens',
    },
  },
};
