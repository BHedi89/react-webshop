import React from "react";
import classes from "./Dropdownbutton.module.css";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserDataContext } from "../../utils/context/UserDataContext";
import Alert from "../other-components/Alert";

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
            <Link to="#" className={`${classes.dropdownbtn} ${classes.page}`} onClick={() => setDropdown(dropdown => !dropdown)}>
                Profile
            </Link>
            {dropdown && 
                <div className={classes.dropdown}>
                    <div className={classes.droplist}>
                        <Link to="/account" className={classes.page}>Account</Link>
                        <Link to="/orders" className={classes.page}>Orders</Link>
                        <Link to="/favourite" className={classes.page}>Favourite</Link>
                        <Link to="/" onClick={logout} className={classes.page}>Sign out</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dropdownbutton;