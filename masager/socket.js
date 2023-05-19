const express = require("express")

const router = express.Router()
const { Users, Messages } = require("./collections")

const clients = []

router.ws("/", async (ws, req) => {
  const token = Object.keys(req.query)[0]

  let user

  if (token) {
    user = await Users.findOne({ token })

    if (!user) {
      ws.close(undefined, "Can't find user")
      return
    }
  } else {
    ws.close(undefined, "No token")
    return
  }

  console.log(`client connected: ${user.name}`)
  clients.push(ws)

  ws.on("message", async (msg) => {
    try {
      const text = JSON.parse(msg).text.trim()
      if (!text.length) return

      Messages.insertOne({ userId: user._id, text, createdAt: Date.now() })

      const message = {
        user: { name: user.name, email: user.email },
        text,
        createdAt: Date.now()
      }

      clients.forEach((client) => client.send(JSON.stringify(message)))
    } catch (err) {
      console.log(err)
    }
  })

  ws.on("error", (err) => {
    console.log(err)
    ws.emit("close")
  })

  ws.on("close", (currentWs) => {
    console.log(`client disconnected: ${user.name}`)
    clients.splice(clients.indexOf(currentWs))
  })
})

module.exports = router
