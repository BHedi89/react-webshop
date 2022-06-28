import React from "react";
import classes from "./Eyes.module.css";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero-footer/Hero";
import heroImage from "../../assets/images/hero/vfgf.jpg";
import ShapeDivider from "../../components/other-components/ShapeDivider";
import Footer from "../../components/hero-footer/Footer";
import Productcard from "../../components/cards/Productcard";
import { ProductDataContext } from "../../utils/context/ProductDataContext";
import { RatingDataContext } from "../../utils/context/RatingDataContext";

const Eyes = () => {
    const [eyemakeup, setEyemakeup] = React.useState([]);
    let productContext = React.useContext(ProductDataContext);
    let ratingContext = React.useContext(RatingDataContext);

    React.useEffect(() => {
        const eyemakeupList = [];
        for(const key in productContext.products) {
            if(productContext.products[key].category === "eyes") {
                eyemakeupList.push(productContext.products[key]);
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