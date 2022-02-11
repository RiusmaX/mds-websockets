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

const STATIC_CHANNELS = [
  {
    id: 1,
    name: 'Global Chat',
    participants: 0,
    sockets: []
  },
  {
    id: 2,
    name: 'Channel 2',
    participants: 0,
    sockets: []
  }
]

/**
 * Routes
 */

app.get('/', (req, res) => {
  res.send('Hello world !')
})

app.get('/getChannels', (req, res) => {
  res.json({
    channels: STATIC_CHANNELS
  })
})

io.on('connection', (socket) => {
  console.log(`client connected on socket ${socket.id}`)
  // Connection avec le client active
  socket.emit('connected', null)

  socket.on('channel-join', (id) => {
    console.log(`${socket.id} joined channel : ${id}`)
    STATIC_CHANNELS.forEach(c => {
      // On retrouve le cannal sélectionné
      if (c.id === id) {
        // Si le socket n'est pas déjà dans le cannal
        if (c.sockets.indexOf(socket.id) === -1) {
          c.sockets.push(socket.id)
          c.participants++
          io.emit('channel', c)
        }
      } else {
        const index = c.sockets.indexOf(socket.id)
        if (index !== -1) {
          c.sockets.splice(index, 1)
          c.participants--
          io.emit('channel', c)
        }
      }
    })
    return id
  })

  socket.on('disconnect', () => {
    console.log('client disconnected')
    STATIC_CHANNELS.forEach(c => {
      const index = c.sockets.indexOf(socket.id)
      if (index !== -1) {
        c.sockets.splice(index, 1)
        c.participants--
        io.emit('channel', c)
      }
    })
  })
})

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
