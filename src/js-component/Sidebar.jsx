import { useEffect, useState } from 'react'
import './components.css'

function Sidebar(props) {
  const { channelcreated, showPopup, retrieveChannelData, loggedToken, loggedClient, loggedExpiry, loggedUID } = props

  // retrieve channel list on sidebar
  const [channelList, setChannelList] = useState([])
  const userChannelList = async () => {
    const response = await fetch('http://206.189.91.54/api/v1/channels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${loggedToken}`,
        'client': `${loggedClient}`,
        'expiry': `${loggedExpiry}`,
        'uid': `${loggedUID}`

      }
    })
    const channels = await response.json()
    setChannelList(channels.data)
  }
  useEffect(()=> {
    userChannelList()
  }, [loggedToken, channelcreated])
  const Channel = () => {
    return(
      <>
        {
          channelList.length ? channelList.map((obj)=> 
          (
          <div key={obj.id}>
            <button onClick={()=> retrieveChannelData(obj.id)} className='cdm_buttons'>{obj.name}</button>
          </div>
          ))
          : <div>No Channels yet</div>
        }
      </>
    )
  }

  // retrieve DM list on sidebar


  return (
    <> 
          <div className='sidebar'>
            <div className='sidebar_content'>
              <div className='sidebar_title'>
                <h3>Slack App</h3>
              </div>
              <h5 className=''>Home Page</h5>
              <div className='sidebar_headers'>
                <h3>Channels</h3>
                <button className='plus_buttons' onClick={showPopup}>+</button>
              </div>
              <Channel />
              <div className='sidebar_headers'>
                <h3>Direct Messages</h3>
                <button className='plus_buttons' onClick={showPopup}>+</button>
              </div>
              <div>
                <h5>DM 1</h5>
                <h5>DM 2</h5>
              </div>
            </div>
          </div>
    </>
  )
}

export default Sidebar