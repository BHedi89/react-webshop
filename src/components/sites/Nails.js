import React from "react";
import classes from "./Nails.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/imgage-page-title2.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const Nails = () => {
    const [nailmakeup, setNailmakeup] = React.useState([]);

    React.useEffect(() => {
        let isApiSubscribed = true;
        const nailmakeupList = [];
        fetch(`${FIREBASE_DOMAIN}/products.json`)
            .then(resp => resp.json())
            .then(products => {
                if(isApiSubscribed) {
                    for(const key in products){
                        if(products[key].category == "nail") {
                            const nailmakeupObj = {
                                id: key,
                                ...products[key]
                            };
                            nailmakeupList.push(nailmakeupObj);
                        }
                    }
                    for(let i = 0; i < nailmakeupList.length; i++) {
                        const reviewList = [];
                        for(const key in nailmakeupList[i].review) {
                            const reviewObj = {
                                id: key,
                                ...nailmakeupList[i].review[key]
                            }
                            reviewList.push(reviewObj);
                        }
                        nailmakeupList[i].review = reviewList;
                    }
                    setNailmakeup(nailmakeupList);
                }
            });
            return () => {
                isApiSubscribed = false;
            }
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