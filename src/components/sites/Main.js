import Hero from "../layout/Hero";
import Navbar from "../layout/Navbar";

const Main = () => {
    return (
        <>
            <Navbar/>
            <Hero 
                title="Wonderful Makeups"
                // img={heroImageList[0].src}
            />
        </>
    )
}

export default Main;