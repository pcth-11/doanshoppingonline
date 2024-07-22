import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CartUtil from "../utils/CartUtil";
import axios from "axios";
import withRouter from "../utils/withRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state

  renderCartItems() {
    return this.context.mycart.map((item, index) => (
      <tr
        key={item.product._id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">{index + 1}</td>
        {/* <td className="px-6 py-4">{item.product._id}</td> */}
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {item.product.name}
        </td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">{item.product.category.name}</td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">
          <img
            src={`data:image/jpg;base64,${item.product.image}`}
            width="70px"
            height="70px"
            alt=""
            className="object-cover"
          />
        </td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">${item.product.price}</td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">{item.quantity}</td>
        <td className="px-6 py-4 text-lg text-gray-900 dark:text-white">${item.product.price * item.quantity}</td>
        <td className="px-6 py-4">
          <span
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
            onClick={() => this.lnkRemoveClick(item.product._id)}
          >
            Remove
          </span>
        </td>
      </tr>
    ));
  }

  render() {
    const { mycart } = this.context;

    const cartFooter =
      mycart.length > 0 ? (
        <tfoot>
          <tr>
            <td colSpan="4"></td>
            <td className="px-6 py-4 text-center text-xl font-medium text-gray-900 dark:text-white">Total:</td>
            <td className="px-6 py-4 font-bold text-2xl text-gray-900 dark:text-white">
              ${CartUtil.getTotal(mycart)}
            </td>
            <td className="px-6 py-4">
              <span
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer"
                onClick={() => this.lnkCheckoutClick()}
              >
                CHECKOUT
              </span>
            </td>
          </tr>
        </tfoot>
      ) : (
        <tfoot>
          <tr>
            <td colSpan="8" className="py-40 text-xl text-center text-gray-900 dark:text-white">
              Your cart is empty
            </td>
          </tr>
        </tfoot>
      );

    return (
      <div className="relative overflow-x-auto pt-8 dark:bg-gray-900">
        <h2 className="text-2xl font-bold pb-4 text-center dark:text-white">ITEM LIST</h2>
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          border="1"
        >
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">No.</th>
              {/* <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">ID</th> */}
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">Name</th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">Category</th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">Image</th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">Price</th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">Quantity</th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">Amount</th>
              <th className="px-6 py-3 text-lg text-gray-900 dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderCartItems()}</tbody>
          {cartFooter}
        </table>
        <ToastContainer position="top-right" />
      </div>
    );
  }

  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const updatedCart = mycart.filter((item) => item.product._id !== id);
    this.context.setMycart(updatedCart);
  }

  lnkCheckoutClick() {
    const { mycart, customer, token } = this.context;

    if (mycart.length > 0) {
      const total = CartUtil.getTotal(mycart);

      if (customer) {
        // Use a custom-styled confirm dialog
        this.customConfirm("Are you sure you want to checkout?", () => {
          this.apiCheckout(total, mycart, customer, token);
        });
      } else {
        this.props.navigate("/login");
      }
    } else {
      // Use a custom-styled alert
      toast.warning(
        <div className="bg-yellow-500 text-white p-4 rounded-md">
          Your cart is empty
        </div>
      );
    }
  }

  // apis
  apiCheckout(total, items, customer, token) {
    const body = { total, items, customer };
    const config = { headers: { "x-access-token": token } };

    axios.post("/api/customer/checkout", body, config).then((res) => {
      const result = res.data;
      if (result) {
        // Use a custom-styled alert
        this.customAlert("OK BABY!", "success");
        this.context.setMycart([]);
        this.props.navigate("/home");
      } else {
        // Use a custom-styled alert
        this.customAlert("SORRY BABY!", "error");
      }
    });
  }

  // Custom-styled alert
  customAlert(message, type = "info") {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  // Custom-styled confirm dialog
  customConfirm(message, callback) {
    toast.warning(
      <div>
        <p className="text-xl text-gray-600">{message}</p>
        <button
          onClick={() => {
            callback();
            toast.dismiss(); // Close the toast programmatically
          }}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Yes
        </button>
        <button onClick={() => toast.dismiss()}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">No</button>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
      }
    );
  }
}

export default withRouter(Mycart);
