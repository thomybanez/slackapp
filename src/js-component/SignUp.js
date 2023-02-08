import React from 'react'
import '../js-component/css/signup.css'

const SignUp = () =>{
    return(

        <div className='main-container-flex'>

            <div className='main-left'>
                <div className='main-left-content'>
                    <ul>
                        <p className='main-left-content-title'>Slack App</p>
                        <li className='main-left-content-list'>24/7 Uptime</li>
                        <li className='main-left-content-list'>Send message for free</li>
                        <li className='main-left-content-list'>Add friends all around the world</li>
                        <li className='main-left-content-list'>Meet new people</li>                   
                    </ul>
                </div>                          
            </div>                

            <div className='main-right'>
                <div className='main-right-content'>
                    <p className='main-right-content-title'>Sign Up</p>
                    <p className='main-right-content-text'>Sign up using your account</p>
                        <div className='main-right-button-container'>
                            <button className='main-right-quick-login-button'>Google</button>
                            <button className='main-right-quick-login-button'>Apple</button>
                        </div>
                    <p className='main-right-content-text'>Or sign up with your email</p>
                    <form className='main-right-form'>
                        <input className='main-right-form-input' placeholder='Email address'></input>
                        <input className='main-right-form-input' placeholder='Password'></input>
                        <input className='main-right-form-input' placeholder='Repeat password'></input>
                        <button className='main-right-submit-login-button'>Sign up</button>
                    </form>                
                    <p className='main-right-content-text'>This site is protected by reCAPTCHA and <br></br> the Google Privacy Policy.</p>                  
                </div>                            
            </div>       

        </div>
    )}
export default SignUp;