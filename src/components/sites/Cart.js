import React from "react";
import classes from "./Cart.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import { UserDataContext } from "../login/UserDataContext";
import { Link } from "react-router-dom";

const Cart = () => {
    let userContext = React.useContext(UserDataContext);
    let total = 0;

    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <div className={classes.ordercontainer}>
                <h1 className={classes.ordertitle}>Orders</h1>
                <div className={classes.sumtable}>
                    <table className={classes.table}>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th>Product name</th>
                                <th>Price</th>
                            </tr>
                            {userContext.user.cart.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td><img src={item.productImage}/></td>
                                        <td>{item.productName}</td>
                                        <td>${item.productPrice}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className={classes.sumproducts}>
                        <h1>Summary</h1>
                        <table className={classes.list}>
                            <tbody>
                                {userContext.user.cart.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.productName}</td>
                                            <td>${item.productPrice}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <table className={classes.totalsum}>
                            <tbody>
                                <tr>
                                    <td>Total:</td>
                                    {userContext.user.cart.map(product => {
                                        total += product.productPrice;
                                    })}
                                    <td>${Math.round(total * 100) / 100}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className={classes.deliverybtn}><Link to="/delivery">Go to delivery datas</Link></button>
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

export default Cart;