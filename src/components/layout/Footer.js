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
                            wonderful-makeup@gmail.com
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhoneAlt}/>
                            123456789
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faFacebook}/>
                            <FontAwesomeIcon icon={faInstagram}/>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </li>
                    </ul>
                </div>
                <div className={`${classes.logo}`}>
                    <div><a href="#">WM<br/><span>Wonderful Makeups</span></a></div>
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