const path = require("path");
const nodeExternals = require("webpack-node-externals");

const buildRoot = path.resolve(__dirname, "dist");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/server.ts",
  output: {
    filename: "bundle.js",
    path: buildRoot,
  },
  devtool: "none",
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: "ts-loader",
        exclude: /(node_modules | __tests__)/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
};
