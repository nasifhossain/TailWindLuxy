import { Fragment } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./pages/Product-list";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/cart";
import ProductDetails from "./pages/product-details/product-details";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/Login";
import ForgotPassword from "./pages/forgotpassword/Forgotpassword";
import RegisterUser from "./pages/register/Register";
import ResetPassword from "./pages/reset-password/ResetPassword";
import UpdatePassword from "./pages/updatepassword/UpdatePassword";
import MyAccount from "./pages/myaccount/MyAccount";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/updatePassword/:username" element={<UpdatePassword/>} />
        <Route path="/myAccount/:username" element={<MyAccount/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
