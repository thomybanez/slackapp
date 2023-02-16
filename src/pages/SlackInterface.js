import MemberList from "../js-component/MemberList";
import Sidebar from "../js-component/Sidebar";
import CreateChannel from "../js-component/CreateChannel";
import './interface.css'
import { useState } from "react";
import MessageLayout from "../js-component/MessageLayout";

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
    const retrieveChannelData = (id) => {
        setReceiverId(id)
        setReceiverClass('Channel')
      }
    const channelcreated = () => {
        console.log('new channel created')
    }
  
    return(
        <>
            <div className="slack_interface">
                <Sidebar
                    showPopupChannel={showPopupAddChannel}
                    showPopupMessage={showPopupAddMessage}
                    retrieveChannelData={retrieveChannelData}
                    loggedToken={loggedToken}
                    loggedClient={loggedClient}
                    loggedExpiry={loggedExpiry}
                    loggedUID={loggedUID}
                    channelcreated={channelcreated} />
                <MessageLayout
                    receiverClass={receiverClass}
                    receiverId={receiverId}
                    loggedToken={loggedToken}
                    loggedClient={loggedClient}
                    loggedExpiry={loggedExpiry}
                    loggedUID={loggedUID} />
                <MemberList
                    popup={popupAddMembers}
                    showPopup={showPopupAddMembers}
                    receiverId={receiverId}
                    loggedToken={loggedToken}
                    loggedClient={loggedClient}
                    loggedExpiry={loggedExpiry}
                    loggedUID={loggedUID} />
            </div>
            <CreateChannel
                retrieveChannelData={retrieveChannelData}
                channelcreated={channelcreated}
                popup={popupAddChannel}
                showPopup={showPopupAddChannel}
                loggedToken={loggedToken}
                loggedClient={loggedClient}
                loggedExpiry={loggedExpiry}
                loggedUID={loggedUID} />
        </>

    )
}

export default SlackInterface;