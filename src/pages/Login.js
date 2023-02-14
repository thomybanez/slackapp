import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Kent
        </a> */}

        <div>
          <div className="container">
            <h1 className="label">Slack App Log in</h1>
            <form className="login_form" action="#" target='_blank' method="post" name="form" onsubmit="return validated()">
              <div className="font">Email or Phone</div>
                <input autoComplete="off" type="text" name="email" />

              <div id="email_error">Please fill up your Email or Phone</div>
              <div className="font font2">Password</div>
              <input type="password" name="password" />

              <div id="pass_error">Please fill up your Password</div>

              <button className="login" type="submit">Login</button>
              <div className="or">or</div>
              <button className="create">Create an Account</button>
            </form>
          </div>	
        </div>
      </header>
    </div>
  );
}

export default App;
