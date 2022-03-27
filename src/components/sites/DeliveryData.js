import React from "react";
import classes from "./DeliveryData.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";

const DeliveryData = () => {
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
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>Zipcode:</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>Phone number:</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email"></input>
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