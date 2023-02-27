import HandleChange from '../utilities/HandleChange'
import { AiOutlineClose } from 'react-icons/ai'
import './components.css'
import { useState } from 'react'

const AddMessage = (props) => {
    const { popup, showPopup, userMessagecreated, setUserList } = props

    // add users to message list
    const [userMessageData, setUserMessageData] = useState({
        id: "",
        name: ""
    })
    const { id, name } = userMessageData
    const add = () => {
        setUserList(prev=>([...prev, {
            id: id,
            name: name
        }]))
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(id && name) {
            userMessagecreated()
            add()
            setUserMessageData({
                id: "",
                name: ""
            })
        } else {
            alert('Please input complete details')
        }
        return
    }

    return(
        <>
            <div className={popup? "form_popup active" : "form_popup"}>
                <div className="form_content">
                    <form className="form" onSubmit={submitHandler}>
                        <AiOutlineClose className='close_btn' onClick={showPopup}/>
                        <h3>Message User</h3>
                        <label>User ID:</label>
                        <input type="text" name="id" value={id} placeholder="User ID" onChange={(e) => HandleChange(e, setUserMessageData)} />
                        <label>Name:</label>
                        <input type="text" name="name" value={name} placeholder="Any Name" onChange={(e) => HandleChange(e, setUserMessageData)} />
                        <input className='submit' type="submit" value="Create"  />
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddMessage