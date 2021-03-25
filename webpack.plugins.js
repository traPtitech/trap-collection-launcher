const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.EnvironmentPlugin({ KOUDAISAI: false }),
];
