import React from "react";
import classes from "./Orders.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";

const Orders = () => {
    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <div className={classes.container}>
                <h1>My orders</h1>
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default Orders;