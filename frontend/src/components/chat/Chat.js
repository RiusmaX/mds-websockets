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
      // else {
      //   handleChannelSelect(channels[0].id)
      // }
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

    socket.on('message', message => {
      const _channels = channels
      if (_channels && _channels.length > 0) {
        _channels.forEach(c => {
          if (c.id === message.channelId) {
            if (!c.messages) {
              c.messages = [message]
            } else {
              c.messages.push(message)
            }
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

  const handleSendMessage = (channelId, text) => {
    socket.emit('send-message', {
      channelId,
      text,
      senderName: socket.id,
      id: Date.now()
    })
  }

  return (
    <div className='chat-app'>
      <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
      <MessagesPanel onSendMessage={handleSendMessage} channel={channel} />
    </div>
  )
}

export default Chat
