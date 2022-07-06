import React from "react";
import classes from "./DeliveryData.module.css";
import Navbar from "../../components/navbar/Navbar";
import ShapeDivider from "../../components/other-components/ShapeDivider";
import Footer from "../../components/hero-footer/Footer";
import { UserDataContext } from "../../utils/context/UserDataContext";
import Alert from "../../components/other-components/Alert";
import { useNavigate } from "react-router-dom";
import { postOrders, deleteCartContent } from "../../modules/user-service";

const DeliveryData = () => {
    const [alert, setAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let userContext = React.useContext(UserDataContext);
    let navigate = useNavigate();

    const handleClose = () => {
        setAlert(!alert);
    }

    const saveOrder = () => {
        let orderObj = {
            status: "active",
            items: userContext.user.cart
        }

        postOrders(userContext.user.uid, orderObj)
            .then(({name}) => {
                let userCopy = {...userContext.user};
                userCopy.orders.push({
                    id: name,
                    status: "active",
                    items: userContext.user.cart
                })
                userContext.setUser(userCopy);
                
                deleteCartContent(userContext.user.uid)
                    .then(() => {
                        setAlertMsg("Order successfully, thank you!");
                        setAlert(!alert);
                        userContext.setUser({...userContext.user, uid: userContext.user.uid, cart: []});
                        setTimeout(() => {
                            navigate("/", {replace: true});
                        }, 2000);
                    })
                
            })
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
        <h1 className={classes.deliverytitle}>Delivery Datas</h1>
        <div className={classes.delivery}>
            <div className={classes.form}>
                <form>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            defaultValue={userContext.user.name}
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input 
                            type="text"
                            defaultValue={userContext.user.address}
                        />
                    </div>
                    <div>
                        <label>Zipcode:</label>
                        <input 
                            type="text"
                            defaultValue={userContext.user.zipcode}
                        />
                    </div>
                    <div>
                        <label>Phone number:</label>
                        <input 
                            type="text"
                            defaultValue={userContext.user.phonenumber}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email"
                            defaultValue={userContext.user.email}
                        />
                    </div>
                    <div>
                        <label>Note:</label>
                        <textarea rows={5} />
                    </div>
                </form>
                <button 
                    className={classes.finishbtn}
                    onClick={saveOrder}
                >
                    Finish order
                </button>
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