import React , { useState } from 'react'
import '../js-component/css/signup.css'
import SignUpComplete from '../js-component/SignUpComplete';


const SignUp = () =>{
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailWarning, setEmailWarning] = useState("")
  const [passwordWarning, setPasswordWarning] = useState("")
  const [userSignedUp, setUserSignedUp] = useState("incomplete") 
 

    const registerUser = async (email, password, passwordConfirmation) => {
        const requestBody = {
        email,
        password,
        password_confirmation: passwordConfirmation,
        };
        console.log("inside")


            try{
                console.log("try")
                const response = await fetch("http://206.189.91.54/api/v1/auth/", {
                    method : "POST",
                    headers : {"Content-Type": "application/json"},
                    body : JSON.stringify(requestBody)
                })      
                const rawData = await response.json();

                console.log("1"+rawData.status)
                console.log("2"+setUserSignedUp())

                if (rawData.errors){ 
                    setEmailWarning(rawData.errors.email)
                    setPasswordWarning(rawData.errors.password)}                
     
                if (rawData.status === "success"){setUserSignedUp("complete")
            console.log(userSignedUp)}
                
                
                console.log("3"+rawData.status)
                console.log("4"+setUserSignedUp)                
            }
            
            catch(error){
                console.error(error)   
            } 
        }

        const handleSubmit = async (event) => {           
            event.preventDefault();
            await registerUser(email, password, passwordConfirmation)            
        }   

    return(
        (userSignedUp === "complete") ? <SignUpComplete/> :
        (<div className='main-container-flex'>

            <div className='main-left'>
                <div className='main-left-content'>
                    <ul>
                        <div className='main-left-content-title'>Slack App</div>
                        <li className='main-left-content-list'>24/7 Uptime</li>
                        <li className='main-left-content-list'>Send message for free</li>
                        <li className='main-left-content-list'>Add friends all around the world</li>
                        <li className='main-left-content-list'>Meet new people</li>                   
                    </ul>
                </div>                          
            </div>                

            <div className='main-right'>
                <div className='main-right-content'>
                    <div className='main-right-content-title'>Sign Up</div>
                    <div className='main-right-content-text'>Sign up using your account</div>
                        <div className='main-right-button-container'>
                            <button className='main-right-quick-login-button'>Google</button>
                            <button className='main-right-quick-login-button'>Apple</button>
                        </div>
                    <div className='main-right-content-text'>Or sign up with your email</div>
                    <form className='main-right-form'
                    onSubmit={handleSubmit}>
                        <label className='main-right-form-label'>E-mail 
                        <span className='main-right-form-warning'>{emailWarning}</span></label>
                        <input
                        className='main-right-form-input'
                        onChange={(event)=> setEmail(event.target.value)}
                        value={email}
                        type="email"></input>

                        <label className='main-right-form-label'>Password 
                        <span className='main-right-form-warning'>{passwordWarning}</span></label>
                        <input 
                        className='main-right-form-input'
                        onChange={(event)=> setPassword(event.target.value)}
                        value={password}
                        type="password"></input>


                        <label className='main-right-form-label'>Confirm Password
                        <span className='main-right-form-warning'>{passwordWarning}</span></label>                        
                        <input className='main-right-form-input'
                        onChange={(event)=> setPasswordConfirmation(event.target.value)}
                        value={passwordConfirmation}
                        type="password"></input>
                        <button className='main-right-submit-login-button'
                        type='submit'>Sign up</button>
                    </form>                
                    <div className='main-right-content-text'>This site is protected by reCAPTCHA and <br></br> the Google Privacy Policy.</div>                  
                </div>                            
            </div>
        </div>)
)}
export default SignUp;