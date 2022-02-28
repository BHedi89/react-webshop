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
                                productName={product.name}
                                productImage={product.image}
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