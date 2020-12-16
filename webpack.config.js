require('@babel/polyfill')

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  target: 'node',
  output: {
    path: `${process.cwd()}/dist`,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
    ],
  },
}
