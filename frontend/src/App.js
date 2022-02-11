import { useEffect, useState } from 'react'
import './App.scss'
import socketClient from 'socket.io-client'
import Chat from './components/chat/Chat'
// Socket ENDPOINT (notre API)
const SOCKET_ENDPOINT = 'http://localhost:4000'

function App () {
  // On créé un état pour stocker et afficher les réponses en provenance de notre API
  const [response, setResponse] = useState('')

  // Initialisation du client socket au montage du composant
  useEffect(() => {
    // Socket client
    const socket = socketClient(SOCKET_ENDPOINT)

    // Ecoute des évènements sur le socket
    socket.on('connected', () => {
      console.log('Connected to server')
    })
  }, [])

  return (
    <Chat />
  )
}

export default App
