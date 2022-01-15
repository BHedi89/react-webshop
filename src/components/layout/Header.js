import classes from "./Header.module.css";

const Header = props => {
    return (
        <>
            <div className={classes.headercontainer}>
                <div className={classes.headerimage}>
                    <h1 className={classes.headertext}>{props.title}</h1>
                </div>
            </div>
            
        </>
    )
}

export default Header;