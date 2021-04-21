module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    mocha: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',
    // https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
    'prettier',
    // Note: Please keep this as the last config to make sure that this (and by extension our .prettierrc file) overrides all configuration above it
    // https://www.npmjs.com/package/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/consistent-indexed-object-style': 1,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/consistent-type-imports': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 'error',
    'import/no-webpack-loader-syntax': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    // <Component boolProp />
    'react/jsx-boolean-value': ['error', 'never', { always: ['personal'] }]
  },
  settings: {
    react: {
      pragma: 'React',
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect'
    }
  }
}
