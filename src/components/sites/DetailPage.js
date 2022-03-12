import React from "react";
import { useParams } from "react-router-dom";
import classes from "./DetailPage.module.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ShapeDivider from "../layout/ShapeDivider";
import StarRating from "../layout/StarRating";
import ReviewModal from "../layout/ReviewModal";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const DetailPage = () => {
    let {id} = useParams();
    let {rate} = useParams();
    const [product, setProduct] = React.useState([]);
    const [open, setOpen] = React.useState(false);

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
                        return (
                            <div key={product.id}>
                                <div className={classes.container} >
                                    <div className={classes.image}>
                                        <img src={product.image}/>
                                    </div>
                                    <div className={classes.data}>
                                        <h1>{product.name}</h1>
                                        <div className={classes.reviewlink}>
                                            <StarRating 
                                                key={product.id}
                                                ratingnum={rate}
                                                productId={product.id}
                                            />
                                            <a href="#" onClick={() => setOpen(true)}>Write a review</a>
                                            {open &&  <ReviewModal 
                                                        setOpen={setOpen}
                                                        productId={product.id}
                                                        productName={product.name}
                                                      />}
                                        </div>
                                        <p className={classes.price}>{`$${product.price}`}</p>
                                        <p className={classes.about}>{product.about}</p>
                                        <h3 className={classes.ingredientstitle}>Ingredients:</h3>
                                        <p className={classes.ingredients}>{product.ingredients}</p>
                                        <button className={classes.buybtn}>Buy now</button>
                                    </div>
                                </div>
                                <ShapeDivider />
                                <div className={classes.reviewcontainer}>
                                    
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