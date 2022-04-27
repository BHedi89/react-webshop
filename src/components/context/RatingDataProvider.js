import React from "react";
import { RatingDataContext } from "./RatingDataContext";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const RatingDataProvider = ({children}) => {
    const [rate, setRate] = React.useState(null);
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

                let allAvg = [];
                let sum;
                let avg;
                for(let i = 0; i < productList.length; i++){
                    sum = 0;
                    for(let j = 0; j < productList[i].review.length; j++) {
                        sum += productList[i].review[j].rate;
                        avg = Math.round(sum / productList[i].review.length);
                    }
                    
                    allAvg.push({id: productList[i].id, avg: avg});
                }
                setRate(allAvg);
                setPending(false);
            });
    }, [])

    if(!pending){
        return (
            <RatingDataContext.Provider value={{avgRate: rate, setRate: setRate}}>
                {children}
            </RatingDataContext.Provider>
        )
    }
    return <></>
}

export default RatingDataProvider;