import React from "react";
import classes from "./FavouriteHeart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductDataContext } from "../context/ProductDataContext";
import { UserDataContext } from "../login/UserDataContext";
import Alert from "./Alert";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const FavouriteHeart = (props) => {
    const [favourite, setFavourite] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let productContext = React.useContext(ProductDataContext);
    let userContext = React.useContext(UserDataContext);
    console.log(userContext)

    const addFavourite = () => {
        productContext.product.map(product => {
            if(product.id === props.productId) {
                fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}/favourite.json`, {
                    method: "POST",
                    body: JSON.stringify({
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        isFavourite: true
                    })
                })
                .then(resp => resp.json())
                .then(() => {
                    setAlertMsg("Product added to your favourites!");
                    setOpen(!open);
                });
            }
        })
    }

    const handleClose = () => {
        setOpen(!open);
    }
     
    return (
        <>
            {open && <Alert
                    content={<>
                        <p>{alertMsg}</p>
                    </>}
                    handleClose={handleClose}
            />}
            <FontAwesomeIcon 
                icon={faHeart} 
                className={favourite ? classes.red : classes.blank}
                onClick={() => {setFavourite(!favourite); addFavourite() }}
            />
        </>
    )
}

export default FavouriteHeart;