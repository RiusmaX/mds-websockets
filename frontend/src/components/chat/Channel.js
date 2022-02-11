function Channel ({ name, participants }) {
  return (
    <div className='channel-item'>
      <div>{name}</div>
      <span>{participants}</span>
    </div>
  )
}

export default Channel
