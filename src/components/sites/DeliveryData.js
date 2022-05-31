import React from "react";
import classes from "./DeliveryData.module.css";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import { UserDataContext } from "../login/UserDataContext";
import Alert from "../layout/Alert";
import { useNavigate } from "react-router-dom";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const DeliveryData = () => {
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let userContext = React.useContext(UserDataContext);
    let navigate = useNavigate();

    const handleClose = () => {
        setOpenAlert(!openAlert);
    }

    const saveOrder = () => {
        fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}/orders.json`, {
            method: "POST",
            body: JSON.stringify({
                status: "active",
                items: userContext.user.cart
            })
        })
        .then(resp => resp.json())
        .then(({name}) => {
            let userCopy = {...userContext.user};
            userCopy.orders.push({
                id: name,
                status: "active",
                items: userContext.user.cart
            })
            userContext.setUser(userCopy);
            
            fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}/cart.json`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(() => {
                setAlertMsg("Order successfully, thank you!");
                setOpenAlert(!openAlert);
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
        {openAlert && <Alert
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