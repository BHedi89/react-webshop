import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/sites/Main";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import AuthProvider from './components/login/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
