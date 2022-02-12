import classes from "./Navbar.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isActive, setActive] = useState(false);

  const logoTrigger = () => {
    setActive(!isActive);
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li
              className={`${isActive ? classes.visible : null} ${classes.one}`}
            >
              <a href="#">Face</a>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${classes.two}`}
            >
              <a href="#">Lips</a>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${
                classes.three
              }`}
            >
              <a href="#">Eyes</a>
            </li>
            <li
              className={`${classes.logo} ${classes.four}`}
              onClick={logoTrigger}
            >
              <a href="#">
                WM
                <br />
                <span>Wonderful Makeups</span>
              </a>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${classes.five}`}
            >
              <a href="#">Nails</a>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${classes.six}`}
            >
              <a href="#">Login</a>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${
                classes.seven
              }`}
            >
              <a href="#">
                <FontAwesomeIcon icon={faShoppingBasket} className={classes.icon} />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
