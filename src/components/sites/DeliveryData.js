import React from "react";
import classes from "./DeliveryData.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import { UserDataContext } from "../login/UserDataContext";

const DeliveryData = () => {
    let userContext = React.useContext(UserDataContext);

    return (
        <>
        <Navbar />
        <div className={classes.hero}></div>
        <ShapeDivider />
        <h1 className={classes.deliverytitle}>Delivery Datas</h1>
        <div className={classes.delivery}>
            <div className={classes.form}>
                <form>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={userContext.user.name}
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input 
                            type="text"
                            value={userContext.user.address}
                        />
                    </div>
                    <div>
                        <label>Zipcode:</label>
                        <input 
                            type="text"
                            value={userContext.user.zipcode}
                        />
                    </div>
                    <div>
                        <label>Phone number:</label>
                        <input 
                            type="text"
                            value={userContext.user.phonenumber}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email"
                            value={userContext.user.email}
                        />
                    </div>
                    <div>
                        <label>Note:</label>
                        <textarea rows={5} />
                    </div>
                </form>
                <button className={classes.finishbtn}>Finish order</button>
            </div>
        </div>
        <ShapeDivider />
        <div className={classes.footer}>
            <Footer />
        </div>
        </>
    )
}

export default DeliveryData;