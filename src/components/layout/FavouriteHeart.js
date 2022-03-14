import React from "react";
import classes from "./FavouriteHeart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductDataContext } from "../context/ProductDataContext";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const FavouriteHeart = () => {
    const [favourite, setFavourite] = React.useState(false);
    let productContext = React.useContext(ProductDataContext);
    // console.log(productContext);


    const addFavourite = () => {
        fetch(`${FIREBASE_DOMAIN}/users/favourite.json`, {
            method: "POST",
            body: JSON.stringify({

            })
        })
    }
     
    return (
        <FontAwesomeIcon 
            icon={faHeart} 
            className={favourite ? classes.red : classes.blank}
            onClick={() => setFavourite(!favourite)}
        />
    )
}

export default FavouriteHeart;