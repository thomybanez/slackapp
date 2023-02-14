import HandleChange from '../utilities/HandleChange'
import { AiOutlineClose } from 'react-icons/ai'
import './components.css'
import { useState } from 'react'

const CreateChannel = (props) => {
  const { popup, showPopup } = props
  const [channelData, setChannelData] = useState({
      name: "",
      user_ids: []
    })
  const { name, user_ids } = channelData
  const postChannel = async () => {
    const channelcheck = {
      name: name,
      user_ids: user_ids
    }
    const fetchlist = await fetch("http://206.189.91.54/api/v1/channels", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'CkOw4Cb-NOu3h-I_iZJQJA',
        'client': 'qDQ6n3OMkViOKAGxzq5lvQ',
        'expiry': '1677226169',
        'uid': 'batch2625@example.com'
      },
      body: JSON.stringify(channelcheck)
    })
    const fetchlistData = await fetchlist.json()
    if(fetchlistData.errors) {
      alert('channel name already exists')
    } else {
      console.log('ayan bago yan lesgo')
    }
  }
  const SubmitHandler = (e) => {
    e.preventDefault()
    postChannel()
    return
}

    return (
      <div className={popup? 'channel_form_popup active': 'channel_form_popup'}>
        <div className='channel_form_content'>
          <form id="form" onSubmit={SubmitHandler}>
            <AiOutlineClose className='close_btn' onClick={showPopup} />
            <h3>Create Channel</h3>
            <label>Channel Name:</label>
            <input maxLength="15" type="text" name="name" value={name} onChange={(e) => HandleChange(e, setChannelData)} />
            <input id="submit" type="submit" />
          </form>
        </div>
      </div>
    )
  }

  export default CreateChannel