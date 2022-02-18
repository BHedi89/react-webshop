import React from "react";
import classes from "./Account.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";
import heroImage from "../images/hero/set-cosmetic.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import { UserDataContext } from "../login/UserDataContext";
import cardImage from "../images/mix/pexels-photo-1115128.jpeg";

const Account = () => {
    let userContext = React.useContext(UserDataContext);

    return (
        <>
            <Navbar />
            <Hero 
                title="Wondeful Makeups"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.container}>
                <h1>Profile Account</h1>
                {userContext?.user?.type === "user"
                    ?
                    <div className={classes.forms}>
                        <form className={classes.form}>
                            <h2>User data</h2>
                            <div className={classes.data}>
                                <div>
                                    <label className={classes.label}>Name: </label>
                                    <input className={classes.input} value={userContext.user.name} /> 
                                </div>
                                <div>
                                    <label className={classes.label}>Email: </label>
                                    <input className={classes.input} value={userContext.user.email} />
                                </div>
                            </div>
                            <button className={classes.formbtn}>Save changes</button>
                        </form>
                        <form className={`${classes.form} ${classes.deliverydata}`}>
                            <h2>Delivery data</h2>
                            <div className={classes.data}>
                                <div>
                                    <label className={classes.label}>Address: </label>
                                    <input className={classes.input} value={userContext.user.address} /> 
                                </div>
                                <div>
                                    <label className={classes.label}>Zipcode: </label>
                                    <input className={classes.input} value={userContext.user.zipcode} />
                                </div>
                                <div>
                                    <label className={classes.label}>Phone number: </label>
                                    <input className={classes.input} value={userContext.user.phonenumber} />
                                </div>
                            </div>
                            <button className={classes.formbtn}>Save changes</button>
                        </form>
                        <form className={classes.form}>
                            <h2>Change password</h2>
                            <div className={classes.data}>
                                <div>
                                    <label className={classes.label}>New password: </label>
                                    <input className={classes.input} value="" /> 
                                </div>
                                <div>
                                    <label className={classes.label}>New password again: </label>
                                    <input className={classes.input} value="" />
                                </div>
                            </div>
                            <button className={classes.formbtn}>Save changes</button>
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
