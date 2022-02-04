import classes from "./ImageCarousel.module.css";

const ImageCarousel = () =>  {
    return (
        <>
            <div className={classes.container}>
                <ul className={classes.slides}>
                    <li id="slide1"><img src={require("../images/carousel/slide1.jpg")} alt="" /></li>
                    <li id="slide2"><img src={require("../images/carousel/slide2.jpg")} alt="" /></li>
                    <li id="slide3"><img src={require("../images/carousel/slide3.jpg")} alt="" /></li>
                    <li id="slide4"><img src={require("../images/carousel/slide4.jpg")} alt="" /></li>
                    <li id="slide5"><img src={require("../images/carousel/slide5.jpg")} alt="" /></li>
                </ul>

                <ul className={classes.thumbnails}>
                    <li>
                        <a href="#slide1"><img src={require("../images/carousel/slide1.jpg")} /></a>
                    </li>
                    <li>
                        <a href="#slide2"><img src={require("../images/carousel/slide2.jpg")} /></a>
                    </li>
                    <li>
                        <a href="#slide3"><img src={require("../images/carousel/slide3.jpg")} /></a>
                    </li>
                    <li>
                        <a href="#slide4"><img src={require("../images/carousel/slide4.jpg")} /></a>
                    </li>
                    <li>
                        <a href="#slide5"><img src={require("../images/carousel/slide5.jpg")} /></a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ImageCarousel;