module.exports = {
  '*.{js,ts,tsx}': [
    // https://eslint.org/docs/user-guide/command-line-interface
    'eslint --fix --color',
    // https://prettier.io/docs/en/cli.html
    'prettier --write "packages/**/*.{ts,tsx,js,jsx}"'
  ],
  // https://stylelint.io/user-guide/usage/cli
  '*.{css,less,styl,scss,sass}': [
    'stylelint **/*.{css,less,styl,scss,sass} --cache --fix --allow-empty-input'
  ]
}
