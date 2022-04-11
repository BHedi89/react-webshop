import React from "react";
import classes from "./Nails.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/hero-img-1.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";
import { ProductDataContext } from "../context/ProductDataContext";

const Nails = () => {
    const [nailmakeup, setNailmakeup] = React.useState([]);
    let productContext = React.useContext(ProductDataContext);

    React.useEffect(() => {
        let nailmakeupList = [];
        for(const key in productContext.product) {
            if(productContext.product[key].category === "nail") {
                nailmakeupList.push(productContext.product[key]);
            }
        }
        setNailmakeup(nailmakeupList);
    }, [])


    return (
        <>
            <Navbar />
            <Hero 
                title="Nail Polish"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.products}>
                {nailmakeup.map(product => {
                    return <Productcard 
                                key={product.id}
                                productId={product.id}
                                productName={product.name}
                                productImage={product.image}
                                productRate={product.review.map(() => {
                                    let sum = 0;
                                    product.review.forEach((obj) => sum += obj.rate);
                                    return Math.round(sum / product.review.length);
                                })}
                            />
                })}
                
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default Nails;