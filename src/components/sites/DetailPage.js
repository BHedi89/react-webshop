import React from "react";
import { useParams } from "react-router-dom";
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
import { UserDataContext } from "../login/UserDataContext";
import Alert from "../layout/Alert";
import { useLocation } from "react-router-dom";
import { RatingDataContext } from "../context/RatingDataContext";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const DetailPage = () => {
    let {id} = useParams();
    const [product, setProduct] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let productContext = React.useContext(ProductDataContext);
    let userContext = React.useContext(UserDataContext);
    const location = useLocation();
    let ratingContext = React.useContext(RatingDataContext);
    // console.log(ratingContext);

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

    const handleClose = () => {
        setOpenAlert(!openAlert);
    }

    function getRate() {
        const contextArray = ratingContext.avgRate;
        const rate = contextArray.find(item => item.id === id);
        return rate.avg;
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
                                                ratingnum={getRate()}
                                                productId={product.id}
                                                // setOpen={open}
                                            />
                                            <button 
                                                className={classes.reviewbtn}
                                                onClick={() => setOpen(true)}>
                                                    Write a review
                                            </button>
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
                                        <button 
                                            className={classes.buybtn}
                                            onClick={addToCart}
                                        >
                                            Buy now
                                        </button>
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