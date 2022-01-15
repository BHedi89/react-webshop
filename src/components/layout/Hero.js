import classes from "./Hero.module.css";

const Header = props => {
    return (
        <> 
            <section className={classes.hero}>
                <div className={classes.herocontent}>
                    <h1 className={classes.herotitle}>{props.title}</h1>
                </div>
            </section>
        </>
    )
}

export default Header;