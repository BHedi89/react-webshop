import { FIREBASE_DOMAIN } from "../utils/firebase/firebaseConfig";

export function getUserByUid(uid) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}.json`)
        .then(resp => resp.json());
}

export function postCartContent(uid, cartObj) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}/cart.json` , {
        method: "POST",
        body: JSON.stringify(cartObj)
    }) 
    .then(resp => resp.json);
}

export function registerUser(uid, userObj) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}.json`, {
        method: "PUT",
        body: JSON.stringify(userObj)
    })
    .then(resp => resp.json());
}

export function modifyUser(uid, modifiedUserObj) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}.json`, {
        method: "PUT",
        body: JSON.stringify(modifiedUserObj)
    })
    .then(resp => resp.json());
}

export function postFavouriteProduct(uid, productObj) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}/favourite.json`, {
        method: "POST",
        body: JSON.stringify(productObj)
    })
    .then(resp => resp.json());
}

export function deleteFavouriteProduct(uid, favouriteId) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}/favourite/${favouriteId}.json`, {
        method: "DELETE"
    })
    .then(resp => resp.json());
}

export function postOrders(uid, orderObj) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}/orders.json`, {
        method: "POST",
        body: JSON.stringify(orderObj)
    })
    .then(resp => resp.json());
}

export function deleteCartContent(uid) {
    return fetch(`${FIREBASE_DOMAIN}/users/${uid}/cart.json`, {
        method: "DELETE"
    })
    .then(resp => resp.json());
}