import React, { useState } from "react";
import Login from "../pages/Login";

const SignUpComplete = () =>{
    const [redirection, setRedirection] = useState(false)
    setTimeout(()=>{setRedirection(true);}, 5000);    

    return (
    redirection === true ? <Login /> : 
     (
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            fontWeight:"500",
            height:"100%",
            width:"100%"}}>
        <p>Congratulations!, you have successfully registered</p>
        <p>You will be redirected to Sign-in page shortly...</p>     
        
        </div>)
    )
        }



export default SignUpComplete