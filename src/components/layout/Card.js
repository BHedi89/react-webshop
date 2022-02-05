import classes from "./Card.module.css";
import { useState } from "react";

const Card = (props) =>  {
    const [changeImage, setChangeImage] = useState(false);

    function changeImageHandler(x) {
        // setChangeImage(prevImg => !prevImg)
        let fullImg = document.querySelector(".full-img");
        let miniImg = document.querySelectorAll(".mini-img");
        let targetImg = miniImg[x - 1];
        let imgAttr = targetImg.getAttribute("src");

        fullImg.setAttribute("src", imgAttr);
    }

    return (
        <main>
            <section className={classes.maincard}>
                <div className={classes.cardcontent}>
                    <div className={classes.contentleft}>
                        <img className={classes.fullimg} 
                            src={props.cardImage} />
                    </div>
                    <div className={classes.contentright}>
                        <h2>Outdoor Experience</h2>
                        <p>It’s windy. The cool breeze of the lake. It gives, a sense of beauty, in motion. All is flowing, rushing and tide-And I sit in wonder, dreaming beside.</p>
                        <div className={classes.miniimgs}>
                            <img className={classes.miniimg} 
                                src={props.minImage1} 
                                onClick={() => changeImageHandler} />
                            <img className={classes.miniimg} 
                                src={props.minImage2} 
                                onClick={() => changeImageHandler} />
                            <img className={classes.miniimg} 
                                src={props.minImage3} 
                                onClick={() => changeImageHandler} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Card;