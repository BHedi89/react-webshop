import React from "react";
import classes from "./Lips.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/requestappointmentbg.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";
import { ProductDataContext } from "../context/ProductDataContext";

const Lips = () => {
    const [lipsmakeup, setLipsmakeup] = React.useState([]);
    let productContext = React.useContext(ProductDataContext);

    React.useEffect(() => {
        const lipsmakeupList = [];
        for(const key in productContext.product) {
            if(productContext.product[key].category === "lips") {
                lipsmakeupList.push(productContext.product[key]);
            }
        }
        setLipsmakeup(lipsmakeupList);
    }, [])


    return (
        <>
            <Navbar />
            <Hero 
                title="Lip Makeup"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.products}>
                {lipsmakeup.map(product => {
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

export default Lips;