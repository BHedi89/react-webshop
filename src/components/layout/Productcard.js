import classes from "./Productcard.module.css";
import { Link } from "react-router-dom";
import StarRating from "./StartRating";

const Productcard = (props) => {
    return (
        <>
            <div className={classes.card}>
                <img src={props.productImage} />
                <div className={classes.container}>
                    <h1>{props.productName}</h1>
                    <StarRating  
                        ratingnum={props.productRate}
                    />
                    <Link to="#">Details</Link>
                </div>
            </div>
        </>
    )
}

export default Productcard;