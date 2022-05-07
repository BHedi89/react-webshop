import React from "react";
import classes from "./FavouritePage.module.css";
import { UserDataContext } from "../login/UserDataContext";
import { ProductDataContext } from "../context/ProductDataContext";
import Navbar from "../layout/Navbar";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";
import { RatingDataContext } from "../context/RatingDataContext";
import { Fragment } from "react";

const FavouritePage = () => {
    let userContext = React.useContext(UserDataContext);
    let productContext = React.useContext(ProductDataContext);
    let ratingContext = React.useContext(RatingDataContext);
     
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
                            <Fragment key={fav.productId}>
                                {productContext.product.map(prod => {
                                    return (
                                        fav.productId === prod.id
                                        ?
                                        <Productcard
                                            key={prod.id}
                                            productId={prod.id}
                                            productName={prod.name}
                                            productImage={prod.image}
                                            productRate={ratingContext.avgRate.filter((item) => {
                                                let rate = item.id === prod.id ? item.avg : 0;
                                                return rate;
                                            })}
                                        />
                                        :
                                        null
                                    )
                                })}
                            </Fragment>
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