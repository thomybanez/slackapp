import MemberList from "../js-component/MemberList";
import Sidebar from "../js-component/Sidebar";
import CreateChannel from "../js-component/CreateChannel";
import './interface.css'
import { useState } from "react";
import MessageLayout from "../js-component/MessageLayout";

const SlackInterface = ({loggedToken, loggedClient, loggedExpiry, loggedUID}) => {
    const [popup, setPopup] = useState(false)
    const showPopup = () => {
      setPopup(!popup)
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
                    showPopup={showPopup}
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
                    loggedToken={loggedToken}
                    loggedClient={loggedClient}
                    loggedExpiry={loggedExpiry}
                    loggedUID={loggedUID} />
            </div>
            <CreateChannel
                channelcreated={channelcreated}
                popup={popup}
                showPopup={showPopup}
                loggedToken={loggedToken}
                loggedClient={loggedClient}
                loggedExpiry={loggedExpiry}
                loggedUID={loggedUID} />
        </>

    )
}

export default SlackInterface;