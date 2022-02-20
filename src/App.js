import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/sites/Main";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import AuthProvider from './components/login/AuthProvider';
import Account from "./components/sites/Account";
import ForgotPassword from "./components/login/ForgotPassword";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
