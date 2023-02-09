import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

function MessageLog() {
  return (
    <>
      <div className='message_log'>
        <FaUserAlt className='user_icon'/>
        <div className='message_content'>
          <div className='message_name_and_time'>
            <span className='message_name'>Kumareng Maluho</span>
            <span className='message_time'>11:59 pm</span>
          </div>
          <p>mars?</p>
          <p>pautang naman...</p>
          <p>damot mo naman...</p>
        </div>
      </div> 
    </>
  )
}

export default MessageLog