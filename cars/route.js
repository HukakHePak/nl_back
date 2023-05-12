const express = require("express")
const authorization = require("./middlewares/authorization")
const execution = require("./middlewares/execution")

const router = express.Router()

router.use("/public", execution)

router.use(authorization)

router.get("/help", (req, res) => {
  // TODO: list of accepted procedures and docs them
  res.send("ok")
})

router.use("/execute", execution)

module.exports = router
