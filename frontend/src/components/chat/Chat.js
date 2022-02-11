import { useEffect, useState } from 'react'
import socketClient from 'socket.io-client'
import { loadChannels } from '../../services/Api'
import ChannelList from './ChannelList'
import './chat.scss'
import MessagesPanel from './MessagesPanel'
// Socket ENDPOINT (notre API)
const SOCKET_ENDPOINT = 'http://localhost:4000'
const socket = socketClient(SOCKET_ENDPOINT)

function Chat () {
  const [channels, setChannels] = useState()
  const [channel, setChannel] = useState()
  // Socket client

  useEffect(() => {
    const getData = async () => {
      const _channels = await loadChannels()
      setChannels(_channels)
    }
    getData()
    configureSocket()
  }, [channel])

  const configureSocket = () => {
    // Ecoute des évènements sur le socket
    socket.on('connected', () => {
      console.log('Connected to server')
      if (channel) {
        handleChannelSelect(channel.id)
      }
    })

    socket.on('channel', channel => {
      const _channels = channels
      if (_channels && _channels.length > 0) {
        _channels.forEach(c => {
          if (c.id === channel.id) {
            c.participants = channel.participants
          }
        })
        setChannels(_channels)
      }
    })
  }

  const handleChannelSelect = (id) => {
    const channel = channels.find(c => c.id === id)
    setChannel(channel)
    socket.emit('channel-join', id)
  }

  return (
    <div className='chat-app'>
      <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
      <MessagesPanel />
    </div>
  )
}

export default Chat
