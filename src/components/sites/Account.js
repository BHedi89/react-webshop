import React from "react";
import classes from "./Account.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";
import heroImage from "../images/hero/set-cosmetic.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import { UserDataContext } from "../context/UserDataContext";
import Alert from "../layout/Alert";
import { 
    getAuth, 
    updateEmail, 
    reauthenticateWithCredential, 
    EmailAuthProvider,
    updatePassword } 
from "firebase/auth";
import { Link } from "react-router-dom";
import { FIREBASE_DOMAIN } from "../firebase/firebaseConfig";

const Account = () => {
    let userContext = React.useContext(UserDataContext);
    const [address, setAddress] = React.useState(userContext.user.address);
    const [zipcode, setZipcode] = React.useState(userContext.user.zipcode);
    const [phonenumber, setPhonenumber] = React.useState(userContext.user.phonenumber);
    const [name, setName] = React.useState(userContext.user.name);
    const [email, setEmail] = React.useState(userContext.user.email);
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");

    function changeDeliveryData(e) {
        e.preventDefault();
        fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}.json`, {
            method: "PUT",
            body: JSON.stringify({
                address: address,
                zipcode: zipcode,
                phonenumber: phonenumber,
                name: userContext.user.name,
                email: userContext.user.email,
                type: "user",
                cart: userContext.user.cart,
                favourite: userContext.user.favourite,
                orders: userContext.user.orders
            })
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            setAlertMsg("Delivery datas changed successfully!");
            setOpen(!open);
            userContext.setUser({...data, uid: userContext.user.uid});
        });
    }

    function changePersonalData(e) {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        );

        reauthenticateWithCredential(user, credential)
            .then(() => {
                updateEmail(auth.currentUser, email)
                    .then(() => {
                        fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}.json`, {
                            method: "PUT",
                            body: JSON.stringify({
                                address: userContext.user.address,
                                zipcode: userContext.user.zipcode,
                                phonenumber: userContext.user.phonenumber,
                                name: name,
                                email: email,
                                type: "user",
                                cart: userContext.user.cart,
                                favourite: userContext.user.favourite,
                                orders: userContext.user.orders
                            })
                        })
                        .then(resp => resp.json())
                        .then((data) => {
                            setAlertMsg("Name or email chaged successfully!");
                            setOpen(!open);
                            setPassword("");
                            userContext.setUser({...data, uid: userContext.user.uid});
                        });
                    });
            }).catch((error) => {
                setAlertMsg("Missing password!");
                setOpen(!open);
        });
    }

    function changePassword(e) {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        
        if(newPassword === newPasswordAgain) {
            updatePassword(user, newPassword)
                .then(() => {
                    setAlertMsg("Password changes successfully!");
                    setOpen(!open);
                    setNewPassword("");
                    setNewPasswordAgain("");
                }).catch((error) => {
                    if(newPassword.length < 6){
                        setAlertMsg("Password should be at least 6 characters!");
                        setOpen(!open);
                        setNewPassword("");
                        setNewPasswordAgain("");
                    }
                });
        } else {
            setAlertMsg("Not match! Try again!");
            setOpen(!open);
            setNewPassword("");
            setNewPasswordAgain("");
        };
    }

    const handleClose = () => {
        setOpen(!open);
    }

    return (
        <>
            <Navbar />
            <Hero 
                title="Wondeful Makeups"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.container}>
                {open && <Alert
                    content={<>
                        <p>{alertMsg}</p>
                    </>}
                    handleClose={handleClose}
                />}
                <h1>Profile Account</h1>
                <Link to="/" className={classes.backlink}>Back to main</Link>
                {userContext?.user?.type === "user"
                    ?
                    <div className={classes.forms}>
                        <form className={`${classes.form} ${classes.bigdatabox}`}>
                            <h2>Personal data</h2>
                            <div className={classes.data}>
                                <div>
                                    <label className={classes.label}>Name: </label>
                                    <input 
                                        type="text"
                                        className={classes.input} 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                    /> 
                                </div>
                                <div>
                                    <label className={classes.label}>Email: </label>
                                    <input 
                                        type="email"
                                        className={classes.input} 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={classes.label}>Password: </label>
                                    <input 
                                        type="password"
                                        className={classes.input} 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className={classes.formbtn} onClick={changePersonalData}>Save changes</button>
                        </form>
                        <form className={`${classes.form} ${classes.bigdatabox}`}>
                            <h2>Delivery data</h2>
                            <div className={classes.data}>
                                <div>
                                    <label className={classes.label}>Address: </label>
                                    <input 
                                        type="text"
                                        className={classes.input} 
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    /> 
                                </div>
                                <div>
                                    <label className={classes.label}>Zipcode: </label>
                                    <input 
                                        type="text"
                                        className={classes.input} 
                                        value={zipcode}
                                        onChange={(e) => setZipcode(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={classes.label}>Phone number: </label>
                                    <input 
                                        type="text"
                                        className={classes.input} 
                                        value={phonenumber} 
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className={classes.formbtn} onClick={changeDeliveryData}>Save changes</button>
                        </form>
                        <form className={classes.form}>
                            <h2>Change password</h2>
                            <div className={classes.data}>
                                <div>
                                    <label className={classes.label}>New password: </label>
                                    <input 
                                        type="password"
                                        className={classes.input} 
                                        value={newPassword} 
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    /> 
                                </div>
                                <div>
                                    <label className={classes.label}>New password again: </label>
                                    <input 
                                        type="password"
                                        className={classes.input} 
                                        value={newPasswordAgain} 
                                        onChange={(e) => setNewPasswordAgain(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className={classes.formbtn} onClick={changePassword}>Save changes</button>
                        </form>
                    </div>
                    :
                    null
                }
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default Account;
