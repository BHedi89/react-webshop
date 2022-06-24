import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/sites/Main";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import UserDataProvider from './components/context/UserDataProvider';
import Account from "./components/sites/Account";
import ForgotPassword from "./components/login/ForgotPassword";
import Face from "./components/sites/Face";
import Lips from "./components/sites/Lips";
import Eyes from "./components/sites/Eyes";
import Nails from "./components/sites/Nails";
import DetailPage from './components/sites/DetailPage';
import ProductDataProvider from './components/context/ProductDataProvider';
import FavouritePage from './components/sites/FavouritePage';
import Orders from './components/sites/Orders';
import DeliveryData from './components/sites/DeliveryData';
import Cart from './components/sites/Cart';
import RatingDataProvider from './components/context/RatingDataProvider';

function App() {
  return (
    <>
      <UserDataProvider>
        <ProductDataProvider>
          <RatingDataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<Main />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/account" element={<Account/>} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/face" element={<Face />} />
                <Route path="/lips" element={<Lips />} />
                <Route path="/eyes" element={<Eyes />} />
                <Route path="/nails" element={<Nails />} />
                <Route path="/details/:id" element={<DetailPage/>}/>
                <Route path="/favourite" element={<FavouritePage />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/delivery' element={<DeliveryData />} />
                <Route path='/cart' element={<Cart />} />
              </Routes>
            </BrowserRouter>
          </RatingDataProvider>
        </ProductDataProvider>
      </UserDataProvider>
    </>
  );
}

export default App;
