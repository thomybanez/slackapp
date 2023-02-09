import React from 'react'
import { IoSendSharp } from 'react-icons/io5'
import './components.css'

function MessageBar() {
  return (
    <>
      <div className='message_bar'>
        <div>
          
        </div>
        <div className='message_field'>
          <input className='input_field' type="text" placeholder='Send a message...'/>
          <IoSendSharp />
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default MessageBar