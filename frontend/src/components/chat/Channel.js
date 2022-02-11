function Channel ({ name, participants, id, onClick }) {
  const handleClick = () => {
    onClick(id)
  }

  return (
    <div className='channel-item' onClick={handleClick}>
      <div>{name}</div>
      <span>{participants}</span>
    </div>
  )
}

export default Channel
