import Message from './Message'

function MessagesPanel ({ channel }) {
  let list = (
    <div className='no-content-message'>
      There is no messages to show
    </div>
  )
  if (channel && channel.messages) {
    list = channel.messages.map(m => {
      return (
        <Message
          key={m.id}
          id={m.id}
          senderName={m.senderName}
          text={m.text}
        />
      )
    })
  }
  return (
    <div className='messages-panel'>
      <div className='messages-list'>{list}</div>
      <div className='messages-input'>
        <input type='text' />
        <button>Send</button>
      </div>
    </div>
  )
}

export default MessagesPanel
