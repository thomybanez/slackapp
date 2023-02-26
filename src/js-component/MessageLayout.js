import React, { useEffect, useState } from 'react'
import HandleChange from '../utilities/HandleChange'
import { IoSendSharp } from 'react-icons/io5'
import { FaUserAlt } from 'react-icons/fa'
import './components.css'

function MessageLog(props) {
  const { send, receiverClass, receiverId, loggedToken, loggedClient, loggedExpiry, loggedUID } = props
  const [messages, setMessages] = useState([])


  // retrieving messages API (both channel and direct messages)
  const messagelist = async () => {
    const fetchlist = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${loggedToken}`,
        'client': `${loggedClient}`,
        'expiry': `${loggedExpiry}`,
        'uid': `${loggedUID}`
      }
    })
    const fetchlistData = await fetchlist.json()
    setMessages(fetchlistData.data)
  }

  const refresh = () => {
    setInterval(messagelist, 5000)
  }

  useEffect(()=> {
    messagelist()
  }, [receiverId, refresh, send])



  const Messages = () => {
    return(
      <>
        {
          messages && messages.length ? messages.map((obj)=> 
          (
          <div key={obj.id}>
            <div className='message_name'>`{obj.sender.uid} ({obj.sender.id})`</div>
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
  const { receiverClass, receiverId, receiverName, loggedToken, loggedClient, loggedExpiry, loggedUID } = props
  const [messagelog, setMessagelog] = useState({
    body: "",
  })
  const { body } = messagelog

  /*send message API (both channels and direct messages)*/
  const send = async () => {
    const sendBody = {
      receiver_id: receiverId,
      receiver_class: receiverClass,
      body: body
    }

    await fetch('http://206.189.91.54/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${loggedToken}`,
        'client': `${loggedClient}`,
        'expiry': `${loggedExpiry}`,
        'uid': `${loggedUID}`

      },
      body: JSON.stringify(sendBody)
    })
    setMessagelog({
      body: ''
    })
  }
  const SubmitHandler = (e) => {
    e.preventDefault()
    send()
    return
  }
  const Header = () => {
    if(receiverClass === 'Channel') {
      return (
        <>
          <h2 className='message_title'>{receiverName}</h2>
        </>
      )
    } else if(receiverClass === 'User') {
      return (
        <>
          <h2 className='message_title'>{receiverId}</h2>
        </>
      )
    }
  }

  return (
    <div className={receiverId? 'message_interface' : 'message_interface hidden'}>
      <Header />
      <MessageLog
        receiverClass={receiverClass}
        receiverId={receiverId}
        loggedToken={loggedToken}
        loggedClient={loggedClient}
        loggedExpiry={loggedExpiry}
        loggedUID={loggedUID}
        send={send} />
      <div className='message_bar'>
        <form autoComplete='off' onSubmit={SubmitHandler} className='message_field'>
          <input 
            className='input_field'
            name="body"
            type="text"
            placeholder='Send a message...'
            value={body}
            onChange={(e)=> HandleChange(e, setMessagelog)}
            />
          <IoSendSharp onClick={send} />
        </form>
      </div>
    </div>
  )
}

export default MessageLayout
