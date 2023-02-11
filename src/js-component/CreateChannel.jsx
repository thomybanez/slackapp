import SubmitHandler from '../utilities/SubmitHandler'
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

    return (
      <div className={popup? 'channel_form_popup active': 'channel_form_popup'}>
        <div className='channel_form_content'>
          <form id="form" onSubmit={SubmitHandler}>
            <AiOutlineClose className='close_btn' onClick={showPopup} />
            <h3>Create Channel</h3>
            <label>Channel Name:</label>
            <input type="text" name="name" value={name} onChange={(e) => HandleChange(e, setChannelData)} />
            <input id="submit" type="submit" />
          </form>
        </div>
      </div>
    )
  }

  export default CreateChannel