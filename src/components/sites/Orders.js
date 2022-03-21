import React from "react";
import classes from "./Orders.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import { UserDataContext } from "../login/UserDataContext";

const Orders = () => {
    let userContext = React.useContext(UserDataContext);
    console.log(userContext)

    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <div className={classes.ordercontainer}>
                <h1 className={classes.ordertitle}>Orders</h1>
                <div className={classes.sum}>
                    <table className={classes.table}>
                        <tr>
                            <th>Image</th>
                            <th>Product name</th>
                            <th>Price</th>
                        </tr>
                    {userContext.user.orders.map(item => {
                        console.log(item)
                        return (
                            <tr>
                                <td><img src={item.productImage}/></td>
                                <td>{item.productName}</td>
                                <td>{item.productPrice}</td>
                            </tr>
                        )
                    })}
                    </table>
                    <div className={classes.sumprice}>

                    </div>
                </div>
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default Orders;