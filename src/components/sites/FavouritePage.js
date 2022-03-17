import React from "react";
import classes from "./FavouritePage.module.css";
import { UserDataContext } from "../login/UserDataContext";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";

const FavouritePage = () => {
    let userContext = React.useContext(UserDataContext);

    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <div className={classes.favourites}>
               {userContext.user.favourite.map(fav => {
                    return (
                        <Productcard  
                            key={fav.id}
                            productId={fav.id}
                            productName={fav.name}
                            productImage={fav.image}
                            productRate={fav.review.map(() => {
                                let sum = 0;
                                fav.review.forEach((obj) => sum += obj.rate);
                                return Math.round(sum / fav.review.length);
                            })}
                        />
                    )
               })}
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
            
        </>
    )
}

export default FavouritePage;