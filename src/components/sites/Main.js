import React from "react";
import classes from "./Main.module.css";
import Hero from "../layout/Hero";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Card from "../layout/Card";
import Productcard from "../layout/Productcard";
import ShapeDivider from "../layout/ShapeDivider";
import Articlecard from "../layout/Articlecard";
import heroImage from "../../assets/images/hero/photo-1603775020644-eb8decd79994.jpg";
import img1 from "../../assets/images/eyes/pexels-photo-2463027.jpeg";
import img2 from "../../assets/images/eyes/pexels-photo-3912572.jpeg";
import img3 from "../../assets/images/eyes/pexels-photo-10593040.jpg";
import img4 from "../../assets/images/eyes/pexels-photo-1249632.jpg";
import img5 from "../../assets/images/lipstick/pexels-photo-3568544.jpeg";
import img6 from "../../assets/images/face/pexels-photo-2787341.jpeg";
import articleImage from "../../assets/images/longImages/photo-1613565015448-fe6c5dc9ec40.jpg";
import { ProductDataContext } from "../context/ProductDataContext";
import { RatingDataContext } from "../context/RatingDataContext";
 
const Main = () => {
    const [products, setProducts] = React.useState([]);
    let productContext = React.useContext(ProductDataContext);
    let ratingContext = React.useContext(RatingDataContext);

    React.useEffect(() => {
        const productList = [];
        for(const key in productContext.products) {
            productList.push(productContext.products[key]);
        }
        setProducts(productList);
    }, [])

    return (
        <>
            <Navbar/>
            <Hero 
                title="Wonderful Makeups"
                heroImage={heroImage}
            />
            <div className={classes.content}>
                <div className={classes.sectionTitle}>
                    <h1>Wonderful Colors</h1>
                </div>
               <ShapeDivider></ShapeDivider>
                <div className={classes.cardscontainer}>
                    <Card 
                        cardImage={img1} 
                        minImage1={img1}
                        minImage2={img2}
                        minImage3={img3}
                    />
                    <Card 
                        cardImage={img4} 
                        minImage1={img4}
                        minImage2={img5}
                        minImage3={img6}
                    />
                </div>
                <div className={classes.sectionTitle}>
                    <h1>Best Sellers</h1>
                </div>
                <ShapeDivider></ShapeDivider>
                <div className={classes.products}>
                    {products.map((product) => {
                        if(product.bestseller) {
                            return <Productcard
                                        key={product.id}
                                        productId={product.id}
                                        productName={product.name}
                                        productImage={product.image}
                                        productRate={ratingContext.avgRate.filter((item) => {
                                            let rate = item.id === product.id ? item.avg : 0;
                                            return rate;
                                        })}
                                    />
                        }  
                    })}
                </div>
                <ShapeDivider></ShapeDivider>
                <div className={classes.about}>
                    <Articlecard 
                        articleImage={articleImage}
                    />
                </div>
                <ShapeDivider></ShapeDivider>
            </div>
            <div className={classes.footer}>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Main;