import React from "react";
import classes from "./StarRating.module.css";
import { UserDataContext } from "../login/UserDataContext";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const StarRating = (props) => {
    const [rating, setRating] = React.useState([props.ratingnum]);
    const [hover, setHover] = React.useState(0);
    const [product, setProduct] = React.useState([]);
    let userContext = React.useContext(UserDataContext);

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
        {userContext?.user?.type === "user"
            ?
            <div className={classes.starrating}>
                {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || rating) ? classes.on : classes.off}
                                onClick={() => {setRating([index])}}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <span className={classes.star}>&#9733;</span>
                            </button>
                    )
                })}
            </div>
            :
            <div className={classes.starrating}>
                {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || rating) ? classes.on : classes.off}
                            >
                                <span className={classes.star}>&#9733;</span>
                            </button>
                    )
                    })}
            </div>
        }
            
       </>
    )
}

export default StarRating;