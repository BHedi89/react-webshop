import React from "react";
import classes from "./Orders.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import { UserDataContext } from "../login/UserDataContext";

const Orders = () => {
    let userContext = React.useContext(UserDataContext);
    let orders = userContext.user.orders;

    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <div className={classes.container}>
                <h1>My orders</h1>
                <div>
                    <h2 className={classes.ordertitle}>Active orders</h2>  
                    <table className={classes.table}>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th>Product name</th>
                                <th>Price</th>
                            </tr>
                            {orders.map(item => {
                                return (
                                    <>
                                        {item.items.map(detail => {
                                            return (
                                                item.status === "active"
                                                ?
                                                <tr key={detail.id}>
                                                    <td><img src={detail.productImage}/></td>
                                                    <td>{detail.productName}</td>
                                                    <td>${detail.productPrice}</td>
                                                </tr>
                                                : 
                                                null
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className={classes.ordertitle}>Passive orders</h2>  
                    <table className={classes.table}>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th>Product name</th>
                                <th>Price</th>
                            </tr>
                            {orders.map(item => {
                                return (
                                    <>
                                        {item.items.map(detail => {
                                            return (
                                                item.status === "passive"
                                                ?
                                                <tr key={detail.id}>
                                                    <td><img src={detail.productImage}/></td>
                                                    <td>{detail.productName}</td>
                                                    <td>${detail.productPrice}</td>
                                                </tr>
                                                : 
                                                null
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
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