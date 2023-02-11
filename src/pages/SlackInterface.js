import MemberList from "../js-component/MemberList";
import MessageBar from "../js-component/MessageBar";
import MessageLog from "../js-component/MessageLog";
import Sidebar from "../js-component/Sidebar";
import CreateChannel from "../js-component/CreateChannel";
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
            <CreateChannel popup={popup} showPopup={showPopup}/>
        </>

    )
}

export default SlackInterface;