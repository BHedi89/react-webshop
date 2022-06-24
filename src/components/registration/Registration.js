import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Registration.module.css";
import ShapeDivider from "../layout/ShapeDivider";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";
import heroImage from "../images/hero/photo-1597143720029-61ddd2e4733c.jpg";
import Alert from "../layout/Alert";
import Navbar from "../layout/Navbar";
import { FIREBASE_DOMAIN } from "../firebase/firebaseConfig";

const Registration = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [zipcode, setZipcode] = React.useState("");
    const [phonenumber, setPhonenumber] = React.useState("");
    const userContext = React.useContext(UserDataContext);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");

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
                            phonenumber: phonenumber,
                            favourite: [],
                            cart: [], 
                            orders: []
                        })
                })
                .then(resp => resp.json())
                .then((data) => {
                    userContext.setUser(
                        {
                            email, 
                            name: name, 
                            type: "user",
                            address: address,
                            zipcode: zipcode,
                            phonenumber: phonenumber, 
                            favourite: [],
                            cart: [], 
                            orders: []
                        });
                    if(data.type === "user") {
                        setAlertMsg("Successfull registration!");
                        setOpen(!open);
                        navigate("/", {replace: true});
                    }
                    
                })
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setAlertMsg("Email elready in use!");
                    setOpen(!open);
                };
                if (error.code === "auth/weak-password") {
                    setAlertMsg("Weak password! 6 character at least!");
                    setOpen(!open);
                };
                if (error.code === "auth/invalid-email") {
                    setAlertMsg("Invalid email!");
                    setOpen(!open);
                };
            })
    }

    const handleClose = () => {
        setOpen(!open);
    }

    return (
        <>
            <Navbar />
            <Hero 
                heroImage={heroImage}
                title="Wonderful Makeups"
            />
            <ShapeDivider />
            <div className={classes.container}>
                {open && <Alert
                    content={<>
                        <p>{alertMsg}</p>
                    </>}
                    handleClose={handleClose}
                />}
                <h1>Registration</h1>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <input 
                        placeholder="&#xf007; Full name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input 
                        placeholder="&#xf0e0; Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        placeholder="&#xf023; Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input 
                        placeholder="&#xf015; Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <input 
                        placeholder="&#xf084; Zipcode"
                        type="text"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                    <input 
                        placeholder="&#xf095; Phone number"
                        type="text"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                <button className={classes.backBtn}><Link to="/">Back to main</Link></button>
            </div>
            <ShapeDivider />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default Registration;