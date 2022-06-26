import React from "react";
import classes from "./ReviewModal.module.css";
import { StarRating } from "./StarRating";
import { ProductDataContext } from "../context/ProductDataContext";
import { RatingDataContext } from "../context/RatingDataContext";
import { FIREBASE_DOMAIN } from "../firebase/firebaseConfig";

const ReviewModal = (props) => {
    const [checked, setChecked] = React.useState(true);
    const [rate, setRate] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [age, setAge] = React.useState("");
    const [review, setReview] = React.useState("");
    const [recommend, setRecommend] = React.useState("yes");
    let productContext = React.useContext(ProductDataContext);
    let ratingContext = React.useContext(RatingDataContext);

    const getRate = (rateNum) => {
        setRate(rateNum);
    }

    const postReview = () => {
        fetch(`${FIREBASE_DOMAIN}/products/${props.productId}/review.json`, {
            method: "POST",
            body: JSON.stringify({
                rate: rate,
                name: nickname,
                title: title,
                age: age,
                text: review,
                recommend: recommend
            })
        })
        .then(resp => resp.json())
        .then(({name}) => {
            let productCopy = {...productContext.products};
            for(const idx in productCopy){
                productCopy[idx].review.push({
                    id: name,
                    rate: rate,
                    name: nickname,
                    title: title,
                    age: age,
                    text: review,
                    recommend: recommend
                })
                productContext.setProducts(productCopy);
            }

            for(const idx in ratingContext.avgRate){
                if(props.productId === ratingContext.avgRate[idx].id) {
                    let newAvg = (ratingContext.avgRate[idx].avg + rate) / 2;
                    ratingContext.avgRate[idx].avg = Math.round(newAvg);
                    ratingContext.setRate(ratingContext.avgRate);
                    props.setRateAvg(Math.round(newAvg));
                }
            };

            props.setOpenReview(false);
        })
    }

    return (
        <>
            <div className={classes.darkBG}/>
            <div className={classes.centered}>
                <div className={classes.modal}>
                <div className={classes.modalHeader}>
                    <h3 className={classes.heading}>{props.productName}</h3>
                </div>
                <div className={classes.modalContent}>
                    <p className={classes.require}>Required fields are marked with *</p>
                    <hr className={classes.hr}/>
                    <div className={classes.container}>
                        <form>
                            <ul className={classes.flexouter}>
                                <li>
                                    <label>Rating*:</label>
                                    <StarRating 
                                        productId={props.productId}
                                        isOpenReview={props.isOpenReview}
                                        sendRate={getRate}
                                    />
                                </li>
                                <li>
                                    <label>Nickname*:</label>
                                    <input 
                                        type="text" 
                                        onChange={(e) => setNickname(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label>Title*:</label>
                                    <input 
                                        type="text" 
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label>Age*:</label>
                                    <select 
                                        className={classes.select}
                                        onChange={(e) => setAge(e.target.value)}
                                    >
                                        <option>Select</option>
                                        <option value="17 or under">17 or under</option>
                                        <option value="18 to 24">18 to 24</option>
                                        <option value="25 to 34">25 to 34</option>
                                        <option value="35 to 44">35 to 44</option>
                                        <option value="45 to 54">45 to 54</option>
                                        <option value="55 to 64">55 to 64</option>
                                        <option value="65 or over">65 or over</option>
                                    </select>
                                </li>
                                <li>
                                    <label htmlFor="review">Review*:</label>
                                    <textarea 
                                        rows="3" 
                                        id="review"
                                        onChange={(e) => setReview(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <p>Recommend*:</p>
                                    <ul className={classes.flexinner}>
                                        <li>
                                            <label htmlFor="yes">
                                                Yes:
                                                <input 
                                                    type="radio" 
                                                    id="yes"
                                                    value="yes"
                                                    checked={checked}
                                                    onChange={(e) => {
                                                        setChecked(true);
                                                        setRecommend(e.target.value);
                                                    }}
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="no">
                                                No:
                                                <input 
                                                    type="radio" 
                                                    id="no" 
                                                    value="no"
                                                    checked={!checked}
                                                    onChange={(e) => {
                                                        setChecked(false);
                                                        setRecommend(e.target.value);
                                                    }}
                                                />
                                            </label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </form>
                    </div>   
                </div>
                <div className={classes.modalActions}>
                    <div className={classes.actionsContainer}>
                        <button 
                            className={classes.postBtn} 
                            onClick={postReview}
                        >
                            Post Review
                        </button>
                        <button
                            className={classes.cancelBtn}
                            onClick={() => props.setOpenReview(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </>
        
    )
}

export default ReviewModal;