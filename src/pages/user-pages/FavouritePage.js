import React from "react";
import classes from "./FavouritePage.module.css";
import { UserDataContext } from "../../utils/context/UserDataContext";
import { ProductDataContext } from "../../utils/context/ProductDataContext";
import Navbar from "../../components/navbar/Navbar";
import ShapeDivider from "../../components/other-components/ShapeDivider";
import Footer from "../../components/hero-footer/Footer";
import Productcard from "../../components/cards/Productcard";
import { RatingDataContext } from "../../utils/context/RatingDataContext";
import { Fragment } from "react";
import { Link } from "react-router-dom";

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
                <div className={classes.linkcontainer}>
                    <Link to="/" className={classes.backlink}>Back to main</Link>
                </div>
                <div className={classes.favourites}>
                    {userContext.user.favourite.map(fav => {
                        return (
                            <Fragment key={fav.productId}>
                                {productContext.products.map(product => {
                                    return (
                                        fav.productId === product.id
                                        ?
                                        <Productcard
                                            key={product.id}
                                            productId={product.id}
                                            productName={product.name}
                                            productImage={product.image}
                                            productRate={ratingContext.avgRate.filter((item) => {
                                                let rate = item.id === product.id ? item.avg : 0;
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