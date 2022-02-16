import React from "react";
import classes from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dropdownbutton from "./Dropdownbutton";
import { UserDataContext } from "../login/UserDataContext";

const Navbar = () => {
  const [isActive, setActive] = React.useState(false);
  let userContext = React.useContext(UserDataContext);

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
              <Link to="#">Face</Link>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${classes.two}`}
            >
              <Link to="#">Lips</Link>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${classes.three}`}
            >
              <Link to="#">Eyes</Link>
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
              <Link to="#">Nails</Link>
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${classes.six}`}
            >
              {userContext?.user?.type === "user" 
                ? 
                <Dropdownbutton/>
                :
                <Link to="/login">Login</Link>
              }
            </li>
            <li
              className={`${isActive ? classes.visible : null} ${classes.seven}`}
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
