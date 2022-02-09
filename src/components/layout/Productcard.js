import classes from "./Productcard.module.css";

const Productcard = (props) => {
    return (
        <>
            <div className={classes.card}>
                <img src={props.productImage} />
                <div className={classes.container}>
                    <h1>{props.productName}</h1> 
                </div>
            </div>
        </>
    )
}

export default Productcard;