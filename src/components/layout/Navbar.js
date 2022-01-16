import classes from "./Navbar.module.css";
import { useState } from "react";

const Navbar = () => {
    const [isActive, setActive] = useState(false);

    const logoTrigger = () => {
        setActive(!isActive);
    }

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li className={isActive ? classes.visible : null}><a href="#">Face</a></li>
                        <li className={isActive ? classes.visible : null}><a href="#">Lips</a></li>
                        <li className={isActive ? classes.visible : null}><a href="#">Eyes</a></li>
                        <li className={`${classes.logo} ${classes.logotrigger}`} 
                            onClick={logoTrigger}><a href="#">WM<br/><span>Wonderful Makeups</span></a></li>
                        <li className={isActive ? classes.visible : null}><a href="#">Nails</a></li>
                        <li className={isActive ? classes.visible : null}><a href="#">Contact</a></li>
                        <li className={isActive ? classes.visible : null}><a href="#">Login</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Navbar;