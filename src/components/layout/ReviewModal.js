import React from "react";
import classes from "./ReviewModal.module.css";
import { UserDataContext } from "../login/UserDataContext";
import StarRating from "./StarRating";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const  ReviewModal = (props) => {
    let userContext = React.useContext(UserDataContext);
    const [checked, setChecked] = React.useState(true);
    const [rate, setRate] = React.useState(0);
    const [review, setReview] = React.useState("");
    const [recommend, setRecommend] = React.useState("yes");

    const postReview = () => {
        fetch(`${FIREBASE_DOMAIN}/products/${props.productId}/review.json`, {
            method: "POST",
            body: JSON.stringify({
                rate: 2,
                name: userContext.user.name,
                text: review,
                recommend: recommend
            })
        })
        .then(resp => resp.json());
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
                                    />
                                </li>
                                <li>
                                    <label>Name*:</label>
                                    <input type="text" defaultValue={userContext.user.name}/>
                                </li>
                                <li>
                                    <label htmlFor="review">Review*:</label>
                                    <textarea 
                                        rows="6" 
                                        id="review"
                                        onChange={(e) => setReview(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <p>Recommend*:</p>
                                    <ul className={classes.flexinner}>
                                        <li>
                                            <label htmlFor="yes" >Yes:</label>
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
                                        </li>
                                        <li>
                                            <label htmlFor="no">No:</label>
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
                            onClick={() => props.setOpen(false)}
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