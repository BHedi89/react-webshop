import React from "react";
import classes from "./Eyes.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/vfgf.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";
import { ProductDataContext } from "../context/ProductDataContext";
import { RatingDataContext } from "../context/RatingDataContext";

const Eyes = () => {
    const [eyemakeup, setEyemakeup] = React.useState([]);
    let productContext = React.useContext(ProductDataContext);
    let ratingContext = React.useContext(RatingDataContext);

    React.useEffect(() => {
        const eyemakeupList = [];
        for(const key in productContext.product) {
            if(productContext.product[key].category === "eye") {
                eyemakeupList.push(productContext.product[key]);
            }
        }
        setEyemakeup(eyemakeupList);
    }, [])

    return (
        <>
            <Navbar />
            <Hero 
                title="Eye Makeup"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.products}>
                {eyemakeup.map(product => {
                    return <Productcard 
                                key={product.id}
                                productName={product.name}
                                productId={product.id}
                                productImage={product.image}
                                productRate={ratingContext.avgRate.filter((item) => {
                                    let rate = item.id === product.id ? item.avg : 0;
                                    return rate;
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

export default Eyes;