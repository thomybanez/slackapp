import { useEffect, useState } from 'react'
import './components.css'

function Sidebar(props) {
  const { showPopup } = props
  // retrieve channel list on sidebar
  const [channelList, setChannelList] = useState([])
  const userChannelList = async () => {
    const response = await fetch('http://206.189.91.54/api/v1/channels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'CkOw4Cb-NOu3h-I_iZJQJA',
        'client': 'qDQ6n3OMkViOKAGxzq5lvQ',
        'expiry': '1677226169',
        'uid': 'batch2625@example.com'
      }
    })
    const channels = await response.json()
    setChannelList(channels.data)
  }
  useEffect(()=> {
    userChannelList()
  }, [])
  const channel = channelList.map((obj)=>
    <>
      <div key={obj.id}>
        <button className='cdm_buttons'>{obj.name}</button>
      </div>
    </>)
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
              {channel}
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