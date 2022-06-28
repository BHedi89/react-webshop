import React from "react";
import classes from "./Cart.module.css";
import Navbar from "../../components/navbar/Navbar";
import ShapeDivider from "../../components/other-components/ShapeDivider";
import Footer from "../../components/hero-footer/Footer";
import { UserDataContext } from "../../utils/context/UserDataContext";
import Alert from "../../components/other-components/Alert";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [alert, setAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let navigate = useNavigate();
    let userContext = React.useContext(UserDataContext);
    let total = 0;

    const noOrderedItem = () => {
        if(userContext.user.cart.length === 0) {
            setAlert(!alert);
            setAlertMsg("Your cart is empty!");
        } else {
            navigate("/delivery", {replace: true});
        }
    }

    const handleClose = () => {
        setAlert(!alert);
    } 

    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            {alert && <Alert
                    content={<>
                        <p>{alertMsg}</p>
                    </>}
                    handleClose={handleClose}
            />}
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
                        <button className={classes.deliverybtn} onClick={() => noOrderedItem()}>Go to delivery datas</button>
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