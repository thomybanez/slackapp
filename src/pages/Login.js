import '../js-component/css/login.css';
import React, { useState } from 'react';
import SlackInterface from "./SlackInterface"

function Login() {
const [loginEmail, setloginEmail] = useState("")
const [loginEmailWarning, setLoginEmailWarning] = useState("")
const [loginPassword, setLoginPassword] = useState("")
const [loginPasswordWarning, setLoginPasswordWarning] = useState("")
const [loginSuccess, setLoginSuccess] = useState(false)

const loginUser = async (loginEmail, loginPassword) =>{
      const requestBody = {
        email:loginEmail,
        password:loginPassword
      }

        try{
          console.log("try")
          const response = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
              method : "POST",
              headers : {"Content-Type": "application/json"},
              body : JSON.stringify(requestBody)
          })      
          const rawData = await response.json();
          console.log(rawData)          
          console.log(rawData.data)
          console.log("RAWDATA"+ rawData.success)

          if (rawData.success === false){
              setLoginEmailWarning(rawData.errors[0])
              setLoginPasswordWarning(rawData.errors[0])      
          }

          else if(rawData.data.email){
              setLoginSuccess(true)
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
    loginSuccess ? <SlackInterface /> : (
    <div className="App">
      <header className="App-header">
          <div className="container">
            <h1 className="label">Slack App Login</h1>

            <form className="login_form" onSubmit={onHandleSubmit} method="post" name="form" onsubmit="return validated()">
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
