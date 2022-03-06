import React from "react";
import classes from "./Lips.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/slilde2-1600x500.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const Lips = () => {
    const [lipsmakeup, setLipsmakeup] = React.useState([]);

    React.useEffect(() => {
        let isApiSubscribed = true;
        const lipsmakeupList = [];
        fetch(`${FIREBASE_DOMAIN}/products.json`)
            .then(resp => resp.json())
            .then(products => {
                if(isApiSubscribed) {
                    for(const key in products){
                        if(products[key].category == "lips") {
                            const lipsmakeupObj = {
                                id: key,
                                ...products[key]
                            };
                            lipsmakeupList.push(lipsmakeupObj);
                        }
                    }
                    for(let i = 0; i < lipsmakeupList.length; i++) {
                        const reviewList = [];
                        for(const key in lipsmakeupList[i].review) {
                            const reviewObj = {
                                id: key,
                                ...lipsmakeupList[i].review[key]
                            }
                            reviewList.push(reviewObj);
                        }
                        lipsmakeupList[i].review = reviewList;
                    }
                    setLipsmakeup(lipsmakeupList);
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