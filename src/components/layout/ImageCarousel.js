import classes from "./ImageCarousel.module.css";

const ImageCarousel = () =>  {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.carousel}>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                    <div className={classes.carousel__face}></div>
                </div>
            </div>
        </>
    );
};

export default ImageCarousel;