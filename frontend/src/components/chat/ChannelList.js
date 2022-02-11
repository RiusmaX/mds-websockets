import Channel from './Channel'

function ChannelList ({ channels }) {
  let list = 'There is no channels to show'
  if (channels) {
    list = channels.map(c => {
      return (
        <Channel
          key={c.id}
          id={c.id}
          name={c.name}
          participants={c.participants}
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
