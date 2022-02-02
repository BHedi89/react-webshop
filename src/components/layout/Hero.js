import classes from "./Hero.module.css";

const Hero = props => {
    return (
        <> 
            <section className={classes.hero} style={{backgroundImage: `url(${props.heroImage})`}}>
                <div className={classes.herocontent}>
                    <h1 className={classes.herotitle}>{props.title}</h1>
                </div>
            </section>
        </>
    )
}

export default Hero;