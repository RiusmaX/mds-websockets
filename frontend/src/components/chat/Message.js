function Message ({ senderName, text }) {
  return (
    <div className='message-item'>
      <div>
        <b>{senderName}</b>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default Message
