import MessageItem from './MessageItem'

const fixture = ['toto', 'tata', 'test', 'super']

function MessageList () {
  return (
    <div>
      {fixture.map(message => {
        return <MessageItem key={message} message={message} />
      })}
    </div>
  )
}

export default MessageList
