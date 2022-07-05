import { FIREBASE_DOMAIN } from "../utils/firebase/firebaseConfig";

export function getAllProduct() {
    return fetch(`${FIREBASE_DOMAIN}/products.json`)
        .then(resp => resp.json());
}

export function postReview(productId, reviewObj) {
    return fetch(`${FIREBASE_DOMAIN}/products/${productId}/review.json`, {
        method: "POST",
        body: JSON.stringify(reviewObj)
        }) 
        .then(resp => resp.json());
}