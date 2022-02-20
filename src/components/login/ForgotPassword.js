import React from "react";
import classes from "./ForgotPassword.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Alert from "../layout/Alert";
import { UserDataContext } from "./UserDataContext";

const Forgotpassword = () => {
    const [email, setEmail] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let userContext = React.useContext(UserDataContext);

    function resetPassword() {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setAlertMsg("Check your email to reset your password!");
                setOpen(!open);
            })
            .catch((error) => {
                if(email === "") {
                    setAlertMsg("Missing email!");
                    setOpen(!open);
                } else {
                    setAlertMsg("Wrong email!");
                    setOpen(!open);
                }
               
            })
    }

    const handleClose = () => {
        setOpen(!open);
    }

    return (
        <>
            {open && <Alert
                    content={<>
                        <p>{alertMsg}</p>
                    </>}
                    handleClose={handleClose}
            />}
            <h1>Forgot password</h1>
            <label>Add your email</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={resetPassword}>Send</button>
        </>
    )
}

export default Forgotpassword;