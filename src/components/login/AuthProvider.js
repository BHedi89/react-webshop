import React from "react";
import { UserDataContext } from "./UserDataContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [pending, setPending] = React.useState(true);

    React.useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (loggedinUser) => {
            if(loggedinUser !== null) {
                fetch(`${FIREBASE_DOMAIN}/users/${loggedinUser.uid}.json`)
                    .then(resp => resp.json())
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
                        setUser({...data, favourite: favouriteList, cart: cartList,  uid: loggedinUser.uid});
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

export default AuthProvider;