const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyparser.json())

app.use(cors())

const users = {}

const router = express.Router()

router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body
  const hexusername = Buffer.from(username).toString('hex')
  if (!users[hexusername]) {
    users[hexusername] = password
  }
  if (users[hexusername] && password === users[hexusername]) {
    const token = Buffer.from(hexusername).toString('base64')
    res.send({
      token
    })
    return
  }
  res.status(401).send({
    error: 'invalid credentials'
  })
})

router.get('/me', (req, res) => {
  if (!req.headers.authorization || req.headers.authorization.length < 7) {
    res.status(403).send({
      error: 'please authorise first'
    })
    return
  }
  const decodedToken = Buffer.from(req.headers.authorization.substring(7, req.headers.authorization.length), 'base64').toString()
  const username = decodedToken
  if (!users[username]) {
    res.status(401).send({
      error: 'invalid token'
    })
    return
  }
  res.send({
    name: 'Jay Kay'
  })
})

app.use(router)

app.use('*', (req, res) => {
  res.status(404).send({
    error: 'not found'
  })
})

module.exports = {
  app
}