import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Menu extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="border-b p-4 bg-gray-800 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin/home" className="text-xl font-semibold">
              Admin Panel
            </Link>
            <ul className="flex space-x-4">
              {this.renderNavLink("/admin/home", "Home")}
              {this.renderNavLink("/admin/category", "Category")}
              {this.renderNavLink("/admin/product", "Product")}
              {this.renderNavLink("/admin/order", "Order")}
              {this.renderNavLink("/admin/customer", "Customer")}
              {this.renderNavLink("/admin/statistics", "Statistics")}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white">
              Hello <b>{this.context.username}</b>
            </span>
            <Link className="text-red-800" to="/admin/home" onClick={() => this.lnkLogoutClick()}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderNavLink(to, label) {
    return (
      <li className="menu">
        <Link to={to} className="hover:text-gray-300">
          {label}
        </Link>
      </li>
    );
  }

  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
    localStorage.removeItem("admin_token");
  }
}

export default Menu;
