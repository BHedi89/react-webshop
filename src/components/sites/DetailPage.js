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

const DetailPage = () => {
    let {id} = useParams();
    let {rate} = useParams();
    const [product, setProduct] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    let productContext = React.useContext(ProductDataContext);

    React.useEffect(() => {
        const productList = [];
        for(const key in productContext.product) {
            productList.push(productContext.product[key]);
        }
        setProduct(productList);
        
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
                                                setOpen={open}
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
                                        <button className={classes.buybtn}>Buy now</button>
                                    </div>
                                </div>
                                <ShapeDivider />
                                <div className={classes.reviewscontainer}>
                                    <h1 className={classes.reviewstitle}>Ratings and Reviews</h1>
                                    {product.review.map(review => {
                                        return (
                                            <div className={classes.reviewcontainer}>
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