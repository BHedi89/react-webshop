import React from "react";
import classes from "./Main.module.css";
import Hero from "../layout/Hero";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Card from "../layout/Card";
import Productcard from "../layout/Productcard";
import ShapeDivider from "../layout/ShapeDivider";
import Articlecard from "../layout/Articlecard";
import heroImage from "../images/hero/photo-1603775020644-eb8decd79994.jpg";
import img1 from "../images/eyes/pexels-photo-2463027.jpeg";
import img2 from "../images/eyes/pexels-photo-3912572.jpeg";
import img3 from "../images/eyes/pexels-photo-10593040.jpg";
import img4 from "../images/eyes/pexels-photo-1249632.jpg";
import img5 from "../images/lipstick/pexels-photo-3568544.jpeg";
import img6 from "../images/face/pexels-photo-2787341.jpeg";
import articleImage from "../images/longImages/photo-1613565015448-fe6c5dc9ec40.jpg";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 
 
const Main = () => {
    const [product, setProduct] = React.useState([]);

    React.useEffect(() => {
        let isApiSubscribed = true;
        const productList = [];
        fetch(`${FIREBASE_DOMAIN}/products.json`)
            .then(resp => resp.json())
            .then(products => {
                if(isApiSubscribed) {
                    for(const key in products){
                        const productObj = {
                            id: key,
                            ...products[key]
                        };
                        productList.push(productObj);
                    }
                    for(let i = 0; i < productList.length; i++) {
                        const reviewList = [];
                        for(const key in productList[i].review) {
                            const reviewObj = {
                                id: key,
                                ...productList[i].review[key]
                            }
                            reviewList.push(reviewObj);
                        }
                        productList[i].review = reviewList;
                    }
                    setProduct(productList);
                }
            });
            return () => {
                isApiSubscribed = false;
            }
    }, [])

    return (
        <>
            <Navbar/>
            <Hero 
                title="Wonderful Makeups"
                heroImage={heroImage}
            />
            <div className={classes.content}>
                <div className={classes.sectionTitle}>
                    <h1>Wonderful Colors</h1>
                </div>
               <ShapeDivider></ShapeDivider>
                <div className={classes.cardscontainer}>
                    <Card 
                        cardImage={img1} 
                        minImage1={img1}
                        minImage2={img2}
                        minImage3={img3}
                    />
                    <Card 
                        cardImage={img4} 
                        minImage1={img4}
                        minImage2={img5}
                        minImage3={img6}
                    />
                </div>
                <div className={classes.sectionTitle}>
                    <h1>Best Sellers</h1>
                </div>
                <ShapeDivider></ShapeDivider>
                <div className={classes.products}>
                    {product.map((products) => {
                        if(products.bestseller) {
                            return <Productcard
                                        key={products.id}
                                        productName={products.name}
                                        productImage={products.image}
                                        productRate={products.review.map(() => {
                                            let sum = 0;
                                            products.review.forEach((obj) => sum += obj.rate);
                                            return Math.round(sum / products.review.length);
                                        })}
                                    />
                        }  
                    })}
                </div>
                <ShapeDivider></ShapeDivider>
                <div className={classes.about}>
                    <Articlecard 
                        articleImage={articleImage}
                    />
                </div>
                <ShapeDivider></ShapeDivider>
            </div>
            <div className={classes.footer}>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Main;