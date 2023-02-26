import '../js-component/css/login-signup.css';
import React, { useState } from 'react';
import SlackInterface from "./SlackInterface"
import Logo from '../img/SlackApp Logo.png'
import { useNavigate } from 'react-router';


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

const navigate = useNavigate();
const onCreateAccountClick = () => {
  navigate('/signup')
}

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

          if (rawData.errors){ 
            setLoginEmailWarning(rawData.errors)
            setLoginPasswordWarning(rawData.errors)
          }    

          if(rawData.data.email){
              setLoginSuccess(true)
          }

          if(rawHeader){  
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
  loginUser(loginEmail, loginPassword)
}

  return (
    loginSuccess ? 
    <SlackInterface 
      loggedToken={loginAccessToken} 
      loggedClient={loginClient} 
      loggedExpiry={loginExpiry} 
      loggedUID = {loginUID}/> 

      : (

    <div className='main-container-flex'>
            <div className='main-left'>
                <div className='main-left-content'>
                    <ul className='main-left-content-logo-slogan-container'>                        
                        <img className='logo' src={Logo} alt="" />
                        <li className='logo-slogan'>a place where projects are built together</li>                                 
                    </ul>
                </div>                          
            </div>                

            <div className='main-right'>
                <div className='main-right-content'>
                  <div className='main-right-content-title'>Log In</div>
                    <div className='main-right-content-text'>All servers are up</div>
                    <form className='main-right-form'
                    onSubmit={onHandleSubmit}>
                        <label className='main-right-form-label'>
                        <span className='main-right-form-warning'>{loginEmailWarning}</span></label>
                        <input
                            className='main-right-form-input'                        
                            onChange={(event)=> setloginEmail(event.target.value)}
                            placeholder='Email'
                            value={loginEmail}
                            type="email"/>
                       

                        <label className='main-right-form-label'>
                        <span className='main-right-form-warning'>{loginPasswordWarning}</span></label>
                        <input 
                            className='main-right-form-input'
                            onChange={(event)=> setLoginPassword(event.target.value)}
                            placeholder='Password'
                            value={loginPassword}
                            type="password"/>
                            
                            <button className='main-right-submit-login-button'
                            type='submit'>Submit</button>
                      </form>
                    
                    <div className='main-right-content-text'>This site is protected by reCAPTCHA and <br></br> the Google Privacy Policy.</div>                  
                    <button className='create-new-account' onClick={onCreateAccountClick}>Create new account</button>
                </div>
                                            
            </div>
        </div>)



        )
}

export default Login;
