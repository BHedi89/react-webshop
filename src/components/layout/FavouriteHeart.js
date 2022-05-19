import React from "react";
import classes from "./FavouriteHeart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductDataContext } from "../context/ProductDataContext";
import { UserDataContext } from "../login/UserDataContext";
import Alert from "./Alert";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app"; 

const FavouriteHeart = (props) => {
    const [open, setOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    let productContext = React.useContext(ProductDataContext);
    let userContext = React.useContext(UserDataContext);
    const [favourite, setFavourite] = React.useState(false);

    const addFavourite = () => {        
        productContext.product.map(product => {
            if(product.id === props.productId) {
                fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}/favourite.json`, {
                    method: "POST",
                    body: JSON.stringify({
                        productId: product.id
                    })
                })
                .then(resp => resp.json())
                .then(({name}) => {
                    setAlertMsg("Product added to your favourites!");
                    setOpen(!open);
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
        productContext.product.map(product => {
            if(product.id === props.productId) {
                for(const key in userContext.user.favourite){
                    if(userContext.user.favourite[key].productId === product.id){
                        let id = userContext.user.favourite[key].id;
                        fetch(`${FIREBASE_DOMAIN}/users/${userContext.user.uid}/favourite/${id}.json`, {
                            method: "DELETE"
                        })
                        .then(resp => resp.json())
                        .then(() => {
                            setAlertMsg("Product removed from your favourites!");
                            setOpen(!open);
                            
                            let userCopy = {...userContext.user};
                            let idx = userCopy.favourite.findIndex((item) => item.productId === product.id);
                            userCopy.favourite.splice(idx, 1);
                            userContext.setUser(userCopy);
                        });
                    }
                }
            }
        })
    }

    function toggleFavourite() {
        let cond = userContext.user.favourite.some(item => item.productId === props.productId);
        if(!cond) {
            addFavourite();
        } else {
            removeFromFavourite();
        }
    }

    function addFavouriteAfterLogin(){
        setAlertMsg("You have to log in to add favourite!");
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(!open);
    }

    return (
        <>
            {open && <Alert
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