import React from "react";
import classes from "./Dropdownbutton.module.css";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserDataContext } from "../context/UserDataContext";
import Alert from "./Alert";

const Dropdownbutton = () => {
    const [dropdown, setDropdown] = React.useState(false);
    let userContext = React.useContext(UserDataContext);
    const [alert, setAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");

    const logout = () => {
        let auth = getAuth();
        signOut(auth).then(() => {
            setAlertMsg("Sign out successfully!");
            setAlert(!alert);
            setTimeout(() => {
                userContext.setUser(null);
            }, 2000);
        }).catch((error) => {
          setAlertMsg("Sign out failed!");
          setAlert(!alert);
        });
    }

     const handleClose = () => {
        setDropdown(!dropdown);
    }

    return (
        <div>
            {alert && <Alert
                content={<>
                    <p>{alertMsg}</p>
                </>}
                handleClose={handleClose}
            />}
            <Link to="#" className={classes.dropdownbtn} onClick={() => setDropdown(dropdown => !dropdown)}>
                Profile
            </Link>
            {dropdown && 
                <div className={classes.dropdown}>
                    <div className={classes.droplist}>
                        <Link to="/account">Account</Link>
                        <Link to="/orders">Orders</Link>
                        <Link to="/favourite">Favourite</Link>
                        <Link to="/" onClick={logout}>Sign out</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dropdownbutton;