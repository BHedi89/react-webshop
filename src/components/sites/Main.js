import Hero from "../layout/Hero";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import heroImage from "../images/lipstick/photo-1603775020644-eb8decd79994.jpg";

const Main = () => {
    return (
        <>
            <Navbar/>
            <Hero 
                title="Wonderful Makeups"
                heroImage={heroImage}
            />
            <Footer></Footer>
        </>
    )
}

export default Main;