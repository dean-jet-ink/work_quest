const { merge } = require("webpack-merge");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const common = require("./webpack.common");

module.exports = merge(common, {
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    hot: true,
    watchContentBase: true,
    overlay: {
      errors: true,
    },
    port: 3000,
    host: "0.0.0.0", //dockerコンテナでのlocalhost待機状態のため、全外部ユーザーからのアクセス許可
  },
  plugins: [new BundleAnalyzerPlugin()],
});
