import React from "react";
import { ProductDataContext } from "./ProductDataContext";
import { FIREBASE_DOMAIN } from "../firebase/firebaseConfig";

const ProductDataProvider = ({children}) => {
    const [products, setProducts] = React.useState(null);
    const [pending, setPending] = React.useState(true);

    React.useEffect(() => {
        const productList = [];
        fetch(`${FIREBASE_DOMAIN}/products.json`)
            .then(resp => resp.json())
            .then(products => {
                for(const key in products){
                    const productObj = {
                        id: key,
                        ...products[key]
                    };
                    productList.push(productObj);
                }
                for(let i = 0; i < productList.length; i++) {
                    const reviewList = [];
                    for(const key in productList[i].review) {
                        const reviewObj = {
                            id: key,
                            ...productList[i].review[key]
                        }
                        reviewList.push(reviewObj);
                    }
                    productList[i].review = reviewList;
                }
                setProducts(productList);
                setPending(false);
            });
    }, [])

    if(!pending){
        return (
            <ProductDataContext.Provider value={{products: products, setProducts: setProducts}}>
                {children}
            </ProductDataContext.Provider>
        )
    }
    return <></>
}

export default ProductDataProvider;