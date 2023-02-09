import MemberList from "../js-component/MemberList";
import MessageBar from "../js-component/MessageBar";
import MessageLog from "../js-component/MessageLog";
import Sidebar from "../js-component/Sidebar";
import './interface.css'

const SlackInterface = () => {
    return(
        <div className="slack_interface">
            <Sidebar />
            <div className="message_interface">
                <MessageLog />
                <MessageBar />
            </div>
            <MemberList />
        </div>
    )
}

export default SlackInterface;