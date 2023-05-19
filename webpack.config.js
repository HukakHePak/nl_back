const path = require("path")
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackNodeExternals = require("webpack-node-externals")

module.exports = {
  mode: "production",
  target: "node",
  entry: "server/server.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "server.js"
  },
  resolve: {
    extensions: ["", ".ts", ".js"],
    modules: ["./", "node_modules"]
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.js$/],
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  }
}
