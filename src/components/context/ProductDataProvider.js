import React from "react";
import { ProductDataContext } from "./ProductDataContext";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const ProductDataProvider = ({children}) => {
    const [product, setProduct] = React.useState(null);
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
                setProduct(productList);
                setPending(false);
            });
    }, [])

    if(!pending){
        return (
            <ProductDataContext.Provider value={{product: product, setProduct: setProduct}}>
                {children}
            </ProductDataContext.Provider>
        )
    }
    return <></>
}

export default ProductDataProvider;