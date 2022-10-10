import React, {useState} from "react";

function Login(props) {
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [showLoginForm, setShowLoginForm] = useState(1);
    const [showSignupForm, setShowSignupForm] = useState(1);

    function login(){
        if(usernameState && passwordState){
            props.login(usernameState,passwordState);
        }else{console.log("Enter username and password")}
        
    }

    function handleUsernameChange(event){
        setUsernameState(event.target.value)
    }
    function handlePasswordChange(event){
        setPasswordState(event.target.value)
    }

    function handleOnKeyDown(e){
        if(e.code === "Enter"){
            login();
        }
    }


    return (
        <div className="loginView">
            {showLoginForm 
            ? <div className="loginTileContainer">
                 <div className="loginTile" onClick={() => setShowLoginForm(0)}>
                    <h2>Login</h2>
                 </div>
                 <div className="loginTile" onClick={props.loginGuest}>
                    <h3 className="">Login as guest</h3>
                 </div>
               </div>
            :   <div className="loginForm">
                    <label>Username: </label>
                    <input type="text" value={usernameState} onChange={handleUsernameChange} onKeyDown={handleOnKeyDown}></input>
                    <label>Password: </label>
                    <input type="password" value={passwordState} onChange={handlePasswordChange} onKeyDown={handleOnKeyDown}></input>
                    <input type="submit" value="Join" onClick={login}></input>
                    <input type="submit" value="<--Back" onClick={() => setShowLoginForm(1)}></input>
                </div> 
        }
            
        </div>

    )
}

export default Login;