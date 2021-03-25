module.exports = [
  {
    test: /\.(woff|ttf|svg|eot|gif)$/,
    use: 'file-loader',
  },
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          [
            'module-resolver',
            {
              alias: {
                '@api': './api',
                '@': './src',
              },
              extensions: ['.ts', '.tsx'],
            },
          ],
        ],
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
];
