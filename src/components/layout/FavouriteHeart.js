import React from "react";
import classes from "./FavouriteHeart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FavouriteHeart = () => {
    const [favourite, setFavourite] = React.useState(false);
    
    return (
        <FontAwesomeIcon 
            icon={faHeart} 
            className={favourite ? classes.red : classes.blank}
            onClick={() => setFavourite(!favourite)}
        />
    )
}

export default FavouriteHeart;