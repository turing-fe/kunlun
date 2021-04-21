module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.10.2'
      }
    ],
    ['@babel/preset-react'],
    ['@babel/preset-typescript']
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
    // ['@babel/plugin-transform-runtime', {}]
  ]
}
