import React from "react";
import { useParams } from "react-router-dom";
import classes from "./DetailPage.module.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ShapeDivider from "../layout/ShapeDivider";
import StarRating from "../layout/StarRating";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const DetailPage = () => {
    let {id} = useParams();
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
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <>
                {product.map(product => {
                    if(product.id === id) {
                        console.log(product.review);
                        return (
                            <div className={classes.container} key={product.id}>
                                <div className={classes.image}>
                                    <img src={product.image}/>
                                </div>
                                <div className={classes.data}>
                                    <h1>{product.name}</h1>
                                    <div className={classes.reviewlink}>
                                        <StarRating 
                                            key={product.id}
                                            ratingnum={product.review.map(() => {
                                                let sum = 0;
                                                product.review.forEach((obj) => sum += obj.rate);
                                                return Math.round(sum / product.review.length);
                                            })}
                                            productId={product.id}
                                        />
                                        <a href="#">Write a review</a>
                                    </div>
                                    <p className={classes.price}>{`$${product.price}`}</p>
                                    <p className={classes.about}>{product.about}</p>
                                    <h3>Ingredients:</h3>
                                    <p className={classes.ingredients}>{product.ingredients}</p>
                                    <button className={classes.buybtn}>Buy now</button>
                                </div>
                            </div>
                        )
                    }
                
                })}
            </>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default DetailPage;