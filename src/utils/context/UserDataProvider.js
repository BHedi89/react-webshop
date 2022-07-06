import React from "react";
import { UserDataContext } from "./UserDataContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserByUid } from "../../modules/user-service";

const UserDataProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [pending, setPending] = React.useState(true);

    React.useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (loggedinUser) => {
            if(loggedinUser !== null) {
                getUserByUid(loggedinUser.uid)
                    .then(data => {
                        let favouriteList = [];
                        for(const key in data.favourite){
                            const favouriteObj = {
                                id: key,
                                ...data.favourite[key]
                            }
                            favouriteList.push(favouriteObj);
                        }
                        let cartList = [];
                        for(const key in data.cart){
                            const cartObj = {
                                id: key,
                                ...data.cart[key]
                            }
                            cartList.push(cartObj);
                        }
                        let orderList = [];
                        for(const key in data.orders) {
                            const orderObj = {
                                orderId: key,
                                ...data.orders[key]
                            }
                            orderList.push(orderObj);
                        }
                        setUser(
                            {
                                ...data, 
                                favourite: favouriteList, 
                                cart: cartList,  
                                orders: orderList,
                                uid: loggedinUser.uid
                            }
                        );
                        setPending(false);
                    })
            } else {
                setPending(false);
            }
        })
    }, [])  

    if(!pending){
        return (
            <UserDataContext.Provider value={{user: user, setUser: setUser}}>
                {children}
            </UserDataContext.Provider>
        )
    }
    return <></>
}

export default UserDataProvider;