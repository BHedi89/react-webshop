import React from "react";
import { useParams } from "react-router-dom";
import classes from "./DetailPage.module.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ShapeDivider from "../layout/ShapeDivider";

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
            <div className={classes.container}>
                {product.map(product => {
                    if(product.id === id) {
                        return (
                            <div key={product.id}>
                                <h1>{product.name}</h1>
                            </div>
                        )
                    }
                
                })}
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default DetailPage;