import classes from "./Articlecard.module.css";

const Articlecard = (props) => {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.imageContainer}>
                    <img src={props.articleImage} alt="article"/>
                </div>
                <div className={classes.articletext}>
                    <h1>Lorem Ipsum</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum 
                        tincidunt mauris eget commodo. Suspendisse ac dictum lorem, quis vehicula lorem. 
                        Curabitur euismod eu lectus et pulvinar.
                    </p>
                    <h2>About Wonderful Makeups</h2>
                </div>
                
            </div>
            
        </>
    )
};

export default Articlecard;