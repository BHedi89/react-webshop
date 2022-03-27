import React from "react";
import classes from "./Orders.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import { UserDataContext } from "../login/UserDataContext";
import { Link } from "react-router-dom";

const Orders = () => {
    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default Orders;