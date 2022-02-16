import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserDataContext } from "../login/UserDataContext";
import { useNavigate } from "react-router-dom";
import classes from "./Registration.module.css";

const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

const Registration = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [zipcode, setZipcode] = React.useState("");
    const [phonenumber, setPhonenumber] = React.useState("");
    const userContext = React.useContext(UserDataContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                fetch(`${FIREBASE_DOMAIN}/users/${user.uid}.json`, {
                    method: "PUT",
                    body: JSON.stringify(
                        {
                            email, 
                            name: name, 
                            type: "user",
                            address: address,
                            zipcode: zipcode,
                            phonenumber: phonenumber
                        })
                })
                .then(() => {
                    userContext.setUser(
                        {
                            email, 
                            name: name, 
                            type: "user",
                            address: address,
                            zipcode: zipcode,
                            phonenumber: phonenumber
                        });
                    navigate("/", {replace: true});
                    alert("Sikeres regisztráció");
                })
            })
            .catch((error) => {
                if (error.code == "auth/email-already-in-use") alert("Ezzel az email címmel már van egy regisztrált felhasználónk!");
                if (error.code == "auth/weak-password") alert("Gyenge jelszó! Legalább 6 karakter legyen!");
                if (error.code == "auth/invalid-email") alert("Hibás email cím!");
            })
    }

    return (
        <>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Full name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input 
                    placeholder="Zipcode"
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                />
                <input 
                    placeholder="Phone number"
                    type="text"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Registration;