const path = require("path")

module.exports = {
  mode: "development",
  target: "node",
  entry: "./server/server",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "server.js"
  },
  stats: "errors-only"
}
