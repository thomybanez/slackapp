import './components.css'

function Sidebar(props) {
  const { showPopup } = props
  return (
    <>
          <div className='sidebar'>
            <div className='sidebar_content'>
              <div className='sidebar_title'>
                <h3>Slack App</h3>
              </div>
              <h5 className=''>Home Page</h5>
              <div className='sidebar_headers'>
                <h3>Channels</h3>
                <button onClick={showPopup}>+</button>
              </div>
              <div>
                <h5>#Channel 1</h5>
                <h5>#Channel 2</h5>
              </div>
              <div className='sidebar_headers'>
                <h3>Direct Messages</h3>
                <button onClick={showPopup}>+</button>
              </div>
              <div>
                <h5>DM 1</h5>
                <h5>DM 2</h5>
              </div>
            </div>
          </div>
    </>
  )
}

export default Sidebar