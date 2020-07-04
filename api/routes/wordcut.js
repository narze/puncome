const { Router } = require('express')
const router = Router()

const wordcut = require("wordcut")
wordcut.init()

router.get('/wordcut', function (req, res, next) {
  const words = req.query.input
  return res.json({ output: wordcut.cut(words) })
})

module.exports = router
