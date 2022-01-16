import classes from "./Hero.module.css";
import heroImage from "../images/lipstick/photo-1603775020644-eb8decd79994.jpg";

const Hero = props => {
    return (
        <> 
            <section className={classes.hero} style={{backgroundImage: `url(${heroImage})`}}>
                <div className={classes.herocontent}>
                    <h1 className={classes.herotitle}>{props.title}</h1>
                </div>
            </section>
        </>
    )
}

export default Hero;