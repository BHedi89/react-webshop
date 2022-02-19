import classes from "./Alert.module.css";

const Alert = props => {
    return (
        <div className={classes.popupbox}>
            <div className={classes.box}>
                {props.content}
                <button className={classes.closebtn} onClick={props.handleClose}>Close</button>
            </div>
        </div>
    )
}

export default Alert;