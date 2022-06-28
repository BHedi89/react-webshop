import React from "react";
import classes from "./ForgotPassword.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Alert from "../../components/other-components/Alert";
import Hero from "../../components/hero-footer/Hero";
import ShapeDivider from "../../components/other-components/ShapeDivider";
import Footer from "../../components/hero-footer/Footer";
import heroImage from "../../assets/images/hero/about-banner.jpg"; 
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Forgotpassword = () => {
    const [email, setEmail] = React.useState("");
    const [alert, setAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let navigate = useNavigate();

    function resetPassword(e) {
        e.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setAlertMsg("Check your email to reset your password!");
                setAlert(!alert);
                navigate("/login", {replace: true});
            })
            .catch((error) => {
                if(email === "") {
                    setAlertMsg("Missing email!");
                    setAlert(!alert);
                } else {
                    setAlertMsg("Wrong email!");
                    setAlert(!alert);
                }
            })
    }

    const handleClose = () => {
        setAlert(!alert);
    }

    return (
        <>
            <Navbar />
            <Hero 
                title="Wonderful Makeups"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.container}>
                {alert && <Alert
                        content={<>
                            <p>{alertMsg}</p>
                        </>}
                        handleClose={handleClose}
                />}
                <h1>Forgot password</h1>
                <form className={classes.form}>
                    <div>
                        <label>Add your email:</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.btns}>
                        <button className={classes.sendbtn} onClick={resetPassword}>Send</button>
                        <button className={classes.backbtn}><Link to="/">Back to main</Link></button>
                    </div>
                </form>
            </div>
            <ShapeDivider />
            <div className={classes.footer}> 
                <Footer />
            </div>
        </>
    )
}

export default Forgotpassword;