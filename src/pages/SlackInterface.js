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
    
    return(
        <>
            <div className="slack_interface">
                <Sidebar showPopup={showPopup} />
                <MessageLayout />
                <MemberList />
            </div>
            <CreateChannel popup={popup} showPopup={showPopup}/>
        </>

    )
}

export default SlackInterface;