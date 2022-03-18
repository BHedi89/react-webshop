import React from "react";
import classes from "./FavouritePage.module.css";
import { UserDataContext } from "../login/UserDataContext";
import { ProductDataContext } from "../context/ProductDataContext";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";

const FavouritePage = () => {
    let userContext = React.useContext(UserDataContext);
    let productContext = React.useContext(ProductDataContext);
     
    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <div className={classes.favcontainer}>
                <h1 className={classes.favouritetitle}>Favourites</h1>
                <div className={classes.favourites}>
                    {userContext.user.favourite.map(fav => {
                        return (
                            <>
                                {productContext.product.map(prod => {
                                    return (
                                        fav.id === prod.id
                                        ?
                                        <Productcard
                                            key={prod.id}
                                            productId={prod.id}
                                            productName={prod.name}
                                            productImage={prod.image}
                                            productRate={prod.review.map(() => {
                                                let sum = 0;
                                                prod.review.forEach((obj) => sum += obj.rate);
                                                return Math.round(sum / prod.review.length);
                                            })}
                                        />
                                        :
                                        null
                                    )
                                })}
                            </>
                        )
                    })}
                </div>
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
            
        </>
    )
}

export default FavouritePage;