import React from "react";
import classes from "./Login.module.css";
import { FIREBASE_DOMAIN } from "../../utils/firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Hero from "../../components/hero-footer/Hero";
import heroImage from "../../assets/images/hero/RedGroup-Mobile-1600x500-1.jpg";
import ShapeDivider from "../../components/other-components/ShapeDivider";
import Footer from "../../components/hero-footer/Footer";
import Alert from "../../components/other-components/Alert";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let navigate = useNavigate();
    const [alert, setAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    
    function signIn(e) {
        e.preventDefault();
        let auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            fetch(`${FIREBASE_DOMAIN}/users/${user.uid}.json`)
                .then(resp => resp.json())
                .then(data => {
                    if(data.type === "user") {
                        setAlertMsg("Sign in successfully");
                        setAlert(!alert);
                        
                        setTimeout(() => {
                            navigate("/", {replace: true});
                        }, 2000);
                    }                    
                })
        }) 
        .catch(error => {
            if(error.code === "auth/user-not-found") {
                setAlertMsg("User not found!");
                setAlert(!alert);
            };
            if(error.code === "auth/wrong-password") {
                setAlertMsg("Wrong password!");
                setAlert(!alert);
            };
        })
    }

    const handleClose = () => {
        setAlert(!alert);
    }

    return (
        <>
            <Navbar />
            <Hero
                heroImage={heroImage}
                title="Wonderful Makeups"
            />
            <ShapeDivider/>
            <div className={classes.container}>
                {alert && <Alert
                    content={<>
                        <p>{alertMsg}</p>
                    </>}
                    handleClose={handleClose}
                />}
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
                    <Link to="/forgotpassword">Forgot Password</Link>
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