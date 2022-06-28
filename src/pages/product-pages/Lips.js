import React from "react";
import classes from "./Lips.module.css";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero-footer/Hero";
import heroImage from "../../assets/images/hero/requestappointmentbg.jpg";
import ShapeDivider from "../../components/other-components/ShapeDivider";
import Footer from "../../components/hero-footer/Footer";
import Productcard from "../../components/cards/Productcard";
import { ProductDataContext } from "../../utils/context/ProductDataContext";
import { RatingDataContext } from "../../utils/context/RatingDataContext";

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