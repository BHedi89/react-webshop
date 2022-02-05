import classes from "./Main.module.css";
import Hero from "../layout/Hero";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Card from "../layout/Card";
import ShapeDivider from "../layout/ShapeDivider";
import heroImage from "../images/lipstick/photo-1603775020644-eb8decd79994.jpg";
import img1 from "../images/eyes/pexels-photo-2463027.jpeg";
import img2 from "../images/eyes/pexels-photo-3912572.jpeg";
import img3 from "../images/eyes/pexels-photo-10593040.jpg";
import img4 from "../images/eyes/pexels-photo-1249632.jpg";
import img5 from "../images/lipstick/pexels-photo-3568544.jpeg";
import img6 from "../images/face/pexels-photo-2787341.jpeg";

const imageList = [
    { id: "1", src: img1 }, 
    { id: "2", src: img2 },
    { id: "3", src: img3 }, 
    { id: "4", src: img4 },
    { id: "5", src: img5 },
    { id: "6", src: img6 }
]

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
                    <Card 
                        cardImage={img1} 
                        minImage1={img1}
                        minImage2={img2}
                        minImage3={img3}
                    />
                    <Card 
                        cardImage={img4} 
                        minImage1={img4}
                        minImage2={img5}
                        minImage3={img6}
                    />
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Main;