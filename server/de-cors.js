const cors = require("cors")

const corsConfig = {
  development: { origin: false, credentials: true },
  production: {
    origin: [/note-lawn\.ru/],
    credentials: true
  }
}[process.env.MODE]

const decors = cors(corsConfig)

module.exports = decors
