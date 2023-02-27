import React , { useState } from 'react'
import SignUpComplete from '../js-component/SignUpComplete';
import Logo from '../img/SlackApp Logo.png'
import { useNavigate } from 'react-router';
import '../js-component/css/login-signup.css'

const SignUp = () =>{
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailWarning, setEmailWarning] = useState("")
  const [passwordWarning, setPasswordWarning] = useState("")
  const [passwordConfirmationWarning, setPasswordConfirmationWarning] = useState("")
  
  const [userSignedUp, setUserSignedUp] = useState("incomplete") 

    const navigate = useNavigate();
    const onLoginToAccount = () =>{
        navigate('/signin')
    }
 

    const registerUser = async (email, password, passwordConfirmation) => {

        

        const requestBody = {
        email,
        password,
        password_confirmation: passwordConfirmation,
        };  


            try{        
                const response = await fetch("http://206.189.91.54/api/v1/auth/", {
                    method : "POST",
                    headers : {"Content-Type": "application/json"},
                    body : JSON.stringify(requestBody)
                })      
                const rawData = await response.json();     
    
       
                if(rawData.errors.email ? setEmailWarning(rawData.errors.email) : setEmailWarning(""))
                try {
                    setEmailWarning(rawData.errors.email ? rawData.errors.email : '');
                  } catch (error) {
                    console.error(error);                    
                  }

                if(rawData.errors.password ? setPasswordWarning(rawData.errors.password) : setPasswordWarning(""))
                try {
                    setPasswordWarning(rawData.errors.password ? rawData.errors.password : '');
                  } catch (error) {
                    console.error(error);                    
                  }
                
                if(rawData.errors.password_confirmation ? setPasswordConfirmationWarning(rawData.errors.password_confirmation) : setPasswordConfirmationWarning(""))
                try {
                    setPasswordConfirmationWarning(rawData.errors.password_confirmation ? rawData.errors.password_confirmation : '');
                  } catch (error) {
                    console.error(error);                    
                  }
           
     
                  if (rawData.status === "success") {
                    setUserSignedUp("complete");
                  } else {
                    setUserSignedUp("incomplete");
                  }
            }
            
            catch(error){
                setUserSignedUp("complete")
            } 
        }

        const handleSubmit = async (event) => {           
            event.preventDefault();

            if (!email) {
                console.error('email undefined');
                return;
              }

            await registerUser(email, password, passwordConfirmation)            
        }   

    return(
        (userSignedUp === "complete") ? <SignUpComplete/> :
        (<div className='main-container-flex'>

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
                    <div className='main-right-content-title'>Sign Up</div>
                    <div className='main-right-content-text'>It's quick and easy.</div>
                    <form className='main-right-form'
                    onSubmit={handleSubmit}>
                        <label className='main-right-form-label'>
                        <span className='main-right-form-warning'>{emailWarning}</span></label>
                        <input
                        className='main-right-form-input'                        
                        onChange={(event)=> setEmail(event.target.value)}
                        placeholder='Email'
                        value={email}
                        type="email"/>
                       

                        <label className='main-right-form-label'>
                        <span className='main-right-form-warning'>{passwordWarning}{passwordConfirmationWarning}</span></label>
                        <input 
                        className='main-right-form-input'
                        onChange={(event)=> setPassword(event.target.value)}
                        placeholder='Password'
                        value={password}
                        type="password"/>


                        <label className='main-right-form-label'>
                        <span className='main-right-form-warning'>{passwordWarning}{passwordConfirmationWarning}</span></label>                        
                        <input className='main-right-form-input'
                        onChange={(event)=> setPasswordConfirmation(event.target.value)}
                        placeholder="Confirm Password"
                        value={passwordConfirmation}
                        type="password"/>                        
                        <button className='main-right-submit-login-button'
                        type='submit'>Sign up</button>
                    </form>                                   
                    <div className='main-right-content-text'>This site is protected by reCAPTCHA and <br></br> the Google Privacy Policy.</div>                  
                    <p className='glow-link' onClick={onLoginToAccount}>Have an account? Login now...</p>
                </div>                                            
            </div>
        </div>)
)}
export default SignUp;