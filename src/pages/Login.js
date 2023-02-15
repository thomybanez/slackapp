import '../js-component/css/login.css';
import React, { useState } from 'react';
import SlackInterface from "./SlackInterface"

function Login() {
const [loginEmail, setloginEmail] = useState("")
const [loginEmailWarning, setLoginEmailWarning] = useState("")
const [loginPassword, setLoginPassword] = useState("")
const [loginPasswordWarning, setLoginPasswordWarning] = useState("")
const [loginSuccess, setLoginSuccess] = useState(false)
const [loginAccessToken, setLoginAccessToken] = useState("")
const [loginUID, setLoginUID] = useState("")
const [loginExpiry, setLoginExpiry] = useState("")
const [loginClient, setLoginClient] = useState("")

const loginUser = async (loginEmail, loginPassword) =>{
      const requestBody = {
        email:loginEmail,
        password:loginPassword
      }

        try{

          const response = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
              method : "POST",
              headers : {"Content-Type": "application/json"},
              body : JSON.stringify(requestBody)
          })      
          const rawData = await response.json(); 
          const rawHeader = response.headers;
          const accessToken = rawHeader.get('Access-Token')
          const expiry = rawHeader.get('Expiry')
          const client = rawHeader.get('Client')
          const uid = rawHeader.get('UID')

          if (rawData.success === false){
              setLoginEmailWarning(rawData.errors[0])
              setLoginPasswordWarning(rawData.errors[0])      
          }

          if(rawData.data.email){
              setLoginSuccess(true)
          }

          if(rawHeader){
            console.log(rawHeader)
            console.log(accessToken + expiry + client + uid)
            setLoginAccessToken(accessToken)
            setLoginClient(client)
            setLoginExpiry(expiry)
            setLoginUID(uid)
          }

      }
      catch(error){
          console.error(error)   
      } 
}

const onHandleSubmit = (e) =>{
  e.preventDefault()
  console.log(loginEmail)
  console.log(loginPassword)
  loginUser(loginEmail, loginPassword)
}


  return (
    loginSuccess ? <SlackInterface loggedToken={loginAccessToken} loggedClient={loginClient} loggedExpiry={loginExpiry} loggedUID = {loginUID}/> : (
    <div className="App">
      <header className="App-header">
          <div className="container">
            <h1 className="label">Slack App Login</h1>

            <form className="login_form" onSubmit={onHandleSubmit} method="post">
              <div className="font">Email</div>
                <input onChange={(event)=>{setloginEmail(event.target.value)}} 
                autoComplete="off" 
                type="email"
                value={loginEmail}
                />
            <p className='invalid_error_login'>{loginEmailWarning}</p>
              
              <div className="font font2">Password</div>
              <input
              onChange={(event)=>{setLoginPassword(event.target.value)}}
              type="password"
              value={loginPassword}
              />
            <p className='invalid_error_login'>{loginPasswordWarning}</p>

              <div id="pass_error">Please fill up your Password</div>

              <button className="login" type="submit">Login</button>
              <div className="or">or</div>
              <button className="create" type='submit'>Create an Account</button>
            </form>
            
          </div>	
      </header>
    </div>)
  );
}

export default Login;
