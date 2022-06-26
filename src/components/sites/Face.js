import React from "react";
import classes from "./Face.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/valenciasalon.seesite.biz_--_719127119.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";
import { ProductDataContext } from "../context/ProductDataContext";
import { RatingDataContext } from "../context/RatingDataContext";

const Face = () => {
    const [facemakeup, setFacemakeup] = React.useState([]);
    let productContext = React.useContext(ProductDataContext);
    let ratingContext = React.useContext(RatingDataContext);

    React.useEffect(() => {
        const facemakeupList = [];
        for(const key in productContext.products) {
            if(productContext.products[key].category === "face") {
                facemakeupList.push(productContext.products[key]);
            }
        }
        setFacemakeup(facemakeupList);
    }, [])


    return (
        <>
            <Navbar />
            <Hero 
                title="Face Makeup"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.products}>
                {facemakeup.map(product => {
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

export default Face;