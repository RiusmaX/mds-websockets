import { useEffect, useState } from 'react'
import './App.css';
import socketClient from 'socket.io-client'
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
// Socket ENDPOINT (notre API)
const SOCKET_ENDPOINT = 'http://localhost:4000'

function App() {
  // On créé un état pour stocker et afficher les réponses en provenance de notre API
  const [response, setResponse] = useState('')

  // Initialisation du client socket au montage du composant
  useEffect(() => {
    // Socket client
    const socket = socketClient(SOCKET_ENDPOINT)

    // Ecoute des évènements sur le socket
    socket.on('toto', (data) => {
      setResponse(new Date(data).toLocaleString())
    })

    const interval = setInterval(() => {
      socket.emit('tata', 'COUCOU')
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <p>Réponse socket : {response}</p>
      <MessageList />
      <MessageInput />
    </div>
  );
}

export default App;
