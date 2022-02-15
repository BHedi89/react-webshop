import React from "react";
import classes from "./Login.module.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { UserDataContext } from "./UserDataContext";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/RedGroup-Mobile-1600x500-1.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";

initializeApp(firebaseConfig);
const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const Login = () => {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let navigate = useNavigate();
    let userContext = React.useContext(UserDataContext);

    function signIn(e) {
        e.preventDefault();
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
            <Hero
                heroImage={heroImage}
                title="Wonderful Makeups"
            />
            <ShapeDivider/>
            <div className={classes.container}>
                <h1>Welcome Back</h1>
                <h2>Login Here</h2>
                <form className={classes.form}>
                    <input 
                        type="text" 
                        placeholder="&#xf007; Email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="&#xf023; Password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <button onClick={signIn}>Login</button>
                </form>
                <button className={classes.backBtn}><Link to="/">Back to main</Link></button>
                <div className={classes.links}>
                    <Link to="#">Forgot Password</Link>
                    <Link to="/registration">Create Account</Link>
                </div>
            </div>
            <ShapeDivider/>
            <div className={classes.footer}>
              <Footer/>  
            </div>
            
        </>  
    )
}

export default Login;