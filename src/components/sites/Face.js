import React from "react";
import classes from "./Face.module.css";
import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import heroImage from "../images/hero/TTS-Web-Blog-Hair.jpg";
import ShapeDivider from "../layout/ShapeDivider";
import Footer from "../layout/Footer";
import Productcard from "../layout/Productcard";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const Face = () => {
    const [facemakeup, setFacemakeup] = React.useState([]);

    React.useEffect(() => {
        let isApiSubscribed = true;
        const facemakeupList = [];
        fetch(`${FIREBASE_DOMAIN}/products.json`)
            .then(resp => resp.json())
            .then(products => {
                if(isApiSubscribed) {
                    for(const key in products){
                        if(products[key].category == "face") {
                            const facemakeupObj = {
                                id: key,
                                ...products[key]
                            };
                            facemakeupList.push(facemakeupObj);
                        }
                    }
                    for(let i = 0; i < facemakeupList.length; i++) {
                        const reviewList = [];
                        for(const key in facemakeupList[i].review) {
                            const reviewObj = {
                                id: key,
                                ...facemakeupList[i].review[key]
                            }
                            reviewList.push(reviewObj);
                        }
                        facemakeupList[i].review = reviewList;
                    }
                    setFacemakeup(facemakeupList);
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
                title="Face Makeup"
                heroImage={heroImage}
            />
            <ShapeDivider />
            <div className={classes.products}>
                {facemakeup.map(product => {
                    console.log(product.review)
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

export default Face;