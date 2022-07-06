import React from "react";
import classes from "./FavouriteHeart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductDataContext } from "../../utils/context/ProductDataContext";
import { UserDataContext } from "../../utils/context/UserDataContext";
import Alert from "./Alert";
import { postFavouriteProduct, deleteFavouriteProduct } from "../../modules/user-service";

const FavouriteHeart = (props) => {
    const [alert, setAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let productContext = React.useContext(ProductDataContext);
    let userContext = React.useContext(UserDataContext);
    const [favourite, setFavourite] = React.useState(false);

    const addFavourite = () => {        
        productContext.products.map(product => {
            if(product.id === props.productId) {
                let productObj = {productId: product.id};
                postFavouriteProduct(userContext.user.uid, productObj)
                    .then(({name}) => {
                        setAlertMsg("Product added to your favourites!");
                        setAlert(!alert);
                        let userCopy = {...userContext.user};
                        userCopy.favourite.push({
                            id: name,
                            productId: product.id
                        })
                        userContext.setUser(userCopy);
                    });
            }
        })
    }

    const removeFromFavourite = () =>  {
        productContext.products.map(product => {
            if(product.id === props.productId) {
                for(const key in userContext.user.favourite){
                    if(userContext.user.favourite[key].productId === product.id){
                        let id = userContext.user.favourite[key].id;
                        deleteFavouriteProduct(userContext.user.uid, id)
                            .then(() => {
                                setAlertMsg("Product removed from your favourites!");
                                setAlert(!alert);
                                
                                let userCopy = {...userContext.user};
                                let idx = userCopy.favourite.findIndex((item) => item.productId === product.id);
                                userCopy.favourite.splice(idx, 1);
                                userContext.setUser(userCopy);
                                setFavourite(false);
                            });
                    }
                }
            }
        })
    }

    function toggleFavourite() {
        let isfavourite = userContext.user.favourite.some(item => item.productId === props.productId);
        if(!isfavourite) {
            addFavourite();
        } else {
            removeFromFavourite();
        }
    }

    function addFavouriteAfterLogin(){
        setAlertMsg("You have to log in to add favourite!");
        setAlert(!alert);
    }

    const handleClose = () => {
        setAlert(!alert);
    }

    return (
        <>
            {alert && <Alert
                    content={<>
                        <p>{alertMsg}</p>
                    </>}
                    handleClose={handleClose}
            />}
            {userContext?.user?.type === "user"
                ?
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={
                            favourite || userContext.user.favourite.some(item => item.productId === props.productId) 
                            ? 
                                classes.red 
                            : 
                                classes.blank}
                        onClick={() => {setFavourite(!favourite); toggleFavourite()}}
                    /> 
                :
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={classes.blank}
                        onClick={() => addFavouriteAfterLogin()}
                    /> 
            } 
        </>
    )
}

export default FavouriteHeart;