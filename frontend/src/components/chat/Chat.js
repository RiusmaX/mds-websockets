import { useEffect, useState } from 'react'
import socketClient from 'socket.io-client'
import { loadChannels } from '../../services/Api'
import ChannelList from './ChannelList'
import './chat.scss'
import MessagesPanel from './MessagesPanel'

// Socket ENDPOINT (notre API)
const SOCKET_ENDPOINT = 'http://localhost:4000'

function Chat () {
  const [channels, setChannels] = useState([])
  // Socket client
  const socket = socketClient(SOCKET_ENDPOINT)

  useEffect(() => {
    const getData = async () => {
      const _channels = await loadChannels()
      setChannels(_channels)
    }
    getData()

    // Ecoute des évènements sur le socket
    socket.on('connected', () => {
      console.log('Connected to server')
    })
  }, [])

  const handleChannelSelect = (id) => {
    socket.emit('channel-join', id, ack => {
      console.log(ack)
    })
  }

  return (
    <div className='chat-app'>
      <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
      <MessagesPanel />
    </div>
  )
}

export default Chat
