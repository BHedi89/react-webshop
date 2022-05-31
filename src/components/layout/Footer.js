import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <>
            <div className={classes.footer}>
                <div className={classes.contact}>
                    <h4 className={classes.contactTitle}>Contact Info</h4>
                    <ul className={classes.list}>
                        <li> 
                            <FontAwesomeIcon icon={faEnvelope}/>
                            <span>wonderful-makeup@gmail.com</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhoneAlt}/>
                            <span>123456789</span>
                        </li>
                        <li>
                            <span className={classes.face}><FontAwesomeIcon icon={faFacebook}/></span>
                            <span><FontAwesomeIcon icon={faInstagram}/></span>
                            <span><FontAwesomeIcon icon={faTwitter}/></span>
                        </li>
                    </ul>
                </div>
                <div className={`${classes.logo}`}>
                    <a href="/" className={classes.logoName}>WM<br/><span>Wonderful Makeups</span></a>
                </div>
                <div>
                    <ul className={classes.list}>
                        <li>Customer Service</li>
                        <li>Delivery Info</li>
                        <li>Privacy Policy</li>
                        <li>Impressum</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer;