import MemberList from "../js-component/MemberList";
import Sidebar from "../js-component/Sidebar";
import CreateChannel from "../js-component/CreateChannel";
import './interface.css'
import { useState } from "react";
import MessageLayout from "../js-component/MessageLayout";
import AddMessage from "../js-component/AddMessage";

const SlackInterface = ({loggedToken, loggedClient, loggedExpiry, loggedUID}) => {
    const [popupAddChannel, setPopupAddChannel] = useState(false)
    const showPopupAddChannel = () => {
      setPopupAddChannel(!popupAddChannel)
    }
    const [popupAddMessage, setPopupAddMessage] = useState(false)
    const showPopupAddMessage = () => {
        setPopupAddMessage(!popupAddMessage)
    }
    const [popupAddMembers, setPopupAddMembers] = useState(false)
    const showPopupAddMembers = () => {
        setPopupAddMembers(!popupAddMembers)
    }
    
    const [receiverId, setReceiverId] = useState('')
    const [receiverClass, setReceiverClass] = useState('')
    const [receiverName, setReceiverName] = useState('')
    const retrieveChannelData = (id, name) => {
        setReceiverId(id)
        setReceiverName(name)
        setReceiverClass('Channel')
    }
    const channelcreated = () => {
        console.log('new channel created')
    }

    // send message to user
    const retrieveUserMessageData = (id, name) => {
        setReceiverId(id)
        setReceiverName(name)
        setReceiverClass('User')
    }
    const [userList, setUserList] = useState([])
    const userMessagecreated = () => {
        console.log('added user to message')
    }
  
    return(
        <>
            <div className="slack_interface">
                <Sidebar
                    showPopupChannel={showPopupAddChannel}
                    showPopupMessage={showPopupAddMessage}
                    retrieveChannelData={retrieveChannelData}
                    channelcreated={channelcreated}
                    userMessagecreated={userMessagecreated}
                    receiverId={receiverId}
                    receiverName={receiverName}
                    userList={userList}
                    retrieveUserMessageData={retrieveUserMessageData}
                    loggedToken={loggedToken}
                    loggedClient={loggedClient}
                    loggedExpiry={loggedExpiry}
                    loggedUID={loggedUID} />
                <MessageLayout
                    receiverClass={receiverClass}
                    receiverId={receiverId}
                    receiverName={receiverName}
                    loggedToken={loggedToken}
                    loggedClient={loggedClient}
                    loggedExpiry={loggedExpiry}
                    loggedUID={loggedUID} />
                <MemberList
                    popup={popupAddMembers}
                    showPopup={showPopupAddMembers}
                    receiverId={receiverId}
                    receiverClass={receiverClass}
                    loggedToken={loggedToken}
                    loggedClient={loggedClient}
                    loggedExpiry={loggedExpiry}
                    loggedUID={loggedUID} />                
            </div>
            <CreateChannel
                popup={popupAddChannel}
                showPopup={showPopupAddChannel}
                retrieveChannelData={retrieveChannelData}
                channelcreated={channelcreated}
                loggedToken={loggedToken}
                loggedClient={loggedClient}
                loggedExpiry={loggedExpiry}
                loggedUID={loggedUID} />
            <AddMessage
                popup={popupAddMessage}
                showPopup={showPopupAddMessage}
                userMessagecreated={userMessagecreated}
                retrieveUserMessageData={retrieveUserMessageData}
                setUserList={setUserList} />
        </>

    )
}

export default SlackInterface;