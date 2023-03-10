import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom"
import SlackInterface from "./pages/SlackInterface";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login";

const ProjectMain = () => {

    

    return(
        <BrowserRouter>
        <div 
        style=
        {{
            height: "100vh",
            width: "100vw",           
        }}>                                
                <div style={{display:"none",fontSize:"1em", textAlign:"center", fontWeight:"bold", backgroundColor:"rgb(29,97,194)",color:"white"}}>
                Choose Your Project
                <div style={{textAlign:"center"}}>
                <Link style={{margin:"0 10px", color:"white"}} to="signin">Sign In</Link>
                <Link style={{margin:"0 10px", color:"white"}}  to="signup">Sign Up</Link>
                <Link style={{margin:"0 10px", color:"white"}} to="slackinterface">Slack Interface</Link>
                </div>
                </div>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="signup" element={< SignUp />}>SignUp</Route>                    
                    <Route path="slackinterface" element={ < SlackInterface />}>Slack Interface</Route>
                    <Route path="signin" element={< Login />}>Sign In</Route>
                </Routes>            
        </div>
        </BrowserRouter>
    )
}

export default ProjectMain