const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors())

// Utilisation & support du JSON dans le backend
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Dossier public
app.use(express.static('public'))

// Instanciation d'un serveur HTTP basé sur Express
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

/**
 * Routes
 */

app.get('/', (req, res) => {
  res.send('Hello world !')
})

io.on('connection', (socket) => {
  console.log(`client connected on socket ${socket.id}`)
  // Connection avec le client active
  socket.emit('connected', null)

  socket.on('tata', (data) => {
    console.log(`message reçu : ${data}`)
  })

  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
})

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
