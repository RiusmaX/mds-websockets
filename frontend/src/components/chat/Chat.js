import { useState } from 'react'
import ChannelList from './ChannelList'
import './chat.scss'

function Chat () {
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'first',
      participants: 10
    }
  ])

  return (
    <div className='chat-app'>
      <ChannelList channels={channels} />
    </div>
  )
}

export default Chat
