import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main-detail-page/Main";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import UserDataProvider from './utils/context/UserDataProvider';
import Account from "./pages/user-pages/Account";
import ForgotPassword from "./pages/login/ForgotPassword";
import Face from "./pages/product-pages/Face";
import Lips from "./pages/product-pages/Lips";
import Eyes from "./pages/product-pages/Eyes";
import Nails from "./pages/product-pages/Nails";
import DetailPage from './pages/main-detail-page/DetailPage';
import ProductDataProvider from './utils/context/ProductDataProvider';
import FavouritePage from './pages/user-pages/FavouritePage';
import Orders from './pages/user-pages/Orders';
import DeliveryData from './pages/user-pages/DeliveryData';
import Cart from './pages/user-pages/Cart';
import RatingDataProvider from './utils/context/RatingDataProvider';

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
