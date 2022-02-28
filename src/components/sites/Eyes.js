import React from "react";
import classes from "./Eyes.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/1620999293250botox-for-hyperhidrosis.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const Eyes = () => {
    const [eyemakeup, setEyemakeup] = React.useState([]);

    React.useEffect(() => {
        let isApiSubscribed = true;
        const eyemakeupList = [];
        fetch(`${FIREBASE_DOMAIN}/products.json`)
            .then(resp => resp.json())
            .then(products => {
                if(isApiSubscribed) {
                    for(const key in products){
                        if(products[key].category == "eye") {
                            const eyemakeupObj = {
                                id: key,
                                ...products[key]
                            };
                            eyemakeupList.push(eyemakeupObj);
                        }
                    }
                    for(let i = 0; i < eyemakeupList.length; i++) {
                        const reviewList = [];
                        for(const key in eyemakeupList[i].review) {
                            const reviewObj = {
                                id: key,
                                ...eyemakeupList[i].review[key]
                            }
                            reviewList.push(reviewObj);
                        }
                        eyemakeupList[i].review = reviewList;
                    }
                    setEyemakeup(eyemakeupList);
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
                title="Eye Makeup"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.products}>
                {eyemakeup.map(product => {
                    return <Productcard 
                                key={product.id}
                                productName={product.name}
                                productImage={product.image}
                                productRate={product.review[0].rate}
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