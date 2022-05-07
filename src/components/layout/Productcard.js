import React from "react";
import classes from "./Productcard.module.css";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import FavouriteHeart from "./FavouriteHeart";

const Productcard = (props) => {
    return (
        <>
            <div className={classes.card}>
                <div className={classes.favdiv}>
                    <img src={props.productImage} />
                    <FavouriteHeart 
                        productId={props.productId}
                    />
                </div>
                <div className={classes.container}>
                    <h1>
                        {props.productName} 
                    </h1>
                    <StarRating  
                        ratingnum={props.productRate[0].avg}
                        productId={props.productId}
                    />
                    <Link to={`/details/${props.productId}`}>Details</Link>
                </div>
            </div>
        </>
    )
}

export default Productcard;