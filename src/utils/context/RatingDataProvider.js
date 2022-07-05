import React from "react";
import { RatingDataContext } from "./RatingDataContext";
import { getAllProduct } from "../../modules/product-service";

const RatingDataProvider = ({children}) => {
    const [rate, setRate] = React.useState(null);
    const [pending, setPending] = React.useState(true);

    React.useEffect(() => {
        const productList = [];
        getAllProduct()
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

                let allRateAvg = [];
                let sum;
                let avg;
                for(let i = 0; i < productList.length; i++){
                    sum = 0;
                    for(let j = 0; j < productList[i].review.length; j++) {
                        sum += productList[i].review[j].rate;
                        avg = Math.round(sum / productList[i].review.length);
                    }
                    
                    allRateAvg.push({id: productList[i].id, avg: avg});
                }
                setRate(allRateAvg);
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