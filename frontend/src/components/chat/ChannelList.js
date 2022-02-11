import Channel from './Channel'

function ChannelList ({ channels, onSelectChannel }) {
  let list = 'There is no channels to show'

  const handleClick = (id) => {
    onSelectChannel(id)
  }

  if (channels && channels.length > 0) {
    list = channels.map(c => {
      return (
        <Channel
          key={c.id}
          id={c.id}
          name={c.name}
          participants={c.participants}
          onClick={handleClick}
        />
      )
    })
  }
  return (
    <div className='channel-list'>
      {list}
    </div>
  )
}

export default ChannelList
