import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import { FaShoppingCart } from 'react-icons/fa';

class Inform extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div className={`border-b bg-white p-4 dark:bg-gray-900`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {this.context.token === "" ? (
              <div className="text-sm font-medium">
                <Link to="/login" className="text-blue-600 hover:underline mr-4">Login</Link>
                <span className="text-gray-500">|</span>
                <Link to="/signup" className="text-blue-600 hover:underline mx-2">Sign-up</Link>
                <span className="text-gray-500">|</span>
                <Link to="/active" className="text-blue-600 hover:underline mx-2">Active</Link>
              </div>
            ) : (
              <div className="text-sm">
                <span className="text-gray-700 dark:text-white">Hello </span>
                <b className="text-blue-600">{this.context.customer.name} !</b><br/>
                <Link to="/home" onClick={() => this.lnkLogoutClick()} className="text-red-600 hover:underline mr-2">Logout</Link>
                <span className="text-gray-500">|</span>
                <Link to="/myprofile" className="text-blue-600 hover:underline mx-2">My profile</Link>
                <span className="text-gray-500">|</span>
                <Link to="/myorders" className="text-blue-600 hover:underline mx-2">My orders</Link>
              </div>
            )}
          </div>

          <div className="text-sm flex items-center">
            <Link to="/mycart" className="text-blue-600 hover:underline mr-4 flex justify-center items-center">
              <FaShoppingCart className="mr-1" />
              <span className="text-gray-700 dark:text-white">Have </span>
            <b className="text-blue-600 mx-1"> { this.context.mycart.length } </b>
            <span className="text-gray-700 dark:text-white"> items</span>
            </Link>
            
          </div>
        </div>
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
    localStorage.removeItem('customer_token');
  }
}

export default Inform;
