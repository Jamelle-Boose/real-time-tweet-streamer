require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const util = require("util")
const request = require("request")
const path = require("path")
const socketIo = require("socket.io")
const http = require("http")
const Client = require("twitter-api-sdk").Client

const app = express()
let port = process.env.PORT || 3000
const post = util.promisify(request.post)
const get = util.promisify(request.get)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = http.createServer(app)
const io = socketIo(server)

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN

let timeout = 0

const rulesURL = new URL("https://api.twitter.com/2/tweets/search/stream/rules")

const authMessage = {
  title: "Could not authenticate",
  details: [`Please make sure your bearer token is correct.`],
  type: "https://developer.twitter.com/en/docs/authentication",
}

const sleep = async delay => {
  return new Promise(resolve => setTimeout(() => resolve(true), delay))
}

app.get("/api/rules", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage)
  }

  const token = BEARER_TOKEN
  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token,
    },
    json: true,
  }

  try {
    const response = await get(requestConfig)

    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body)
      } else {
        throw new Error(response.body.error.message)
      }
    }

    res.send(response)
  } catch (e) {
    res.send(e)
  }
})

app.post("/api/rules", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage)
  }

  const token = BEARER_TOKEN
  const requestConfig = {
    url: rulesURL,
    auth: {
      bearer: token,
    },
    json: req.body,
  }

  try {
    const response = await post(requestConfig)

    if (response.statusCode === 200 || response.statusCode === 201) {
      res.send(response)
    } else {
      throw new Error(response)
    }
  } catch (e) {
    res.send(e)
  }
})

const streamTweets = async (socket, token) => {
  try {
    const client = new Client(token)
    const twitStream = client.tweets.searchStream({
      "tweet.fields": ["context_annotations"],
      expansions: ["author_id"],
    })

    for await (const tweet of twitStream) {
      try {
        socket.emit("tweet", tweet)
      } catch (error) {
        socket.emit("authError", authMessage)
      }
    }
  } catch (e) {
    socket.emit("heartbeat")
    await reconnect(socket, token)
  }
}

const reconnect = async (socket, token) => {
  timeout++
  await sleep(2 ** timeout * 1000)
  await streamTweets(socket, token)
}

io.on("connection", async () => {
  try {
    const token = BEARER_TOKEN
    io.emit("connect", "Client connected")
    await streamTweets(io, token)
  } catch (e) {
    io.emit("authError", authMessage)
  }
})

console.log("NODE_ENV is", process.env.NODE_ENV)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")))
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"))
  })
} else {
  port = 3001
}

server.listen(port, () => console.log(`Listening on port ${port}`))
