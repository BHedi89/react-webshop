import Hero from "../layout/Hero";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Card from "../layout/Card";
import ShapeDivider from "../layout/ShapeDivider";
import heroImage from "../images/lipstick/photo-1603775020644-eb8decd79994.jpg";
import classes from "./Main.module.css";

const Main = () => {
    return (
        <>
            <Navbar/>
            <Hero 
                title="Wonderful Makeups"
                heroImage={heroImage}
            />
            
            <div className={classes.content}>
                <div className={classes.cardsectionTitle}>
                    <h1>Wonderful Colors</h1>
                </div>
               <ShapeDivider></ShapeDivider>
                <div className={classes.cardscontainer}>
                    <Card></Card>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Main;