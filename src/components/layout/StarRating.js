import React from "react";
import classes from "./StarRating.module.css";
import { useNavigate } from "react-router-dom";

export const StarRating = (props) => {
    const [rating, setRating] = React.useState([props.ratingnum]);
    const [hover, setHover] = React.useState(0);
    let navigate = useNavigate();
    
    React.useEffect(() => {
        setRating(props.ratingnum)
    }, [props.ratingnum])

    const navigateToDeatailPage = () => {
        navigate(`/details/${props.productId}`, {replace: true});
    }
    
    return (
        <>
            {props.isOpenReview === true
                ?
                <div className={classes.starrating}>
                    {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || rating) ? classes.on : classes.off}
                                    onClick={() => {setRating([index]); props.sendRate(index)}}
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
                                    onClick={navigateToDeatailPage}
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