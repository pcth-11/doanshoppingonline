import React, { Component } from "react";
import Menu from "./MenuComponent";
import Inform from "./InformComponent";
import Home from "./HomeComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import Product from "./ProductComponent";
import ProductDetail from "./ProductDetailComponent";
import Signup from "./SignupComponent";
import Active from "./ActiveComponent";
import Login from "./LoginComponent";
import Myprofile from "./MyprofileComponent";
import Mycart from "./MycartComponent";
import Myorders from "./MyordersComponent";
import Footer from "./Footer";
import DarkModeContext from './DarkModeContext';
import Gmap from "./GmapComponent";
import TawkMessager from "./TawkMessengerComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Slider from "./SliderComponent";
import Resetpwd from "./ResetpwdComponent";
import axios from "axios";
import MyContext from "../contexts/MyContext";
class Main extends Component {
  static contextType = MyContext;
  render() {
    return (
      <DarkModeContext.Consumer>
      {({ isDarkMode }) => (
        <div className={`${isDarkMode ? 'dark' : ''} bg-white dark:bg-gray-900`}>
          <ToastContainer autoClose={3000}/>
      <Menu />
        <Inform />
        <div  style={{ alignItems: 'center', position: 'relative', marginLeft: '610px' }}>
          <div style={{maxWidth : '40%'}}>
            <Slider />
          <div style={{height:30 }}/>
        </div>
        </div>
        
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/category/:cid" element={<Product />} />
          <Route path="/product/search/:keyword" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/active" element={<Active />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/mycart" element={<Mycart />} />
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/gmap" element={<Gmap />} />
          <Route path="/resetpwd" element={<Resetpwd/>} />
        </Routes>
        <TawkMessager/>
      <Footer/>
      
    </div>
     )}
     </DarkModeContext.Consumer> 
    );
  }
  componentDidMount() {
    const token = localStorage.getItem('customer_token');
    if (token) this.apiGetAccount(token);
  }
  apiGetAccount(token) {
    const config = { headers: {'x-access-token': token} };
    axios.get('/api/customer/accounts', config).then((res)=> {
      const result = res.data;
      this.context.setToken(token);
      this.context.setCustomer(result);
    });
  }
}
export default Main;
