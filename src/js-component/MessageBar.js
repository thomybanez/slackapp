import React, {useState } from 'react'
import HandleChange from '../utilities/HandleChange'
import { IoSendSharp } from 'react-icons/io5'
import './components.css'

const MessageBar = () =>  {
  const [messagelog, setMessagelog] = useState({
    receiver_id: "1024",
    receiver_class: "User",
    body: "",
    message_id: ""
  })
  const { receiver_id, receiver_class, body } = messagelog

  // send message API
  const send = async () => {
    const sendBody = {
      receiver_id: receiver_id,
      receiver_class: receiver_class,
      body: body
    }

    const response = await fetch('http://206.189.91.54/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'CkOw4Cb-NOu3h-I_iZJQJA',
        'client': 'qDQ6n3OMkViOKAGxzq5lvQ',
        'expiry': '1677226169',
        'uid': 'batch2625@example.com'
      },
      body: JSON.stringify(sendBody)
    })

    const sendData = await response.json()
    console.log(sendData)
  }

  // receive messages API
  const receive = async () => {
    const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${receiver_id}&receiver_class=${receiver_class}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'CkOw4Cb-NOu3h-I_iZJQJA',
        'client': 'qDQ6n3OMkViOKAGxzq5lvQ',
        'expiry': '1677226169',
        'uid': 'batch2625@example.com'
      }
    })
    const receiveData = await response.json()
    console.log(receiveData)
  }
  receive()
  return (
    <>
      <div className='message_bar'>
        <div>
          
        </div>
        <div className='message_field'>
          <input 
            className='input_field'
            name="body"
            type="text"
            placeholder='Send a message...'
            value={body}
            onChange={(e)=> HandleChange(e, setMessagelog)}
            />
          <IoSendSharp onClick={send} />
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default MessageBar