import React, { useEffect, useState } from 'react'
import HandleChange from '../utilities/HandleChange'
import { IoSendSharp } from 'react-icons/io5'
import './components.css'

function MessageBar() {
  const [sendMessage, setSendMessage] = useState({
    receiver_id: "1024",
    receiver_class: "User",
    body: ""
  })
  const { receiver_id, receiver_class, body } = sendMessage
  const [messagelog, setMessagelog] = useState(JSON.parse(localStorage.getItem('users')) || [])
  useEffect(()=> {
    localStorage.setItem('messagelog', JSON.stringify(messagelog))
  }, [messagelog])

  const send = async () => {
    const requestBody = {
      receiver_id: receiver_id,
      receiver_class: receiver_class,
      body: body
    }
    console.log(requestBody)

    const response = await fetch('http://206.189.91.54/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'CkOw4Cb-NOu3h-I_iZJQJA',
        'client': 'qDQ6n3OMkViOKAGxzq5lvQ',
        'expiry': '1677226169',
        'uid': 'batch2625@example.com'
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()
    setMessagelog([...messagelog, data])
  }

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
            value={sendMessage.body}
            onChange={(e)=> HandleChange(e, setSendMessage)}
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