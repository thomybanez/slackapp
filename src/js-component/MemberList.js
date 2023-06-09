import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import HandleChange from '../utilities/HandleChange';

function MemberList(props) {
  const { popup, showPopup, receiverId, receiverClass, loggedToken, loggedClient, loggedExpiry, loggedUID } = props;
  const [members, setMembers] = useState([]);

  // add members to channel
  const [addMembers, setAddMembers] = useState({ member_id: '' });
  const { member_id } = addMembers;
  const add = useCallback(async () => {
    const request = {
      id: receiverId,
      member_id: member_id
    };
    const fetchlist = await fetch("http://206.189.91.54/api/v1/channel/add_member", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${loggedToken}`,
        'client': `${loggedClient}`,
        'expiry': `${loggedExpiry}`,
        'uid': `${loggedUID}`
      },
      body: JSON.stringify(request)
    });
    const fetchlistData = await fetchlist.json();
    if (fetchlistData.errors) {
      alert(fetchlistData.errors);
    }
  }, [receiverId, member_id, loggedToken, loggedClient, loggedExpiry, loggedUID]);

  // retrieving channel member list
  const memberslist = useCallback(async () => {
    const fetchlist = await fetch(`http://206.189.91.54/api/v1/channels/${receiverId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${loggedToken}`,
        'client': `${loggedClient}`,
        'expiry': `${loggedExpiry}`,
        'uid': `${loggedUID}`
      }
    });
    const fetchlistData = await fetchlist.json();
    setMembers(fetchlistData.data.channel_members);
  }, [receiverId, loggedToken, loggedClient, loggedExpiry, loggedUID]);

  useEffect(() => {
    memberslist();
  }, [memberslist]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    showPopup();
    add();
    setAddMembers({ member_id: "" });
    return;
  };

  const Members = () => {
    return (
      <>
        {
          members && members.map((obj) => (
            <div className="cdm_buttons" key={obj.id}>
              <p>{obj.user_id}</p>
            </div>
          ))
        }
      </>
    );
  };

  return (
    <>
      <div className={receiverClass === 'Channel' ? 'sidebar_right' : 'sidebar_right hidden'}>
        <div className='sidebar_content'>
          <div className='sidebar_headers'>
            <h3 className="sidebar-text">Member List</h3>
            <button onClick={showPopup} className='plus_buttons'>+</button>
          </div>
          <Members />
        </div>
      </div>
      <div className={popup ? 'form_popup active' : 'form_popup'}>
        <div className='form_content'>
          <form className="form" onSubmit={SubmitHandler}>
            <AiOutlineClose className='close_btn' onClick={showPopup} />
            <h3>Add Member</h3>
            <label>Member ID:</label>
            <input maxLength="10" type="text" name="member_id" value={member_id} onChange={(e) => HandleChange(e, setAddMembers)} />
            <input className="submit" type="submit" value="Add" />
          </form>
        </div>
      </div>
    </>
  );
}

export default MemberList;