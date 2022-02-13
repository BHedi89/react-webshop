import React from "react";
import classes from "./Login.module.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "./UserDataContext";

initializeApp(firebaseConfig);
const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const Login = () => {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let navigate = useNavigate();
    let userContext = React.useContext(UserDataContext);

    function signIn() {
        let auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            fetch(`${FIREBASE_DOMAIN}/users/${user.uid}.json`)
                .then(resp => resp.json())
                .then(data => {
                    userContext.setUser({...data, uid: user.uid});
                    if(data.type == "user") navigate("/", {replace: true});
                })
        }) 
        .catch(error => {
            if(error.code == "auth/user-not-found") alert("User not found");
            if(error.code == "auth/wrong-password") alert("Wrong password");
        })
    }

    return (
        <>
            <h1>Login</h1>
            <p>email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} /></p>
            <p>jelszó: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></p>
            <p><button onClick={signIn}>Belépés</button></p>
        </>  
    )
}

export default Login;