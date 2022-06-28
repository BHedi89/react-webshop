import classes from "./Hero.module.css";
import { Link } from "react-router-dom";

const Hero = props => {
    return (
        <> 
            <section className={classes.hero} style={{backgroundImage: `url(${props.heroImage})`}}>
                <div className={classes.herocontent}>
                    <h1 className={classes.herotitle}><Link to="/">{props.title}</Link></h1>
                </div>
            </section>
        </>
    )
}

export default Hero;