import React from "react";
import classes from "./Dropdownbutton.module.css";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserDataContext } from "../login/UserDataContext";
import Alert from "./Alert";

const Dropdownbutton = () => {
    const [open, setOpen] = React.useState(false);
    let userContext = React.useContext(UserDataContext);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");

    const logout = () => {
        let auth = getAuth();
        signOut(auth).then(() => {
            setAlertMsg("Sign out successfully!");
            setOpenAlert(!openAlert);
            setTimeout(() => {
                userContext.setUser(null);
            }, 2000);
        }).catch((error) => {
          setAlertMsg("Sign out failed!");
          setOpenAlert(!openAlert);
        });
    }

     const handleClose = () => {
        setOpen(!open);
    }

    return (
        <div>
            {openAlert && <Alert
                content={<>
                    <p>{alertMsg}</p>
                </>}
                handleClose={handleClose}
            />}
            <Link to="#" state={{ratingnum: 0}} className={classes.dropdownbtn} onClick={() => setOpen(open => !open)}>
                Profile
            </Link>
            {open && 
                <div className={classes.dropdown}>
                    <div className={classes.droplist}>
                        <Link to="/account" state={{ratingnum: 0}}>Account</Link>
                        <Link to="/orders" state={{ratingnum: 0}}>Orders</Link>
                        <Link to="/favourite" state={{ratingnum: 0}}>Favourite</Link>
                        <Link to="/" state={{ratingnum: 0}} onClick={logout}>Sign out</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dropdownbutton;