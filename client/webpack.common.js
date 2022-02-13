const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const buildRoot = path.resolve(__dirname, "public", "dist");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: buildRoot,
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
        exclude: /(node_modules | __tests__ | react-app-env.d.ts)/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|mp3|wav|ttf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets",
        },
      },
    ],
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".css",
      ".tty",
      ".mp3",
      ".wav",
      ".png",
      ".jpg",
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
