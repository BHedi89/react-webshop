import React from "react";
import classes from "./Lips.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../../assets/images/hero/requestappointmentbg.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";
import { ProductDataContext } from "../context/ProductDataContext";
import { RatingDataContext } from "../context/RatingDataContext";

const Lips = () => {
    const [lipsmakeup, setLipsmakeup] = React.useState([]);
    let productContext = React.useContext(ProductDataContext);
    let ratingContext = React.useContext(RatingDataContext);

    React.useEffect(() => {
        const lipsmakeupList = [];
        for(const key in productContext.products) {
            if(productContext.products[key].category === "lips") {
                lipsmakeupList.push(productContext.products[key]);
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

export default Lips;