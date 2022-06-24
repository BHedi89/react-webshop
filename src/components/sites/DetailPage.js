import React from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./DetailPage.module.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ShapeDivider from "../layout/ShapeDivider";
import StarRating from "../layout/StarRating";
import ReviewModal from "../layout/ReviewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ImCross } from "react-icons/im";
import { ProductDataContext } from "../context/ProductDataContext";
import { UserDataContext } from "../context/UserDataContext";
import Alert from "../layout/Alert";
import { RatingDataContext } from "../context/RatingDataContext";
import { FIREBASE_DOMAIN } from "../firebase/firebaseConfig";

const DetailPage = () => {
    let {id} = useParams();   
    const [product, setProduct] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let productContext = React.useContext(ProductDataContext);
    let userContext = React.useContext(UserDataContext);
    let ratingContext = React.useContext(RatingDataContext);
    let idx = ratingContext.avgRate.findIndex((item) => item.id === id);
    const [rateAvg, setRateAvg] = React.useState(ratingContext.avgRate[idx].avg);

    React.useEffect(() => {
        const productList = [];
        for(const key in productContext.product) {
            productList.push(productContext.product[key]);
        }
        setProduct(productList);
    }, []);

    const addToCart = () => {
        if(userContext.user !== null) {
            for(const key in product) {
                if(product[key].id === id) {
                    fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}/cart.json`, {
                        method: "POST",
                        body: JSON.stringify({
                            productId: product[key].id,
                            productName: product[key].name,
                            productPrice: product[key].price,
                            productImage: product[key].image
                        })
                    })
                    .then(resp => resp.json())
                    .then(({name}) => {
                        let userCopy = {...userContext.user};
                        setAlertMsg("Product added to your cart!");
                        userCopy.cart.push({
                            id: name,
                            productId: product[key].id,
                            productName: product[key].name,
                            productPrice: product[key].price,
                            productImage: product[key].image
                        })
                        userContext.setUser(userCopy);
                        setOpenAlert(!openAlert);
                    });
                }
            }
        } else {
            setAlertMsg("Log in to buy this product.");
            setOpenAlert(!openAlert);
        }
    }

    const openReviewModal = () => {
        if(userContext.user === null){
            setAlertMsg("Log in to review this product.");
            setOpenAlert(!openAlert);
            setOpen(false);
        } else {
           setOpen(true); 
        }
    }

    const handleClose = () => {
        setOpenAlert(!openAlert);
    }
    
    return (
        <>
            <Navbar />
            <div className={classes.hero}></div>
            <ShapeDivider />
            <>
                {openAlert && <Alert
                        content={<>
                            <p>{alertMsg}</p>
                        </>}
                        handleClose={handleClose}
                />}
                {product.map(product => {
                    if(product.id === id) {
                        return (
                            <div key={product.id}>
                                <div className={classes.container}>
                                    <div className={classes.image}>
                                        <img src={product.image}/>
                                    </div>
                                    <div className={classes.data}>
                                        <h1>{product.name}</h1>
                                        <div className={classes.reviewlink}>
                                            <StarRating 
                                                key={product.id}
                                                ratingnum={rateAvg}
                                                productId={product.id}
                                                open={open}
                                            />
                                            <button 
                                                className={classes.reviewbtn}
                                                onClick={openReviewModal}>
                                                    Write a review
                                            </button>
                                            {open &&  <ReviewModal 
                                                        setOpen={setOpen}
                                                        productId={product.id}
                                                        productName={product.name}
                                                        open={open}
                                                        setRateAvg={setRateAvg}
                                                    />}
                                        </div>
                                        <p className={classes.price}>{`$${product.price}`}</p>
                                        <p className={classes.about}>{product.about}</p>
                                        <h3 className={classes.ingredientstitle}>Ingredients:</h3>
                                        <p className={classes.ingredients}>{product.ingredients}</p>
                                        <div className={classes.buyorback}>
                                            <button 
                                                className={classes.buybtn}
                                                onClick={addToCart}
                                            >
                                                Buy now
                                            </button>
                                            <Link to={`/${product.category}`} className={classes.backlink}>Back to product page</Link>
                                        </div>
                                    </div>
                                </div>
                                <ShapeDivider />
                                <div className={classes.reviewscontainer}>
                                    <h1 className={classes.reviewstitle}>Ratings and Reviews</h1>
                                    {product.review.map(review => {
                                        return (
                                            <div className={classes.reviewcontainer} key={review.id}>
                                                <div className={classes.personaldata}>
                                                    <h3>{review.name}</h3>
                                                    <p>Age: {review.age}</p>
                                                </div>
                                                <div className={classes.reviewdata}>
                                                    <StarRating 
                                                        ratingnum={review.rate}
                                                        open={open}
                                                    />
                                                    <h2>{review.title}</h2>
                                                    <p>{review.text}</p>
                                                    {review.recommend === "yes"
                                                        ?
                                                        <p>
                                                            Recommended this product: 
                                                            <FontAwesomeIcon 
                                                                icon={faCheck} 
                                                                className={`${classes.icon} ${classes.yes}`}
                                                            />
                                                            {review.recommend}
                                                        </p>
                                                        :
                                                        <p>
                                                            Recommended this product: 
                                                            <ImCross className={`${classes.icon} ${classes.no}`}/>
                                                            {review.recommend}
                                                        </p>
                                                    }
                                                    
                                                </div>
                                            </div>
                                        )
                                    })}
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