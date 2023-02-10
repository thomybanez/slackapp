import MemberList from "../js-component/MemberList";
import MessageBar from "../js-component/MessageBar";
import MessageLog from "../js-component/MessageLog";
import Sidebar from "../js-component/Sidebar";
import AddChannelPopup from "../js-component/AddChannelPopup";
import './interface.css'
import { useState } from "react";

const SlackInterface = () => {
    const [popup, setPopup] = useState(false)
    const showPopup = () => {
      setPopup(!popup)
    }
  
    return(
        <>
            <div className="slack_interface">
                <Sidebar showPopup={showPopup} />
                <div className="message_interface">
                    <MessageLog />
                    <MessageBar />
                </div>
                <MemberList />
            </div>
            <AddChannelPopup popup={popup} showPopup={showPopup}/>
        </>

    )
}

export default SlackInterface;