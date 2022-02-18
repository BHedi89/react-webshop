import React from "react";
import classes from "./Dropdownbutton.module.css";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserDataContext } from "../login/UserDataContext";

const Dropdownbutton = () => {
    const [open, setOpen] = React.useState(false);
    let userContext = React.useContext(UserDataContext);

    const logout = () => {
        let auth = getAuth();
        signOut(auth).then(() => {
            userContext.setUser(null)
            alert("Sikeres kijelentkezés");
        }).catch((error) => {
          alert("nem sikerült kijelentkezni!");
        });
    }

    return (
        <div id="drop-down-wrapper">
            <Link to="#" className={classes.dropdownbtn} onClick={() => setOpen(open => !open)}>
                Profile
            </Link>
            {open && 
                <div className={classes.dropdown}>
                    <div className={classes.droplist}>
                        <Link to="/account">Account</Link>
                        <Link to="#">Orders</Link>
                        <Link to="/" onClick={logout}>Sign out</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dropdownbutton;