import React, { useEffect, useState } from 'react'
import HandleChange from '../utilities/HandleChange'
import { IoSendSharp } from 'react-icons/io5'
import { FaUserAlt } from 'react-icons/fa'
import './components.css'

function MessageLog(props) {
  const { receiverClass, receiverId } = props
  const [messages, setMessages] = useState([])

  // retrieving messages API (both channel and direct messages)
  const messagelist = async () => {
    const fetchlist = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'CkOw4Cb-NOu3h-I_iZJQJA',
        'client': 'qDQ6n3OMkViOKAGxzq5lvQ',
        'expiry': '1677226169',
        'uid': 'batch2625@example.com'
      }
    })
    const fetchlistData = await fetchlist.json()
    setMessages(fetchlistData.data)
  }
  useEffect(()=> {
    messagelist()
  }, [receiverId])
  const Messages = () => {
    return(
      <>
        {
          messages && messages.length ? messages.map((obj)=> 
          (
          <div key={obj.id}>
            <div className='message_name'>Sender: {obj.sender.id}</div>
            <div>{obj.body}</div>
          </div>
          ))
          : <div>No conversations yet</div>
        }
      </>
    )
  }

  return (
    <>
      <div className='message_log'>
        <FaUserAlt className='user_icon'/>
        <div className='message_content'>
            <Messages />
        </div>
      </div> 
    </>
  )
}

const MessageLayout = (props) =>  {
  const { receiverClass, receiverId } = props
  const [messagelog, setMessagelog] = useState({
    body: "",
  })
  const { body } = messagelog

  // send message API (both channels and direct messages)
  const send = async () => {
    const sendBody = {
      receiver_id: receiverId,
      receiver_class: receiverClass,
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

  return (
    <div className='message_interface'>
      <MessageLog
        receiverClass={receiverClass}
        receiverId={receiverId} />
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
    </div>
  )
}

export default MessageLayout