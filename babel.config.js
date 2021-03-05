module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env', { 'modules': false, useBuiltIns: 'usage' }]
  ],
  plugins: [        // element官方教程
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}