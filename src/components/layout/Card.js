import classes from "./Card.module.css";
import { useState } from "react";

const Card = (props) =>  {
    const [changeImage, setChangeImage] = useState(props.cardImage);

    const changeImageHandler = (e) => {
        let source = e.target.getAttribute("src")
        setChangeImage(source);
    }

    return (
        <main>
            <section className={classes.maincard}>
                <div className={classes.cardcontent}>
                    <div className={classes.contentleft}>
                        <img className={classes.fullimg} 
                            src={changeImage} />
                    </div>
                    <div className={classes.contentright}>
                        <h2 className={classes.cardtitle}>Outdoor Experience</h2>
                        <p>It’s windy. The cool breeze of the lake. It gives, a sense of beauty, in motion. All is flowing, rushing and tide-And I sit in wonder, dreaming beside.</p>
                        <div className={classes.miniimgs}>
                            <img className={classes.miniimg} 
                                src={props.minImage1} 
                                onClick={changeImageHandler} />
                            <img className={classes.miniimg} 
                                src={props.minImage2} 
                                onClick={changeImageHandler} />
                            <img className={classes.miniimg} 
                                src={props.minImage3} 
                                onClick={changeImageHandler} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Card;