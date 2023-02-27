import HandleChange from '../utilities/HandleChange'
import { AiOutlineClose } from 'react-icons/ai'
import './components.css'
import { useState } from 'react'

const CreateChannel = (props) => {
  const { channelcreated, popup, showPopup, loggedToken, loggedClient, loggedExpiry, loggedUID } = props
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
        'access-token': `${loggedToken}`,
        'client': `${loggedClient}`,
        'expiry': `${loggedExpiry}`,
        'uid': `${loggedUID}`
      },
      body: JSON.stringify(channelcheck)
    })
    const fetchlistData = await fetchlist.json()
    if(fetchlistData.errors) {
      alert(fetchlistData.errors)
    }
  }
  const SubmitHandler = (e) => {
    e.preventDefault()
    postChannel()
    channelcreated()
    setChannelData({
      name: ""
    })
    return
  }

    return (
      <>
        <div className={popup? 'form_popup active': 'form_popup'}>
          <div className='form_content'>
            <form className="form" onSubmit={SubmitHandler}>
              <AiOutlineClose className='close_btn' onClick={showPopup} />
              <h3>Create Channel</h3>
              <label>Channel Name:</label>
              <input maxLength="15" type="text" name="name" value={name} onChange={(e) => HandleChange(e, setChannelData)} />
              <input className='submit' type="submit" value="Create" />
            </form>
          </div>
        </div>
      </>
    )
  }

  export default CreateChannel