import { useEffect, useState } from 'react';
import Logo from '../img/SlackApp Logo.png';
import './components.css';

function Sidebar(props) {
  const { channelcreated, showPopupChannel, showPopupMessage, retrieveChannelData, userList, retrieveUserMessageData, loggedToken, loggedClient, loggedExpiry, loggedUID } = props;

  // retrieve channel list on sidebar
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    const userChannelList = async () => {
      const response = await fetch('http://206.189.91.54/api/v1/channels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': `${loggedToken}`,
          'client': `${loggedClient}`,
          'expiry': `${loggedExpiry}`,
          'uid': `${loggedUID}`
        }
      });

      const channels = await response.json();
      setChannelList(channels.data);
    };

    userChannelList();
  }, [loggedToken, loggedClient, loggedExpiry, loggedUID, channelcreated]);

  const Channel = () => {
    return (
      <>
        {
          channelList && channelList.length ? channelList.map((obj) =>
            (
              <div className="cdm_buttons_bg" key={obj.id}>
                <button onClick={() => retrieveChannelData(obj.id, obj.name)} className='cdm_buttons'>{obj.name}</button>
              </div>
            ))
            : <div>No Channels yet</div>
        }
      </>
    );
  };

  // retrieve DM list on sidebar
  const User = () => {
    return (
      <>
        {
          userList && userList.length ? userList.map((obj) =>
            (
              <div className="cdm_buttons" key={obj.index}>
                <button onClick={() => retrieveUserMessageData(obj.id)} className='cdm_buttons'>{obj.name}</button>
              </div>
            ))
            : <div className="cdm_buttons">No Messages yet</div>
        }
      </>
    );
  };

  console.log(userList);

  return (
    <>
      <div className='sidebar'>
        <div className='sidebar_content'>
          <div className='sidebar_title'>
            <img className="logo-sidebar" src={Logo} alt="" />
          </div>
          <h5>Home Page</h5>
          <div className='sidebar_headers'>
            <h3 className="sidebar-text">Channels</h3>
            <button className='plus_buttons' onClick={showPopupChannel}>+</button>
          </div>
          <div className="channel_content">
            <Channel />
          </div>
          <div className='sidebar_headers'>
            <h3 className="sidebar-text">Direct Messages</h3>
            <button className='plus_buttons' onClick={showPopupMessage}>+</button>
          </div>
          <div className="user_content">
            <User />
          </div>
          <button className="logout" onClick={() => window.location.href = "/"}>Logout</button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;